import { User } from "../orm/models/user.model";
import { Account } from "../orm/models/account.model";
import { Health } from "../orm/models/health.model";
import { Recipe } from "../orm/models/recipe.model";
import sequelize from "sequelize";
import { AvailableIngredient } from "../orm/models/available.ingredient.model";

export default class RecipeService {
  constructor() {}
  
  private TOTAL_FAT_BASE = 78;
  private SUGAR_BASE = 50;
  private SODIUM_BASE = 2.3;
  private PROTEIN_BASE = 50;
  private SATURATED_FAT_BASE = 20;
  private CARBOHYDRATES_BASE = 275;

  public convertPDVToGrams(mealNutrient: any) {
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

  public async getRecipes(limit: number) {
    try {
      const idErrorRecipe: number[] = [];
      const recipes = await Recipe.findAll({
        limit: limit,
        attributes: ["id", "name", "nSteps", "nIngredients", "ingredients", "steps", "nutrition", "cookTime"],
        order: sequelize.literal("rand()"),
      });

      const responseRecipes = recipes.map((recipe: any) => {
        const data = recipe.ingredients;
        const stringData = data.replace(/'/g, '"');
        let ingredientsArray: string[] = [];

        const step = recipe.steps;
        const stringStep = step.replace(/'/g, '"');
        let stepsArray: string[] = [];

        const nutritionData = recipe.nutrition.replace(/'/g, '"');
        let nutritionArray: number[] = [];
        
        ingredientsArray = JSON.parse(stringData);
        stepsArray = JSON.parse(stringStep);
        nutritionArray = JSON.parse(nutritionData);

        let nutrition = {
          'calories': nutritionArray[0],
          'totalFat': nutritionArray[1],
          'sugar': nutritionArray[2],
          'sodium': nutritionArray[3],
          'protein': nutritionArray[4],
          'saturatedFat': nutritionArray[5],
          'carbohydrates': nutritionArray[6]
        }
        const {mealNutrientsInGrams, servingSize} = this.convertPDVToGrams(nutrition);

        return {
          id: recipe.id,
          name: recipe.name,
          nSteps: recipe.nSteps,
          cookTime: recipe.cookTime,
          nIngredients: recipe.nIngredients,
          ingredients: ingredientsArray,
          steps: stepsArray,
          servingSize: servingSize,
          nutrition: mealNutrientsInGrams,
        };
      });
      return responseRecipes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async searchRecipes(name: string) {
    try {
      const recipes = await Recipe.findAll({
        where: {
          name: {
            [sequelize.Op.like]: `%${name}%`,
          },
        },
        attributes: ["id", "name", "nSteps", "nIngredients", "ingredients", "steps", "nutrition", "cookTime"],
        limit: 5,
      });

      const responseRecipes = recipes.map((recipe: any) => {
        const data = recipe.ingredients;
        const stringData = data.replace(/'/g, '"');
        let ingredientsArray: string[] = [];

        const step = recipe.steps;
        const stringStep = step.replace(/'/g, '"');
        let stepsArray: string[] = [];

        const nutritionData = recipe.nutrition.replace(/'/g, '"');
        let nutritionArray: number[] = [];
        
        ingredientsArray = JSON.parse(stringData);
        stepsArray = JSON.parse(stringStep);
        nutritionArray = JSON.parse(nutritionData);

        let nutrition = {
          'calories': nutritionArray[0],
          'totalFat': nutritionArray[1],
          'sugar': nutritionArray[2],
          'sodium': nutritionArray[3],
          'protein': nutritionArray[4],
          'saturatedFat': nutritionArray[5],
          'carbohydrates': nutritionArray[6]
        }
        const {mealNutrientsInGrams, servingSize} = this.convertPDVToGrams(nutrition);

        return {
          id: recipe.id,
          name: recipe.name,
          nSteps: recipe.nSteps,
          cookTime: recipe.cookTime,
          nIngredients: recipe.nIngredients,
          ingredients: ingredientsArray,
          steps: stepsArray,
          servingSize: servingSize,
          nutrition: mealNutrientsInGrams,
        };
      });

      return responseRecipes;
    } catch (error) {
      throw error;
    }
  }

  public async getRecipeById(id: number) {
    try {
      let meal: any;
      const recipe = await Recipe.findOne({
        where: { id: id },
        attributes: ["id", "name", "nSteps", "nIngredients", "ingredients", "steps", "nutrition", "cookTime"],
      });
      
      if (recipe) {
        meal = recipe;
        const data = recipe.ingredients;
        const stringData = data.replace(/'/g, '"');
        let ingredientsArray: string[] = [];

        const step = recipe.steps;
        const stringStep = step.replace(/'/g, '"');
        let stepsArray: string[] = [];

        const nutritionData = meal.nutrition.replace(/'/g, '"');
        let nutritionArray: number[] = [];
        nutritionArray = JSON.parse(nutritionData);
        
        ingredientsArray = JSON.parse(stringData);
        stepsArray = JSON.parse(stringStep);

        let nutrition = {
          'calories': nutritionArray[0],
          'totalFat': nutritionArray[1],
          'sugar': nutritionArray[2],
          'sodium': nutritionArray[3],
          'protein': nutritionArray[4],
          'saturatedFat': nutritionArray[5],
          'carbohydrates': nutritionArray[6]
        };

        const {mealNutrientsInGrams, servingSize} = this.convertPDVToGrams(nutrition);
        
        return {
          id: recipe.id,
          name: recipe.name,
          nSteps: recipe.nSteps,
          cookTime: recipe.cookTime,
          nIngredients: recipe.nIngredients,
          ingredients: ingredientsArray,
          steps: stepsArray,
          servingSize: servingSize,
          nutrition: mealNutrientsInGrams,
        };
      }

      return recipe;
    } catch (error) {
      throw error;
    }
  }
  public async getRecipeByAvailableIngredients(availableIngredients: AvailableIngredient[]) {
      try {
          // Using Set for unique ingredient ids
          const availableIngredientNames = new Set(availableIngredients.map(element => element.ingredient.name));
  
          console.log(availableIngredientNames);

          // SETUP RECIPES
          const recipes = await this.getRecipes(5);
          // Create a map to store recipes based on the number of matching ingredients
          const recipesByMatchingIngredients = new Map<number, any[]>();
          recipes.forEach(recipe => {
            const matchingIngredients = recipe.ingredients.filter(ingredient => availableIngredientNames.has(ingredient.split(" ")[0]));
            const matchingCount = matchingIngredients.length;
            console.log("Matching Ingredients: ", matchingIngredients);
          
            if (!recipesByMatchingIngredients.has(matchingCount)) {
              recipesByMatchingIngredients.set(matchingCount, []);
            } else {
              recipesByMatchingIngredients.get(matchingCount)?.push(recipe);
            }
          
          });
          
          console.log("Recipe by Matching Ingredients: ", recipesByMatchingIngredients.get(0));
  
          return recipes; // Return the filtered recipes
      } catch (err) {
          throw err;
      }
  }
  
}
