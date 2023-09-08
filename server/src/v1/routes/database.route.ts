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
import { React } from "../../orm/models/react.model";
import { TagPostRels } from "../../orm/models/tag.post.rel.model";
import { Tag } from "../../orm/models/tag.model";
import { Topic } from "../../orm/models/topic.model";
import { CommentReact } from "../../orm/models/comment.react.model";
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
    await CommentReact.sync({ alter: true });
    await Comment.sync({ alter: true });
    // await View.sync({ alter: true });
    // await React.sync({ alter: true });
    await Post.sync({ alter: true });
    // await TagPostRels.sync({ force: true });
    // await Tag.sync({ alter: true });

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
