import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
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

// POST create post form

const postCreatePost = [
  body("title")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Title is required"),
  body("text")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Text is required"),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const user: any = req.user;

    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      user: user._id,
    });

    if (!errors.isEmpty()) {
      res.render("create-post", { post: newPost, errors: errors.array() });
    } else {
      await newPost.save();
      res.redirect("/posts");
    }
  }),
];

const postController = {
  getPosts,
  getCreatePost,
  postCreatePost,
};

export default postController;
