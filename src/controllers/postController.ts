import asyncHandler from "express-async-handler";
import Post from "../models/post";
import { NextFunction, Request, Response } from "express";

// GET list of posts

const getPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().exec();

  res.render("posts", { posts: allPosts });
});

// GET create post form

const getCreatePost = (req: Request, res: Response, next: NextFunction) => {
  res.render("create-post");
};

const postController = {
  getPosts,
  getCreatePost,
};

export default postController;
