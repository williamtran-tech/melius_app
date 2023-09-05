import { Sequelize } from "sequelize-typescript";
import path from "path";
import { User } from "./user.model";
import { Account } from "./account.model";
import { Health } from "./health.model";
import { Recipe } from "./recipe.model";
import { IngreCategory } from "./ingre.category.model";
import { Ingredient } from "./ingredient.model";
import { Allergy } from "./allergy.model";
import { AvailableIngredient } from "./available.ingredient.model";
import { Role } from "./role.model";
import { UserRole } from "./user.role.model";
import { MealPlan } from "./meal.plan.model";
import { PlanDetail } from "./plan.detail.model";
import { Post } from "./post.model";
import { View } from "./view.model";
import { React } from "./react.model";
import { Comment } from "./comment.model";
import { Topic } from "./topic.model";
import { Tag } from "./tag.model";
import { TagPostRels } from "./tag.post.rel.model";
import { CommentReact } from "./comment.react.model";

const env = process.env.NODE_ENV || "development";
const config = require(path.resolve("dist/src/configs/database.config"))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
      ...config,
      models: [
        Account,
        Role,
        UserRole,
        User,
        Health,
        Recipe,
        MealPlan,
        PlanDetail,
        IngreCategory,
        Ingredient,
        AvailableIngredient,
        Allergy,
        View,
        React,
        Comment,
        Topic,
        Tag,
        CommentReact,
        Post,
        TagPostRels,
      ],
      pool: {
        max: 20,
        // 1 hour
        // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
        acquireTimeout: 1000000,
      },
    });

export default { Sequelize, sequelize };
