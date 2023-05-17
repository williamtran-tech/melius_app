const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.get("/", userController.get_user);
router.get("/:id", userController.get_user_details);
router.post("/create-user", userController.create_user);

module.exports = router;
