const express = require("express");
const router = express.Router();
const postController = require("./../controllers/postController");

router.get("/", postController.get_all_posts);
router.post("/create-post", postController.create_post);

module.exports = router;
