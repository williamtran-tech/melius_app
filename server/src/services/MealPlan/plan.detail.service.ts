import { PlanDetail } from "../../orm/models/plan.detail.model";
import { Recipe } from "../../orm/models/recipe.model";
import HttpException from "../../exceptions/HttpException";
import RecipeService from "./recipe.service";
import { Op } from "sequelize";
import dateTimeUtil from "../../utils/dateTime";
import { MealPlan } from "../../orm/models/meal.plan.model";
import MealPlanData from "../../interfaces/MealPlan/MealPlanData.interface";
import chalk from "chalk";

export default class PlanDetailService {
    public recipeService = new RecipeService();
    public dateTimeUtil = new dateTimeUtil();

    public async getPlanDetailsByDate(date: Date, kidId: number) {
        try {
            const thisDate = new Date(date);
            const begin = thisDate.setUTCHours(0, 0, 0);
            const end = thisDate.setUTCHours(23, 59, 59);
            const planDetails = await PlanDetail.findAll({
                where: {
                    mealTime: {
                        [Op.between]:[begin, end]
                    },
                },
                include: {
                    model: MealPlan,
                    where: {
                        kidId: kidId,
                    }
                },
                attributes: ["mealPlanId"]
            });

            if (planDetails.length > 0) {
                return [true, planDetails[0].mealPlanId];
            }
            return [false, null];
        } catch (err) {
            throw err;
        }
    }

