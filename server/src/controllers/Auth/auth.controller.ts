import express from "express";
import { BaseController } from "../abstractions/base.controller";
import passport from "./../../configs/passport.config";
import User from "../../models/User/user.model";
import IUser from "../../models/User/user.interface";
import InvalidCredentialsExceptions from "../../exceptions/InvalidCredentialsException";
import CreateUserDTO from "../../models/User/UserCreate.DTO";
import RegisterUserDTO from "../../models/User/UserRegister.DTO";
import AuthenticationService from "../../services/authentication.service";
import LogInDTO from "../../models/login.DTO";
import TokenData from "../../interfaces/TokenData.interface";
import DataStoredInToken from "../../interfaces/DataStoredInToken.interface";
import DecodedVerifiedToken from "../../interfaces/DecodedVerifiedToken.interface";
import HttpException from "../../exceptions/HttpException";
import jwt from "jsonwebtoken";
import DecodedUserToken from "../../interfaces/DecodedUserToken.interface";

export default class AuthController extends BaseController {
  private userProfile: any;

  public authenticationService = new AuthenticationService();
  constructor() {
    super();
    this.userProfile = {};
  }

  public register = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      // Communicate with the DTO
      const userData: RegisterUserDTO = req.body;
      // Cast the DTO to the authentication service
      const { token, verifiedCode } =
        await this.authenticationService.generateVerifiedToken(userData);
      res.cookie("token", token, {
        httpOnly: true,
        // maxAge for 1 hour
        maxAge: 3600000,
      });
      res.status(200).json({
        msg: "User acceptable",
        token: token,
        verifiedCode: verifiedCode,
      });
    } catch (error: any) {
      next(error);
    }
  };

  public verifyUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!req.cookies.token) {
        next(new HttpException(400, "No verified code found"));
      } else {
        const token = req.cookies.token;
        const verifiedCode: string = req.body.verifiedCode;
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as DecodedVerifiedToken;

        if (decodedToken.verifiedCode != verifiedCode) {
          res.status(404).json({
            msg: "Invalid code",
          });
        } else {
          res.status(200).json({
            msg: "User verified",
          });
        }
      }
    } catch (err: any) {
      next(err);
    }
  };

  public setPassword = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        next(new HttpException(400, "Password does not match"));
      }
      console.log(req.cookies.token);
      const decodedToken = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET!
      ) as DecodedUserToken;
      const user = await this.authenticationService.createUser(
        decodedToken.user,
        password
      );

      if (!user) {
        next(new HttpException(400, "Create user failed"));
      } else {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({
          msg: "Password set successfully",
          user: user,
        });
      }
    } catch (error: any) {
      next(error);
    }
  };

  public logIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const logInData: LogInDTO = req.body;
      const user = await User.findOne({
        email: logInData.email,
      });
      if (user) {
        const result = await this.authenticationService.passwordCompare(
          logInData.password,
          user.password
        );
        if (result) {
          // Generate token
          const tokenData = this.createToken(user);
          // Store token in cookie httpOnly
          res.cookie("Authorization", tokenData.token, {
            httpOnly: true,
            maxAge: tokenData.expiresIn * 1000,
          });
          user.password = "";
          res.status(200).json({
            msg: "User logged in successfully",
          });
        } else {
          next(new InvalidCredentialsExceptions());
        }
      } else {
        next(new InvalidCredentialsExceptions());
      }
    } catch (error: any) {
      next(error);
    }
  };

  public logOut = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      res.clearCookie("Authorization");
      res.status(200).json({
        msg: "User logged out successfully",
      });
    } catch (error: any) {
      next(error);
    }
  };

  private createToken(user: IUser): TokenData {
    const expiresIn = 60 * 60; // an hour
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

  public googleLogin = (req: express.Request, res: express.Response) => {
    try {
      passport.authenticate("google", {
        scope: ["profile", "email"],
      })(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  };

  public googleCallback = (req: express.Request, res: express.Response) => {
    try {
      // Handle the callback logic after Google authentication
      passport.authenticate("google", {
        successRedirect: `${process.env.CALLBACK_URL}:${process.env.PORT}/${process.env.CALLBACK_URI}/success`, // Redirect to the success page ${process.env.CALLBACK_URI}/success
        failureRedirect: `${process.env.CALLBACK_URL}:${process.env.PORT}/${process.env.CALLBACK_URI}/error`, // Redirect to the failure page
      })(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  };

  // This method is called after the user is authenticated by Google

  // https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token_here}
  public success = (req: express.Request, res: express.Response) => {
    try {
      this.userProfile = req.user;
      res.status(200).json({
        msg: "User authenticated successfully",
        user: this.userProfile,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  };

  public error = (req: express.Request, res: express.Response) => {
    try {
      res.status(400).json({
        msg: "User authentication failed",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  };
}
