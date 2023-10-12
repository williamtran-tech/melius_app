import express from "express";
import { BaseController } from "../abstractions/base.controller";
import passport from "./../../configs/passport.config";
import CreateUserDTO from "../../DTOs/User/UserCreate.DTO";
import RegisterUserDTO from "../../DTOs/User/UserRegister.DTO";
import AuthenticationService from "../../services/auth.service";
import LogInDTO from "../../DTOs/Auth/Login.DTO";
import DecodedVerifiedToken from "../../interfaces/Auth/DecodedVerifiedToken.interface";
import HttpException from "../../exceptions/HttpException";
import jwt from "jsonwebtoken";
import DecodedUserToken from "../../interfaces/Auth/DecodedUserToken.interface";
import UserService from "../../services/user.service";
export default class AuthController extends BaseController {
  private userProfile: any;

  private authenticationService = new AuthenticationService();
  private userService = new UserService();
  constructor() {
    super();
    this.userProfile = {};
  }

  // MYSQL BLENDING
  public register = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      // MySQL check for duplicate email
      const account = await this.authenticationService.findAccountByEmail(
        req.body.email
      );
      if (account.exists) {
        throw new HttpException(401, "Email already registered");
      }

      // Communicate with the DTO
      const userData: RegisterUserDTO = { ...req.body };
      // Cast the DTO to the authentication service
      console.log(userData);
      const { token, verifiedCode } =
        await this.authenticationService.generateVerifiedToken(userData);
      res.cookie("token", token, {
        httpOnly: true,
        // maxAge for 1 hour
        maxAge: 3600000,
      });
      if (req.body.verifiedMethod === "email") {
        this.authenticationService.sendVerifiedEmail(
          userData.email,
          verifiedCode
        );
      }
      res.status(200).json({
        msg: "User acceptable",
        verifiedCode: verifiedCode,
      });
    } catch (error) {
      next(error);
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

      const userData: CreateUserDTO = {
        ...decodedToken.user,
        DOB: new Date(),
        gender: "female",
        password: password,
        role: ["User"],
      };
      console.log(decodedToken.user, userData);
      const user = await this.authenticationService.createUser(
        userData,
        password
      );
      if (!user) {
        throw new HttpException(400, "Create user failed");
      } else {
        const { expiresIn, token } =
          await this.authenticationService.generateAuthenticationToken(user);
        console.log(expiresIn, token);
        res.cookie("Authorization", token, {
          httpOnly: true,
          maxAge: expiresIn * 1000,
          // secure: true, // for https
          // The secure flag is set to true in the res.cookie method. This means the cookie will only be sent over a secure HTTPS connection. If you are testing the code on a non-secure connection (HTTP), the cookie will not be set. Make sure you are accessing the server over HTTPS.
        });
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({
          msg: "Password set successfully - Direct user to App without login again",
          user: user,
        });
      }
      // THe code below used for updating password
      // First query to check user exist or not, then execute the update
      // else {
      //   const hash = await this.authenticationService.hashPassword(password);
      //   await User.findOneAndUpdate(
      //     { email: decodedToken.user.email },
      //     { password: hash }
      //   );

      //   const updatedUser = await User.findOne({
      //     email: decodedToken.user.email,
      //   });
      //   const { expiresIn, token } =
      //     this.authenticationService.generateAuthenticationToken(updatedUser);
      //   res.cookie("token", "", { maxAge: 0 });
      //   res.clearCookie("token");
      //   res.cookie("Authorization", token, {
      //     httpOnly: true,
      //     maxAge: expiresIn * 1000,
      //   });
      //   res.status(200).json({
      //     msg: "Password set successfully - Direct user to App without login again",
      //   });
      // }
    } catch (error: any) {
      next(error);
    }
  };

  // Use for both MySQL and MongoDB
  public verifyUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      console.log("Verified token: ", req.cookies.token);
      if (!req.cookies.token) {
        throw new HttpException(401, "Unauthorized access");
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
  public forgotPassword = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const email = req.body.email;
      const {exists, account} = await this.authenticationService.findAccountByEmail(email);
      if (!exists) {
        throw new HttpException(404, "User not found");
      } else {
        const userProfile = await this.userService.getUserProfile(account!.userId);
        const userData = {
          id: account!.userId,
          email: account!.email,
          fullName: userProfile!.user.fullName,
          isVerified: true,
          type: account!.type,
          role: userProfile!.user.roles.map(role => role.name),
        }
        const { token, verifiedCode } =
        await this.authenticationService.generateVerifiedToken(userData);
        console.log(token, verifiedCode);
    
        // this.authenticationService.sendVerifiedEmail(email, "1234");
        res.status(200).json({
          msg: "Email sent successfully",
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
      if (req.cookies["Authorization"]) {
        if (jwt.verify(req.cookies.Authorization, process.env.JWT_SECRET!)) {
          throw new HttpException(400, "Already logged in");
        } else {
          res.clearCookie("Authorization");
        }
      }
      const logInData: LogInDTO = req.body;
      const logInUser = await this.authenticationService.logIn(logInData);
      res.cookie("Authorization", logInUser.token, {
        httpOnly: true,
        maxAge: logInUser.expiresIn * 1000,
        // secure: true,
      });
      res.status(200).json({
        msg: "User logged in successfully",
      });
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
        prompt: "consent",
        accessType: "offline",
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
      let callbackURL = `${process.env.CALLBACK_URL}/${process.env.CALLBACK_URI}`
      if (process.env.STATUS !== 'production') {
        callbackURL = `${process.env.CALLBACK_DEV_URL}:${process.env.DEV_PORT}/${process.env.CALLBACK_URI}`
      }

      // Handle the callback logic after Google authentication
      passport.authenticate("google", {
        successRedirect: `${callbackURL}/success`, // Redirect to the success page ${process.env.CALLBACK_URI}/success
        failureRedirect: `${callbackURL}/error`, // Redirect to the failure page
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
      const userData = {
        verified: this.userProfile.email_verified,
        email: this.userProfile.email,
        fullName: this.userProfile.name,
        img: this.userProfile.picture,
        refreshToken: this.userProfile.refreshToken,
        DOB: new Date(),
        gender: "female",
      };
      const createdUser = await this.authenticationService.createGoogleUser(
        userData
      );
      console.log("User data: ", userData);

      if (createdUser) {
        const userData = {
          email: this.userProfile.email,
          fullName: this.userProfile.name,
          img: this.userProfile.picture,
        };
        const authentication =
          await this.authenticationService.generateAuthenticationToken(
            userData
          );
        res.cookie("Authorization", authentication, {
          maxAge: authentication.expiresIn * 1000,
          httpOnly: true,
          secure: true,
        });

        // res.status(200).json({
        //   msg: "Redirect user home screen",
        // });

        res.redirect("exp://192.168.1.6:19000/success?token=" + authentication.token + "&new=true");
      } else {
        // User already exists in the database
        const userData = {
          email: this.userProfile.email,
          fullName: this.userProfile.name,
          img: this.userProfile.picture,
        };
        const authentication =
          await this.authenticationService.generateAuthenticationToken(
            userData
          );
        res.cookie("Authorization", authentication.token, {
          httpOnly: true,
          maxAge: authentication.expiresIn * 1000,
          secure: true,
        });
        // res.status(200).json({
        //   msg: "User authenticated successfully",
        // });
        res.redirect("exp://192.168.1.6:19000/success?token=" + authentication.token + "&new=false" + (authentication.kidIds!.length > 0 ? "&kidIds=" + authentication.kidIds : ""));
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

  public googleVerify = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      if (req.cookies["Authorization"]) {
        if (jwt.verify(req.cookies.Authorization, process.env.JWT_SECRET!)) {
          throw new HttpException(400, "Already logged in");
        } else {
          res.clearCookie("Authorization");
        }
      }
      const token = req.body.token;
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as any;

      const userData = {
        id: decodedToken.id,
        email: decodedToken.email,
        fullName: decodedToken.fullName,
        img: decodedToken.img,
        type: "external",
      };

      const authentication = await this.authenticationService.generateAuthenticationToken(userData);

      if (decodedToken) {
        
        res.cookie("Authorization", authentication.token, {
          httpOnly: true,
          maxAge: authentication.expiresIn * 1000,
          // secure: true,
        });
        
        res.status(200).json({
          msg: "User authenticated successfully Google verified",
        });
      } else {
        throw new HttpException(401, "User authentication failed");
      }
    } catch (error) {
      next(error);
    }
  }
}
