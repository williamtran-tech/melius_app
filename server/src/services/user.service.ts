import { User } from "./../orm/models/user.model";
import { Account } from "./../orm/models/account.model";
import { Health } from "../orm/models/health.model";
import { Allergy } from "../orm/models/allergy.model";
import { Ingredient } from "../orm/models/ingredient.model";
import { AvailableIngredient } from "../orm/models/available.ingredient.model";
import { IngreCategory } from "../orm/models/ingre.category.model";

export default class UserService {
  public async getUserProfile(userId: number) {
    try {
      const userProfile = await Account.findOne({
        where: { userId: userId },
        attributes: ["email", "type"],
        include: {
          model: User,
          attributes: ["id", "fullName", "gender", "DOB", "img", "updatedAt"],
        },
      });
      return userProfile;
    } catch (err) {
      throw err;
    }
  }

  public async createChild(childProfile: any) {
    try {
      const childCreated = await User.create(childProfile);
      return childCreated;
    } catch (err) {
      throw err;
    }
  }

  // Get All kids of parent
  public async getKidProfiles(id: number) {
    try {
      const kidProfiles = await User.findAll({
        where: { parentId: id},
        attributes: ["id", "fullName", "dob", "gender", "updatedAt"],
        include: {
          model: Health,
          limit: 1,
          attributes: ["id", "weight", "height", "bmi", "tdee", "updatedAt"],
          order: [["createdAt", "DESC"]],
        },
      });
      return kidProfiles;
    } catch (err) {
      throw err;
    }
  }

  // Get ONE kid profile
  public async getKidProfile(kidId: number) {
    try {
      const kidProfiles = await User.findAll({
        where: { id: kidId},
        attributes: ["id", "fullName", "dob", "gender", "updatedAt"],
        include: {
          model: Health,
          limit: 1,
          attributes: ["id", "weight", "height", "bmi", "tdee", "updatedAt"],
          order: [["createdAt", "DESC"]],
        },
      });
      return kidProfiles;
    } catch (err) {
      throw err;
    }
  }

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
}
