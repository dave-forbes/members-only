import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Post from "../models/post";
import { NextFunction, Request, Response } from "express";

// GET list of posts

const getPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().populate("user").exec();

  const allPostsReversed = allPosts.reverse();

  res.render("posts", { posts: allPostsReversed, user: req.user });
});

// GET create post form

const getCreatePost = (req: Request, res: Response, next: NextFunction) => {
  res.render("create-post", { user: req.user });
};

// POST create post form

const postCreatePost = [
  body("title")
    .trim()
    .customSanitizer((value) => {
      return value.replace(/[^a-zA-Z0-9\s\_\-']/g, "");
    }),
  body("text")
    .trim()
    .customSanitizer((value) => {
      return value.replace(/[^a-zA-Z0-9\s\_\-']/g, "");
    })
    .isLength({ min: 1 })
    .withMessage("Text is required")
    .isLength({ max: 500 })
    .withMessage("Character limit exceeded"),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const user: any = req.user;

    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      user: user._id,
    });

    if (!errors.isEmpty()) {
      res.render("create-post", {
        post: newPost,
        errors: errors.array(),
        user: req.user,
      });
    } else {
      try {
        await newPost.save();
      } catch (error) {
        console.error("Error saving post to database:", error);
        res.render("create-post", {
          post: newPost,
          errors: [{ msg: "Unable to save the post. Please try again later." }],
          user: req.user,
        });
      }

      res.redirect("/posts");
    }
  }),
];

const postDeletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Post.findByIdAndDelete(req.body.postid);
    res.redirect("/posts");
  }
);

const postController = {
  getPosts,
  getCreatePost,
  postCreatePost,
  postDeletePost,
};

export default postController;
