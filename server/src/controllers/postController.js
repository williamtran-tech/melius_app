const Post = require("../models/Post");

exports.get_all_posts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate({
      path: "owner",
      select: ["username", "email"],
    });
    if (posts.length === 0) {
      res.status(404).json({
        message: "Posts not found",
      });
    } else {
      res.status(200).json({
        message: "Posts found",
        posts: posts,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.create_post = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      owner: req.body.ownerId,
    });

    await post.save();
    res.status(200).json({
      message: "Post created",
      post: post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
