const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A post must have a title"],
  },
  content: {
    type: String,
    required: [true, "A post must have a content"],
  },
  // owner is the id of the user who created the post
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
