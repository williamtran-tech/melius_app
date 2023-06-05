import express from "express";
import { BaseController } from "../abstractions/base.controller";
import IUser from "../../models/User/user.interface";
import User from "../../models/User/user.model";

export default class UserController extends BaseController {
  private users: IUser[] = [
    {
      username: "user1",
      password: "password1",
      email: 1,
      role: "admin",
    },
  ];

  constructor() {
    super();
    this.users.push({
      username: "user2",
      password: "password2",
      email: 2,
      role: "user",
    });
    // this.createUser();
  }

  public createUser = async (req: express.Request, res: express.Response) => {
    try {
      const user: IUser = req.body;
      const newUser = new User(user);
      await newUser.save();
      if (newUser) {
        res.status(200).json({
          msg: "User created successfully",
          user: newUser,
        });
      } else {
        res.status(400).json({
          msg: "User not created",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  };

  public getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
      // const users = await User.find();
      const users = this.users;
      console.log("User:AsdASD ");
      console.log("user:", users);
      res.status(200).json({
        msg: "This is user route",
        users: users,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
