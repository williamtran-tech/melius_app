import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";
import HttpException from "../exceptions/HttpException";
import { Ingredient } from "../orm/models/ingredient.model";
import { ingreCategory } from "../orm/models/ingre.category.model";
import USDAService from "./usda.service";
import { Allergy } from "../orm/models/allergy.model";
import { User } from "../orm/models/user.model";

export default class IngredientService {
  public USDAService = new USDAService();

  public async getFoodNutritionData(ingredientDTO: any) {
    try {
      const ingredient = await Ingredient.findOne({
        attributes: [
          "fdcId",
          "category.name" as "category",
          "name",
          "portionValue",
          "portionUnit",
          "nutrients",
        ],
        where: {
          name: ingredientDTO.ingredient,
        },
        include: ["category"],
      });

      if (!ingredient) {
        const ingredientNutrition = await this.USDAService.getFoodNutritionData(
          ingredientDTO
        );
        const categoryId = Number(ingredientNutrition.foodCode.toString()[0]);
        const [ingredient, result] = await Ingredient.findOrCreate({
          where: {
            name: ingredientNutrition.foods,
          },
          attributes: [
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

  public async addIngredientToAllergy(allergiesData: any) {
    try {
      console.log(allergiesData);
      const [addedIngredient, result] = await Allergy.findOrCreate({
        where: {
          kidId: allergiesData.kidId,
          ingredientId: allergiesData.ingredientId,
        },
        defaults: {
          kidId: allergiesData.kidId,
          ingredientId: allergiesData.ingredientId,
        },
      });

      const ingredient = await Ingredient.findOne({
        where: {
          id: allergiesData.ingredientId,
        },
      });
      const kid = await User.findOne({
        where: {
          id: allergiesData.kidId,
        },
      });

      const responseData = {
        id: addedIngredient.id,
        kidId: kid?.id,
        kidName: kid?.fullName,
        ingredientId: ingredient?.id,
        ingredientName: ingredient?.name,
      };
      return [responseData, result];
    } catch (err) {
      console.log(err);
      throw new HttpException(401, "Cannot add ingredient to allergy");
    }
  }
}
