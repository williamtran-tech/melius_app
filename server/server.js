const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

// Database connection
const db = require("./src/configs/db.config");
db.connectDatabase();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./src/routes/router"));
app.get("/", (req, res) => {
  res.json({
    message: "Landing MTFK!",
  });
});
app.get("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
