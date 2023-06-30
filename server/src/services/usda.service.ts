import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";

export default class USDAService {
  public async getFoodNutritionData(ingredientDTO: any) {
    try {
      const params = {
        api_key: process.env.USDA_API,
        query: ingredientDTO.ingredient,
        dataType: ["Survey (FNDDS)"],
        pagesize: ingredientDTO.pagesize ? ingredientDTO.pagesize : 10,
      };

      const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${params.api_key}&query=${params.query}&dataType=${params.dataType}&pageSize=${params.pagesize}`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data.foods[0]);

      const responseData = {
        foods: data.foods[0].description,
        category: data.foods[0].foodCategory,
        foodNutrients: data.foods[0].foodNutrients,
      };

      return responseData;
    } catch (err) {
      throw err;
    }
  }
}
