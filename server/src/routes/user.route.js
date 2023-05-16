const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.post("/create-user", userController.create_user);

router.get("/", userController.get_user);

module.exports = router;
