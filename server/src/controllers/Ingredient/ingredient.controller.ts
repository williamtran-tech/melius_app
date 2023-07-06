import express from "express";
import { BaseController } from "../abstractions/base.controller";
import USDAService from "../../services/usda.service";
import HttpException from "../../exceptions/HttpException";
import IngredientService from "../../services/ingredient.service";
export default class IngredientController extends BaseController {
  constructor() {
    super();
  }

  public ingredientService = new IngredientService();

  public getIngredientNutrition = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const ingredientData = {
        foodCategory: req.query.foodCategory,
        ingredient: req.query.ingredient,
        pagesize: req.query.pagesize ? req.query.pagesize : 10,
      };

      const ingredientNutrition =
        await this.ingredientService.getFoodNutritionData(ingredientData);

      res.status(200).json({
        msg: "Get ingredient nutrition successfully",
        ingredientNutrition: ingredientNutrition,
      });
    } catch (err) {
      next(err);
    }
  };

  public getIngredientList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const ingredientData = {
        foodCategory: req.query.foodCategory,
        ingredient: req.query.ingredient,
        pageSize: req.query.pageSize ? req.query.pageSize : 10,
      };

      console.log(ingredientData);

      const ingredientsList = await this.ingredientService.getIngredientList(
        ingredientData
      );
      res.status(200).json({
        msg: "Get ingredients list successfully",
        ingredientsList: ingredientsList,
      });
    } catch (err) {
      next(err);
    }
  };
}
