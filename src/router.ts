import express from "express";
const router = express.Router();

// GET home page

router.get("/", (req, res) => res.render("index"));

// GET sign-up form

router.get("/sign-up", (req, res) => res.render("sign-up"));

export default router;
