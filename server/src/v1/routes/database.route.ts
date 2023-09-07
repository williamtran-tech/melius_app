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

import aws from "aws-sdk";
import dotenv from "dotenv";
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
    await Comment.sync({ alter: true });
    await View.sync({ alter: true });
    await React.sync({ alter: true });
    await Post.sync({ alter: true });
    await Tag.sync({ alter: true });
    await TagPostRels.sync({ force: true });

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

databaseRouter.get("/all-posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "content", "filePath", "isAnonymous", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          attributes: ["id", "fullName", "gender", "img"],
          where: {
            id: sequelize.col("userId"),
          }
        },
        {
          model: Tag,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Topic,
          attributes: ["id", "name"],
          where: {
            postId: sequelize.col("Post.id"),
          }
        }
      ],
      order: [["createdAt", "DESC"]],
    })
    res.status(200).json({
      msg: "Get all posts successfully",
      posts: posts 
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
        msg: "Internal server error",
        });
  }
});

databaseRouter.get("/all-images",async (req, res) => {
  try {
    dotenv.config();
    
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    // Upload new file to S3
    const uploadRes = await s3.upload({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Body: "Yo wassup",
      // File path in S3 bucket stored as Key
      Key: "handbooks/test.txt",
    }).promise();

    console.log(uploadRes);
    // Download file from S3

    res.status(200).json({
      msg: "Upload object successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
})
