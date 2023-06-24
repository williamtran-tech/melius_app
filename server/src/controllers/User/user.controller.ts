import express, { NextFunction } from "express";
import { BaseController } from "../abstractions/base.controller";
import HttpException from "../../exceptions/HttpException";
import jwt from "jsonwebtoken";
import DecodedUserToken from "../../interfaces/DecodedUserToken.interface";
import UserService from "../../services/user.service";
export default class UserController extends BaseController {
  constructor() {
    super();
  }

  public userService = new UserService();

  public getUserProfile = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const decodedToken = jwt.verify(
        req.cookies["Authorization"],
        process.env.JWT_SECRET!
      ) as DecodedUserToken;
      const userProfile = await this.userService.getUserProfile(
        decodedToken.id
      );
      res.status(200).json({
        msg: "Get user profile successfully",
        userProfile: userProfile,
      });
    } catch (err) {
      next(err);
    }
  };

  public createChild = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const decodedToken = jwt.verify(
        req.cookies["Authorization"],
        process.env.JWT_SECRET!
      ) as DecodedUserToken;
      const userProfile = await this.userService.getUserProfile(
        decodedToken.id
      );
      if (userProfile) {
        console.log(userProfile);
        const childProfile = {
          fullName: req.body.fullName,
          parentId: userProfile.user.id,
        };

        const child = await this.userService.createChild(childProfile);

        res.status(200).json({
          msg: "Create child successfully",
          child: child,
        });
      } else {
        throw new HttpException(401, "Unauthorized Access");
      }
    } catch (err) {
      next(err);
    }
  };
}
