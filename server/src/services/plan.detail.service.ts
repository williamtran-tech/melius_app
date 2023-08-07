import { PlanDetail } from "../orm/models/plan.detail.model";
import { Recipe } from "../orm/models/recipe.model";
import HttpException from "../exceptions/HttpException";

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
                if (planDetail.recipes !== null) {
                    const ingre = planDetail.recipes.ingredients;
                    const stringIngre = ingre.replace(/'/g, '"');
                    const parsedIngre = JSON.parse(stringIngre);

                    const step = planDetail.recipes.steps;
                    const stringStep = step.replace(/'/g, '"');
                    const parsedStep = JSON.parse(stringStep);

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
            });
            return parsedPlanDetails;
        } catch (err) {
            console.log(err);
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
                        mealTime: new Date().setUTCHours(7, 30, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sBreakfast, eBreakfast],
                        mealPlanId: mealPlanId,
                    });
                    
                    const sLunch = Math.round(calories * 0.35);
                    const eLunch = Math.round(calories * 0.4);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(12, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sLunch, eLunch],
                        mealPlanId: mealPlanId,
                    });
                    
                    const sDinner = Math.round(calories * 0.25);
                    const eDinner = Math.round(calories * 0.35);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(18, 0, 0),
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
                        mealTime: new Date().setUTCHours(7, 30, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sBreakfast, eBreakfast],
                        mealPlanId: mealPlanId,
                    });
                    const sSnack = Math.round(calories * 0.05);
                    const eSnack = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(9, 0, 0),
                        session: "Morning",
                        type: "Side dish",
                        nutritionRange: [sSnack, eSnack],
                        mealPlanId: mealPlanId,
                    });
    
                    const sLunch = Math.round(calories * 0.35);
                    const eLunch = Math.round(calories * 0.4);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(12, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sLunch, eLunch],
                        mealPlanId: mealPlanId,
                    });
    
                    const sDinner = Math.round(calories * 0.25);
                    const eDinner = Math.round(calories * 0.3);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(18, 0, 0),
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
                        mealTime: new Date().setUTCHours(7, 30, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sBreakfast, eBreakfast],
                        mealPlanId: mealPlanId,
                    });
    
                    const sSnack1 = Math.round(calories * 0.05);
                    const eSnack1 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(9, 0, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sSnack1, eSnack1],
                        mealPlanId: mealPlanId,
                    });
    
                    const sLunch = Math.round(calories * 0.35);
                    const eLunch = Math.round(calories * 0.4);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(12, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sLunch, eLunch],
                        mealPlanId: mealPlanId,
                    });
    
                    const sSnack2 = Math.round(calories * 0.05);
                    const eSnack2 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(15, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sSnack2, eSnack2],
                        mealPlanId: mealPlanId,
                    });
    
                    const sDinner = Math.round(calories * 0.15);
                    const eDinner = Math.round(calories * 0.20);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(18, 0, 0),
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
                        mealTime: new Date().setUTCHours(7, 30, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sBreakfast, eBreakfast],
                        mealPlanId: mealPlanId,
                    });
    
                    const sSnack1 = Math.round(calories * 0.05);
                    const eSnack1 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(9, 0, 0),
                        session: "Morning",
                        type: "Main course",
                        nutritionRange: [sSnack1, eSnack1],
                        mealPlanId: mealPlanId,
                    });
    
                    const sLunch = Math.round(calories * 0.35);
                    const eLunch = Math.round(calories * 0.4);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(12, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sLunch, eLunch],
                        mealPlanId: mealPlanId,
                    });
    
                    const sSnack2 = Math.round(calories * 0.05);
                    const eSnack2 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(15, 0, 0),
                        session: "Noon",
                        type: "Main course",
                        nutritionRange: [sSnack2, eSnack2],
                        mealPlanId: mealPlanId,
                    });
    
                    const sDinner = Math.round(calories * 0.15);
                    const eDinner = Math.round(calories * 0.20);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(18, 0, 0),
                        session: "Evening",
                        type: "Main course",
                        nutritionRange: [sDinner, eDinner],
                        mealPlanId: mealPlanId,
                    });
                    const sSnack3 = Math.round(calories * 0.05);
                    const eSnack3 = Math.round(calories * 0.1);
                    mealPlanDetails.push({
                        mealTime: new Date().setUTCHours(20, 0, 0),
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

    // Edit Meal Details Functions:
    // CRUD for Meal Details
    public async updateMeal(mealDTO: any) {
        try {
            // Find the meal details
            const mealDetail = await PlanDetail.findOne({
                where: {
                    id: mealDTO.mealId,
                },
            });

            if (mealDetail) {
                let mealTime: any;
                let session: any;
                if (mealDTO.mealTime) {
                    // Get hour from meal time
                    let date = new Date(mealDTO.mealTime.split(" ")[0]);
                    let time = mealDTO.mealTime.split(" ")[1];
                    mealTime = date.setUTCHours(time.split(":")[0], time.split(":")[1]);
                    session = this.timeConverter(Number(time.split(":")[0]));
                }

                await mealDetail.update({
                    recipeId: mealDTO.recipeId ? mealDTO.recipeId : mealDetail.recipeId,
                    mealTime: mealDTO.mealTime ? mealTime : mealDetail.mealTime,
                    session: session ? session : mealDetail.session,
                    type: mealDTO.type ? mealDTO.type : mealDetail.type,
                });

                await mealDetail.save();
                return mealDetail;
            }
            return mealDetail;
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
                throw new HttpException(401, "Cannot undo delete meal because the new meal has its recipe");
            }
            return mealDetail;
        } catch (err) {
            throw err;
        }
    }
}
