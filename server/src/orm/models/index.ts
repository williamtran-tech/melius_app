import { Sequelize } from "sequelize-typescript";
import path from "path";
import { User } from "./user.model";
import { Account } from "./account.model";
import { Health } from "./health.model";

const env = process.env.NODE_ENV || "development";
const config = require(path.resolve("dist/src/configs/database.config"))[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, {
      ...config,
      models: [Account, User, Health],
    });

export default { Sequelize, sequelize };
