import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";

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
            const userId = Number(req.userData.id);
            const post = await this.postService.getPost(postId, userId);
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

    public updatePost = async (req: Request, res: Response, next: NextFunction) => {}

    public deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = Number(req.query.id);
            const userId = Number(req.userData.id);
            await this.postService.deletePost(postId, userId);
            res.status(200).json({
                msg: "Delete post successfully"
            });
        } catch (err) {
            next(err);
        }
    }

    public undoDeletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = Number(req.query.id);
            const userId = Number(req.userData.id);
            const undoDeletedPost = await this.postService.undoDeletePost(postId, userId);
            res.status(200).json({
                msg: "Undo delete post successfully",
                post: undoDeletedPost
            });
        } catch (error) {
            next(error);
        }
    }
}