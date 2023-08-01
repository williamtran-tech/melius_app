import { Ingredient } from "../orm/models/ingredient.model";
import { AvailableIngredient } from "../orm/models/available.ingredient.model";
import { IngreCategory } from "../orm/models/ingre.category.model";
import HttpException from "../exceptions/HttpException";

export default class AvailableIngredientService {
  public async getAvailableIngredientList(parentId: number) {
    try {
      const availableIngredientList = await AvailableIngredient.findAll({
        where: { userId: parentId },
        attributes: ["id", "dueTime", "updatedAt"],
        include: [
          {
            model: Ingredient,
            attributes: ["id", "name"],
            include: [
              {
                model: IngreCategory,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });

      return availableIngredientList;
    } catch (err) {
      throw err;
    }
  }

  public async addIngredientToAvailableList(available_ingredientDTO: any) {
    try {
      const [addedIngredient, result] = await AvailableIngredient.findOrCreate({
        where: {
          userId: available_ingredientDTO.userId,
          ingredientId: available_ingredientDTO.ingredientId,
        },
        defaults: {
          userId: available_ingredientDTO.userId,
          ingredientId: available_ingredientDTO.ingredientId,
          dueTime: available_ingredientDTO.dueTime,
        },
      });
      if (result === false) {
        throw new HttpException(
          401,
          "Ingredient already added to available list"
        );
      }

      const ingredient = await Ingredient.findOne({
        where: {
          id: available_ingredientDTO.ingredientId,
        },
      });

      const responseData = {
        id: addedIngredient.id,
        ingredientId: ingredient?.id,
        ingredientName: ingredient?.name,
        dueTime: addedIngredient.dueTime,
      };
      return [responseData, result];
    } catch (err) {
      throw err;
    }
  }

  public async deleteAvailableIngredient(availableIngredientId: number, userId: number) {
    try {
        const availableIngredient = await AvailableIngredient.findOne({
            where: {
                id: availableIngredientId,
                userId: userId
            }
        });

        if (!availableIngredient) {
            throw new HttpException(404, "Available ingredient not found");
        }

        await availableIngredient.destroy();

        return availableIngredient;
    } catch (err) {
        throw err;
    }
  }

  public async undoDeleteAvailableIngredients(availableIngredientId: number, userId: number) {
    try {
        const availableIngredients = await AvailableIngredient.findOne({
            where: {
                id: availableIngredientId,
                userId: userId,
            },
            paranoid: false
        });

        if (!availableIngredients) {
            throw new HttpException(404, "Available ingredients not found");
        }

        await availableIngredients.restore();

        return availableIngredients;
    } catch (err) {
        throw err;
    }
  }
}
