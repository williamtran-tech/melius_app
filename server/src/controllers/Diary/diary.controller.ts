import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";

import UserService from "../../services/user.service";
import chalk from "chalk";

export default class DiaryController extends BaseController {
    constructor() {
        super();
    }
    public userService = new UserService();
    // TAG FUNCTIONS
    public getKidHealth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.userData.id);
            const healthRecords = await this.userService.getKidHealthRecords(Number(req.query.kidId), userId);
            res.status(200).json({
                msg: "Get kid health successfully",
                healthRecords: healthRecords
            });
        } catch (err) {
            next(err);
        }
    }

    public getHandbooks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({
                msg: "Get all handbooks successfully",
            });
        } catch (err) {
            next(err);
        }
    }
}
