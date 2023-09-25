import * as jwt from "jsonwebtoken";
import CreateUserDTO from "../DTOs/User/UserCreate.DTO";
import RegisterUserDTO from "../DTOs/User/UserRegister.DTO";
import HttpException from "../exceptions/HttpException";
import bcrypt from "bcrypt";
import MailUtil from "../utils/mail.util";
import TokenData from "../interfaces/Auth/TokenData.interface";
import IUser from "../interfaces/User/user.interface";
import DataStoredInToken from "../interfaces/Auth/DataStoredInToken.interface";
import { Account } from "./../orm/models/account.model";
import { User } from "./../orm/models/user.model";
import LogInDTO from "../DTOs/Auth/Login.DTO";
import InvalidCredentialsException from "../exceptions/InvalidCredentialsException";
import { UserRole } from "../orm/models/user.role.model";
import { Role } from "../orm/models/role.model";

class AuthenticationService {
  public async generateVerifiedToken(user: RegisterUserDTO) {
    // Check phone number duplicate
    // if (user.phone) {
    //   if (
    //     await this.user.findOne({
    //       phone: user.phone,
    //     })
    //   ) {
    //     throw new HttpException(400, "Phone number already exists");
    //   }
    // }
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

  public async generateAuthenticationToken(user: IUser | any) {
    const expiresIn = 60 * 60 * 24 * 3; // 3 days
    const secret = process.env.JWT_SECRET!; // the ! tells the compiler that we know that the variable is defined
    let userID = user.id;
    if (user.id === undefined) {
      const userData = await Account.findOne({
        where: {
          email: user.email,
        },
        attributes: ["userId"],
      });
      if (userData) {
        userID = userData.userId;
      }
    }
    const dataStoredInToken: DataStoredInToken = {
      id: user.id || userID,
      email: user.email,
      fullName: user.fullName,
      img: user.img,
      type: user.type,
    };
    console.log("Data stored in token: ", dataStoredInToken);
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, {
        expiresIn,
        algorithm: "HS384",
      }),
    };
  }

  // MySQL
  public async findAccountByEmail(email: string) {
    try {
      const account = await Account.findOne({
        where: {
          email: email,
        },
      });
      if (account) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  public async createUser(user: CreateUserDTO, password: string) {
    try {
      const hashedPassword = await this.hashPassword(password);
      const createdUser = await User.create({
        fullName: user.fullName,
        gender: user.gender,
        dob: user.DOB,
      });
      const createdAccount = await Account.create({
        userId: createdUser.id,
        email: user.email,
        password: hashedPassword,
        type: "internal",
      });

      const role = await Role.findOne({
        where: {
          name: user.role,
        },
        attributes: ["id"],
      });
      if (role) {
        await UserRole.create({
          userId: createdUser.id,
          roleId: role.id,
        });
      }

      return createdUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async createGoogleUser(user: any) {
    try {
      // Check if email exists in internal type
      // Link google account to internal account
      const checkUserExisted = await Account.findOne({
        include: [User],
        where: { email: user.email, type: "internal" },
      });
      if (checkUserExisted) {
        checkUserExisted.user.googleRefreshToken = user.refreshToken;
        checkUserExisted.user.img = user.img;
        await checkUserExisted.user.save();
        return false;
      }

      // Check if email exists in external type
      const checkUserExists = await Account.findOne({
        include: [User],
        where: { email: user.email, type: "external" },
      });
      if (!checkUserExists) {
        const createdUser = await User.create({
          fullName: user.fullName,
          img: user.img,
          phone: user.phone,
          dob: user.DOB,
          gender: user.gender,
          googleRefreshToken: user.refreshToken,
        });
        const createdAccount = await Account.create({
          userId: createdUser.id,
          email: user.email,
          password: user.password,
          type: "external",
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  public async logIn(logInData: LogInDTO) {
    try {
      const account = await Account.findOne({
        include: [User],
        where: { email: logInData.email, type: "internal" },
      });
      if (!account) {
        throw new InvalidCredentialsException();
      }
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        account.password
      );
      if (!isPasswordMatching) {
        throw new InvalidCredentialsException();
      }
      const decodedToken = {
        id: account.user.id,
        email: account.email,
        fullName: account.user.fullName,
        img: account.user.img,
        type: account.type,
      };
      const tokenData = await this.generateAuthenticationToken(decodedToken);
      return {
        token: tokenData.token,
        expiresIn: tokenData.expiresIn,
      };
    } catch (err) {
      throw err;
    }
  }

  // Sending mail service
  public async sendVerifiedEmail(email: string, verifiedCode: string) {
    try {
      const mailUtil = new MailUtil();
      // Saver https://developers.google.com/oauthplayground/?code=4/0AbUR2VNYjBxZjzhS37rSnSBYK2hxiQEVEPPHALsZwewxPU8hA-Er92alWZEWmIDPDl73AQ&scope=https://mail.google.com/
      mailUtil.sendMail(
        email,
        "[Melius Application] Verify your email [Do not reply]",
        `<h2>Verified Code: ${verifiedCode}</h2>`
      );
    } catch (err) {
      throw err;
    }
  }

  /** 
  * Hash Password function
  * @description: This function is used to hash password
  *  @param: {password: string} password
  *  @return: hashed password
  */
  public async hashPassword(password: string): Promise<string> {
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
