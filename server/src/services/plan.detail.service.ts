import { PlanDetail } from "../orm/models/plan.detail.model";
import { Recipe } from "../orm/models/recipe.model";

export default class PlanDetailService {
    public async getPlanDetails(mealPlanId: number) {
        try {
            const planDetails = await PlanDetail.findAll({
                where: {
                  mealPlanId: mealPlanId,
                },
                order: [["mealTime", "DESC"]],
                attributes: ["id", "mealTime", "session", "type", "nutritionRange", "updatedAt"],
                include: {
                    model: Recipe,
                    attributes: ["id", "name", "cookTime", "nSteps", "nIngredients", "ingredients", "steps", "nutrition"],
                }
            });

            const parsedPlanDetails = planDetails.map((planDetail: any) => {
                const ingre = planDetail.recipes.ingredients;
                const stringIngre = ingre.replace(/'/g, '"');
                const parsedIngre = JSON.parse(stringIngre);

                const step = planDetail.recipes.steps;
                const stringStep = step.replace(/'/g, '"');
                const parsedStep = JSON.parse(stringStep);
                console.log("Ingre: ", parsedStep);
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
                }
                return parsedPlanDetail;
            });
            return parsedPlanDetails;
        } catch (err) {
            throw err;
        }
    }

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
    public async generateMealPlanTemplate(numberOfMeals: number, calories: number, mealPlanId: number, isNew: boolean) {
        try {
            console.log("Generate Meal Plan Template");
            let sessionNutrientRange = {};
            let mealPlanDetails = [];
            switch(numberOfMeals) {
            case 3:
                {
                const sBreakfast = Math.round(calories * 0.3);
                const eBreakfast = Math.round(calories * 0.35);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(7, 30, 0),
                    session: "Morning",
                    type: "Main course",
                    nutritionRange: [sBreakfast, eBreakfast],
                    mealPlanId: mealPlanId,
                });
                
                const sLunch = Math.round(calories * 0.35);
                const eLunch = Math.round(calories * 0.4);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(12, 0, 0),
                    session: "Noon",
                    type: "Main course",
                    nutritionRange: [sLunch, eLunch],
                    mealPlanId: mealPlanId,
                });
                
                const sDinner = Math.round(calories * 0.25);
                const eDinner = Math.round(calories * 0.35);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(18, 0, 0),
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
                    mealTime: new Date().setHours(7, 30, 0),
                    session: "Morning",
                    type: "Main course",
                    nutritionRange: [sBreakfast, eBreakfast],
                    mealPlanId: mealPlanId,
                });
                const sSnack = Math.round(calories * 0.05);
                const eSnack = Math.round(calories * 0.1);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(9, 0, 0),
                    session: "Morning",
                    type: "Side dish",
                    nutritionRange: [sSnack, eSnack],
                    mealPlanId: mealPlanId,
                });

                const sLunch = Math.round(calories * 0.35);
                const eLunch = Math.round(calories * 0.4);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(12, 0, 0),
                    session: "Noon",
                    type: "Main course",
                    nutritionRange: [sLunch, eLunch],
                    mealPlanId: mealPlanId,
                });

                const sDinner = Math.round(calories * 0.25);
                const eDinner = Math.round(calories * 0.3);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(12, 0, 0),
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
                const sBreakfast = Math.round(calories * 0.25);
                const eBreakfast = Math.round(calories * 0.3);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(7, 30, 0),
                    session: "Morning",
                    type: "Main course",
                    nutritionRange: [sBreakfast, eBreakfast],
                    mealPlanId: mealPlanId,
                });

                const sSnack1 = Math.round(calories * 0.05);
                const eSnack1 = Math.round(calories * 0.1);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(9, 0, 0),
                    session: "Morning",
                    type: "Main course",
                    nutritionRange: [sSnack1, eSnack1],
                    mealPlanId: mealPlanId,
                });

                const sLunch = Math.round(calories * 0.35);
                const eLunch = Math.round(calories * 0.4);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(12, 0, 0),
                    session: "Noon",
                    type: "Main course",
                    nutritionRange: [sLunch, eLunch],
                    mealPlanId: mealPlanId,
                });

                const sSnack2 = Math.round(calories * 0.05);
                const eSnack2 = Math.round(calories * 0.1);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(15, 0, 0),
                    session: "Noon",
                    type: "Main course",
                    nutritionRange: [sSnack2, eSnack2],
                    mealPlanId: mealPlanId,
                });

                const sDinner = Math.round(calories * 0.15);
                const eDinner = Math.round(calories * 0.20);
                mealPlanDetails.push({
                    mealTime: new Date().setHours(18, 0, 0),
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
            if (isNew) {
                console.log("Meal Plan Details: ", mealPlanDetails);
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
    public async insertRecipesIntoPlanDetails(mealPlanId: number, recipes: number[]) {
        try {
           await PlanDetail.update(
                {
                    recipeId: recipes[0],
                },
                {
                    where: {
                        mealPlanId: mealPlanId,
                        session: "Morning",
                        type: "Main course",
                    },
                });

            await PlanDetail.update(
                {
                    recipeId: recipes[1],
                },
                {
                    where: {
                        mealPlanId: mealPlanId,
                        session: "Noon",
                        type: "Main course",
                    },
                });

            await PlanDetail.update(
                {
                    recipeId: recipes[2],
                },
                {
                    where: {
                        mealPlanId: mealPlanId,
                        session: "Evening",
                        type: "Main course",
                    },
                });

            return true;
        } catch (err) {
            throw err;
        }
    }
}
