import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";
import { User } from "../../orm/models/user.model";
import { Post } from "../../orm/models/post.model";
import { Tag } from "../../orm/models/tag.model";
import { Topic } from "../../orm/models/topic.model";
import { Comment } from "../../orm/models/comment.model";
import { PostImage } from "../../orm/models/post.images.model";
import sequelize from "sequelize";
import dotenv from "dotenv";
import aws from "aws-sdk";

import PostService from "../../services/Community/post.service";
import chalk from "chalk";

export default class CommunityController extends BaseController {
    constructor() {
        super();
      }
    public postService = new PostService();
    public getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const topic = req.query.topic as string;
            const limit = Number(req.query.limit ? req.query.limit : 10);
            const posts = await this.postService.getAllPosts(topic, limit);
            
            res.status(200).json({
                msg: "Get all posts successfully",
                posts: posts 
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    public getPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = Number(req.query.id);
            const post = await this.postService.getPost(postId);
            res.status(200).json({
                msg: "Get post successfully",
                post: post
            });
        } catch (err) {
            next(err);
        }
    }

    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            dotenv.config();
            if (req.files && req.body.photos) {
              const files = req.files as Record<string, Express.Multer.File[]>;
              // Check if the images is valid images type
              if (!files.photos.every((file) => file.mimetype.includes("image"))) {
                return res.status(400).json({
                  msg: "Invalid image type",
                });
              }
            }
            const arrayTags = req.body.tags.split(",");
            console.log(chalk.green("arrayTags: ", arrayTags));
            const postDTO = {
                content: req.body.content,
                isAnonymous: req.body.isAnonymous,
                userId: req.userData.id,
                topicId: req.body.topicId,
                tags: arrayTags,
                files: req.files ? req.files : null,
            }
            const post = await this.postService.createPost(postDTO);
        
            res.status(200).json({
              msg: "Upload object successfully",
              post: post
            });
        } catch (err) {
            next(err);
        }
    }

   
}
