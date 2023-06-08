import express, { NextFunction } from "express";
import { BaseController } from "../abstractions/base.controller";
import IUser from "../../models/User/user.interface";
import User from "../../models/User/user.model";
import HttpException from "../../exceptions/HttpException";

export default class UserController extends BaseController {
  constructor() {
    super();
  }

  // public createUser = async (
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) => {
  //   try {
  //     const user: IUser = req.body;
  //     const newUser = new User(user);
  //     await newUser.save();
  //     if (newUser) {
  //       res.status(200).json({
  //         msg: "User created successfully",
  //         user: newUser,
  //       });
  //     } else {
  //       res.status(400).json({
  //         msg: "User not created",
  //       });
  //     }
  //   } catch (error: any) {
  //     if (error.code === 11000) {
  //       console.log(error.message);
  //       next(new HttpException(400, "Email already exists"));
  //     } else {
  //       console.log(error);
  //       next(new HttpException(500, "Server error"));
  //     }
  //   }
  // };

  public getAllUsers = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      // const users = await User.find();
      const users = await User.find({});
      res.status(200).json({
        msg: "This is user route",
        users: users,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  };

  public getUserById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const id = request.params.id;
      const user = await User.findById(id);
      if (user) {
        response.send(user);
      } else {
        next(new HttpException(404, "Post not found"));
      }
    } catch (err) {
      console.log(err);
      next(new HttpException(500, "Internal server error"));
    }
  };
}
