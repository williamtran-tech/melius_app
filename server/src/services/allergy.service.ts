import { Allergy } from "../orm/models/allergy.model";
import { Ingredient } from "../orm/models/ingredient.model";
import HttpException from "../exceptions/HttpException";
import { User } from "../orm/models/user.model";
import { Op } from "sequelize";

export default class AllergyService {
  public async getAllergyList(kidId: number) {
    try {
      const allergyList = await Allergy.findAll({
        where: { kidId: kidId },
        attributes: ["id", "updatedAt"],
        include: {
          model: Ingredient,
          attributes: ["id", "name"],
        },
      });

      return allergyList;
    } catch (err) {
      throw err;
    }
  }

  public async addIngredientToAllergy(allergiesData: any) {
    try {
      const ingredient = await Ingredient.findOne({
        where: {
          fdcId: allergiesData.fdcId,
        },
      });
      console.log(ingredient);

      const [addedIngredient, result] = await Allergy.findOrCreate({
        where: {
          kidId: allergiesData.kidId,
          ingredientId: ingredient?.id,
        },
        defaults: {
          kidId: allergiesData.kidId,
          ingredientId: ingredient?.id,
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

  public async deleteAllergy(allergyID: number, kidId: number) {
    try {
        const allergy = await Allergy.findOne({
            where: {
                id: allergyID,
                kidId: kidId
            }
        });

        if (!allergy) {
            throw new HttpException(404, "Allergy not found");
        }

        await allergy.destroy();

        return allergy;
    } catch (err) {
        throw err;
    }
  }

  public async undoDeleteAllergies(allergyID: number, kidId: number) {
    try {
        const allergies = await Allergy.findOne({
            where: {
                id: allergyID,
                kidId: kidId,
            },
            paranoid: false
        });

        if (!allergies) {
            throw new HttpException(404, "Allergies not found");
        }

        await allergies.restore();

        return allergies;
    } catch (err) {
        throw err;
    }
  }
}
