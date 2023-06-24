import { User } from "./../orm/models/user.model";
import { Account } from "./../orm/models/account.model";

export default class UserService {
  public async getUserProfile(userId: number) {
    try {
      const userProfile = await Account.findOne({
        where: { userId },
        attributes: ["id", "email", "type"],
        include: {
          model: User,
          attributes: ["id", "fullName", "img", "updatedAt"],
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
}
