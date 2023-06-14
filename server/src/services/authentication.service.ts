import * as jwt from "jsonwebtoken";
import User from "./../models/User/user.model";
import CreateUserDTO from "../models/User/UserCreate.DTO";
import RegisterUserDTO from "../models/User/UserRegister.DTO";
import HttpException from "../exceptions/HttpException";
import bcrypt from "bcrypt";

class AuthenticationService {
  public user = User;

  public async generateVerifiedToken(user: RegisterUserDTO) {
    if (
      await this.user.findOne({
        email: user.email,
      })
    ) {
      throw new HttpException(400, "Email already exists");
    }
    // Check phone number duplicate
    if (
      await this.user.findOne({
        phone: user.phone,
      })
    ) {
      throw new HttpException(400, "Phone number already exists");
    }
    // Generate 4 digit code
    // Send email with code
    const verifiedCode = Math.floor(1000 + Math.random() * 9000);
    // Generate a token for verifying email of user
    const token = jwt.sign(
      {
        user: user,
        verifiedCode: verifiedCode.toString(),
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );
    return { token, verifiedCode: verifiedCode.toString() };
  }

  public async createUser(user: CreateUserDTO, password: string) {
    try {
      const hashedPassword = await this.setPassword(password);
      const createdUser = await this.user.create({
        ...user,
        password: hashedPassword,
        verified: true,
      });
      return createdUser;
    } catch (err) {
      throw err;
    }
  }

  // Set password
  public async setPassword(password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (err) {
      throw err;
    }
  }

  public async passwordCompare(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash);
    return result;
  }
}

export default AuthenticationService;
