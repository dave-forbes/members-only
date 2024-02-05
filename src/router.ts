import express from "express";
const router = express.Router();
import userController from "./controllers/userController";
import postController from "./controllers/postController";

// GET home page

router.get("/", (req, res) => res.render("index", { user: req.user }));

// GET sign-up form

router.get("/sign-up", userController.signUpGet);

// POST sign-up form

router.post("/sign-up", userController.signUpPost);

// GET log-in form

router.get("/log-in", userController.logInGet);

// POST log in form

router.post("/log-in", userController.logInPost);

// POST log out form

router.post("/log-out", userController.logOutPost);

// GET posts page

router.get("/posts", postController.getPosts);

// GET profile

router.get("/profile", userController.profileGet);

// GET join club form

router.get("/join-club", userController.getJoinClub);

// POST join club form

router.post("/join-club", userController.postJoinClub);

// GET become admin form

router.get("/become-admin", userController.getAdminForm);

// POST become admin form

router.post("/become-admin", userController.postAdminForm);

// GET create post form

router.get("/create-post", postController.getCreatePost);

// POST create post form

router.post("/create-post", postController.postCreatePost);

// Delete post

router.post("/delete-post", postController.postDeletePost);

export default router;
