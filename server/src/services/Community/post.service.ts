import sequelize from "sequelize";
import dotenv from "dotenv";
import aws from "aws-sdk";
import { Post } from "../../orm/models/post.model";
import { User } from "../../orm/models/user.model";
import { Tag } from "../../orm/models/tag.model";
import { Topic } from "../../orm/models/topic.model";
import { PostImage } from "../../orm/models/post.images.model";
import { Comment }  from "../../orm/models/comment.model";
import { TagPostRels } from "../../orm/models/tag.post.rel.model";
import chalk from "chalk";


export default class PostService {
    
    constructor() {}
    /**
     * Get all posts
     * @param req.query: Request { topic: string, limit: number}
     * @template {
    * "msg": "Get all posts successfully",
    * "posts": [
    *  {
    *     "id": 1,
    *     "content": "Test content",
    *    "isAnonymous": false,
    *    "createdAt": "2021-08-09T15:00:00.000Z",
    *    "updatedAt": "2021-08-09T15:00:00.000Z",
    *    "views": 0,
    *    "likes": 0,
    *    "dislikes": 0,
    *    "comments": 0,
    *    "User": {
    *       "id": 1,
    *       "fullName": "Nguyen Van A",
    *      }
    *  }
    * ]
    * }
    * @example /api/v1/community/posts?topic=QnA&limit=10
    * @returns All posts of a topic with limit
    */
    public async getAllPosts(topic: string, limit: number): Promise<Post[]> {
        try {
            const posts = await Post.findAll({
                attributes: [
                    "id", 
                    "content", 
                    "isAnonymous", 
                    "createdAt", 
                    "updatedAt", 
                    [sequelize.literal("(SELECT COUNT(view) FROM views WHERE views.postId = Post.id)"), "views"],
                    // Using COALESCE for return 0 if null 
                    // Using CAST for convert to SIGNED numeric data type instead of a string
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "likes"],
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isDislike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "dislikes"],
                    [sequelize.literal("(SELECT COUNT(id) FROM comments WHERE comments.postId = Post.id)"), "comments"]
                ],
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
                    required: false
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
                    model: PostImage,
                    attributes: ["id", "imagePath", "caption"],
                    where: {
                        postId: sequelize.col("Post.id"),
                    },
                    required: false
                },
                ],
                order: [["createdAt", "DESC"]],
                group: ["Post.id"],
                limit: limit,
            })
            return posts;
        } catch (err) {
        throw err;
        }
    }

    /**
         * 
         * @param req req.id: 
         * @return A post details
         * @example /api/v1/community/posts/1
         * @template {
     * "msg": "Get post successfully",
     * "post": {
     *  Post attributes, Views, Reacts, Comments, Tags, Topic, User
     * }
     * }
     */
    public async getPost(postId: number): Promise<Post> {
        try {
            const post = await Post.findOne({
                attributes: [
                    "id",
                    "content",
                    "isAnonymous",
                    "createdAt",
                    "updatedAt",
                    [sequelize.literal("(SELECT COUNT(view) FROM views WHERE views.postId = Post.id)"), "views"],
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isLike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "likes"],
                    [sequelize.fn("COALESCE", sequelize.literal("(SELECT CAST(SUM(isDislike) AS SIGNED) FROM reacts WHERE reacts.postId = Post.id)"), 0), "dislikes"],
                ],
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
                        required: false
                    },
                    {
                        model: Topic,
                        attributes: ["id", "name"],
                    },
                    {
                        model: Comment,
                        attributes: ["id", "comment", "isAnonymous", "createdAt", "updatedAt"],
                        as: "comments",
                        where: {
                            postId: sequelize.col("Post.id"),
                            parentId: null, // Get only parent comments
                        },
                        order: [["updatedAt", "DESC"]],
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
                        required: false,
                    },
                    {
                        model: PostImage,
                        attributes: ["id", "imagePath", "caption"],
                        where: {
                            postId: sequelize.col("Post.id"),
                        },
                        required: false
                    },
                    ],
                    where: {
                        id: postId,
                    },
                });
            return post as Post;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Create a post
     * @param req.body: Request { content: string, filePath: string, isAnonymous: boolean, userId: number, topicId: number, tagIds: number[] }
     * @returns A post
     */
    public async createPost(postDTO: any): Promise<Post> {
        try {
            dotenv.config();
            // Create post
            const createdPost = await Post.create({
                content: postDTO.content,
                isAnonymous: postDTO.isAnonymous,
                userId: postDTO.userId,
                topicId: postDTO.topicId,
            });

            // Associate post with tags
            if (postDTO.tags.length > 0) {
                postDTO.tags.map(async (tag: string) => {
                    const createdTag = await Tag.findOrCreate({
                        where: {
                            name: tag.trim(),
                        },
                        attributes: ["id", "name"]
                    });
                    
                    await TagPostRels.create({
                        postId: createdPost.id,
                        tagId: createdTag[0].id,
                    });
                });
            }

            console.log(chalk.green("Post created successfully"));
            if (postDTO.files['photos'] && postDTO.files['photos'].length > 0) {
                console.log(chalk.green("Uploading images..."));
                const files = postDTO.files as Record<string, Express.Multer.File[]>;
                // Upload images to S3
                const s3 = new aws.S3({
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    region: process.env.AWS_REGION,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                });
                
                // Upload new file to S3
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
                    // Associate post with images
                    await PostImage.create({
                        imagePath: process.env.AWS_URL + key,
                        postId: createdPost?.id,
                    });
                });
            
                console.log(chalk.green("Uploading images successfully"));
            }

            return createdPost;
        } catch (err) {
            throw err;
        }
    }


}