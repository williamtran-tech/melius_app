import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";
import HttpException from "../exceptions/HttpException";
import { Ingredient } from "../orm/models/ingredient.model";
import { IngreCategory } from "../orm/models/ingre.category.model";
import USDAService from "./usda.service";
import { Allergy } from "../orm/models/allergy.model";
import { User } from "../orm/models/user.model";
import { AvailableIngredient } from "../orm/models/available.ingredient.model";
import { Recipe } from "../orm/models/recipe.model";
import { Sequelize } from "sequelize-typescript";
import { Health } from "../orm/models/health.model";
import { MealPlan } from "../orm/models/meal.plan.model";
import HealthService from "./health.service";
// Recipes Describe Data of nutrition
// 'calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)']] = df[['calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)'

export default class MealPlanService {
  public USDAService = new USDAService();
  public healthService = new HealthService();

  private CALORIES_BASE = 2000;
  private TOTAL_FAT_BASE = 78;
  private SUGAR_BASE = 50;
  private SODIUM_BASE = 2.3;
  private PROTEIN_BASE = 50;
  private SATURATED_FAT_BASE = 20;
  private CARBOHYDRATES_BASE = 275;

  private calculateNutrients(calories: number) {

    // Nutrients Recommendation for 2,000 calories diet - Nutrient Label - FDA 
    // Total Fat	< 78g - 702cal
    // Saturated Fat	< 20g - 180cal
    // Protein	< 50g - 200cal
    // Carbohydrates	< 275g - 1,100cal
    // Sugar	< 50g


    // Calculate protein target
    const proteinTarget = calories * 50 / 2000;

    // Calculate fat target
    const fatTarget = calories * 78 / 2000;

    // Calculate carb target
    const carbTarget = calories * 275 / 2000;

    const nutrientsTarget = {
      proteinTarget: proteinTarget,
      fatTarget: fatTarget,
      carbTarget: carbTarget,
    }

    return nutrientsTarget;

  }

  private convertPDVtoGram(mealNutrient: any) {
    var mealNutrientsInGrams = {
      calories: Number(mealNutrient.calories.toFixed(2)),
      totalFat: Number((mealNutrient.totalFat * this.TOTAL_FAT_BASE / 100).toFixed(2)),
      sugar: Number((mealNutrient.sugar * this.SUGAR_BASE / 100).toFixed(2)),
      sodium: Number((mealNutrient.sodium * this.SODIUM_BASE / 100).toFixed(2)),
      protein: Number((mealNutrient.protein * this.PROTEIN_BASE / 100).toFixed(2)),
      saturatedFat: Number((mealNutrient.saturatedFat * this.SATURATED_FAT_BASE / 100).toFixed(2)),
      carbohydrates: Number((mealNutrient.carbohydrates * this.CARBOHYDRATES_BASE / 100).toFixed(2)),
    };
    
    let servingSize = mealNutrientsInGrams.totalFat + mealNutrientsInGrams.sugar + mealNutrientsInGrams.sodium + mealNutrientsInGrams.protein + mealNutrientsInGrams.carbohydrates;
    servingSize = Math.round(servingSize);
    
    return {mealNutrientsInGrams, servingSize};
  }

  public async createMealPlan(MealPlanDTO: any) {
    try {
      // Get the kid data
      // Get the TDEE and RDA of the kid 
      const kidId = Number(MealPlanDTO.kidId);
      const kidHealth = await this.healthService.getHealthRecord(kidId);
      const energy = kidHealth.energy;

      // Calculate the recommended nutrients intake of the kid
      const nutrientsTarget = this.calculateNutrients(energy!);

      // Create the meal plan
      // The mealPlan will return 2 values, the first value is the mealPlan object, the second value is the boolean value of whether the mealPlan is created or not
      const mealPlan = await MealPlan.findOrCreate({
        where: 
        { kidId: kidId},
        defaults: 
        {
        energyTarget: energy,
        proteinTarget: nutrientsTarget.proteinTarget,
        fatTarget: nutrientsTarget.fatTarget,
        carbTarget: nutrientsTarget.carbTarget,
        kidId: kidId,
        }
      });

      if (mealPlan[1] === false) {
        throw new HttpException(400, "Meal plan already exists");
      }

      return mealPlan[0];
    } catch (err) {
      throw err;
    }
  }

