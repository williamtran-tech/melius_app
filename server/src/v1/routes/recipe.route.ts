import { Router } from "express";
import RecipeController from "../../controllers/Recipe/recipe.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";

export const recipeRouter = Router();
const recipeController = new RecipeController();

recipeRouter.get("/", authMiddleware, recipeController.getRecipes);
recipeRouter.get("/recipes-details", authMiddleware, recipeController.searchRecipes);

// Need to change this route uri
recipeRouter.get("/recipes", authMiddleware, recipeController.searchRecipeById)

// Fetch Recipe from Food.com
recipeRouter.get("/fetch-recipes", authMiddleware, recipeController.fetchRecipes);