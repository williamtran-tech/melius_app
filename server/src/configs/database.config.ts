const path = require("path");
const mysql = require("mysql2");

// This for migration
require("dotenv").config({
  path: path.resolve("..", "..", "environments", ".env.development"),
});

// This for server - dist
require("dotenv").config({
  path: path.resolve("environments/.env.development"),
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
};
