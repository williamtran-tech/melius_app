import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";
import HttpException from "../exceptions/HttpException";
import { Ingredient } from "../orm/models/ingredient.model";
import { ingreCategory } from "../orm/models/ingre.category.model";
import USDAService from "./usda.service";

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
        // Get the first digit of the foodCode to get the category ID
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
            nutrients: JSON.stringify(
              ingredientNutrition.foodNutrients
            ).replace(/\\/g, ""),
          },
        });

        console.log(" Result: ", result);
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
          const category = await ingreCategory.findOne({
            where: {
              id: ingredient.categoryId,
            },
            attributes: ["name"],
          });
          responseData = {
            fdcId: ingredientNutrition.fdcId,
            name: ingredientNutrition.foods,
            category: category!.name,
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
}
