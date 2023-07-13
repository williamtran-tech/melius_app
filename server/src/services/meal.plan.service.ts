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
import HealthService from "./health.service";
// Recipes Describe Data of nutrition
// 'calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)']] = df[['calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)'

export default class MealPlanService {
  public USDAService = new USDAService();
  public healthService = new HealthService();

  public async createSuggestedMeals(MealPlanDTO: any) {
    try {
      const { kidId, nMeal, duration } = MealPlanDTO;
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

        return {
          name: meal.name,
          nSteps: meal.nSteps,
          nIngredients: meal.nIngredients,
          ingredients: ingredientsArray,
          steps: stepsArray,
          nutrition: mealNutrition,
        };
      });

      // Get random meals based on quantity of user input to the form

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

      // Compare the nutrition of the meals and the kid's TDEE and RDA

      // If the nutrition of the meals is not enough, get another random meals

      // If the nutrition of the meals is enough, return the meals

      return [responseMeals, mealTarget];
    } catch (err) {
      throw err;
    }
  }
}
