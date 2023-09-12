import sequelize from "sequelize";

import { Post } from "../../orm/models/post.model";
import { User } from "../../orm/models/user.model";
import { Tag } from "../../orm/models/tag.model";
import { Topic } from "../../orm/models/topic.model";
import { PostImage } from "../../orm/models/post.images.model";
import { Comment }  from "../../orm/models/comment.model";
import { TagPostRels } from "../../orm/models/tag.post.rel.model";
import { View } from "../../orm/models/view.model";

import chalk from "chalk";
import HttpException from "../../exceptions/HttpException";
export default class TopicService {
    /**
     * 
     * @param 
     * @returns All hash tags
     */
  public getAllTopics = async () => {
    try {
      const topics = await Topic.findAll({
        attributes: ["id", "name"],
        order: [["name", "ASC"]],
      });
      return topics;
    } catch (err) {
      console.log(err);
      throw new HttpException(500, "Internal server error");
    }
  }
}
