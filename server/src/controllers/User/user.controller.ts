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
import AllergyService from "../../services/allergy.service";
import AvailableIngredientService from "../../services/available.ingredient.service";
import RecipeService from "../../services/recipe.service";

import dateTimeUtil from "../../utils/dateTime";
export default class UserController extends BaseController {
  constructor() {
    super();
  }

  public healthService = new HealthService();

  public userService = new UserService();

  public ingredientService = new IngredientService();

  public mealPlanService = new MealPlanService();

  public planDetailService = new PlanDetailService();

  public allergyService = new AllergyService();
  
  public availableIngredientService = new AvailableIngredientService();

  public recipeService = new RecipeService();

  public dateTimeUtil = new dateTimeUtil();

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
        await this.allergyService.addIngredientToAllergy(ingredientData);
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
      const allergyList = await this.allergyService.getAllergyList(
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

  public deleteAllergy = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const allergyId = Number(req.query.id);
      const kidId = Number(req.query.kidId);

      const deletedAllergy = await this.allergyService.deleteAllergy(allergyId, kidId);
      res.status(200).json({
        msg: "Delete allergy successfully",
        ingredient: deletedAllergy, 
      })
    } catch (error) {
      next(error);
    }
  };

  public undoDeleteAllergies = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const allergyId = Number(req.query.id);
      const kidId = Number(req.query.kidId);

      const deletedAllergies = await this.allergyService.undoDeleteAllergies(allergyId, kidId);
      res.status(200).json({
        msg: "Undo delete allergies successfully",
        ingredient: deletedAllergies,
      })
    } catch (error) {
      next(error);
    }
  };

  // AVAILABLE INGREDIENTS FUNCTIONS
  public addIngredientsToAvailableList = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const ingredientArrayInput = req.body.ingredientIds.split(",").map((Number));
      // Using Set for unique ingredient ids
      const ingredientArray = [...new Set(ingredientArrayInput)]
      
      const ingredientData = {
        ingredientIds: ingredientArray,
        userId: Number(req.userData.id),
        dueTime: Number(req.body.dueTime) ? Number(req.body.dueTime) : 1,
      }

      const [ingredient, duplicateIngredients] = await this.availableIngredientService.addIngredientsToAvailableList(ingredientData);

      res.status(200).json({
        msg: "Successfully add ingredients to available list",
        ingredient: ingredient,
        duplicateIngredients: duplicateIngredients,
      })
    } catch (error) {
      next(error);
    }
  }

  public getAvailableIngredientList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const availableIngredientList =
        await this.availableIngredientService.getAvailableIngredientList(req.userData.id);

      res.status(200).json({
        msg: "Get available ingredient list successfully",
        availableIngredientList: availableIngredientList,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  public deleteAvailableIngredient = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const availableIngredientId = Number(req.query.id);
      const userId = Number(req.userData.id);

      const deletedAvailableIngredient = await this.availableIngredientService.deleteAvailableIngredient(availableIngredientId, userId);
      
      res.status(200).json({
        msg: "Delete available ingredient successfully",
        ingredient: deletedAvailableIngredient, 
      })
    } catch (err) {
      next(err);
    }
  }

  public undoDeleteAvailableIngredients = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const availableIngredientId = Number(req.query.id);
      const userId = Number(req.userData.id);

      const deletedAvailableIngredients = await this.availableIngredientService.undoDeleteAvailableIngredients(availableIngredientId, userId);
      
      res.status(200).json({
        msg: "Undo delete available ingredients successfully",
        ingredient: deletedAvailableIngredients, 
      })
    } catch (err) {
      next(err);
    }
  }

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

      // This only get the recipe information of the suggested meals include: recipeId, recipeName, servingSize, nutrition
      const [suggestedMeals, nutrientsTarget, estimatedNutrition] = await this.mealPlanService.createSuggestedMeals(mealPlanDTO);

      // Get the recipe ids - Put them into plan details
      let recipeIds: number[] = [];
      for (let i = 0; i < suggestedMeals.length; i++) {
        recipeIds.push(suggestedMeals[i].id);
      }

      const mealPlan = await this.mealPlanService.getMealPlanInfo(kidId);
      console.log("Meal Plan Id: ", mealPlan!.id);
      await this.planDetailService.insertRecipesIntoPlanDetails(Number(mealPlan!.id), recipeIds);
      
      const [mealsPlan, planDetails] = await this.mealPlanService.getMealPlan(kidId);
      res.status(200).json({
        msg: "Create suggested meals successfully",
        suggestedMeals: suggestedMeals,
        nutrientsTarget: nutrientsTarget[0],
        suggestedNutrition: {
          totalNutrition: estimatedNutrition,
          sessionNutrition: planDetails,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public createSuggestedMealsBeta = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      // SETUP AVAILABLE INGREDIENTS
      const availableIngredients = await this.availableIngredientService.getAvailableIngredientList(req.userData.id);

      // RECIPE SERVICE
      const response = await this.recipeService.getRecipeByAvailableIngredients(availableIngredients);

      res.status(200).json({
        msg: "Get suggested meals based on Available Ingredients successfully",
        recipes: response,
      })
    } catch (error) {
      next(error);
    }
  }

  public getMealPlan = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const kidId = Number(req.query.kidId);
      const dateString = req.query.date ;
      const date = new Date(dateString as string);
      console.log("Date: ", date);

      const [mealPlan, planDetails, estimatedNutrition] = await this.mealPlanService.getMealPlan(kidId, date);

      res.status(200).json({
        msg: "Get meal plan successfully",
        mealPlan: mealPlan,
        planDetails: planDetails,
        estimatedNutrition: estimatedNutrition,
      });
    } catch (err) {
      next(err);
    }
  }

  public deleteMealPlan = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const kidId = Number(req.query.kidId);

      const deletedMealPlan = await this.mealPlanService.deleteMealPlan(kidId);
     
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

  public undoDeleteMealPlan = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const kidId = Number(req.query.kidId);
      const id = Number(req.query.id);

      const deletedMealPlan = await this.mealPlanService.undoDeleteMealPlan(kidId, id);
     
      if (deletedMealPlan === undefined) {
        throw new HttpException(404, "Meal plan not found");
      }

      res.status(200).json({
        msg: "Undo delete meal plan successfully",
        deletedMealPlan: deletedMealPlan,
      });
    } catch (err) {
      next(err);
    }
  }

  // MEAL PLAN DETAILS FUNCTIONS
  public updateMeal = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const mealId = Number(req.query.id);
      const recipeId = Number(req.query.recipeId);
      const mealPlan = await this.mealPlanService.getMealPlanInfo(Number(req.query.kidId));

      // Date Time Format UTC 
      this.dateTimeUtil.setUTCDateTime(req.query.mealTime as string);
      let mealTime = this.dateTimeUtil.getUTCDateTime();

      const mealDTO = {
        mealPlanId: Number(mealPlan!.id),
        mealId: mealId,
        recipeId: recipeId || null,
        mealTime: new Date(mealTime),
        type: req.query.type || null,
      }
      const updatedMeal = await this.planDetailService.updateMeal(mealDTO);

      if (!updatedMeal) {
        throw new HttpException(404, "Meal not found");
      }

      res.status(200).json({
        msg: "Update meal successfully",
        updatedMeal: updatedMeal,
      });
    } catch (err) {
      next(err);
    }
  }

  public deleteMeal = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const mealId = Number(req.query.id);

      const deletedMeal = await this.planDetailService.deleteMeal(mealId);

      if (!deletedMeal) {
        throw new HttpException(404, "Meal not found");
      }

      res.status(200).json({
        msg: "Delete meal successfully",
        deletedMeal: deletedMeal,
      });
    } catch (err) {
      next(err);
    }
  }

  public undoDeleteMeal = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const mealId = Number(req.query.id);

      const deletedMeal = await this.planDetailService.undoDeleteMeal(mealId);

      if (!deletedMeal) {
        throw new HttpException(404, "Meal not found");
      }

      res.status(200).json({
        msg: "Undo delete meal successfully",
        deletedMeal: deletedMeal,
      });
    } catch (err) {
      next(err);
    }
  }

  public addMeal = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      // Check the meal plan is exist or not
      const kidId = Number(req.body.kidId);
      const mealPlan = await this.mealPlanService.getMealPlanInfo(kidId);

      // Date Time Format UTC 
      this.dateTimeUtil.setUTCDateTime(req.body.mealTime);
      let mealTime = this.dateTimeUtil.getUTCDateTime();

      let newMeal = {
        mealPlanId: Number(mealPlan!.id),
        recipeId: Number(req.body.recipeId),
        mealTime: new Date(mealTime),
        type: "",
      };
      let responseMeal;

      let nMealChanged: boolean = false;

      // Find the Unfilled Meal Plan Details
      // If the meal plan details is unfilled:
      // [Unfilled Meal]
      // 1. Check session of the new meal is matched with the session of the unfilled meal plan details
        // [1] If the session is matched, then update the new meal to the unfilled meal plan details
      // [Filled Meal]
      // 1. Get the Mail Course of the Old meal in that session => Old meal
      // 2. Compare the nutrition of the Old meal and the new meal
      // 3. Check if the nutrition of the new meal is matched with the nutrition of the old meal
        // [1] If the nutrition is matched, then update the new meal to the old meal
        // [2] If the nutrition is less than the old meal
          // 2.1. Check the session of new meal contains any side dish
            // [1]. If the session contains any side dish, then update the new meal to the old meal (side dish)
            // [2]. Else, create a new meal with type = side dish
      const unfilledMealPlanDetails = await this.planDetailService.getUnfilledPlanDetails(mealPlan!.id, mealTime.getUTCHours());
    
      if (unfilledMealPlanDetails) {
        // 1. Check if the new meal is matched with the time of the empty meal
        const checkMealSession = this.planDetailService.checkMealSession(unfilledMealPlanDetails!.session, mealTime.getUTCHours());
        if (checkMealSession) {
          // Update the new meal to the empty meal
          console.log("Update new meal to the meal plan detail");
          const mealDTO = {
            mealId: unfilledMealPlanDetails!.id,
            ...newMeal,
          }

          console.log(mealDTO);
          responseMeal = await this.planDetailService.updateMeal(mealDTO);
        }
      } else {
        // Create new meal plan detail
        console.log("Create new meal plan detail");

        // Get the Main course of the Old meal in that session
        const oldMeal = await this.planDetailService.getPlanDetailsByMealTime(mealTime);

        // Get the nutrition of the new meal
        const newMealNutrition = await this.recipeService.getRecipeById(newMeal.recipeId);

        if (newMealNutrition?.mealType === "Side dish") {
          // Insert new meal to side dish
          const sideDishMeal = {
            mealPlanId: Number(mealPlan!.id),
            recipeId: Number(req.body.recipeId),
            mealTime: new Date(mealTime),
            type: "Side dish",
            nutritionRange: [newMealNutrition!.servingSize, newMealNutrition!.servingSize]
          };

          responseMeal = await this.planDetailService.addMeal(sideDishMeal);
        } else {
          // Update the new meal to the old meal
          console.log("Update new meal to the old meal");
          newMeal = {
            mealPlanId: Number(mealPlan!.id),
            recipeId: Number(req.body.recipeId),
            mealTime: new Date(mealTime),
            type: newMealNutrition!.mealType,
          }
          const mealDTO = {
            mealId: oldMeal!.id,
            ...newMeal,
          };

          responseMeal = await this.planDetailService.updateMeal(mealDTO);
        }
        // const newMealNutrition = await this.recipeService.getNutritionByRecipeId(newMeal.recipeId);
      }
      
      // 1.1. If the new meal is matched, then update the meal plan details
      // 1.2. If the new meal is not matched, then create a new meal plan detail

      res.status(200).json({
        msg: "Add meal successfully",
        newMeal: responseMeal ? responseMeal : newMeal,
        nMealChanged: nMealChanged,
      });

    } catch (err) {
      next(err);
    }
  }
}
