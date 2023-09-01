import HttpException from "../exceptions/HttpException";
import { Ingredient } from "../orm/models/ingredient.model";
import USDAService from "./usda.service";
import { Allergy } from "../orm/models/allergy.model";
import { AvailableIngredient } from "../orm/models/available.ingredient.model";
import { Recipe } from "../orm/models/recipe.model";
import { Sequelize } from "sequelize-typescript";
import { MealPlan } from "../orm/models/meal.plan.model";
import HealthService from "./health.service";
import PlanDetailService from "./plan.detail.service";
import { Op, literal } from "sequelize";
import MealPlanDTO from "../DTOs/MealPlan/MealPlan.DTO";
import MealPlanData from "../interfaces/MealPlan/MealPlanData.interface";
import chalk from "chalk";

// Recipes Describe Data of nutrition
// 'calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)']] = df[['calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)'

export default class MealPlanService {
  public USDAService = new USDAService();
  public healthService = new HealthService();
  private planDetailService = new PlanDetailService();

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
    const proteinTarget = calories * 50 / this.CALORIES_BASE;

    // Calculate fat target
    const fatTarget = calories * 78 / this.CALORIES_BASE;

    // Calculate carb target
    const carbTarget = calories * 275 / this.CALORIES_BASE;

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

  // This function will create the Meal Plan and Meal Plan Template (Meal Plan Details) without the suggested meals
  // Return: 
  // 1. Meal Plan Object
  // 2. Meal Plan Details Object (Nutrients Range)
  public async createMealPlan(MealPlanDTO: MealPlanDTO) {
    try {
      // Get the kid data
      // Get the TDEE and RDA of the kid 
      const kidId = Number(MealPlanDTO.kidId);
      const kidHealth = await this.healthService.getHealthRecord(kidId);
      const energy = Number(kidHealth.energy);
      const numberOfMeals = MealPlanDTO.nMeal ? MealPlanDTO.nMeal : 3;

      // Calculate the recommended nutrients intake of the kid
      const nutrientsTarget = this.calculateNutrients(energy!);

      // Check current date with the date of the meal plan
      if (MealPlanDTO.date instanceof Date && !isNaN(MealPlanDTO.date.getTime())) {
        if (MealPlanDTO.date.getDate() < new Date().getDate() && MealPlanDTO.date.getMonth() <= new Date().getMonth() && MealPlanDTO.date.getFullYear() <= new Date().getFullYear()) {
            throw new HttpException(400, "Invalid Date");
        }
      }

      // Check if the plan details of the kid is already created or not
      const [mealPlanDetailsExists, mealPlanId] = await this.planDetailService.getPlanDetailsByDate(MealPlanDTO.date, kidId);
      if (mealPlanDetailsExists) {
        throw new HttpException(400, "Meal plan details already exists");
      }

      // Create the meal plan
      const mealPlan = await MealPlan.create({
        energyTarget: energy,
        proteinTarget: nutrientsTarget.proteinTarget,
        fatTarget: nutrientsTarget.fatTarget,
        carbTarget: nutrientsTarget.carbTarget,
        kidId: kidId,
      });

      // Create the Meal Plan Details
      const sessionNutrientRange = await this.planDetailService.generateMealPlanTemplate(numberOfMeals, energy, mealPlan.id, true, MealPlanDTO.date);

      return [mealPlan, sessionNutrientRange];
    } catch (err) {
      throw err;
    }
  }

