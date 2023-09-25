import { User } from "./../orm/models/user.model";
import { Account } from "./../orm/models/account.model";
import { Health } from "../orm/models/health.model";

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

  // Get Kid Health
  public async getKidHealthRecords(kidId: number, userId: number) {
    try {
      // Check if kid belongs to the user
      const kid = await User.findOne({
        where: {
          id: kidId,
          parentId: userId,
        },
      });
      if (!kid) {
        throw new Error("Kid not found");
      }
      const healthRecords = await Health.findAll({
        where: {
          kidId: kidId
        },
        order: [["updatedAt", "DESC"]],
        attributes: ["id", "weight", "height", "bmi", "tdee", "updatedAt"],
      });

      return healthRecords;
    } catch (err) {
      throw err;
    }
  }
}
