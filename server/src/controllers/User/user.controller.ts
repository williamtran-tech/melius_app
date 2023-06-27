import express, { NextFunction } from "express";
import { BaseController } from "../abstractions/base.controller";
import HttpException from "../../exceptions/HttpException";
import jwt from "jsonwebtoken";
import DecodedUserToken from "../../interfaces/DecodedUserToken.interface";
import UserService from "../../services/user.service";
import HealthService from "../../services/health.service";
export default class UserController extends BaseController {
  constructor() {
    super();
  }

  public healthService = new HealthService();

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
      const kidProfiles = await this.userService.getKidProfiles(
        decodedToken.id
      );
      res.status(200).json({
        msg: "Get user profile successfully",
        userProfile: userProfile,
        kidProfiles: kidProfiles,
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
          gender: req.body.gender,
          dob: req.body.dob,
          parentId: userProfile.user.id,
        };

        const child = await this.userService.createChild(childProfile);

        const healthRecord = {
          kidId: child.id,
          weight: req.body.weight,
          height: req.body.height,
          DOB: child.dob,
          gender: child.gender,
          PAL: req.body.PAL || 1.4,
        };

        const createdHealthRecord = await this.healthService.createHealthRecord(
          healthRecord
        );

        res.status(200).json({
          msg: "Create child successfully",
          child: child,
          healthRecord: createdHealthRecord,
        });
      } else {
        throw new HttpException(401, "Unauthorized Access");
      }
    } catch (err) {
      next(err);
    }
  };

  public getKidProfile = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {};
}
