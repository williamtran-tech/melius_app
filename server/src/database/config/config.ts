import dotenv from "dotenv";

dotenv.config({
  path: "./../../environments/.env.development",
});

//path: "./environments/.env.development
// \src\database\config\config.ts
// \environments\.env.development

console.log("process.env.DB_HOST", process.env.DB_HOST);
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "mysql",
  },
};