  public async createSuggestedMeals(MealPlanDTO: any) {
    try {
      const { kidId, nMeal, duration } = MealPlanDTO;
      
      // Gather constraints of the meal plan
      // Validation: 
      // 1. The meal should match with the kid's available ingredients
      // 2. The meal should match with the kid's TDEE and protein, fat, carb target
      // 3. The meal should match with the kid's allergies


      // Get the TDEE and RDA of the kid
      const mealTarget = await this.healthService.getHealthRecord(
        Number(kidId)
      );

      // Get the allergies of the kid
      const kidAllergies = await Allergy.findAll({
        where: { kidId: kidId },
        attributes: ["ingredientId"],
        include: [Ingredient],
      });

      // Get random meals based on quantity of user input to the form 
      var TOTAL_CALORIES: number = 0,
      TOTAL_FAT: number = 0,
      TOTAL_SUGAR: number = 0,
      TOTAL_CARBS: number = 0,
      TOTAL_PROTEIN: number = 0,
      TOTAL_SATURATED_FAT: number = 0,
      TOTAL_SODIUM: number = 0;

      const suggestedMeals = await Recipe.findAll({
        limit: nMeal,
        order: Sequelize.literal("rand()"),
      });
    
      const responseMeals = suggestedMeals.map((meal: any) => {
        const ingredientData = meal.ingredients.replace(/'/g, '"');
        let ingredientsArray: string[] = [];
        ingredientsArray = JSON.parse(ingredientData);

        const stepData = meal.steps.replace(/'/g, '"');
        let stepsArray: string[] = [];
        stepsArray = JSON.parse(stepData);

        const nutritionData = meal.nutrition.replace(/'/g, '"');
        let nutritionArray: number[] = [];
        nutritionArray = JSON.parse(nutritionData);

        const mealNutrition = {
          calories: nutritionArray[0],
          totalFat: nutritionArray[1],
          sugar: nutritionArray[2],
          sodium: nutritionArray[3],
          protein: nutritionArray[4],
          saturatedFat: nutritionArray[5],
          carbohydrates: nutritionArray[6],
        };

        // Convert the nutrition from PDV to gram - Recipe Dataset contains nutrition in PDV
        const {mealNutrientsInGrams, servingSize} = this.convertPDVtoGram(mealNutrition);

        // Calculate the total nutrition of the meals
        TOTAL_CALORIES += mealNutrientsInGrams.calories;
        TOTAL_FAT += mealNutrientsInGrams.totalFat;
        TOTAL_SUGAR += mealNutrientsInGrams.sugar;
        TOTAL_CARBS += mealNutrientsInGrams.carbohydrates;
        TOTAL_PROTEIN += mealNutrientsInGrams.protein;
        TOTAL_SATURATED_FAT += mealNutrientsInGrams.saturatedFat;
        TOTAL_SODIUM += mealNutrientsInGrams.sodium;

        return {
          name: meal.name,
          nSteps: meal.nSteps,
          nIngredients: meal.nIngredients,
          ingredients: ingredientsArray,
          steps: stepsArray,
          nutrition: mealNutrientsInGrams,
          portion: {
            servingSize: servingSize,
            unit: "G",
          },
        };
      });

      // Calculate the estimated nutrition of the meals
      const estimatedNutrition = {
        calories: Math.round(TOTAL_CALORIES),
        totalFat: Math.round(TOTAL_FAT),
        sugar: Math.round(TOTAL_SUGAR),
        sodium: Math.round(TOTAL_SODIUM),
        protein: Math.round(TOTAL_PROTEIN),
        saturatedFat: Math.round(TOTAL_SATURATED_FAT),
        carbohydrates: Math.round(TOTAL_CARBS),
      };
      // Compare the nutrition of the meals and the kid's TDEE and RDA

      // If the nutrition of the meals is not enough, get another random meals

      // If the nutrition of the meals is enough, return the meals

      return [responseMeals, mealTarget, estimatedNutrition];
    } catch (err) {
      throw err;
    }
  }

  public async getMealPlan(kidId: number) {
    try {
      const mealPlan = await MealPlan.findOne({
        where: { kidId: kidId },
        attributes: ["id", "energyTarget", "proteinTarget", "fatTarget", "carbTarget", "updatedAt"],
      });

      if (mealPlan === null) {
        throw new HttpException(404, "Meal plan not found - Create one if you haven't");
      }

      return mealPlan;
    } catch (error) {
      throw error;
    } 
  }

  public async updateMealPlan(kidId: number) {
    try {
      // Get updated health record 
      const kidHealth = await this.healthService.getHealthRecord(kidId);
      const energy = kidHealth.energy;

      // Calculate the recommended nutrients intake of the kid
      const nutrientsTarget = this.calculateNutrients(energy!);

      // Update will contain 2 values, the first value is the number of rows updated, the second value is the updated mealPlan object
      const mealPlan = await MealPlan.update({
        energyTarget: energy,
        proteinTarget: nutrientsTarget.proteinTarget,
        fatTarget: nutrientsTarget.fatTarget,
        carbTarget: nutrientsTarget.carbTarget,
      }, {
        where: { kidId: kidId },
      });

      return mealPlan;
    } catch (error) {
      throw error;
    }
  }
}
