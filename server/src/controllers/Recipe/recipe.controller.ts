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
      const recipes = await this.recipeService.getRecipes(Number(limit));

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
  
  // Search meal by name
  public searchRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Query: ", req.query);
      const name: string = req.query.name ? req.query.name.toString() : "";
      const recipes = await this.recipeService.searchRecipes(name);
      res.status(200).json({
        msg: "Successfully get recipes",
        recipes: recipes,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get meal by Id
  public searchRecipeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.query.id;
      const recipe = await this.recipeService.getRecipeById(Number(id));
      res.status(200).json({
        msg: "Successfully get recipe",
        recipe: recipe,
      });
    } catch (err) {
      next(err);
    }
  }
}
