import express, { NextFunction } from "express";
import { BaseController } from "../abstractions/base.controller";
import HttpException from "../../exceptions/HttpException";
import jwt from "jsonwebtoken";
import DecodedUserToken from "../../interfaces/Auth/DecodedUserToken.interface";
import UserService from "../../services/user.service";
import HealthService from "../../services/health.service";
import KidHealthDTO from "../../DTOs/Kid/KidHealthData.DTO";
import IngredientService from "../../services/ingredient.service";
import MealPlanService from "../../services/meal.plan.service";
import PlanDetailService from "../../services/plan.detail.service";
import MealPlanDTO from "../../DTOs/MealPlan/MealPlan.DTO";
export default class UserController extends BaseController {
  constructor() {
    super();
  }

  public healthService = new HealthService();

  public userService = new UserService();

  public ingredientService = new IngredientService();

  public mealPlanService = new MealPlanService();

  public planDetailService = new PlanDetailService();

  public getUserProfile = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const userProfile = await this.userService.getUserProfile(
        req.userData.id
      );
      const kidProfile = await this.userService.getKidProfiles(req.userData.id);
      res.status(200).json({
        msg: "Get user profile successfully",
        userProfile: userProfile,
        kidProfile: kidProfile,
      });
    } catch (err) {
      next(err);
    }
  };

  public createChild = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userData.id;
      const userProfile = await this.userService.getUserProfile(userId);
      if (userProfile) {
        const childProfile = {
          fullName: req.body.fullName,
          gender: req.body.gender,
          dob: req.body.dob,
          parentId: userProfile.user.id,
        };

        const child = await this.userService.createChild(childProfile);

        const healthRecord = {
          kidId: child.id,
          weight: req.body.weight,
          height: req.body.height,
          DOB: child.dob,
          gender: child.gender,
          PAL: req.body.PAL || 1.4,
        } as KidHealthDTO;

        const createdHealthRecord = await this.healthService.createHealthRecord(
          healthRecord
        );

        res.status(200).json({
          msg: "Create child successfully",
          child: child,
          healthRecord: createdHealthRecord,
        });
      } else {
        throw new HttpException(401, "Unauthorized Access");
      }
    } catch (err) {
      next(err);
    }
  };

  // Update Kid Profile - Health Status
  public updateChildHealth = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const kidId = Number(req.body.kidId);
      const kidInfo = await this.userService.getKidProfile(kidId);
      const kidData: KidHealthDTO = {
        kidId: kidInfo[0].id,
        weight: req.body.weight,
        height: req.body.height,
        DOB: kidInfo[0].dob,
        PAL: req.body.PAL ? req.body.PAL : 1.5,
        gender: kidInfo[0].gender,
      };

      // Update Health Record
      const [kidHealth, isNew] = await this.healthService.updateHealthRecord(kidData);

      let updatedMealPlan;
      // Check if the kid has a meal plan
      if (await this.mealPlanService.checkMealPlanExist(kidId)) {
        // Update the Meal Plan of the kid
        updatedMealPlan = await this.mealPlanService.updateMealPlan(kidData.kidId, isNew);
      }
      res.status(200).json({
        msg: "Update kid health successfully",
        kidHealth: kidHealth,
        updatedMealPlan: updatedMealPlan,
      });
    } catch (error) {
      next(error);
    }
  };

  public getKidProfile = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const kidId = Number(req.query.kidId);

      const kidProfiles = await this.userService.getKidProfile(kidId);
      res.status(200).json({
        msg: "Get child profile successfully",
        kidProfiles: kidProfiles,
      });
    } catch (error) {
      next(error);
    }
  };

  // ALLERGIES FUNCTIONS
  public addIngredientToAllergyList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const ingredientData = {
        fdcId: Number(req.body.fdcId),
        kidId: Number(req.body.kidId),
      };

      const [ingredient, result] =
        await this.ingredientService.addIngredientToAllergy(ingredientData);
      if (!result) {
        console.log("Ingredient already exists");
        throw new HttpException(400, "Ingredient already exists");
      }
      res.status(200).json({
        msg: "Insert ingredient to allergy successfully",
        allergies: ingredient,
      });
    } catch (err) {
      next(err);
    }
  };
  public getAllergyList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const allergyList = await this.userService.getAllergyList(
        Number(req.query.kidId)
      );

      res.status(200).json({
        msg: "Get allergy list successfully",
        allergyList: allergyList,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // AVAILABLE INGREDIENTS FUNCTIONS
  public addIngredientToAvailableList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const ingredientData = {
        ingredientId: Number(req.body.ingredientId),
        userId: Number(req.userData.id),
        dueTime: Number(req.body.dueTime) ? Number(req.body.dueTime) : 1,
      };
      const [ingredient, result] =
        await this.ingredientService.addIngredientToAvailableList(
          ingredientData
        );
      res.status(200).json({
        msg: "Successfully add ingredient to available list",
        ingredient: ingredient,
      });
    } catch (err) {
      next(err);
    }
  };

  public getAvailableIngredientList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const availableIngredientList =
        await this.userService.getAvailableIngredientList(req.userData.id);

      res.status(200).json({
        msg: "Get available ingredient list successfully",
        availableIngredientList: availableIngredientList,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  // MEAL PLAN FUNCTIONS
  public createMealPlan = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const kidId = Number(req.body.kidId);
      const numberOfMeals = Number(req.body.nMeal);
      
      const mealPlanDTO: MealPlanDTO = {
        kidId: kidId,
        nMeal: numberOfMeals,
      };

      const [mealPlan, mealPlanTemplate] = await this.mealPlanService.createMealPlan(mealPlanDTO);

      res.status(200).json({
        msg: "Create meal plan successfully",
        mealPlan: mealPlan,
        mealPlanTemplate: mealPlanTemplate,
      });
    } catch (err) {
      next(err);
    }
  };

  public createSuggestedMeals = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const kidId = Number(req.body.kidId);
      // Refactor this DTO later
      const mealPlanDTO = {
        userId: Number(req.userData.id),
        kidId: kidId,
        nMeal: Number(req.body.nMeal),
        duration: Number(req.body.duration),
      };

      const [suggestedMeals, nutrientsTarget, estimatedNutrition] = await this.mealPlanService.createSuggestedMeals(mealPlanDTO);

      res.status(200).json({
        msg: "Create suggested meals successfully",
        suggestedMeals: suggestedMeals,
        nutrientsTarget: {
          totalNutrition: nutrientsTarget[0],
          sessionNutrition: nutrientsTarget[1],
        },
        estimatedNutrition: estimatedNutrition,
      });
    } catch (error) {
      next(error);
    }
  };

  public getMealPlan = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const kidId = Number(req.query.kidId);
      const [mealPlan, planDetails] = await this.mealPlanService.getMealPlan(kidId);

      res.status(200).json({
        msg: "Get meal plan successfully",
        mealPlan: mealPlan,
        planDetails: planDetails,
      });
    } catch (err) {
      next(err);
    }
  }

  public deleteMealPlan = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const kidId = Number(req.query.kidId);

      const deletedMealPlan = await this.mealPlanService.deleteMealPlan(kidId);
      console.log(deletedMealPlan);
      if (deletedMealPlan === undefined) {
        throw new HttpException(404, "Meal plan not found");
      }

      res.status(200).json({
        msg: "Delete meal plan successfully",
        deletedMealPlan: deletedMealPlan,
      });
    } catch (err) {
      next(err);
    }
  }
}
