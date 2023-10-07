import { Router } from "express";
import { User } from "../../orm/models/user.model";
import { Account } from "../../orm/models/account.model";
import { Role } from "../../orm/models/role.model";
import { Recipe } from "../../orm/models/recipe.model";
import express, { NextFunction } from "express";
import sequelize, { where } from "sequelize";
import chalk from "chalk";
import { Post } from "../../orm/models/post.model";
import { View } from "../../orm/models/view.model";
import { Comment } from "../../orm/models/comment.model";
import { React } from "../../orm/models/react.model";
import { TagPostRels } from "../../orm/models/tag.post.rel.model";
import { Tag } from "../../orm/models/tag.model";
import { Topic } from "../../orm/models/topic.model";
import { CommentReact } from "../../orm/models/comment.react.model";
import { Category } from "../../orm/models/category.model";
import RecipeService from "../../services/MealPlan/recipe.service";
import MealPlanService from "../../services/MealPlan/meal.plan.service";
export const databaseRouter = Router();
const recipeService = new RecipeService();
const mealPlanService = new MealPlanService();

databaseRouter.post("/create-models", async (req, res) => {
  try {
    // Add new record to table
    // const userRole = await Role.findOrCreate({
    //     where: {
    //         name: "Doctor",
    //     },
    //     defaults: {
    //         name: "Doctor",
    //     },
    // })

    // Alter tables
    // await User.sync({ alter: true }); => Alter table to match with model (add new column, remove column)
    // By default, the Index file will sync all models with database
    // await CommentReact.sync({ alter: true });
    // await Comment.sync({ alter: true });
    // await View.sync({ alter: true });
    // await React.sync({ alter: true });
    // await Post.sync({ alter: true });
    // await TagPostRels.sync({ alter: true });
    // await Topic.sync({ alter: true });
    // await Tag.sync({ alter: true });


    // if (userRole[1]) {
    //     console.log(chalk.green("Doctor Role created"));
    // }

    // const recipe = await recipeService.getRecipeByCategory(req.body.category);
    console.log(chalk.bgYellow("Generate suggested meals"));
    // Get random meals based on quantity of user input to the form 
    var TOTAL_CALORIES: number = 0,
    TOTAL_FAT: number = 0,
    TOTAL_SUGAR: number = 0,
    TOTAL_CARBS: number = 0,
    TOTAL_PROTEIN: number = 0,
    TOTAL_SATURATED_FAT: number = 0,
    TOTAL_SODIUM: number = 0;
    
    let suggestedMeals: any = [];

    enum MainCourseCategory {
      "Breakfast",
      "Lunch",
      "Dinner",
    }
    const MainCourseCategoryLength = Object.keys(MainCourseCategory).length / 2;
    
    for (let i = 0; i < MainCourseCategoryLength; i++) {
      let suggestedMeal: any;
      console.log(MainCourseCategory[i].toString());
      do {
        suggestedMeal = await recipeService.getRecipeByCategory(MainCourseCategory[i]);

      } while (suggestedMeal!.mealType == "Side dish");
      
      suggestedMeals.push(suggestedMeal);
    }

    suggestedMeals.map((meal: any) => {
      const {mealNutrientsInGrams, servingSize} = mealPlanService.convertPDVtoGram(meal.nutrition);
      // Convert the nutrition from PDV to gram 

      // Total nutrition of the meals per day
      TOTAL_CALORIES += mealNutrientsInGrams.calories;
      TOTAL_FAT += mealNutrientsInGrams.totalFat;
      TOTAL_SUGAR += mealNutrientsInGrams.sugar;
      TOTAL_CARBS += mealNutrientsInGrams.carbohydrates;
      TOTAL_PROTEIN += mealNutrientsInGrams.protein;
      TOTAL_SATURATED_FAT += mealNutrientsInGrams.saturatedFat;
      TOTAL_SODIUM += mealNutrientsInGrams.sodium;
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

    res.status(200).json({
        msg: "Models created",
        response: suggestedMeals,
        estimatedNutrition: estimatedNutrition,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});
