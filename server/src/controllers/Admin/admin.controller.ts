import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";

import UserService from "../../services/user.service";
import AdminService from "../../services/Admin/admin.service";
import chalk from "chalk";
import HttpException from "../../exceptions/HttpException";

export default class AdminController extends BaseController {
    constructor() {
        super();
    }
    public adminService = new AdminService();
    public userService = new UserService();
    // USER MANAGEMENT FUNCTIONS
    public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.getUsers();
            res.status(200).json({
                msg: "Get all users successfully",
                users: users
            });
        } catch (err) {
            console.log(chalk.red(err));
            next(err);
        }
    }

    public getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doctors = await this.getUsers("Doctor");
            res.status(200).json({
                msg: "Get all users successfully",
                users: doctors
            });
        } catch (err) {
            console.log(chalk.red(err));
            next(err);
        }
    }

    private getUsers = async (role?: string) => {
        try {
            let result = [];
            const roleType:string = role ? role : "User";
            let kidProfiles;
            const users = await this.userService.getAllUser(roleType.toString());
            if (users.length === 0) {
                throw new HttpException(404, "No user found");
            }

            if (roleType.toString().toLowerCase() === "user") {
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
            else if (roleType.toString().toLowerCase() === "doctor") {
                result.push(users);
            }

            return result;
        } catch (err) {
            throw err;
        }
    }  

    public createDoctor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = {
                email: req.body.email,
                fullName: req.body.fullName,
                gender: req.body.gender,
                dob: new Date(),
                type: "internal",
                role: "Doctor"
            }

            const doctor = await this.adminService.createUser(userData);
            res.status(200).json({
                msg: "Create doctor successfully",
                doctor: doctor
            });
        } catch (err) {
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

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {}
}
