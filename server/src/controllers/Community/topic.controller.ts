import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";

import PostService from "../../services/Community/post.service";
import TopicService from "../../services/Community/topic.service";
import chalk from "chalk";

export default class TopicController extends BaseController {
    constructor() {
        super();
    }
    public topicService = new TopicService();
    public postService = new PostService();
    // TOPIC FUNCTIONS
    public getAllTopics = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const topics = await this.topicService.getAllTopics();
            res.status(200).json({
                msg: "Get all topics successfully",
                topics: topics
            });
        } catch (err) {
            next(err);
        }
    }

    public getAllPostsByTopic = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.userData.id);
            const topicId = Number(req.query.id);
            const limit = Number(req.query.limit ? req.query.limit : 10);
            const [topic, posts] = await this.postService.getAllPostsByTopic(topicId, limit, userId);
            res.status(200).json({
                msg: "Get all posts by topic successfully",
                topic: topic,
                posts: posts
            });
        } catch (err) {
            next(err);
        }
    }
}
