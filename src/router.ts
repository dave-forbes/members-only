import express from "express";
const router = express.Router();
import { signUpGet, signUpPost } from "./controllers/userController";
import { getPosts } from "./controllers/postController";

// GET home page

router.get("/", (req, res) => res.render("index"));

// GET sign-up form

router.get("/sign-up", signUpGet);

// POST sign-up form

router.post("/sign-up", signUpPost);

// GET message page

router.get("/posts", getPosts);

export default router;
