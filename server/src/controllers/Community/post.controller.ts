import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";

import PostService from "../../services/Community/post.service";
import TopicService from "../../services/Community/topic.service";
import TagService from "../../services/Community/tag.service";
import PostImageService from "../../services/Community/post.image.service";
import chalk from "chalk";
import HttpException from "../../exceptions/HttpException";

export default class CommunityController extends BaseController {
    constructor() {
        super();
    }
    public postService = new PostService();
    public topicService = new TopicService();
    public tagService = new TagService();
    public postImageService = new PostImageService();

    public getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.userData.id);
            const posts = await this.postService.getAllPosts(userId);
            res.status(200).json({
                msg: "Get all posts successfully",
                posts: posts
            });
        } catch (err) {
            next(err);
        }
    }


    public getPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = Number(req.params.id);
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
            const arrayTags = req.body.tags ? req.body.tags.split(",") : null;
            console.log(chalk.green("arrayTags: ", arrayTags));
            const postDTO = {
                content: req.body.content,
                isAnonymous: Boolean(Number(req.body.isAnonymous)),
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

    public updatePost = async (req: Request, res: Response, next: NextFunction) => {
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

            const arrayTags = req.body.tags ? req.body.tags.split(",") : null;
            console.log(chalk.green("arrayTags: ", arrayTags));
            const postId = Number(req.params.id);
            const userId = Number(req.userData.id);

            const postDTO = {
                id: postId,
                content: req.body.content,
                isAnonymous: req.body.isAnonymous,
                topicId: req.body.topicId,
                tags: arrayTags,
                files: req.files ? req.files : null,
            }

            const post = await this.postService.updatePost(postDTO, userId);
            res.status(200).json({
                msg: "Update post successfully",
                post: post
            });
        } catch (err) {
            next(err);
        }
    }

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
            await this.postService.undoDeletePost(postId, userId);
            res.status(200).json({
                msg: "Undo delete post successfully"
            });
        } catch (err) {
            next(err);
        }
    }

    public deleteImages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(chalk.green("Delete images"));
            const imageIds = req.query.imageIds ? (req.query.imageIds as any).split(",") : null;
            const userId = Number(req.userData.id);
            const postId = Number(req.params.id);
            if (!imageIds) {
                throw new HttpException(400, "Invalid image ids");
            } else {
                console.log(chalk.green("imageIds: ", imageIds));
                await this.postImageService.deleteImages(imageIds, userId, postId);
            }

            res.status(200).json({
                msg: "Delete images successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
