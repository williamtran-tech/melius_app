import * as jwt from "jsonwebtoken";
import User from "../models/User/user.model";
import CreateUserDTO from "../models/User/UserCreate.DTO";
import RegisterUserDTO from "../models/User/UserRegister.DTO";
import HttpException from "../exceptions/HttpException";
import bcrypt from "bcrypt";
import MailUtil from "../utils/mail.util";
import TokenData from "../interfaces/TokenData.interface";
import IUser from "../models/User/user.interface";
import DataStoredInToken from "../interfaces/DataStoredInToken.interface";

class AuthenticationService {
  public user = User;

  public async generateVerifiedToken(user: RegisterUserDTO) {
    // Check phone number duplicate
    if (user.phone) {
      if (
        await this.user.findOne({
          phone: user.phone,
        })
      ) {
        throw new HttpException(400, "Phone number already exists");
      }
    }
    // Generate 4 digit code
    // Send email with code
    const verifiedCode = Math.floor(1000 + Math.random() * 9000);
    // Generate a token for verifying email of user
    console.log("Verified: ", user);
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
    console.log(user);
    return { token, verifiedCode: verifiedCode.toString() };
  }

  public async userVerified(user: any) {
    console.log("AuthService: ", user);
    console.log("User verified: ", user);
    user.isVerified = true;
    const token = jwt.sign(
      {
        user: user,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      }
    );
    return token;
  }

  public generateAuthenticationToken(user: IUser | any) {
    const expiresIn = 60 * 60 * 24 * 3; // 3 days
    const secret = process.env.JWT_SECRET!; // the ! tells the compiler that we know that the variable is defined
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      img: user.img,
      role: user.role,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, {
        expiresIn,
        algorithm: "HS384",
      }),
    };
  }

  public async createUser(user: CreateUserDTO, password: string) {
    try {
      const hashedPassword = await this.hashPassword(password);
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

  // Sending mail service
  public async sendVerifiedEmail(email: string, verifiedCode: string) {
    try {
      const mailUtil = new MailUtil();
      // Saver https://developers.google.com/oauthplayground/?code=4/0AbUR2VNYjBxZjzhS37rSnSBYK2hxiQEVEPPHALsZwewxPU8hA-Er92alWZEWmIDPDl73AQ&scope=https://mail.google.com/
      const accessToken = await mailUtil.getAccessToken();
      mailUtil.sendMail(
        accessToken.token!,
        email,
        "Test",
        `<h1>Verified Code: ${verifiedCode}</h1>`
      );
    } catch (err) {
      throw err;
    }
  }

  public async hashPassword(password: string) {
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
