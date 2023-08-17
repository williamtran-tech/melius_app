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

  public async addIngredientToAvailableList(availableIngredientDTO: any) {
    try {
      const [addedIngredient, result] = await AvailableIngredient.findOrCreate({
        where: {
          userId: availableIngredientDTO.userId,
          ingredientId: availableIngredientDTO.ingredientId,
        },
        defaults: {
          userId: availableIngredientDTO.userId,
          ingredientId: availableIngredientDTO.ingredientId,
          dueTime: availableIngredientDTO.dueTime,
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
          id: availableIngredientDTO.ingredientId,
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

  public async addIngredientsToAvailableList(availableIngredientDTO: any) {
    try {
      let ingredientIds = [];
      let ingredients = [];
      let duplicatedIngredientIds = [];
      let duplicatedIngredients = [];

      // Check if ingredient Id is valid
      for (let i = 0; i < availableIngredientDTO.ingredientIds.length; i++) {
        const ingredient = await Ingredient.findOne({
          where: {
            id: availableIngredientDTO.ingredientIds[i],
          },
        });

        if (!ingredient) {
          throw new HttpException(404, "Ingredient not found");
        }
      }

      // Check if any ingredient is already in available list
      const availableIngredients = await AvailableIngredient.findAll({
        where: {
          userId: availableIngredientDTO.userId,
        }
      });

      // Get each ingredient id and insert to available ingredient table
      for (let i = 0; i < availableIngredientDTO.ingredientIds.length; i++) {
        const [addedIngredient, result] = await AvailableIngredient.findOrCreate({
          where: {
            userId: availableIngredientDTO.userId,
            ingredientId: availableIngredientDTO.ingredientIds[i],
          },
          defaults: {
            userId: availableIngredientDTO.userId,
            ingredientId: availableIngredientDTO.ingredientIds[i],
            dueTime: availableIngredientDTO.dueTime,
          },
        });

        if (result === false) {
          duplicatedIngredientIds.push(availableIngredientDTO.ingredientIds[i]);
        } else {
          ingredientIds.push(addedIngredient.ingredientId);
        }
      }
      
      for (let i = 0; i < ingredientIds.length; i++) {
        let ingredient = await AvailableIngredient.findOne({
          where: {
            ingredientId: ingredientIds[i],
            userId: availableIngredientDTO.userId,
          },
        });

        ingredients.push(ingredient);
      }

      for (let i = 0; i < duplicatedIngredientIds.length; i++) {
        let ingredient = await AvailableIngredient.findOne({
          where: {
            ingredientId: duplicatedIngredientIds[i],
            userId: availableIngredientDTO.userId,
          },
        });

        duplicatedIngredients.push(ingredient);
      }
      
      return [ingredients, duplicatedIngredients];
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
