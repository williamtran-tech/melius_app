import { User } from "../orm/models/user.model";
import { Account } from "../orm/models/account.model";
import { Health } from "../orm/models/health.model";
import { Recipe } from "../orm/models/recipe.model";
import sequelize from "sequelize";

export default class RecipeService {
  constructor() {}
  public async getRecipes(limit: number) {
    try {
      console.log("Recipe Service");
      const idErrorRecipe: number[] = [];
      const recipes = await Recipe.findAll({
        limit: limit,
        attributes: ["id", "name", "nSteps", "nIngredients", "ingredients"],
        order: sequelize.literal("rand()"),
        // where: {
        //   id: 367233,
        // },
      });

      const responseRecipes = recipes.map((recipe: any) => {
        const data = recipe.ingredients;
        const stringData = data.replace(/'/g, '"');
        let ingredientsArray: string[] = [];
        try {
          ingredientsArray = JSON.parse(stringData);
        } catch (err) {
          console.log(err);
          idErrorRecipe.push(recipe.id);
        }
        if (ingredientsArray === null) {
        }
        return {
          name: recipe.name,
          nSteps: recipe.nSteps,
          nIngredients: recipe.nIngredients,
          ingredients: ingredientsArray,
        };
      });
      console.log(idErrorRecipe);
      for (let i = 0; i < idErrorRecipe.length; i++) {
        const idString = idErrorRecipe[i].toString();
        const invalidIngre = await Recipe.findOne({ where: { id: idString } });
        // console.log("Invalid: ", invalidIngre?.ingredients);
        // console.log(typeof invalidIngre?.ingredients);
        const convertString = JSON.stringify(invalidIngre?.ingredients);
        let parsedArray = convertString.replace("\\", "");
        console.log(parsedArray);
        // parsedArray = '"' + parsedArray.slice(1, -1) + '"';
        // console.log("Parsed: ", parsedArray);
        // parsedArray = parsedArray.replace(/\\|"(\|\")/g, "").replace(/"/g, "'");
        // parsedArray = '"' + parsedArray.slice(1, -1) + '"';
        // console.log("Parsed 1: ", parsedArray);
        // const parsedString = JSON.parse(parsedArray);
        // console.log("Converted: ", JSON.stringify(parsedString));
        // console.log("Updated: ", invalidIngre?.ingredients);
        // console.log("Array: ", JSON.parse(JSON.stringify(parsedString)));
        console.log("Array: ", JSON.parse(JSON.stringify(parsedArray)));
        // const array2string = JSON.stringify(
        //   JSON.parse(JSON.stringify(parsedString))
        // );
        // await Recipe.update(
        //   { ingredients: JSON.stringify(parsedArray) },
        //   { where: { id: idString } }
        // );
      }

      // console.log(recipes[0].name);
      // // Get the step string from the recipe;
      // const data = recipes[0].steps;
      // // Replace all single quotes with double quotes
      // const stringData = data.replace(/'/g, '"');
      // // Parse the string into an array
      // const stepsArray = JSON.parse(stringData);

      // stepsArray.forEach((step: any) => {
      //   console.log(step);
      // });
      return responseRecipes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
