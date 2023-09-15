import { Post } from "../../orm/models/post.model";
import { User } from "../../orm/models/user.model";
import { React } from "../../orm/models/react.model";

import chalk from "chalk";
import HttpException from "../../exceptions/HttpException";
export default class ReactService {
    // REACTIONS
    /**
     * @description React a post || If duplicated request reaction -> remove reaction
     * @param postId Post id
     * @param userId User ID
     * @param react 1 => isLike || 0 => isDislike
     * @returns A post
     */
    public async reactPost(postId: number, userId: number, react: boolean): Promise<Post> {
        try {
            const post = await Post.findOne({
                where: {
                    id: postId,
                },
            });

            if (!post) {
                throw new HttpException(404, "Post not found");
            }

            const [reacted, res] = await React.findOrCreate({
                where: {
                    postId: postId,
                    userId: userId,
                },
                defaults: {
                    postId: postId,
                    userId: userId,
                },
            });

            if (reacted.isLike != react) {
                console.log(chalk.green("React updated successfully"));
                await React.update({
                    isLike: react,
                    isDislike: !react,
                }, {
                    where: {
                        postId: postId,
                        userId: userId,
                    },
                });
            } else {
                // Remove react
                await React.destroy({
                    where: {
                        id: reacted.id
                    },
                    force: true
                })
                console.log(chalk.green("React removed successfully"));
            }
            return post;
        } catch (error) {
            throw error;
        }
    }
}
