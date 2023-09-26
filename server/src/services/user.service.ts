import { User } from "./../orm/models/user.model";
import { Account } from "./../orm/models/account.model";
import { Health } from "../orm/models/health.model";
import { Role } from "../orm/models/role.model";
import chalk from "chalk";
import HttpException from "../exceptions/HttpException";
import sequelize from "sequelize";

import MealPlanService from "./MealPlan/meal.plan.service";

export default class UserService {
  private mealPlanService = new MealPlanService();
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



  // ADMIN PANEL - USER MANAGEMENT
  public async getAllUser(role: string) {
    try {
      const users = await User.findAll({
        include: [ 
          {
            model: Role,
            attributes: [],
            where: {
              name: role,
            },
            through: {
              attributes: [],
            }
          },
        ],
        attributes: ["id", "fullName", "dob", "img", "phone", "createdAt", "updatedAt"]
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async deleteUser(userId: number, force: boolean) {
    try {
      // Find user with role User or Doctor
      const user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Role,
            attributes: [],
            where: {
              name: ["User", "Doctor"],
            },
            through: {
              attributes: [],
            }
          },
        ],
        attributes: ["id", "fullName", "dob", "img", "phone", "createdAt", "updatedAt"]
      });

      if (!user) {
        throw new HttpException(404, "User not found");
      }

      if (force) {
        const kidIds = await User.findAll({
          where: {
            parentId: userId,
          },
          attributes: ["id"],
        });

        await this.deletePermanentlyUser(userId, kidIds.map(kid => kid.id));
        console.log(chalk.red("User deleted permanently"));
      } else {
        await user.destroy({});
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  public async undoDeleteUser(userId: number) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
        paranoid: false,
        attributes: ["id", "fullName", "dob", "img", "phone", "createdAt", "updatedAt"]
      });
      if (!user) {
        throw new HttpException(404, "User not found");
      }

      await user.restore();
      return user;
    } catch (error) {
      throw error;
    }
  }

  private async deletePermanentlyUser(userId: number, kidIds: number[]) {
    try {
      kidIds.forEach(async (kidId) => {
        // Delete associated mealPlan
        console.log("Delete meal plan kid:", kidId);
        await this.mealPlanService.deleteMealPlan(kidId, true);
        // Delete Kids
        await User.destroy({
          where: {
            id: kidId,
          },
          force: true,
        });
      });
     
      // Delete associated account
      await Account.destroy({
        where: {
          userId: userId,
        },
        force: true,
      });

      // Delete user - Mother
      await User.destroy({
        where: {
          id: userId,
        },
        force: true,
      });
    } catch (err) {
      throw err;
    }
  }
}
