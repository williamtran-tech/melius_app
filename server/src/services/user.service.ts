import { User } from "./../orm/models/user.model";
import { Account } from "./../orm/models/account.model";
import { Health } from "../orm/models/health.model";
import { Allergy } from "../orm/models/allergy.model";
import { Ingredient } from "../orm/models/ingredient.model";

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

  public async getKidProfiles(parentId: string) {
    try {
      const kidProfiles = await User.findAll({
        where: { parentId: parentId },
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
}
