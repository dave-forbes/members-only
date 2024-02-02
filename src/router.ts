import express from "express";
const router = express.Router();
import { getSignUp } from "./controllers/userController";

// GET home page

router.get("/", (req, res) => res.render("index"));

// GET sign-up form

router.get("/sign-up", getSignUp);

export default router;
