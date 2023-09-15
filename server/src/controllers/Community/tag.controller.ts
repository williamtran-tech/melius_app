import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";

import PostService from "../../services/Community/post.service";
import TagService from "../../services/Community/tag.service";
import chalk from "chalk";

export default class TagController extends BaseController {
    constructor() {
        super();
    }
    public tagService = new TagService();
    public postService = new PostService();
    // TAG FUNCTIONS
    public getAllTags = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tags = await this.tagService.getAllTags();
            res.status(200).json({
                msg: "Get all topics successfully",
                tags: tags
            });
        } catch (err) {
            next(err);
        }
    }
    
    public getAllPostsByTag = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tagId = Number(req.query.id);
            const limit = Number(req.query.limit ? req.query.limit : 10);
            const posts = await this.postService.getAllPostsByTag(tagId, limit);
            res.status(200).json({
                msg: "Get all posts by tag successfully",
                posts: posts
            });
        } catch (err) {
            next(err);
        }
    }
}
