import asyncHandler from "express-async-handler";
import Post from "../models/post";

// GET list of posts

const getPosts = asyncHandler(async (req, res, next) => {
  const allPosts = Post.find().exec();

  res.render("posts", { posts: allPosts });
});

const postController = {
  getPosts,
};

export default postController;
