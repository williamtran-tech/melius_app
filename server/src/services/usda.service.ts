import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";
import HttpException from "../exceptions/HttpException";
export default class USDAService {
  public async getFoodNutritionData(ingredientDTO: any) {
    try {
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

      const responseData = {
        fdcId: data.foods[0].fdcId,
        foodCode: data.foods[0].foodCode,
        foods: data.foods[0].description,
        category: data.foods[0].foodCategory,
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
}
