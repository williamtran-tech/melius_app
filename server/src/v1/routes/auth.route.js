const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const authController = require("../../controllers/authController");

router.post("/", userController.login);

router.get("/google", authController.googleLogin);
router.get("/google/callback", authController.callback);
router.get("/google/success", authController.success);
router.get("/google/error", authController.error);

module.exports = router;
