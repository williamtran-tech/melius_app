import { Router } from "express";
import { User } from "../../orm/models/user.model";
import { Account } from "../../orm/models/account.model";
import { Role } from "../../orm/models/role.model";
import { Recipe } from "../../orm/models/recipe.model";
import express, { NextFunction } from "express";
import sequelize, { where } from "sequelize";
import chalk from "chalk";
import { Post } from "../../orm/models/post.model";
import { View } from "../../orm/models/view.model";
import { Comment } from "../../orm/models/comment.model";
export const databaseRouter = Router();

databaseRouter.post("/create-models", async (req, res) => {
  try {
    // Add new record to table
    const userRole = await Role.findOrCreate({
        where: {
            name: "Doctor",
        },
        defaults: {
            name: "Doctor",
        },
    })

    // Alter tables
    // await User.sync({ alter: true }); => Alter table to match with model (add new column, remove column)
    // By default, the Index file will sync all models with database
    await Post.sync({ alter: true });

    // Init models
    

    if (userRole[1]) {
        console.log(chalk.green("Doctor Role created"));
    }

    res.status(200).json({
        msg: "Models created"
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

databaseRouter.post("/test", async (req, res) => {
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
    res.status(500).json({
        msg: "Internal server error",
        });
  }
});
