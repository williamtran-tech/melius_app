import express from "express";
import { BaseController } from "../abstractions/base.controller";
import passport from "./../../configs/passport.config";
import User from "../../models/User/user.model";
import InvalidCredentialsExceptions from "../../exceptions/InvalidCredentialsException";
import CreateUserDTO from "../../models/User/user.DTO";
import AuthenticationService from "../../services/authentication.service";
import LogInDTO from "../../models/login.DTO";

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
        console.log(logInData.password, user.password, result);
        if (result) {
          // Generate token

          // Store token in cookie httpOnly
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
  ) => {};

  private createToken() {}

  private createCookie() {}

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
