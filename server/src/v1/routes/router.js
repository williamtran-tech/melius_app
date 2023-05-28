const express = require("express");
const router = express.Router();

router.use("/users", require("./user.route"));
router.use("/posts", require("./post.route"));
router.use("/auth", require("./auth.route"));

module.exports = router;
