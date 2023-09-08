import { BaseController } from "../abstractions/base.controller";
import { Request, Response, NextFunction } from "express";
import RecipeService from "../../services/recipe.service";
import { User } from "../../orm/models/user.model";
import { Post } from "../../orm/models/post.model";
import { Tag } from "../../orm/models/tag.model";
import { Topic } from "../../orm/models/topic.model";
import { Comment } from "../../orm/models/comment.model";
import { PostImage } from "../../orm/models/post.images.model";
import sequelize from "sequelize";
import dotenv from "dotenv";
import aws from "aws-sdk";

// Recipes Describe Data of nutrition
// 'calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)']] = df[['calories','total fat (PDV)','sugar (PDV)','sodium (PDV)','protein (PDV)','saturated fat (PDV)','carbohydrates (PDV)'

export default class CommunityController extends BaseController {
  constructor() {
    super();
  }
  public recipeService = new RecipeService();

  /**
   * Get all posts
   * @param req.query: Request { topic: string, limit: number}
   * @returns All posts of a topic with limit
   */
    public async getAllPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const topic = req.query.topic;
            const posts = await Post.findAll({
                attributes: ["id", "content", "isAnonymous", "createdAt", "updatedAt"],
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
                        name: topic,
                    }
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ["id", "comment", "isAnonymous", "createdAt", "updatedAt"],
                    where: {
                        postId: sequelize.col("Post.id"),
                        parentId: null, // Get only parent comments
                    },
                    include: [
                        {
                            model: User,
                            attributes: ["id", "fullName", 'img'],
                        },
                        {
                            model: Comment,
                            as: "replies",
                            attributes: ["id", "comment", "isAnonymous", "createdAt", "updatedAt"],
                            where: {
                                parentId: sequelize.col("comments.id"),
                            },
                            order: [["updatedAt", "DESC"]],
                            include: [
                                {
                                    model: User,
                                    attributes: ["id", "fullName", 'img']
                                }
                            ],
                        }
                    ],
                },
                {
                    model: PostImage,
                    attributes: ["id", "imagePath", "caption"],
                    where: {
                        postId: sequelize.col("Post.id"),
                    }
                }
                ],
                order: [["createdAt", "DESC"]],
                limit: req.query.limit ? Number(req.query.limit) : 10,
            })
            res.status(200).json({
                msg: "Get all posts successfully",
                posts: posts 
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

  /**
   * Create a post
   * @param req.body: Request { content: string, filePath: string, isAnonymous: boolean, userId: number, topicId: number, tagIds: number[] }
   * @returns A post
   */
    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            dotenv.config();
            if (req.files) {
              const files = req.files as Record<string, Express.Multer.File[]>;
              // Check if the images is valid images type
              if (!files.photos.every((file) => file.mimetype.includes("image"))) {
                return res.status(400).json({
                  msg: "Invalid image type",
                });
              }
              console.log(files.photos.map((file) => file.originalname));
              // Upload images to S3
              const s3 = new aws.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                region: process.env.AWS_REGION,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              });
              
              // // Upload new file to S3
              // const date = Date.parse(new Date().toISOString());
              // console.log(date);
        
              // // Convert timestamp to date time
              // const dateString = new Date(date).toJSON().slice(0, 19).replace('T', ' ');
              // console.log("Date Time:",dateString);
        
              files.photos.map(async (file) => {
                const timestamp = Date.parse(new Date().toISOString());
                const key = `posts/${timestamp}-${file.originalname}`;
                const uploadRes = await s3.upload({
                  Bucket: process.env.AWS_BUCKET_NAME!,
                  Body: file.buffer,
                  // File path in S3 bucket stored as Key
                  Key: key,
                }).promise();
              });
            }
        
            // console.log(uploadRes);
            // Download file from S3
        
            res.status(200).json({
              msg: "Upload object successfully",
            });
        } catch (err) {
            next(err);
        }
    }
}
