import express from "express";
import { BaseController } from "../abstractions/base.controller";
import passport from "./../../configs/passport.config";
import User from "../../models/User/user.model";
import IUser from "../../models/User/user.interface";
import InvalidCredentialsExceptions from "../../exceptions/InvalidCredentialsException";
import CreateUserDTO from "../../models/User/user.DTO";
import AuthenticationService from "../../services/authentication.service";
import LogInDTO from "../../models/login.DTO";
import TokenData from "../../interfaces/TokenData.interface";
import DataStoredInToken from "../../interfaces/DataStoredInToken.interface";
import jwt from "jsonwebtoken";

export default class AuthController extends BaseController {
  private userProfile: any;

  public authenticationService = new AuthenticationService();

  public register = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      // Communicate with the DTO
      const userData: CreateUserDTO = req.body;

      // Cast the DTO to the authentication service
      const user = await this.authenticationService.register(userData);
      res.status(200).json({
        msg: "User created successfully",
        user: user,
      });
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
