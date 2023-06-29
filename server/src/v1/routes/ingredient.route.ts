import IngredientController from "../../controllers/Ingredient/ingredient.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import Router from "express";
const ingredientController = new IngredientController();

export const ingredientRouter = Router();

// Search ingredient
ingredientRouter.get(
  "/search",
  authMiddleware,
  ingredientController.getIngredientNutrition
);
