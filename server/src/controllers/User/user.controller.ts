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
export default class UserController extends BaseController {
  constructor() {
    super();
  }

  public healthService = new HealthService();

  public userService = new UserService();

  public ingredientService = new IngredientService();

  public mealPlanService = new MealPlanService();

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

  public updateChildHealth = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const kidInfo = await this.userService.getKidProfiles(req.userData.id);
      const kidData: KidHealthDTO = {
        kidId: kidInfo[0].id,
        weight: req.body.weight,
        height: req.body.height,
        DOB: kidInfo[0].dob,
        PAL: req.body.PAL ? req.body.PAL : 1.5,
        gender: kidInfo[0].gender,
      };

      const kidHealth = await this.healthService.updateHealthRecord(kidData);

      let updatedMealPlan;
      if (kidHealth) {
        // Update the Meal Plan of the kid
        [updatedMealPlan] = await this.mealPlanService.updateMealPlan(kidData.kidId);
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
      const userId = req.userData.id;

      const kidProfiles = await this.userService.getKidProfiles(userId);
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
      // Refactor this DTO later
      const mealPlanDTO = {
        kidId: kidId,
      };

      const mealPlan = await this.mealPlanService.createMealPlan(mealPlanDTO);

      res.status(200).json({
        msg: "Create meal plan successfully",
        mealPlan: mealPlan
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
        kidId: kidId,
        nMeal: Number(req.body.nMeal),
        duration: Number(req.body.duration),
      };

      const [suggestedMeals, mealTarget] =
        await this.mealPlanService.createSuggestedMeals(mealPlanDTO);

      res.status(200).json({
        msg: "Create suggested meals successfully",
        suggestedMeals: suggestedMeals,
        mealTarget: mealTarget,
      });
    } catch (error) {
      next(error);
    }
  };

  public getMealPlan = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const kidId = Number(req.query.kidId);
      const mealPlan = await this.mealPlanService.getMealPlan(kidId);

      res.status(200).json({
        msg: "Get meal plan successfully",
        mealPlan: mealPlan
      });
    } catch (err) {
      next(err);
    }
  }
}
