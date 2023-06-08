import * as jwt from "jsonwebtoken";
import User from "./../models/User/user.model";
import IUser from "./../models/User/user.interface";
import CreateUserDTO from "../models/User/user.DTO";
import HttpException from "../exceptions/HttpException";
import bcrypt from "bcrypt";

class AuthenticationService {
  public user = User;

  public async register(user: CreateUserDTO) {
    if (
      await this.user.findOne({
        email: user.email,
      })
    ) {
      throw new HttpException(400, "Email already exists");
    }
    const hash = await bcrypt.hash(user.password, 10);

    const newUser = await this.user.create({ ...user, password: hash });
    await newUser.save();

    // This need to return a token - Store token in cookie httpOnly
    return user;
  }

  public async passwordCompare(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash);
    return result;
  }
}

export default AuthenticationService;
