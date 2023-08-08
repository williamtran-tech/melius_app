import { User } from "../orm/models/user.model";
import { Account } from "../orm/models/account.model";
import { Health } from "../orm/models/health.model";
import { Recipe } from "../orm/models/recipe.model";
import sequelize from "sequelize";

export default class RecipeService {
  constructor() {}
  public async getRecipes(limit: number) {
    try {
      const idErrorRecipe: number[] = [];
      const recipes = await Recipe.findAll({
        limit: limit,
        attributes: ["id", "name", "nSteps", "nIngredients", "ingredients", "steps"],
        order: sequelize.literal("rand()"),
      });

      const responseRecipes = recipes.map((recipe: any) => {
        const data = recipe.ingredients;
        const stringData = data.replace(/'/g, '"');
        let ingredientsArray: string[] = [];

        const step = recipe.steps;
        const stringStep = step.replace(/'/g, '"');
        let stepsArray: string[] = [];

        ingredientsArray = JSON.parse(stringData);
        stepsArray = JSON.parse(stringStep);

        return {
          id: recipe.id,
          name: recipe.name,
          nSteps: recipe.nSteps,
          nIngredients: recipe.nIngredients,
          ingredients: ingredientsArray,
          steps: stepsArray,
        };
      });
      return responseRecipes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async searchRecipes(name: string) {
    try {
      const recipes = await Recipe.findAll({
        where: {
          name: {
            [sequelize.Op.like]: `%${name}%`,
          },
        },
        attributes: ["id", "name", "nSteps", "nIngredients", "ingredients", "steps"],
        limit: 5,
      });

      const responseRecipes = recipes.map((recipe: any) => {
        const data = recipe.ingredients;
        const stringData = data.replace(/'/g, '"');
        let ingredientsArray: string[] = [];

        const step = recipe.steps;
        const stringStep = step.replace(/'/g, '"');
        let stepsArray: string[] = [];

        ingredientsArray = JSON.parse(stringData);
        stepsArray = JSON.parse(stringStep);

        return {
          id: recipe.id,
          name: recipe.name,
          nSteps: recipe.nSteps,
          nIngredients: recipe.nIngredients,
          ingredients: ingredientsArray,
          steps: stepsArray,
        };
      });

      return responseRecipes;
    } catch (error) {
      throw error;
    }
  }

  public async getRecipeById(id: number) {
    try {
      const recipe = await Recipe.findOne({
        where: { id: id },
        attributes: ["id", "name", "nSteps", "nIngredients", "ingredients", "steps"],
      });

      if (recipe) {
        const data = recipe.ingredients;
        const stringData = data.replace(/'/g, '"');
        let ingredientsArray: string[] = [];

        const step = recipe.steps;
        const stringStep = step.replace(/'/g, '"');
        let stepsArray: string[] = [];

        ingredientsArray = JSON.parse(stringData);
        stepsArray = JSON.parse(stringStep);

        return {
          id: recipe.id,
          name: recipe.name,
          nSteps: recipe.nSteps,
          nIngredients: recipe.nIngredients,
          ingredients: ingredientsArray,
          steps: stepsArray,
        };
      }

      return recipe;
    } catch (error) {
      throw error;
    }
  }
}
