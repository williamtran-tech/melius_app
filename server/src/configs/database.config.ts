const path = require("path");
const mysql = require("mysql2");
let envPath;

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
