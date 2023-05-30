const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// // This session is used for storing user data - OAuth
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

// const passport = require("passport");
const port = process.env.PORT || 5050;
const app = express();

// Database connection
const db = require("./src/configs/db.config");
db.connectDatabase();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", require("./src/v1/routes/router"));
app.get("/", (req, res) => {
  res.json({
    message: "Landing MTFK!",
  });
});

// This must be the last route
app.get("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
    req: req.url,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
