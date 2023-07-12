import KidHealthDTO from "../DTOs/Kid/KidHealthData.DTO";
import HttpException from "../exceptions/HttpException";
import { Ingredient } from "../orm/models/ingredient.model";
import { IngreCategory } from "../orm/models/ingre.category.model";
import USDAService from "./usda.service";
import { Allergy } from "../orm/models/allergy.model";
import { User } from "../orm/models/user.model";
import { AvailableIngredient } from "../orm/models/available.ingredient.model";

export default class MealPlanService {
  public USDAService = new USDAService();

  public async createSuggestedMeals(MealPlanDTO: any) {
    try {
      return "Hello World!";
    } catch (err) {
      throw err;
    }
  }
}
