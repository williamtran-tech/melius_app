import e, { Router } from "express";
import { User } from "../../orm/models/user.model";
import { Account } from "../../orm/models/account.model";
import { Recipe } from "../../orm/models/recipe.model";
import express, { NextFunction } from "express";
import sequelize, { where } from "sequelize";
export const defaultRouter = Router();

defaultRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll({});
    const accounts = await Account.findAll({});
    res.status(200).json({
      msg: "This is default route",
      users: users,
      accounts: accounts,
      // dupUserAccount: dupUserAccount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

defaultRouter.post("/test", async (req, res) => {
  try {
    const dupUserAccount = await Account.create({
      email: req.body.email,
      password: req.body.password,
      userId: req.body.userId,
    });
    res.status(200).json({
      msg: "This is default route",
      dupUserAccount: dupUserAccount,
    });
  } catch (err: any) {
    console.log(err);
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        msg: "1:1 relationship already exists",
      });
    } else {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
});
