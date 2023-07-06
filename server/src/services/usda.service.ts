import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";
import HttpException from "../exceptions/HttpException";
import { ingreCategory } from "../orm/models/ingre.category.model";
export default class USDAService {
  public async getFoodNutritionData(ingredientDTO: any) {
    try {
      console.log("ingredientDTO: ", ingredientDTO);
      const params = {
        api_key: process.env.USDA_API,
        query: ingredientDTO.ingredient,
        dataType: ["Survey (FNDDS)"],
        foodCategory: ingredientDTO.foodCategory
          ? ingredientDTO.foodCategory
          : "",
        pagesize: ingredientDTO.pagesize ? ingredientDTO.pagesize : 10,
      };

      const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${params.api_key}&foodCategory=${params.foodCategory}&query=${params.query}&dataType=${params.dataType}&pageSize=${params.pagesize}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.foods[0] === undefined) {
        throw new HttpException(404, "Ingredient not found");
      } else {
        console.log(data.foods[0]);
      }
      const categoryId = Number(data.foods[0].foodCode.toString()[0]);
      const category = await ingreCategory.findOne({
        where: {
          id: categoryId,
        },
        attributes: ["name"],
      });

      const responseData = {
        fdcId: data.foods[0].fdcId,
        foodCode: data.foods[0].foodCode,
        foods: data.foods[0].description,
        category: category!.name,
        foodPortions: {
          unitName: "G",
          value: 100,
        },
        foodNutrients: data.foods[0].foodNutrients,
        foodInput: data.foods[0].finalFoodInputFoods,
      };

      return responseData;
    } catch (err) {
      throw err;
    }
  }

  public async getFoodNutritionList(ingredientDTO: any) {
    try {
      console.log("ingredientDTO: ", ingredientDTO);
      const params = {
        api_key: process.env.USDA_API,
        query: ingredientDTO.ingredient,
        dataType: ["Survey (FNDDS)"],
        foodCategory: ingredientDTO.foodCategory
          ? ingredientDTO.foodCategory
          : "",
        pageSize: ingredientDTO.pageSize,
      };

      console.log("params: ", params);
      const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${params.api_key}&foodCategory=${params.foodCategory}&query=${params.query}&dataType=${params.dataType}&pageSize=${params.pageSize}`;

      const response = await fetch(url);
      const data = await response.json();

      // Throw error if ingredient not found
      if (data.foods[0] === undefined) {
        throw new HttpException(404, "Ingredient not found");
      }

      const ingredientList = [];
      for (let i = 0; i < data.foods.length; i++) {
        const categoryId = Number(data.foods[i].foodCode.toString()[0]);
        const category = await ingreCategory.findOne({
          where: {
            id: categoryId,
          },
          attributes: ["name"],
        });
        const ingredient = {
          fdcId: data.foods[i].fdcId,
          foodCode: data.foods[i].foodCode,
          foods: data.foods[i].description,
          category: category!.name,
          foodPortions: {
            unitName: "G",
            value: 100,
          },
          foodNutrients: data.foods[i].foodNutrients,
          foodInput: data.foods[i].finalFoodInputFoods,
        };
        ingredientList.push(ingredient);
      }
      return ingredientList;
    } catch (error) {
      throw new HttpException(404, "Ingredient not found");
    }
  }
}