  // This function will create the suggested meals based on the constraints of the kid
  // Return:
  // 1. Suggested Meals
  // 2. Estimated Nutrition of the meals
  public async createSuggestedMeals(MealPlanDTO: any) {
    try {
      const { kidId, nMeal, duration } = MealPlanDTO;
      
      // Gather constraints of the meal plan
      // Validation: 
      // 1. The meal should match with the kid's allergies
      // 2. The meal should match with the kid's TDEE and protein, fat, carb target
      // 3. The meal should match with the kid's available ingredients

      // Get the allergies of the kid
      const kidAllergies = await Allergy.findAll({
        where: { kidId: kidId },
        attributes: ["id", "updatedAt"],
        include: {
          model: Ingredient,
          attributes: ["name"],
        },
      });

      // Get nutrients target of the kid
      const nutrientsTarget = await this.getMealPlan(kidId, MealPlanDTO.date);

      // Get the available ingredients of the mother
      const availableIngredients = await AvailableIngredient.findAll({
        where: { userId: MealPlanDTO.userId },
        attributes: ["id", "updatedAt"],
        include: {
          model: Ingredient,
          attributes: ["name", "nutrients", "portionValue", "portionUnit"],
        },
      });

      let suggestedMeals: any;
      let estimatedNutrition: any;
      let res = false;
      let count = 0;
      let limit = 10;
      do {
        [suggestedMeals, estimatedNutrition] = await this.generateSuggestedMeal(nMeal, availableIngredients);
  
        // 1. The meal should match with the kid's allergies
        // A function to check the meal is match the constraints or not - Allergies, Nutrients Target, Available Ingredients
        const [flag, message] = this.checkMealConstraints(suggestedMeals, kidAllergies, nutrientsTarget, availableIngredients);
        res = flag;
        count++;
        console.log(chalk.blue("Next: ", res));
        console.log(chalk.blue("Count: ", count));
      } while (!res || count >= limit) 

      return [suggestedMeals, nutrientsTarget, estimatedNutrition];
    
      // Compare the nutrition of the meals and the kid's TDEE and RDA

      // If the nutrition of the meals is not enough, get another random meals

      // If the nutrition of the meals is enough, return the meals

      
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async getMealPlan(kidId: number, date?: Date) {
    try {
      // Meal Plan can be null in 2 cases: 
      // 1. The kid has not created any meal plan yet
      // 2. The kid has not create any meal plan in the given date
      // Set wrapped Date like this b/c the set hours method returns a number
      const sDate: Date = (date instanceof Date && !isNaN(date.getTime())) ? new Date(new Date(date).setUTCHours(0,0,0)) : new Date(new Date().setUTCHours(0,0,0,0));
      // Check if meal plan Details exists or not
      const [mealPlanDetailsExists, mealPlanId] = await this.planDetailService.getPlanDetailsByDate(sDate, kidId);
      console.log("Meal Plan Id:", mealPlanId);
      if (mealPlanDetailsExists === false) {
        throw new HttpException(404, "Meal plan details not found - Create one if you haven't");
      }
      
      const mealPlan = await MealPlan.findOne({
        where: { 
          id: mealPlanId,
        },
        attributes: ["id", "energyTarget", "proteinTarget", "fatTarget", "carbTarget", "updatedAt"],
        order: [["updatedAt", "DESC"]],
      });
      const [planDetails, estimatedNutrition] = await this.planDetailService.getPlanDetails(mealPlan!.id, sDate);

      return [mealPlan, planDetails, estimatedNutrition];
    } catch (error) {
      throw error;
    } 
  }

  public async getMealPlanInfo(kidId: number, date: Date) {
    try {
      // Check if meal plan Details exists or not
      const [mealPlanDetailsExists, mealPlanId] = await this.planDetailService.getPlanDetailsByDate(date, kidId);
      if (mealPlanDetailsExists === false) {
        throw new HttpException(404, "Meal plan details not found - Create one if you haven't");
      }

      const mealPlan = await MealPlan.findOne({
        where: { id: mealPlanId },
        attributes: ["id", "energyTarget", "proteinTarget", "fatTarget", "carbTarget", "updatedAt"],
        order: [["updatedAt", "DESC"]],
      });

      return mealPlan;
    } catch (error) {
      throw error;
    }
  }

  // Check if the kid has any meal plan in the future
  public async checkMealPlanExist(kidId: number): Promise<[boolean, object]> {
    try {
      // Check if meal plan Details exists or not
      const [mealPlanDetailsExists, mealPlanData] = await this.planDetailService.getPlanDetailsInFuture(kidId);

      return [mealPlanDetailsExists, mealPlanData];
    } catch (err) {
      throw err;
    }
  }

  public async updateMealPlan(energy: number, mealPlanData: MealPlanData) {
    try {
      // Get updated [latest] health record 

      // Kid Meal plan ID has 2 cases occur: 
      // 1. The Kid Health is updated in the same day as the latest meal plan -> Update the meal plan
      // 2. The Kid Health is created in the same day as the latest meal plan -> Create new meal plan -> Create new meal plan details

      // 1. Controller run update health first -> update meal Plan
      // 2. if Health updated Date is not the same as the latest meal plan -> create new meal plan -> create new meal plan details
      // Calculate the recommended nutrients intake of the kid
      const nutrientsTarget = this.calculateNutrients(energy);
      let mealPlan: any;

      const mealPlanIds: number[] = Object.keys(mealPlanData).map(Number);
      console.log("Meal Plan Ids:", mealPlanIds);
      let planDetailIds: number[] = [];
      for (const mealPlanId of mealPlanIds) {
        const planDetails = mealPlanData[mealPlanId];
        planDetailIds.push(...planDetails);
      }
      console.log("Plan Detail Ids:", planDetailIds);
      let nMeals;

      // PlanDetails.length: reference to the number of meals per day of the old meal plan || 3 for default (new meal plan)
      // Access IDs inside each key
      for (const mealPlanId of mealPlanIds) {
        console.log(chalk.blue("Meal Plan Id:", mealPlanId));
        // isNew is true if the health has a new record
        nMeals = mealPlanData[mealPlanId].length ? mealPlanData[mealPlanId].length : 3;

        // Update the Meal Plan
        // Update will contain 2 values, the first value is the number of rows updated, the second value is the updated mealPlan object
        console.log(chalk.blue("[MealPlan] Update Meal Plan", mealPlanId));
        mealPlan = await MealPlan.update({
          energyTarget: energy,
          proteinTarget: nutrientsTarget.proteinTarget,
          fatTarget: nutrientsTarget.fatTarget,
          carbTarget: nutrientsTarget.carbTarget,
        }, 
        {
          where: { 
            id: mealPlanId,
          },
        });
        
        // Update the meal plan details
        await this.planDetailService.generateMealPlanTemplate(nMeals, energy, mealPlanId, false);
        
      }
      return mealPlan;
    } catch (error) {
      console.log(chalk.red(error));
      throw error;
    }
  }

  public async deleteMealPlan(kidId: number) {
    try {
      // Delete the latest meal plan of the kid
      const deletedMealPlan = await MealPlan.findOne({
        where: { kidId: kidId},
        order: [["updatedAt", "DESC"]],
      })
      
      let res;
      if (deletedMealPlan) {
        // Delete the meal plan details
        await this.planDetailService.deletePlanDetails(deletedMealPlan!.id);
        // Delete the meal plan
        res = await deletedMealPlan.destroy();
      }

      return res;
    } catch (error) {
      throw error;
    }
  }

  public async undoDeleteMealPlan(kidId: number, mealPlanId: number) {
    try {
      // Undo delete the Meal Plan with the given id
      const mealPlan = await MealPlan.findOne({
        where: { id: mealPlanId, kidId: kidId },
        paranoid: false,
      });

      console.log("Meal Plan: ", mealPlan);

      if (mealPlan) {
        const res = await mealPlan.restore();
        // Undo delete the meal plan details
        await this.planDetailService.undoDeletePlanDetails(mealPlanId);
        return res;
      } 
      throw new HttpException(404, "Meal Plan not found");
    } catch (err) {
      throw err;
    }
  }

  private async generateSuggestedMeal(nMeal: number, availableIngredients?: any) {
    console.log(chalk.bgYellow("Generate suggested meals"));
    // Get random meals based on quantity of user input to the form 
    var TOTAL_CALORIES: number = 0,
    TOTAL_FAT: number = 0,
    TOTAL_SUGAR: number = 0,
    TOTAL_CARBS: number = 0,
    TOTAL_PROTEIN: number = 0,
    TOTAL_SATURATED_FAT: number = 0,
    TOTAL_SODIUM: number = 0;

    // This is for filtering the available ingredients
    let numberOfMeals = (availableIngredients.length === 0) ? nMeal : nMeal-1 ;

    // Available Array for checking
    const availableArray = availableIngredients.map((availableIngredient: any) => {
      // Get the first word of the ingredient name
      return availableIngredient.ingredient.name.split(",")[0].toLowerCase();
    });
    console.log(chalk.yellow("Available Array: ", availableArray));
    
    let suggestedMeals: any = [];
    let suggestedMeal = await Recipe.findAll({
      // limit: numberOfMeals,
      limit: nMeal,
      order: Sequelize.literal("rand()"),
    });
    // push the suggested meals to the array
    for (let i = 0; i < suggestedMeal.length; i++) {
      suggestedMeals.push(suggestedMeal[i]);
    }

    // Find meal contains the available ingredients
    if (numberOfMeals < nMeal) {
      // const randomMeal = await Recipe.findOne({
      //   limit: nMeal - numberOfMeals,
      //   where: literal(`JSON_SEARCH(ingredients, 'one', '${availableArray[0]}', null, '$[*]')`)
      // });
      
      // FILTER BY AVAILABLE INGREDIENTS
      // let randomMeal = await Recipe.findOne({
      //   limit: nMeal - numberOfMeals,
      //   where: {
      //     ingredients: {
      //       [Op.like]: `%${availableArray[0]}%`
      //     },
      //   },
      //   order: Sequelize.literal("rand()"),
      // });
      
      // if (randomMeal) {
      //   suggestedMeals.push(randomMeal);
      // } else {
      //   throw new HttpException(400, "No meals matched with the available ingredients");
      // }
    }

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

      // For TESTING PURPOSES
      // Insert RECIPE ID to the MEAL PLAN DETAILS - Default is 3 meals per day

      return {
        id: meal.id,
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
    return [responseMeals, estimatedNutrition];
  }

  // Check the constraints of the meal based on allergies, nutrients target, available ingredients of the kid
  private checkMealConstraints(meals: any, allergies: any, nutrientsTarget: any, availableIngredients: any): [boolean, string] {
    try {
      let flag = true;
      let msg = "Meals Matched";
      // Allergies Array for checking
      const allergiesArray = allergies.map((allergy: any) => {
          return allergy.ingredient.name.split(",")[0].toLowerCase();
      });

      console.log(chalk.blue("Allergies Array: ", allergiesArray));
      const responseMeals = meals.map((meal: any, index: number) => {
        // console.log("Meal Ingredients: ", meal.ingredients);
        
        // Check if the meal contains any ingredients that the kid is allergic to
        const containsAllergies = meal.ingredients.some((ingredient: string) => 
          allergiesArray.some((allergy: string) => ingredient.toLowerCase().includes(allergy))
        );
  
        if (containsAllergies) {
          flag = false;
          msg = "Meals contain allergic ingredients";
        }

        // Check the meals nutrients target

        });
      return [flag, msg];
    } catch (error) {
      throw error;
    }
  }
}
