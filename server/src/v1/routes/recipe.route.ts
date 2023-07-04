import { Router } from "express";
import RecipeController from "../../controllers/Recipe/recipe.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";

export const recipeRouter = Router();
const recipeController = new RecipeController();

recipeRouter.get("/", authMiddleware, recipeController.getRecipes);
