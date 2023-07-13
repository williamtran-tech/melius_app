import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";
import RecipeService from "../../services/recipe.service";
import USDAService from "../../services/usda.service";

// Recipes Describe Data of nutrition
// 'calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)']] = df[['calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)'

export default class RecipeController extends BaseController {
  constructor() {
    super();
  }
  public recipeService = new RecipeService();
  public USDAService = new USDAService();

  public getRecipes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const limit = req.query.limit ? req.query.limit : 10;
      console.log("Limit: ", limit);
      const recipes = await this.recipeService.getRecipes(Number(limit));
      console.log("AS", recipes);

      res.status(200).json({
        msg: "Successfully get recipes",
        recipes: recipes,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  };
}
