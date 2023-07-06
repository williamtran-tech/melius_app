import express, { NextFunction } from "express";
import { BaseController } from "../abstractions/base.controller";
import HttpException from "../../exceptions/HttpException";
import jwt from "jsonwebtoken";
import DecodedUserToken from "../../interfaces/Auth/DecodedUserToken.interface";
import UserService from "../../services/user.service";
import HealthService from "../../services/health.service";
import KidHealthDTO from "../../DTOs/Kid/KidHealthData.DTO";
import IngredientService from "../../services/ingredient.service";
export default class UserController extends BaseController {
  constructor() {
    super();
  }

  public healthService = new HealthService();

  public userService = new UserService();

  public ingredientService = new IngredientService();

  public getUserProfile = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const userProfile = await this.userService.getUserProfile(
        req.userData.id
      );
      const kidProfile = await this.userService.getKidProfiles(req.userData.id);
      res.status(200).json({
        msg: "Get user profile successfully",
        userProfile: userProfile,
        kidProfile: kidProfile,
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
      const userId = req.userData.id;
      const userProfile = await this.userService.getUserProfile(userId);
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
        } as KidHealthDTO;

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

  public updateChildHealth = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const kidInfo = await this.userService.getKidProfiles(req.userData.id);
      const kidData: KidHealthDTO = {
        kidId: kidInfo[0].id,
        weight: req.body.weight,
        height: req.body.height,
        DOB: kidInfo[0].dob,
        PAL: req.body.PAL ? req.body.PAL : 1.4,
        gender: kidInfo[0].gender,
      };

      const kidHealth = await this.healthService.updateHealthRecord(kidData);

      res.status(200).json({
        msg: "Create kid health successfully",
        kidHealth: kidHealth,
      });
    } catch (error) {
      next(error);
    }
  };

  public getKidProfile = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userData.id;

      const kidProfiles = await this.userService.getKidProfiles(userId);
      res.status(200).json({
        msg: "Get child profile successfully",
        kidProfiles: kidProfiles,
      });
    } catch (error) {
      next(error);
    }
  };

  public addIngredientToAllergyList = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const ingredientData = {
        ingredientId: Number(req.body.ingredientId),
        kidId: Number(req.body.kidId),
      };

      const [ingredient, result] =
        await this.ingredientService.addIngredientToAllergy(ingredientData);
      if (!result) {
        console.log("Ingredient already exists");
        throw new HttpException(400, "Ingredient already exists");
      }
      res.status(200).json({
        msg: "Insert ingredient to allergy successfully",
        allergies: ingredient,
      });
    } catch (err) {
      next(err);
    }
  };
}
