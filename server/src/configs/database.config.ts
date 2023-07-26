const path = require("path");
const mysql = require("mysql2");
let envPath;

if (process.env.STATUS === "production") {
  require("dotenv").config({
    path: path.resolve(
      __dirname,
      ".env.development"
    ),
  });

  console.log("DB ENV Production: ", process.env.STATUS);
} else if (process.env.STATUS === "development") {
  // This for migration
  envPath = path.resolve(
    __dirname,
    "..",
    "..",
    "environments",
    ".env.development"
  );
  require("dotenv").config({
    path: envPath,
  });

  // This for server - dist
  envPath = path.resolve(
    "environments",
    ".env.development"
  );
  require("dotenv").config({
    path: envPath,
  });

  console.log("DB ENV Development: ", process.env.STATUS);
}

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
  production: {
    username,
    password,
    database,
    host,
    dialect: "mysql",
  }
};
