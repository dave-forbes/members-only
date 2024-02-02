import express from "express";
const router = express.Router();
import {
  signUpGet,
  signUpPost,
  logInGet,
  profileGet,
  logInPost,
} from "./controllers/userController";
import { getPosts } from "./controllers/postController";

// GET home page

router.get("/", (req, res) => res.render("index"));

// GET sign-up form

router.get("/sign-up", signUpGet);

// POST sign-up form

router.post("/sign-up", signUpPost);

// GET log-in form

router.get("/log-in", logInGet);

// POST log in form

router.post("/log-in", logInPost, (req, res) => {
  console.log("Reached /log-in route");
  res.redirect("/");
});

// GET posts page

router.get("/posts", getPosts);

// GET profile

router.get("/profile", profileGet);

export default router;
