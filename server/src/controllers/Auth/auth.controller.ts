import express from "express";
import { BaseController } from "../abstractions/base.controller";
import passport from "./../../configs/passport.config";
import User from "../../models/User/user.model";
import InvalidCredentialsExceptions from "../../exceptions/InvalidCredentialsException";
import CreateUserDTO from "../../models/User/UserCreate.DTO";
import RegisterUserDTO from "../../models/User/UserRegister.DTO";
import AuthenticationService from "../../services/auth.service";
import LogInDTO from "../../models/DTOs/Login.DTO";
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
      const dupUser = await User.findOne({
        email: req.body.email,
      });
      if (dupUser) {
        throw new HttpException(400, "Email already exists");
      }
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
      this.authenticationService.sendVerifiedEmail(
        userData.email,
        verifiedCode
      );
      res.status(200).json({
        msg: "User acceptable",
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
        next(new HttpException(401, "Unauthorized access"));
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
          const token = await this.authenticationService.userVerified(
            decodedToken.user
          );
          res.clearCookie("token");
          res.cookie("token", token, {
            httpOnly: true,
            // maxAge for 15m
            maxAge: 900000,
          });
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
      if (!req.cookies.token) {
        throw new HttpException(401, "Unauthorized access");
      }
      const decodedToken = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET!
      ) as DecodedUserToken;

      const { password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        throw new HttpException(400, "Password does not match");
      }
      if (!decodedToken.user.isVerified) {
        throw new HttpException(400, "User not verified");
      }

      const checkUser = await User.findOne({
        email: decodedToken.user.email,
      });
      if (!checkUser) {
        const userData: CreateUserDTO = {
          ...decodedToken.user,
          password: password,
        };
        const user = await this.authenticationService.createUser(
          userData,
          password
        );
        if (!user) {
          throw new HttpException(400, "Create user failed");
        } else {
          const { expiresIn, token } =
            this.authenticationService.generateAuthenticationToken(user);
          console.log(expiresIn, token);
          res.cookie("Authorization", token, {
            httpOnly: true,
            maxAge: expiresIn * 1000,
            secure: true, // for https
            // The secure flag is set to true in the res.cookie method. This means the cookie will only be sent over a secure HTTPS connection. If you are testing the code on a non-secure connection (HTTP), the cookie will not be set. Make sure you are accessing the server over HTTPS.
          });
          res.cookie("token", "", { maxAge: 0 });
          res.status(200).json({
            msg: "Password set successfully - Direct user to App without login again",
            user: user,
          });
        }
      } else {
        const hash = await this.authenticationService.hashPassword(password);
        await User.findOneAndUpdate(
          { email: decodedToken.user.email },
          { password: hash }
        );

        const updatedUser = await User.findOne({
          email: decodedToken.user.email,
        });
        const { expiresIn, token } =
          this.authenticationService.generateAuthenticationToken(updatedUser);
        res.cookie("token", "", { maxAge: 0 });
        res.clearCookie("token");
        res.cookie("Authorization", token, {
          httpOnly: true,
          maxAge: expiresIn * 1000,
        });
        res.status(200).json({
          msg: "Password set successfully - Direct user to App without login again",
        });
      }
    } catch (error: any) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        throw new HttpException(404, "User not found");
      }
      const userData: RegisterUserDTO = {
        email: user.email,
        fullName: user.fullName,
        isVerified: false,
      };

      const { token, verifiedCode } =
        await this.authenticationService.generateVerifiedToken(userData);
      res.cookie("token", token, {
        httpOnly: true,
        // maxAge for 15 minutes
        maxAge: 900000,
      });
      this.authenticationService.sendVerifiedEmail(user.email, verifiedCode);

      res.status(200).json({
        msg: "Verified Code sent to your email",
        verifiedCode: verifiedCode,
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
          const tokenData =
            await this.authenticationService.generateAuthenticationToken(user);

          // Store token in cookie httpOnly
          res.cookie("Authorization", tokenData.token, {
            httpOnly: true,
            maxAge: tokenData.expiresIn * 1000,
            // secure: true,
          });
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
      if (!req.cookies.Authorization) {
        throw new HttpException(401, "Unauthorized access");
      } else {
        const token = req.cookies.Authorization;
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as DecodedUserToken;
        if (!decodedToken) {
          throw new HttpException(401, "Unauthorized access");
        } else {
          res.clearCookie("Authorization");
          res.status(200).json({
            msg: "User logged out successfully",
          });
        }
      }
    } catch (error: any) {
      next(error);
    }
  };

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
  public success = async (req: express.Request, res: express.Response) => {
    try {
      this.userProfile = req.user;

      // Store user information into the database
      // Check if the user already exists in the database
      const checkUserExists = await User.findOne({
        email: this.userProfile.email,
      });
      if (!checkUserExists) {
        // Create a new user
        console.log("Creating a new user");
        const userData = {
          email: this.userProfile.email,
          fullName: this.userProfile.name,
          img: this.userProfile.picture,
          role: "user",
          verified: true,
          password: "",
        };
        const createUser = await User.create(userData);
        const token =
          this.authenticationService.generateAuthenticationToken(createUser);
        res.cookie("Authorization", token, {
          maxAge: token.expiresIn * 1000,
          secure: true,
          httpOnly: true,
        });

        res.status(200).json({
          msg: "Redirect user to set password page",
        });
      } else {
        if (checkUserExists.password === "") {
          res.status(200).json({
            msg: "Redirect user to set password page",
          });
        } else {
          // Let user in
          const token = this.authenticationService.generateAuthenticationToken(
            this.userProfile
          );
          res.cookie("Authorization", token.token, {
            httpOnly: true,
            maxAge: token.expiresIn * 1000,
            secure: true,
          });
          res.status(200).json({
            msg: "User authenticated successfully",
          });
        }
      }
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
