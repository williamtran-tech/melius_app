import express from "express";
import { BaseController } from "../abstractions/base.controller";
import USDAService from "../../services/usda.service";
export default class IngredientController extends BaseController {
  constructor() {
    super();
  }

  public USDAService = new USDAService();

  public getIngredientNutrition = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log("getIngredientNutrition");

      const ingredientData = {
        ingredient: req.query.ingredient,
        pagesize: req.query.pagesize ? req.query.pagesize : 10,
      };

      const ingredientNutrition = await this.USDAService.getFoodNutritionData(
        ingredientData
      );

      res.status(200).json({
        msg: "Get ingredient nutrition successfully",
        ingredientNutrition: ingredientNutrition,
      });
    } catch (err) {
      next(err);
    }
  };
}
