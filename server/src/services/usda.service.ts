import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";
import HttpException from "../exceptions/HttpException";
import { IngreCategory } from "../orm/models/ingre.category.model";
export default class USDAService {
  public async getFoodNutritionData(ingredientDTO: any) {
    try {
      const params = {
        api_key: process.env.USDA_API,
        dataType: ["Foundation"],
      };

      const url = `https://api.nal.usda.gov/fdc/v1/food/${ingredientDTO.fdcId}?api_key=${params.api_key}`;
      const response = await fetch(url);
      console.log(url)
      const data = await response.json();
    
      if (data === undefined) {
        throw new HttpException(404, "Ingredient not found");
      }

      const categoryName = data.foodCategory.description;
      console.log("categoryName: ", categoryName)
      const category = await IngreCategory.findOne({
        where: {
          name: categoryName,
        },
        attributes: ["id"],
      });

      // Clean the Nutrient data
      const cleanNutrientData = data.foodNutrients.map((nutrientItem: any) => {
        const nutrientData = nutrientItem.nutrient;
        return {
          name: nutrientData.name,
          unitName: nutrientData.unitName,
          amount: nutrientItem.amount,
        }
      });
      
      const ingredient = {
        fdcId: ingredientDTO.fdcId,
        foods: data.description,
        category: {
          name: categoryName,
          id: category!.id,
        },
        foodPortions: {
          unitName: "G",
          value: 100,
        },
        foodNutrients: cleanNutrientData,
      };

      return ingredient;
    } catch (err) {
      throw err;
    }
  }

  public async getFoodNutritionList(ingredientDTO: any) {
    try {
      const params = {
        api_key: process.env.USDA_API,
        query: ingredientDTO.ingredient,
        dataType: "Foundation",
        foodCategory: ingredientDTO.foodCategory
          ? ingredientDTO.foodCategory
          : "",
        pageSize: ingredientDTO.pageSize,
      };

      const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${params.api_key}&query=${params.query}&dataType=${params.dataType}&pageSize=${params.pageSize}`;
      // https://api.nal.usda.gov/fdc/v1/foods/search?api_key={API_KEY}&query=sweet%20potato&dataType=Foundation&pageSize=3
      const response = await fetch(url);
      const data = await response.json();

      // Throw error if ingredient not found
      if (data.foods[0] === undefined) {
        throw new HttpException(404, "Ingredient not found");
      }

      const ingredientList = [];
      for (let i = 0; i < data.foods.length; i++) {
        // Error here
        const categoryName = data.foods[i].foodCategory;
        const category = await IngreCategory.findOne({
          where: {
            name: categoryName,
          },
          attributes: ["id", "name"],
        });
        const ingredient = {
          fdcId: data.foods[i].fdcId,
          foodCode: data.foods[i].foodCode,
          foods: data.foods[i].description,
          category: category!.name,
          categoryId: category!.id,
          foodPortions: {
            unitName: "G",
            value: 100,
          },
          foodNutrients: data.foods[i].foodNutrients,
        };
        ingredientList.push(ingredient);
      }
      return ingredientList;
    } catch (error) {
      console.log(error);
      throw new HttpException(404, "Ingredient not found");
    }
  }
}
