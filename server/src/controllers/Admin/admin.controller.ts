import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";

import UserService from "../../services/user.service";
import chalk from "chalk";
import HttpException from "../../exceptions/HttpException";

export default class AdminController extends BaseController {
    constructor() {
        super();
    }
    public userService = new UserService();
    // USER MANAGEMENT FUNCTIONS
    public getAllUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result = [];
            const role = req.query.role ? req.query.role : "User";
            let kidProfiles;
            const users = await this.userService.getAllUser(role.toString());
            if (users.length === 0) {
                throw new HttpException(404, "No user found");
            }

            if (role.toString().toLowerCase() === "user") {
                // Get kid profiles
                for (let user in users) {
                    kidProfiles = await this.userService.getKidProfiles(users[user].id);
                    const userObj = {
                        mother: users[user],
                        kids: kidProfiles
                    }
                    result.push(userObj);
                }
            }
            res.status(200).json({
                msg: "Get all users successfully",
                users: result
            });
        } catch (err) {
            console.log(chalk.red(err));
            next(err);
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(chalk.red("Delete user"));
            const user = await this.userService.deleteUser(Number(req.query.id), Boolean(Number(req.query.force)));

            res.status(200).json({
                msg: "Delete user successfully",
                user: user
            })
        } catch (error) {
            next(error);
        }
    }

    public undoDeleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.undoDeleteUser(Number(req.query.id));

            res.status(200).json({
                msg: "Undo delete user successfully",
                user: user
            });
        } catch (error) {
            next(error);
        }
    }
}
