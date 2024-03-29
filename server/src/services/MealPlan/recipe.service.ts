import { Recipe } from "../../orm/models/recipe.model";
import sequelize from "sequelize";
import { AvailableIngredient } from "../../orm/models/available.ingredient.model";
import CombinationIngredientUtil from "../../utils/combination.ingredient.util";
import natural from "natural";
import chalk from "chalk";
import { Category } from "../../orm/models/category.model";
import HttpException from "../../exceptions/HttpException";
import { Allergy } from "../../orm/models/allergy.model";
import { Ingredient } from "../../orm/models/ingredient.model";

export default class RecipeService {
  constructor() {
    this.recipeMaxId = 833900;
    this.recipeMinId = 652746;
  }
  
  private recipeMinId: number;
  private recipeMaxId: number;
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
        const mealType = this.getMealType(nutrition, recipe.name);

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
          mealType: mealType
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
        const mealType = this.getMealType(nutrition, recipe.name);

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
          mealType: mealType
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
        include: [
          {
              model: Category,
              attributes: ["id", "name"],
              through: {
                  attributes: [],
              }
          },
      ],
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

        const mealType = this.getMealType(nutrition, recipe.name);
        
        return {
          id: recipe.id,
          name: recipe.name,
          nSteps: recipe.nSteps,
          cookTime: recipe.cookTime,
          nIngredients: recipe.nIngredients,
          categories: recipe.categories,
          ingredients: ingredientsArray,
          steps: stepsArray,
          servingSize: servingSize,
          nutrition: mealNutrientsInGrams,
          mealType: mealType
        };
      }

      return recipe;
    } catch (error) {
      throw error;
    }
  }

  private getMealType (nutrition: any, mealName: string): string {
    // If the meal name contains words specified in the list, return the meal type
    const mealNameList = ["ice cream", "cake", "cookie", "pie", "smoothie", "tart", "pudding", "muffin", "brownie", "fudge", "candy"];

    for (const name of mealNameList) {
      if (mealName.toLowerCase().includes(name)) {
        return "Side dish";
      }
    }

    // The criteria is based on the %DV of meal plan for 2000 kcal diet
    const criteria = {
        'calories': [200, 300],
        'totalFat': [10, 20],
        'sugar': [10, 20],
        'sodium': [10, 20],
        'protein': [5, 10],
        'saturatedFat': [10, 20],
        'carbohydrates': [15, 30]
    }
    let score: number = 0;

    // If the nutrient is less than the criteria, add 1 score
    if (nutrition.calories < criteria.calories[0]) {
        score += 1;
    }
    if (nutrition.totalFat < criteria.totalFat[0]) {
        score += 1;
    }
    if (nutrition.sugar < criteria.sugar[0]) {
        score += 1;
    }
    if (nutrition.sodium < criteria.sodium[0]) {
        score += 1;
    }
    if (nutrition.protein < criteria.protein[0]) {
        score += 1;
    }
    if (nutrition.saturatedFat < criteria.saturatedFat[0]) {
        score += 1;
    }
    if (nutrition.carbohydrates < criteria.carbohydrates[0]) {
        score += 1;
    }

    // If the nutrient is in the range of criteria, add 0.5 score
    if (nutrition.calories > criteria.calories[0] && nutrition.calories < criteria.calories[1]) {
        score += 0.5;
    }
    if (nutrition.totalFat > criteria.totalFat[0] && nutrition.totalFat < criteria.totalFat[1]) {
        score += 0.5;
    }
    if (nutrition.sugar > criteria.sugar[0] && nutrition.sugar < criteria.sugar[1]) {
        score += 0.5;
    }
    if (nutrition.sodium > criteria.sodium[0] && nutrition.sodium < criteria.sodium[1]) {
        score += 0.5;
    }
    if (nutrition.protein > criteria.protein[0] && nutrition.protein < criteria.protein[1]) {
        score += 0.5;
    }
    if (nutrition.saturatedFat > criteria.saturatedFat[0] && nutrition.saturatedFat < criteria.saturatedFat[1]) {
        score += 0.5;
    }
    if (nutrition.carbohydrates > criteria.carbohydrates[0] && nutrition.carbohydrates < criteria.carbohydrates[1]) {
        score += 0.5;
    }

    console.log("Score: ", score)
    // Check the score to determine the meal type
    // Max score is 7 | Min score is 0
    if (score >= 4) {
      return "Side dish";
    }

    return "Main course";
  }
  public async getRecipeByAvailableIngredients(availableIngredients: AvailableIngredient[], allergyList: Allergy[]) {
      try {
          // Get the list of allergy ingredients
          console.log(chalk.bgRedBright("Allergy List"));
          const allergyIngredientList = allergyList.map(allergy => {   
            console.log(chalk.red("Allergy Ingredient:", allergy.ingredient.name.split(",")[0]));
            return allergy.ingredient.name.split(",")[0];
          });

          // Using Set for unique ingredient names
          const availableIngredientNames = new Set(availableIngredients.map(element => element.ingredient.name.split(",")[0]));
          
          // Exclude the allergy ingredients from the available ingredients if the available ingredients contain the allergy ingredients
          for (const allergyIngredient of allergyIngredientList) {
            if (availableIngredientNames.has(allergyIngredient)) {
              console.log(chalk.red("Remove Allergy from Available list:", allergyIngredient));
              availableIngredientNames.delete(allergyIngredient);
              availableIngredientNames.forEach(ingredient => {
                console.log(chalk.green("Available Ingredient:", ingredient));
              })
            }
          }

          const ingredientsToSearch = [...availableIngredientNames];
          console.log(chalk.yellow("Ingredient to Search:", ingredientsToSearch));
          
          // Combination of ingredients
          const combinationIngredients = this.combinationIngredient.combinationIngredient(ingredientsToSearch);
          // console.log(chalk.bgGreenBright("Combination Ingredients"));
          // for (const ingre of combinationIngredients) {
          //     console.log(chalk.greenBright(ingre));
          // }
          // Assuming Recipe is your Sequelize model for the recipes table
          const categorizedResults: any = {};
          
          const listOfIngredients = combinationIngredients.map(ingredients => {
            return ingredients.split(",");
          })

          // Loop through each combination of ingredients
          for (let i = 0; i < listOfIngredients.length; i++) {
            const ingredientElement = listOfIngredients[i].map(ingredient => {
              return ingredient;
            })

            console.log(chalk.green("Ingredient Element:", ingredientElement));
            const whereConditions = {
                ingredients: {
                  // Get the recipes that contain all the ingredients
                  [sequelize.Op.and]: ingredientElement.map(ingredients => {
                      return {
                        [sequelize.Op.and]: ingredients.split(",").map(ingredient => {
                          return {
                            [sequelize.Op.like]: `%${ingredient.toLowerCase()}%`
                          }
                        })
                    }
                  }),
                  // Remove the recipes that contain the allergy ingredients
                  [sequelize.Op.not]: allergyIngredientList.map(allergyIngredient => {
                    return {
                      [sequelize.Op.like]: `%${allergyIngredient.toLowerCase()}%`
                    }
                  })
                }
              };
            // console.log("Where Conditions:", whereConditions);
            // ingredientElement.forEach((element, index) => {
            //   console.log(`Element ${index}:`, element);
            // });

            // const stemmer = natural.PorterStemmer;
          
            // Get the Recipe contains the ingredient
            // const availableIngredientList = availableIngredients.map(ingredient => {
            //   return ingredient.ingredient.name;
            // });

            // Check the similarity score between the ingredient and the recipe
            // const similarity = natural.JaroWinklerDistance('pork',"pork cured", {});

            const recipes = await Recipe.findAll({
                    attributes: ['id', 'name', 'ingredients'],
                    where: whereConditions,
                    limit: 3 // Limit to 3 recipes per combination
                  });
            categorizedResults[ingredientElement.join(",")] = recipes;
          }
          return categorizedResults; // Return the filtered recipes
      } catch (err) {
          throw err;
      }
  }

  public async getRecipeByCategory(category: string) {
    try {
      let recipe: any;
      let limit = 10;
      do {
          // Get random number from minId to maxId
          // Math.random() * (max - min) + min;
          const randomId = Math.floor(Math.random() * (this.recipeMaxId - this.recipeMinId + 1) + this.recipeMinId);
          console.log(chalk.green(randomId));
          recipe = await Recipe.findOne({
              attributes: ["id"],
              include: [
                  {
                      model: Category,
                      attributes: ["id", "name"],
                      through: {
                          attributes: [],
                      },
                      where: {
                          name: category
                      }
                  },
              ],
              where: {
                  id: randomId
              },
          });
      } while (!recipe && limit-- > 0);
      if (!recipe) {
        console.log("No recipe found");
        recipe = await Recipe.findOne({
          attributes: ["id"],
          include: [
              {
                  model: Category,
                  attributes: ["id", "name"],
                  through: {
                      attributes: [],
                  },
                  where: {
                      name: category
                  }
              },
          ],
          order: sequelize.literal("rand()"),
        });
      }
      
      return this.getRecipeById(recipe.id);

    } catch (error) {
      console.log(error);
      throw new HttpException(404, "Recipe not found");
    }
  }
  
}
