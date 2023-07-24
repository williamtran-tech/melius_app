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

  public async createMealPlan(MealPlanDTO: any) {
    try {
      // Get the kid data
      // Get the TDEE and RDA of the kid 
      const kidId = Number(MealPlanDTO.kidId);
      const kidHealth = await this.healthService.getHealthRecord(kidId);
      const energy = Number(kidHealth.energy);
      const numberOfMeals = MealPlanDTO.nMeal ? MealPlanDTO.nMeal : 3;

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

      // Create the Meal Plan Details
      const sessionNutrientRange = await this.planDetailService.generateMealPlanTemplate(numberOfMeals, energy, mealPlan[0].id, true);

      return [mealPlan[0], sessionNutrientRange];
    } catch (err) {
      throw err;
    }
  }

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
      const nutrientsTarget = await this.getMealPlan(kidId);

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
      let next = false;
      let count = 0;
      let limit = 10;
      do {
        [suggestedMeals, estimatedNutrition] = await this.generateSuggestedMeal(nMeal, availableIngredients);
  
        // 1. The meal should match with the kid's allergies
        // A function to check the meal is match the constraints or not - Allergies, Nutrients Target, Available Ingredients
        const [flag, message] = this.checkMealConstraints(suggestedMeals, kidAllergies, nutrientsTarget, availableIngredients);
        next = flag;
        count++;
        console.log("Next: ", next);
        console.log("Count: ", count);
      } while (!next || count >= limit) 

      return [suggestedMeals, nutrientsTarget, estimatedNutrition];
    
      // Compare the nutrition of the meals and the kid's TDEE and RDA

      // If the nutrition of the meals is not enough, get another random meals

      // If the nutrition of the meals is enough, return the meals

      
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public async getMealPlan(kidId: number) {
    try {
      const mealPlan = await MealPlan.findOne({
        where: { kidId: kidId },
        attributes: ["id", "energyTarget", "proteinTarget", "fatTarget", "carbTarget", "updatedAt"],
        order: [["updatedAt", "DESC"]],
      });
      // This function should include the number of meals per day, the duration of the meal plan

      if (mealPlan === null) {
        throw new HttpException(404, "Meal plan not found - Create one if you haven't");
      }

      const planDetails = await this.planDetailService.getPlanDetails(mealPlan.id);

      return [mealPlan, planDetails];
    } catch (error) {
      throw error;
    } 
  }

  public async checkMealPlanExist(kidId: number) {
    try {
      const mealPlan = await MealPlan.findOne({
        where: { kidId: kidId },
        attributes: ["id"],
        order: [["updatedAt", "DESC"]],
      });

      return mealPlan;
    } catch (err) {
      throw err;
    }
  }

  public async updateMealPlan(kidId: number, isNew: boolean) {
    try {
      // Get updated [latest] health record 
      const kidHealth = await this.healthService.getHealthRecord(kidId);
      console.log("Is new", isNew)

      // Kid Meal plan ID has 2 cases occur: 
      // 1. The Kid Health is updated in the same day as the latest meal plan -> Update the meal plan
      // 2. The Kid Health is created in the day as the latest meal plan -> Create new meal plan -> Create new meal plan details

      // 1. Controller run update health first -> update meal Plan
      // 2. if Health updated Date is not the same as the latest meal plan -> create new meal plan -> create new meal plan details
      let currMealPlan = await MealPlan.findOne({
        where: { kidId: kidId },
        order: [["updatedAt", "DESC"]],
        attributes: ["id"],
      });
      let mealPlanId = currMealPlan!.id;

      // Get the meals number per day of the old meal plan
      const planDetails = await this.planDetailService.getPlanDetails(mealPlanId);
      const nMeals = planDetails.length;
      const energy = Number(kidHealth.energy);

      // Calculate the recommended nutrients intake of the kid
      const nutrientsTarget = this.calculateNutrients(energy!);
      let mealPlan: any;
     
      if (!isNew) {
        // Update the Meal Plan
        // Update will contain 2 values, the first value is the number of rows updated, the second value is the updated mealPlan object
        console.log("[MealPlan] Update Meal Plan");
        mealPlan = await MealPlan.update({
          energyTarget: energy,
          proteinTarget: nutrientsTarget.proteinTarget,
          fatTarget: nutrientsTarget.fatTarget,
          carbTarget: nutrientsTarget.carbTarget,
        }, {
          where: { kidId: kidId },
        });
        if (mealPlanId !== null) {
          // Update the meal plan details
          const updatedMealPlanDetails = await this.planDetailService.generateMealPlanTemplate(nMeals, energy, mealPlanId, false);
        }
      } else {
          // Create new Meal Plan
          mealPlan = await MealPlan.create({
            energyTarget: energy,
            proteinTarget: nutrientsTarget.proteinTarget,
            fatTarget: nutrientsTarget.fatTarget,
            carbTarget: nutrientsTarget.carbTarget,
            kidId: kidId,
          });
          // Get the latest meal plan details
          // Take the number of meal plan details

          console.log("New Meal Plan: ", mealPlan.id)
          // Create new meal plan details
          // Create the Meal Plan Details
          const sessionNutrientRange = await this.planDetailService.generateMealPlanTemplate(nMeals, energy, mealPlan.id, true);
      }
      return mealPlan;
    } catch (error) {
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
        res = await deletedMealPlan.destroy();
      }

      return res;
    } catch (error) {
      throw error;
    }
  }

  private async generateSuggestedMeal(nMeal: number, availableIngredients?: any) {
    // Get random meals based on quantity of user input to the form 
    var TOTAL_CALORIES: number = 0,
    TOTAL_FAT: number = 0,
    TOTAL_SUGAR: number = 0,
    TOTAL_CARBS: number = 0,
    TOTAL_PROTEIN: number = 0,
    TOTAL_SATURATED_FAT: number = 0,
    TOTAL_SODIUM: number = 0;

    let numberOfMeals = (availableIngredients.length === 0) ? nMeal : nMeal-1 ;

    // Available Array for checking
    const availableArray = availableIngredients.map((availableIngredient: any) => {
      // Get the first word of the ingredient name
      return availableIngredient.ingredient.name.split(",")[0].toLowerCase();
    });
    console.log("Available Array: ", availableArray);
    
    let suggestedMeals: any = [];
    let suggestedMeal = await Recipe.findAll({
      limit: numberOfMeals,
      order: Sequelize.literal("rand()"),
    });
    // push the suggested meals to the array
    for (let i = 0; i < suggestedMeal.length; i++) {
      suggestedMeals.push(suggestedMeal[i]);
    }

    if (numberOfMeals < nMeal) {
      // const randomMeal = await Recipe.findOne({
      //   limit: nMeal - numberOfMeals,
      //   where: literal(`JSON_SEARCH(ingredients, 'one', '${availableArray[0]}', null, '$[*]')`)
      // });
      let randomMeal = await Recipe.findOne({
        limit: nMeal - numberOfMeals,
        where: {
          ingredients: {
            [Op.like]: `%${availableArray[0]}%`
          },
        },
        order: Sequelize.literal("rand()"),
      });
      
      if (randomMeal) {
        suggestedMeals.push(randomMeal);
      } else {
        throw new HttpException(400, "No meals matched with the available ingredients");
      }

      for (let i = 0; i < suggestedMeals.length; i++) {
        console.log(`Meal ${i}: `, suggestedMeals[i].name);
      }
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
    return [responseMeals, estimatedNutrition];
  }

  // This function will check the constraints of the meal based on allergies, nutrients target, available ingredients of the kid
  private checkMealConstraints(meals: any, allergies: any, nutrientsTarget: any, availableIngredients: any): [boolean, string] {
    try {
      let flag = true;
      let msg = "Meals Matched";
      // Allergies Array for checking
      const allergiesArray = allergies.map((allergy: any) => {
          return allergy.ingredient.name.split(",")[0].toLowerCase();
      });

      const responseMeals = meals.map((meal: any, index: number) => {
        console.log("Allergies Array: ", allergiesArray);
        console.log("Meal Ingredients: ", meal.ingredients);
        
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