    // Get Plan Details in the future from current date
    // Return [result, mealPlanData] -> MealPlanData is a Record of Meal Plan Id and Plan Detail Ids
    public async getPlanDetailsInFuture(kidId: number): Promise<[boolean, object]> {
        try {
            const thisDate = new Date();
            const begin = thisDate.setUTCHours(0, 0, 0);
            const end = thisDate.setFullYear(thisDate.getFullYear() + 1);
            const planDetails = await PlanDetail.findAll({
                where: {
                    mealTime: {
                        [Op.between]:[begin, end]
                    },
                },
                include: {
                    model: MealPlan,
                    where: {
                        kidId: kidId,
                    }
                },
                attributes: ["id","mealPlanId"]
            });
            // Create a Record to store Meal Plan Id and Plan Detail Ids
            const mealPlanData: MealPlanData = {};

            for (const planDetail of planDetails) {
                const mealPlanId = planDetail.mealPlanId;
            
                if (!mealPlanData[mealPlanId]) {
                    mealPlanData[mealPlanId] = [];
                }
            
                // Check if the planDetail's ID is not already in the array
                if (!mealPlanData[mealPlanId].includes(planDetail.id)) {
                    mealPlanData[mealPlanId].push(planDetail.id);
                }
            }

            if (planDetails.length > 0) {
                return [true, mealPlanData];
            }
            return [false, {}];
        } catch (err) {
            throw err;
        }
    }
    public async getPlanDetails(mealPlanId: number, date?: Date) {
        try {
            // Check the date value is valid 
            const endDate = (date instanceof Date && !isNaN(date.getTime())) ? date?.setUTCHours(23, 59, 59) : new Date().setUTCHours(23, 59, 59);
            // Reset the date to 00:00:00
            date?.setUTCHours(0, 0, 0);
            const planDetails = await PlanDetail.findAll({
                where: {
                  mealPlanId: mealPlanId,
                  mealTime: (date instanceof Date && !isNaN(date.getTime())) ? {[Op.between]:[date, endDate]} : {[Op.between]:[new Date().setUTCHours(0, 0, 0), endDate]},
                },
                order: [["mealTime", "DESC"]],
                attributes: ["id", "mealTime", "session", "type", "nutritionRange", "updatedAt"],
                include: {
                    model: Recipe,
                    attributes: ["id", "name", "cookTime", "nSteps", "nIngredients", "ingredients", "steps", "nutrition"],
                }
            });

            let calories = 0;
            let fat = 0;
            let carbohydrates = 0;
            let protein = 0;
            
            const parsedPlanDetails = planDetails.map((planDetail: any) => {
                if (planDetail.recipes !== null) {
                    const ingre = planDetail.recipes.ingredients;
                    const stringIngre = ingre.replace(/'/g, '"');
                    const parsedIngre = JSON.parse(stringIngre);

                    const step = planDetail.recipes.steps;
                    const stringStep = step.replace(/'/g, '"');
                    const parsedStep = JSON.parse(stringStep);

                    const nutritionData = planDetail.recipes.nutrition.replace(/'/g, '"');
                    let nutritionArray: number[] = [];
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
                    const nutritionInGrams = this.recipeService.convertPDVToGrams(nutrition);

                    const parsedPlanDetail = {
                        id: planDetail.id,
                        mealTime: planDetail.mealTime,
                        session: planDetail.session,
                        type: planDetail.type,
                        nutritionRange: planDetail.nutritionRange,
                        recipe: {
                            id: planDetail.recipes.id,
                            name: planDetail.recipes.name,
                            cookTime: planDetail.recipes.cookTime,
                            nSteps: planDetail.recipes.nSteps,
                            nIngredients: planDetail.recipes.nIngredients,
                            ingredients: parsedIngre,
                            steps: parsedStep,
                        },
                        nutrition: {
                            'calories': nutritionInGrams.mealNutrientsInGrams["calories"],
                            'totalFat': nutritionInGrams.mealNutrientsInGrams["totalFat"],
                            'sugar': nutritionInGrams.mealNutrientsInGrams["sugar"],
                            'sodium': nutritionInGrams.mealNutrientsInGrams["sodium"],
                            'protein': nutritionInGrams.mealNutrientsInGrams["protein"],
                            'saturatedFat': nutritionInGrams.mealNutrientsInGrams["saturatedFat"],
                            'carbohydrates': nutritionInGrams.mealNutrientsInGrams["carbohydrates"]
                        },
                        servingSize: nutritionInGrams.servingSize,
                    }
                    calories += nutritionInGrams.mealNutrientsInGrams["calories"];
                    fat += nutritionInGrams.mealNutrientsInGrams["totalFat"];
                    carbohydrates += nutritionInGrams.mealNutrientsInGrams["carbohydrates"];
                    protein += nutritionInGrams.mealNutrientsInGrams["protein"];

                    return parsedPlanDetail;
                } else {
                    const parsedPlanDetail = {
                        id: planDetail.id,
                        mealTime: planDetail.mealTime,
                        session: planDetail.session,
                        type: planDetail.type,
                        nutritionRange: planDetail.nutritionRange,
                        recipe: null,
                    }
                    return parsedPlanDetail;
                }
            }) as any;
            const estimatedNutrition = {
                'calories': Math.round(calories),
                'fat': Math.round(fat),
                'carbohydrates': Math.round(carbohydrates),
                'protein': Math.round(protein),
            }

            return [parsedPlanDetails, estimatedNutrition];
        } catch (err) {
            throw err;
        }
    }

    public async getPlanDetailsByMealTime(mealTime: Date) {
        try {
            const session = this.timeConverter(mealTime.getUTCHours());
            const oldMeal = await PlanDetail.findOne({
                where: {
                    session: session,
                },
                order: [["updatedAt", "DESC"]],
            });

            return oldMeal;
        } catch (err) {
            throw err;
        }
    }

    public async getUnfilledPlanDetails(mealPlanId: number, mealTime: number) {
        try {
            const session = this.timeConverter(mealTime);
            const planDetails = await PlanDetail.findOne({
                where: {
                    mealPlanId: mealPlanId,
                    session: session,
                    recipeId: null,
                },
                attributes: ["id", "mealTime", "session", "type", "nutritionRange", "updatedAt"],
            });
            return planDetails;
        } catch (err) {
            throw err;
        }
    }

    // Create Plan Details Template
    private async createPlanDetails(planDetails: any) {
        try {
            const createdPlanDetails = await PlanDetail.bulkCreate(planDetails);
            return createdPlanDetails;
        } catch (err) {
            throw err;
        }
    }

    public async updatePlanDetails(planId: number, mealPlanDetails: any) {
        try {
            let res = true;
            switch (mealPlanDetails.length) {
                case 3:
                    {
                        const updatedBreakfast = await PlanDetail.update({
                            nutritionRange: mealPlanDetails[0].nutritionRange,
                            },  
                            { 
                            where: {
                                    mealPlanId: planId,
                                    session: "Morning",
                                },
                            }
                        );
                        const updatedLunch = await PlanDetail.update(
                            {
                                nutritionRange: mealPlanDetails[1].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Noon",
                                },
                            }
                        );
                        const updatedDinner = await PlanDetail.update(
                            {
                                nutritionRange: mealPlanDetails[2].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Evening",
                                },
                            }
                        );
                        if (updatedBreakfast[0] === 0 || updatedLunch[0] === 0 || updatedDinner[0] === 0) {
                            res = false;
                        }
                        break;
                    }
                case 4:
                    {
                        const updatedBreakfast = await PlanDetail.update({
                            nutritionRange: mealPlanDetails[0].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Morning",
                                },
                            }
                        );
                        const updatedSnack = await PlanDetail.update(
                            {
                                nutritionRange: mealPlanDetails[1].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Morning",
                                    type: "Side dish",
                                },
                            }
                        );
                        const updatedLunch = await PlanDetail.update(
                            {
                                nutritionRange: mealPlanDetails[2].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Noon",
                                },
                            }
                        );
                        const updatedDinner = await PlanDetail.update(
                            {
                                nutritionRange: mealPlanDetails[3].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Evening",
                                },
                            }
                        );
                        if (updatedBreakfast[0] === 0 || updatedSnack[0] === 0 || updatedLunch[0] === 0 || updatedDinner[0] === 0) {
                            res = false;
                        }
                        break;
                    }
                case 5: 
                    {
                        const updatedBreakfast = await PlanDetail.update({
                            nutritionRange: mealPlanDetails[0].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Morning",
                                },
                            }
                        );
                        const updatedSnack1 = await PlanDetail.update(
                            {
                                nutritionRange: mealPlanDetails[1].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Morning",
                                    type: "Side dish",
                                },
                            }
                        );
                        const updatedLunch = await PlanDetail.update(
                            {
                                nutritionRange: mealPlanDetails[2].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Noon",
                                },
                            }
                        );
                        const updatedSnack2 = await PlanDetail.update(
                            {
                                nutritionRange: mealPlanDetails[3].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Noon",
                                    type: "Side dish",
                                },
                            }
                        );
                        const updatedDinner = await PlanDetail.update(
                            {
                                nutritionRange: mealPlanDetails[4].nutritionRange,
                            },
                            {
                                where: {
                                    mealPlanId: planId,
                                    session: "Evening",
                                },
                            }
                        );
                        if (updatedBreakfast[0] === 0 || updatedSnack1[0] === 0 || updatedSnack2[0] === 0 || updatedLunch[0] === 0 || updatedDinner[0] === 0) {
                            res = false;
                        }
                        break;
                    }
            }
            return res
        } catch (err) {
            throw err;
        }
    }

    public async deletePlanDetails(planId: number) {
        try {
            const deletedPlanDetails = await PlanDetail.destroy({
                where: {
                    mealPlanId: planId,
                },
            });
            return deletedPlanDetails;
        } catch (err) {
            throw err;
        }
    }

    public async undoDeletePlanDetails(planId: number) {
        try {
            const deletedPlanDetails = await PlanDetail.findAll({
                where: {
                    mealPlanId: planId,
                },
                paranoid: false,
            });

            // Map each deleted plan detail to restore
            deletedPlanDetails.map(async (planDetail: any) => {
                await planDetail.restore();
            });
            return deletedPlanDetails;
        } catch (err) {
            throw err;
        }
    }

    // Template of Daily Meal Plan
    // 3 Main Meals per day
    // Breakfast: 
    // - 1 group of (Milk, yogurts): Milk and Milk Products - Sugars, Sweets, and Beverages (Corresponding to the USDA Food Patterns Subgroups 1, 9)
    // - 1 group of (Grains, Carbs): Eggs, Dry beans, Nuts, Seeds - Grain Products (Corresponding to the USDA Food Patterns Subgroups 3, 4, 5)
    // - 1 group of (Fruits): Fruits (Corresponding to the USDA Food Patterns Subgroups 6)

    // Lunch:
    // - 1 group of Proteins: Meat, Poultry, Fish and Mixtures - Eggs (Corresponding to the USDA Food Patterns Subgroups 2, 3)
    // - 1 group of (Grains, Carbs): Eggs - Grain Products (Corresponding to the USDA Food Patterns Subgroups 5)
    // - 1 group of (Vegetables): Vegetables (Corresponding to the USDA Food Patterns Subgroups 7, 8)
    // - 1 group of Fruits: Fruits (Corresponding to the USDA Food Patterns Subgroups 6)

    // Dinner:
    // - 1 group of Proteins: Meat, Poultry, Fish and Mixtures - Eggs (Corresponding to the USDA Food Patterns Subgroups 2, 3)
    // - 1 group of (Grains, Carbs): Grain Products (Corresponding to the USDA Food Patterns Subgroups 5)
    // - 1 group of (Vegetables): Vegetables (Corresponding to the USDA Food Patterns Subgroups 7, 8)
    // - 1 group of Fruits: Fruits (Corresponding to the USDA Food Patterns Subgroups 6)

    // MEAL PLAN TEMPLATE
    // 3 Meals per day
    // - Breakfast: 30 - 35% of daily calories
    // - Lunch: 35 - 40% of daily calories
    // - Dinner: 25 - 35% of daily calories

    // 4 Meals per day
    // - 25-30% of daily calories for breakfast
    // - 5-10% of daily calories for morning snack
    // - 35-40% of daily calories for lunch
    // - 25-30% of daily calories for dinner

    // 5 Meals per day
    // - 25-30% of daily calories for breakfast
    // - 5-10% of daily calories for morning snack
    // - 35-40% of daily calories for lunch
    // - 5-10% of daily calories for an afternoon snack
    // - 15-20% of daily calories for dinner  
    public async generateMealPlanTemplate(numberOfMeals: number, calories: number, mealPlanId: number, isNew: boolean, date?: Date) {
        try {
            console.log(chalk.bgYellow("Generate Meal Plan Template"));
            let sessionNutrientRange = {};
            let mealPlanDetails = [];
            switch(numberOfMeals) {
                case 3:
                    {
                    const sBreakfast = Math.round(calories * 0.3);
                    const eBreakfast = Math.round(calories * 0.35);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(7, 30, 0) : new Date().setUTCHours(7, 30, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sBreakfast, eBreakfast],
                        mealPlanId: mealPlanId,
                    });
                    
                    const sLunch = Math.round(calories * 0.35);
                    const eLunch = Math.round(calories * 0.4);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(12, 0, 0) : new Date().setUTCHours(12, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sLunch, eLunch],
                        mealPlanId: mealPlanId,
                    });
                    
                    const sDinner = Math.round(calories * 0.25);
                    const eDinner = Math.round(calories * 0.35);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(18, 0, 0) : new Date().setUTCHours(18, 0, 0),
                        session: "Evening",
                        type: "Main course",
                        nutritionRange: [sDinner, eDinner],
                        mealPlanId: mealPlanId,
                    });
                    
                    sessionNutrientRange = {
                        breakfastRange: [sBreakfast, eBreakfast],
                        lunchRange: [sLunch, eLunch],
                        dinnerRange: [sDinner, eDinner],
                    }
                    
                    break;
                    }
                case 4:
                    {
                    const sBreakfast = Math.round(calories * 0.25);
                    const eBreakfast = Math.round(calories * 0.3);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(7, 30, 0) : new Date().setUTCHours(7, 30, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sBreakfast, eBreakfast],
                        mealPlanId: mealPlanId,
                    });
                    const sSnack = Math.round(calories * 0.05);
                    const eSnack = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(9, 0, 0) : new Date().setUTCHours(9, 0, 0),
                        session: "Morning",
                        type: "Side dish",
                        nutritionRange: [sSnack, eSnack],
                        mealPlanId: mealPlanId,
                    });
    
                    const sLunch = Math.round(calories * 0.35);
                    const eLunch = Math.round(calories * 0.4);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(12, 0, 0) : new Date().setUTCHours(12, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sLunch, eLunch],
                        mealPlanId: mealPlanId,
                    });
    
                    const sDinner = Math.round(calories * 0.25);
                    const eDinner = Math.round(calories * 0.3);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(18, 0, 0) : new Date().setUTCHours(18, 0, 0),
                        session: "Evening",
                        type: "Main course",
                        nutritionRange: [sLunch, eLunch],
                        mealPlanId: mealPlanId,
                    });
        
                    sessionNutrientRange = {
                        breakfastRange: [sBreakfast, eBreakfast],
                        snackRange: [sSnack, eSnack],
                        lunchRange: [sLunch, eLunch],
                        dinnerRange: [sDinner, eDinner],
                    }
                    break;
                    }
                case 5:
                    {
                    const sBreakfast = Math.round(calories * 0.25);
                    const eBreakfast = Math.round(calories * 0.3);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(7, 30, 0) : new Date().setUTCHours(7, 30, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sBreakfast, eBreakfast],
                        mealPlanId: mealPlanId,
                    });
    
                    const sSnack1 = Math.round(calories * 0.05);
                    const eSnack1 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(9, 0, 0) : new Date().setUTCHours(9, 0, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sSnack1, eSnack1],
                        mealPlanId: mealPlanId,
                    });
    
                    const sLunch = Math.round(calories * 0.35);
                    const eLunch = Math.round(calories * 0.4);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(12, 0, 0) : new Date().setUTCHours(12, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sLunch, eLunch],
                        mealPlanId: mealPlanId,
                    });
    
                    const sSnack2 = Math.round(calories * 0.05);
                    const eSnack2 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(15, 0, 0) : new Date().setUTCHours(15, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sSnack2, eSnack2],
                        mealPlanId: mealPlanId,
                    });
    
                    const sDinner = Math.round(calories * 0.15);
                    const eDinner = Math.round(calories * 0.20);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(18, 0, 0) : new Date().setUTCHours(18, 0, 0),
                        session: "Evening",
                        type: "Main course",
                        nutritionRange: [sDinner, eDinner],
                        mealPlanId: mealPlanId,
                    });
        
                    sessionNutrientRange = {
                    breakfastRange: [sBreakfast, eBreakfast],
                    snack1Range: [sSnack1, eSnack1],
                    lunchRange: [sLunch, eLunch],
                    dinnerRange: [sDinner, eDinner],
                    snack2Range: [sSnack2, eSnack2],
                    }
                    }
                case 6: 
                    {
                    const sBreakfast = Math.round(calories * 0.25);
                    const eBreakfast = Math.round(calories * 0.3);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(7, 30, 0) : new Date().setUTCHours(7, 30, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sBreakfast, eBreakfast],
                        mealPlanId: mealPlanId,
                    });
    
                    const sSnack1 = Math.round(calories * 0.05);
                    const eSnack1 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(9, 0, 0) : new Date().setUTCHours(9, 0, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sSnack1, eSnack1],
                        mealPlanId: mealPlanId,
                    });
    
                    const sLunch = Math.round(calories * 0.35);
                    const eLunch = Math.round(calories * 0.4);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(12, 0, 0) : new Date().setUTCHours(12, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sLunch, eLunch],
                        mealPlanId: mealPlanId,
                    });
    
                    const sSnack2 = Math.round(calories * 0.05);
                    const eSnack2 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(15, 0, 0) : new Date().setUTCHours(15, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sSnack2, eSnack2],
                        mealPlanId: mealPlanId,
                    });
    
                    const sDinner = Math.round(calories * 0.15);
                    const eDinner = Math.round(calories * 0.20);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(18, 0, 0) : new Date().setUTCHours(18, 0, 0),
                        session: "Evening",
                        type: "Main course",
                        nutritionRange: [sDinner, eDinner],
                        mealPlanId: mealPlanId,
                    });
                    const sSnack3 = Math.round(calories * 0.05);
                    const eSnack3 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: date ? date.setUTCHours(20, 0, 0) : new Date().setUTCHours(20, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sSnack3, eSnack3],
                        mealPlanId: mealPlanId,
                    });
    
                    sessionNutrientRange = {
                    breakfastRange: [sBreakfast, eBreakfast],
                    snack1Range: [sSnack1, eSnack1],
                    lunchRange: [sLunch, eLunch],
                    snack2Range: [sSnack2, eSnack2],
                    dinnerRange: [sDinner, eDinner],
                    snack3Range: [sSnack3, eSnack3],
                    }
                    }
                }
            if (isNew) {
                await this.createPlanDetails(mealPlanDetails);
            } else {
                await this.updatePlanDetails(mealPlanId, mealPlanDetails);
            }
            return sessionNutrientRange;
        } catch (err) {
            throw err;
        }
    }

    // Insert Recipes into Plan Details
    public async insertRecipesIntoPlanDetails(mealPlanId: number, recipes: number[], date?: Date) {
        try {
            console.log(chalk.bgYellow("Insert Recipes into Plan Details"));
            // Setup 
            const begin = date ? date.setUTCHours(0, 0, 0) : new Date().setUTCHours(0, 0, 0);
            const end = date ? date.setUTCHours(23, 59, 59) : new Date().setUTCHours(23, 59, 59);
            const meals = await PlanDetail.findAll({
                where: {
                    mealPlanId: mealPlanId,
                    mealTime: {
                        [Op.between]:[begin, end]
                    }
                    // It must have a date constraint here
                },
                order: [["mealTime", "DESC"]],
            });
            
            // Maximum 6 meals per day
            const mealObj: any = {
                morning: [],
                snack1: [],
                noon: [],
                snack2: [],
                evening: [],
                snack3: [],
            }
            // Getting meal type and session
            meals.map((meal) => {
                if (meal.type === "Main course") {
                    if (meal.session === "Morning") {
                        mealObj.morning.push(meal);
                    } else if (meal.session === "Noon") {
                        mealObj.noon.push(meal);
                    } else {
                        mealObj.evening.push(meal);
                    }
                } else if (meal.type === "Side dish") {
                    if (meal.session === "Morning") {
                        mealObj.snack1.push(meal);
                    } else if (meal.session === "Noon") {
                        mealObj.snack2.push(meal);
                    } else {
                        mealObj.snack3.push(meal);
                    }
                }
            });

            // This filter is to remove empty meals
            const nonEmptyMeals = Object.keys(mealObj).filter((meal) => {
                return mealObj[meal].length > 0;
            });

            // Assert Plan Details
            nonEmptyMeals.map(async (meal, index) => {
                console.log(chalk.yellow("Meal: ", recipes[index]));
                await PlanDetail.update({
                    recipeId: recipes[index],
                },
                {
                    where: {
                        mealPlanId: mealPlanId,
                        session: mealObj[meal][0].session,
                        type: mealObj[meal][0].type,
                    },
                });
            });

            return true;
        } catch (err) {
            throw err;
        }
    }

    // Edit Meal Details Functions:
    // CRUD for Meal Details
    public async addMeal(mealDTO: any) {
        try {
            const session = this.timeConverter(mealDTO.mealTime.getUTCHours());

            // Check if meal exceeds the limit of 2 meals per session
            const mealCount = await PlanDetail.count({
                where: {
                    mealPlanId: mealDTO.mealPlanId,
                    session: session,
                },
            });

            if (mealCount >= 2) {
                throw new HttpException(406, "Cannot add meal because the session has 2 meals");
            }
            const addMeal = await PlanDetail.create({
                mealTime: mealDTO.mealTime,
                session: session,
                type: mealDTO.type,
                nutritionRange: mealDTO.nutritionRange,
                mealPlanId: mealDTO.mealPlanId,
                recipeId: mealDTO.recipeId,
            });

            return addMeal;
        } catch (err) {
            throw err;
        }
    }

    public async updateMeal(mealDTO: any) {
        try {
            const session = this.timeConverter(mealDTO.mealTime.getUTCHours());

            // Find the meal details
            const mealDetail = await PlanDetail.findOne({
                where: {
                    id: mealDTO.mealId,
                },
            });

            // Auto change the main course of the Meal Plan
            if (mealDTO.type === "Main course") {
                // Find the Main course of that Meal Plan session
                const mainCourse = await PlanDetail.findOne({
                    where: {
                        mealPlanId: mealDTO.mealPlanId,
                        session: session,
                        type: "Main course",
                    },
                });

                // Update new recipe to the Main course
                mainCourse?.update({
                    recipeId: mealDTO.recipeId,
                });

                await mainCourse?.save();
                return mainCourse;
            }

            if (mealDetail) {
                let mealTime: any;
                let session: any;
                
                if (mealDTO.mealTime) {
                    // Get hour from meal time
                    const hour = mealDTO.mealTime.getUTCHours();
                    session = this.timeConverter(hour);
                }

                // Get meal Nutrition Range
                const mealNutritionRange = await this.recipeService.getRecipeById(mealDTO.recipeId);
                await mealDetail.update({
                    recipeId: mealDTO.recipeId ? mealDTO.recipeId : mealDetail.recipeId,
                    mealTime: mealDTO.mealTime ? mealDTO.mealTime : mealDetail.mealTime,
                    session: session ? session : mealDetail.session,
                    type: mealDTO.type ? mealDTO.mealType : mealDetail.type,
                    nutritionRange: [mealNutritionRange?.nutrition.calories, mealNutritionRange?.nutrition.calories],
                });

                await mealDetail.save();
                return mealDetail;
                
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // Transform time from date to session (Morning, Noon, Evening)
    private timeConverter(time: number) {
        const hour = time;
        if (hour >= 7 && hour < 12) {
            return "Morning";
        } else if (hour >= 12 && hour < 18) {
            return "Noon";
        } else {
            return "Evening";
        }
    }

    // Delete Recipes from Plan Details
    public async deleteMeal(mealId: number) {
        try {
            // Find the meal details
            const mealDetail = await PlanDetail.findOne({
                where: {
                    id: mealId,
                },
            });

            if (mealDetail) {
                // Create a new meal detail with the same attributes
                await PlanDetail.create({
                    mealTime: mealDetail?.mealTime,
                    session: mealDetail?.session,
                    type: mealDetail?.type,
                    nutritionRange: mealDetail?.nutritionRange,
                    mealPlanId: mealDetail?.mealPlanId,
                    recipeId: null,
                });

                // Delete the old meal details
                await mealDetail?.destroy();
                return mealDetail;
            } 

            return mealDetail;
        } catch (err) {
            throw err;
        }
    }

    // Undo delete Recipes from Plan Details
    public async undoDeleteMeal(mealId: number) {
        try {
            // Find the meal details
            const mealDetail = await PlanDetail.findOne({
                where: {
                    id: mealId,
                },
                paranoid: false,
            });

            if (mealDetail) {
                // Delete the duplicate meal detail
                const dupMeal = await PlanDetail.findOne({
                    where: {
                        mealTime: mealDetail.mealTime,
                        session: mealDetail.session,
                        type: mealDetail.type,
                        recipeId: null,
                    }
                });
                if (dupMeal) {
                    await dupMeal?.destroy({
                        force: true,
                    });

                    await mealDetail.restore();
                    return mealDetail;
                }
                throw new HttpException(406, "Cannot undo delete meal because the new meal has its recipe");
            }
            return mealDetail;
        } catch (err) {
            throw err;
        }
    }

    // Helper functions
    public checkMealSession(oldMealSession: string, newMealTime: number): boolean {
        let newSession = this.timeConverter(newMealTime);
        console.log("New Session: ", newSession);
        if (oldMealSession === newSession) {
            return true;
        }
        return false;
    }
}
