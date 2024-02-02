import express from "express";
const router = express.Router();
import { getSignUp, postSignUp } from "./controllers/userController";
import { getPosts } from "./controllers/postController";

// GET home page

router.get("/", (req, res) => res.render("index"));

// GET sign-up form

router.get("/sign-up", getSignUp);

// POST sign-up form

router.post("/sign-up", postSignUp);

// GET message page

router.get("/posts", getPosts);

export default router;
