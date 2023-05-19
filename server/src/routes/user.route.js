const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.get("/", userController.allUsers);
router.get("/:id", userController.get_user_details);
router.post("/create-user", userController.create_user);
router.put("/update-user/:id", userController.update_user);

module.exports = router;
