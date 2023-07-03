import { Sequelize } from "sequelize-typescript";
import path from "path";
import { User } from "./user.model";
import { Account } from "./account.model";
import { Health } from "./health.model";
import { Recipe } from "./recipe.model";
import { ingreCategory } from "./ingre.category.model";
import { Ingredient } from "./ingredient.model";

const env = process.env.NODE_ENV || "development";
const config = require(path.resolve("dist/src/configs/database.config"))[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, {
      ...config,
      models: [Account, User, Health, Recipe, ingreCategory, Ingredient],
      pool: {
        max: 20,
        // 1 hour
        acquireTimeout: 30000,
      },
    });

export default { Sequelize, sequelize };
