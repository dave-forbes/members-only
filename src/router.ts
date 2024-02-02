import express from "express";
const router = express.Router();
import {
  signUpGet,
  signUpPost,
  logInGet,
  profileGet,
  logInPost,
  logOutPost,
  getJoinClub,
  postJoinClub,
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

router.post("/log-in", logInPost);

// POST log out form

router.post("/log-out", logOutPost);

// GET posts page

router.get("/posts", getPosts);

// GET profile

router.get("/profile", profileGet);

// GET join club form

router.get("/join-club", getJoinClub);

// POST join club form

router.post("/join-club", postJoinClub);

export default router;
