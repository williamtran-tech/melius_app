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
    private userService = new UserService();
    private adminService = new AdminService();

    // USER (Mother) MANAGEMENT FUNCTIONS
    public getAllMothers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result = [];
            const role = "User";
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

    // DOCTOR MANAGEMENT FUNCTIONS
    public getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const role = "Doctor"
            const doctors = await this.userService.getAllUser(role.toString());
            if (doctors.length === 0) {
                throw new HttpException(404, "No doctor found");
            }
            res.status(200).json({
                msg: "Get all doctors successfully",
                doctors: doctors
            });
        } catch (err) {
            next(err);
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
    public createMassiveDoctor = async (req: Request, res: Response, next: NextFunction) => {}
    public updateUser = async (req: Request, res: Response, next: NextFunction) => {}
    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {}
    public undoDeleteUser = async (req: Request, res: Response, next: NextFunction) => {}

}
