import { Recipe } from "../orm/models/recipe.model";
import sequelize from "sequelize";
import { AvailableIngredient } from "../orm/models/available.ingredient.model";
import CombinationIngredientUtil from "../utils/combination.ingredient.util";
import { cp } from "fs";

export default class RecipeService {
  constructor() {}
  
  private TOTAL_FAT_BASE = 78;
  private SUGAR_BASE = 50;
  private SODIUM_BASE = 2.3;
  private PROTEIN_BASE = 50;
  private SATURATED_FAT_BASE = 20;
  private CARBOHYDRATES_BASE = 275;

  public combinationIngredient = new CombinationIngredientUtil();

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
          // Using Set for unique ingredient names
          const availableIngredientNames = new Set(availableIngredients.map(element => element.ingredient.name));

          // SETUP RECIPES
          const recipes = await this.getRecipes(5);

          //  select id, name, ingredients from melius.recipes where ingredients like '%beef%' AND ingredients like '%pea%' limit 5;
          // const recipesWithAvailableIngredients = await Recipe.findAll({
          //     where: {
          //       ingredients: {
          //         [sequelize.Op.and]: availableIngredients.map(availableIngredient => {
          //           return {
          //               [sequelize.Op.like]: `%${availableIngredient.ingredient.name.split(",")[0]}%`
          //           };
          //         })
          //       },
          //     },
          //     attributes: ["id", "name"]
          // })

          const ingredientsToSearch = ['Pork', 'Beef', 'Chicken', 'watermelon'];

          // Combination of ingredients
          const combinationIngredients = this.combinationIngredient.combinationIngredient(ingredientsToSearch);
          console.log("Combination Ingredients: ", combinationIngredients);
          

          // Where condition preparation
          // const whereConditions = {
          //   ingredients: {
          //     [sequelize.Op.or]: combinationIngredients.map(ingredients => {
          //         return {
          //           [sequelize.Op.and]: ingredients.split(",").map(ingredient => {
          //             return {
          //               [sequelize.Op.like]: `%${ingredient.toLowerCase()}%`
          //             }
          //           })
          //       }
          //     })
          //   }
          // };
          // SELECT `id`, `name`, `ingredients` FROM `recipes` AS `Recipe` 
          // WHERE ((`Recipe`.`ingredients` LIKE '\"%pork%\"') 
          // OR (`Recipe`.`ingredients` LIKE '\"%beef%\"') 
          // OR (`Recipe`.`ingredients` LIKE '\"%chicken%\"') 
          // OR (`Recipe`.`ingredients` LIKE '\"%pork%\"' AND `Recipe`.`ingredients` LIKE '\"%beef%\"')
          // OR (`Recipe`.`ingredients` LIKE '\"%pork%\"' AND `Recipe`.`ingredients` LIKE '\"%chicken%\"') 
          // OR (`Recipe`.`ingredients` LIKE '\"%beef%\"' AND `Recipe`.`ingredients` LIKE '\"%chicken%\"') 
          // OR (`Recipe`.`ingredients` LIKE '\"%pork%\"' AND `Recipe`.`ingredients` LIKE '\"%beef%\"' AND `Recipe`.`ingredients` LIKE '\"%chicken%\"')) LIMIT 2;

          // Assuming Recipe is your Sequelize model for the recipes table
          const categorizedResults: any = {};


          // Loop through each ingredient
          for (const ingredient of ingredientsToSearch) {
            const whereConditions = {
              ingredients: {
                [sequelize.Op.like]: sequelize.fn('LOWER', `%${ingredient.toLowerCase()}%`)
              }
            };

            const recipes = await Recipe.findAll({
              attributes: ['id', 'name', 'ingredients'],
              where: whereConditions,
              limit: 3 // Limit to 3 recipes per ingredient
            });

            categorizedResults[ingredient] = recipes;
          }

          // Loop through each combination of ingredients
          for (let i = 0; i < ingredientsToSearch.length - 1; i++) {
            for (let j = i + 1; j < ingredientsToSearch.length; j++) {
              const ingredientCombination = [ingredientsToSearch[i], ingredientsToSearch[j]];
              const whereConditions = {
                ingredients: {
                  [sequelize.Op.and]: ingredientCombination.map(ingredient => ({
                    [sequelize.Op.like]: sequelize.fn('LOWER', `%${ingredient.toLowerCase()}%`)
                  }))
                }
              };

              const recipes = await Recipe.findAll({
                attributes: ['id', 'name', 'ingredients'],
                where: whereConditions,
                limit: 3 // Limit to 3 recipes per combination
              });

              categorizedResults[ingredientCombination.join(', ')] = recipes;
            }
          }

          // Print or process the categorized results
          console.log('Recipes Categorized by Matched Ingredients:');
          console.log(categorizedResults);

          return categorizedResults; // Return the filtered recipes


          // for (const ingredient of combinationIngredients) {
          //   const recipes = await Recipe.findAll({
          //     attributes: ['id', 'name', 'ingredients'],
          //     where: whereConditions,
          //     limit: 2
          //   });
          
          //   if (recipes.length > 0) {
          //     categorizedResults[ingredient] = recipes;
          //   }
          // }

          // // Print or process the categorized results
          // // console.log('Recipes Categorized by Matched Ingredients:');
          // // console.log(categorizedResults);
  
          // return categorizedResults; // Return the filtered recipes
      } catch (err) {
          throw err;
      }
  }
  
}
