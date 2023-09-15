import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";

import PostService from "../../services/Community/post.service";
import ReactService from "../../services/Community/react.service";
import chalk from "chalk";

export default class ReactController extends BaseController {
    constructor() {
        super();
    }
    public postService = new PostService();
    public reactService = new ReactService();
    // REACT FUNCTIONS
    public reactPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = Number(req.params.id);
            const userId = Number(req.userData.id);
            const react = Number(req.query.react);
            
            // Update react
            await this.reactService.reactPost(postId, userId, Boolean(react));
            // Get post
            const post = await this.postService.getPost(postId, userId);

            res.status(200).json({
                msg: "React post successfully",
                post: post
            });
        } catch (err) {
            next(err);
        }
    }
}
