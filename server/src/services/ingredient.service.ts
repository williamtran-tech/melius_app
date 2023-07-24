import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";
import HttpException from "../exceptions/HttpException";
import { Ingredient } from "../orm/models/ingredient.model";
import { IngreCategory } from "../orm/models/ingre.category.model";
import USDAService from "./usda.service";
import { Allergy } from "../orm/models/allergy.model";
import { User } from "../orm/models/user.model";
import { AvailableIngredient } from "../orm/models/available.ingredient.model";

export default class IngredientService {
  public USDAService = new USDAService();

  public async getFoodNutritionData(ingredientDTO: any) {
    try {
      const ingredient = await Ingredient.findOne({
        attributes: [
          "id",
          "fdcId",
          "category.name" as "category",
          "name",
          "portionValue",
          "portionUnit",
          "nutrients",
        ],
        where: {
          fdcId: ingredientDTO.fdcId,
        },
        include: ["category"],
      });

      if (!ingredient) {
        console.log("Supdude: ", ingredientDTO);
        const ingredientNutrition = await this.USDAService.getFoodNutritionData(
          ingredientDTO
        );
        const categoryId = Number(ingredientNutrition.foodCode.toString()[0]);
        const [ingredient, result] = await Ingredient.findOrCreate({
          where: {
            name: ingredientNutrition.foods,
          },
          attributes: [
            "id",
            "fdcId",
            "category.name" as "category",
            "name",
            "portionValue",
            "portionUnit",
            "nutrients",
          ],
          include: ["category"],
          defaults: {
            name: ingredientNutrition.foods,
            fdcId: ingredientNutrition.fdcId,
            categoryId: categoryId,
            portionValue: ingredientNutrition.foodPortions.value,
            portionUnit: ingredientNutrition.foodPortions.unitName,
            // remove the backslash from the string
            nutrients: JSON.stringify(ingredientNutrition.foodNutrients),
          },
        });

        let responseData = {};
        if (result === false) {
          responseData = {
            fdcId: ingredient?.fdcId,
            name: ingredient?.name,
            category: ingredient?.category.name,
            foodPortions: {
              unitName: ingredient?.portionUnit,
              value: ingredient?.portionValue,
            },
            foodNutrients: JSON.parse(ingredient?.nutrients!),
          };
        } else {
          responseData = {
            id: ingredient?.id,
            fdcId: ingredientNutrition.fdcId,
            name: ingredientNutrition.foods,
            category: ingredientNutrition.category,
            foodPortions: {
              unitName: ingredientNutrition.foodPortions.unitName,
              value: ingredientNutrition.foodPortions.value,
            },
            foodNutrients: ingredientNutrition.foodNutrients,
          };
        }

        return responseData;
      } else {
        const responseData = {
          id: ingredient.id,
          fdcId: ingredient.fdcId,
          name: ingredient.name,
          category: ingredient!.name,
          foodPortions: {
            unitName: ingredient.portionUnit,
            value: ingredient.portionValue,
          },
          foodNutrients: JSON.parse(ingredient.nutrients),
        };
        return responseData;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(404, "Cannot get ingredient nutrition data");
    }
  }

  public async getIngredientList(ingredientDTO: any) {
    try {
      const ingredients = await this.USDAService.getFoodNutritionList(
        ingredientDTO
      );
      return ingredients;
    } catch (err) {
      console.log(err);
      throw new HttpException(404, "Cannot get ingredient list");
    }
  }
}
