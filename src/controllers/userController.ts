import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import Post from "../models/post";
import passport from "passport";
import bcrypt from "bcrypt";

// display sign-up form

const signUpGet = (req: Request, res: Response) => {
  res.render("sign-up");
};

// post sign-up form to create user

const signUpPost = [
  body("firstName")
    .trim()
    .customSanitizer((value) => {
      return value.replace(/[^a-zA-Z0-9\s\_\-']/g, "");
    })
    .isLength({ min: 1 })
    .withMessage("First name is required"),
  body("lastName")
    .trim()
    .customSanitizer((value) => {
      return value.replace(/[^a-zA-Z0-9\s\_\-']/g, "");
    })
    .isLength({ min: 1 })
    .withMessage("Last name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      // check if user with email already exists
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          throw err;
        }

        const errors = validationResult(req);

        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          membership: "non-member",
        });

        if (!errors.isEmpty()) {
          res.render("sign-up", { user: newUser, errors: errors.array() });
        } else {
          await newUser.save();
          res.redirect("/log-in");
        }
      });
    } catch (error) {
      next(error);
    }
  }),
];

// display log in form

const logInGet = (req: Request, res: Response) => {
  res.render("log-in");
};

// post log in form to log in user

const logInPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureFlash: true, // Enable flash messages for failures
});

// post log out form to log user out

const logOutPost = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err: Error) => {
    if (err) {
      return next(err);
    }
    res.render("index", { user: req.user });
  });
};

// display profile

const profileGet = asyncHandler(async (req: Request, res: Response) => {
  const postCount = await Post.find({ user: req.user }).exec();
  res.render("profile", { user: req.user, postCount: postCount.length });
});

// display join club form

const getJoinClub = (req: Request, res: Response) => {
  res.render("join-club", { user: req.user });
};

// post join club

const postJoinClub = [
  body("secret")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Secret password is required"),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (req.body.secret === "password") {
      const user: any = req.user;
      const userId = user._id;
      await User.findByIdAndUpdate(userId, { membership: "member" });
      res.redirect("/profile");
    } else {
      res.render("join-club", {
        user: req.user,
        errors: errors.array(),
        passwordError: "Incorrect password. The password is 'password'",
      });
    }
  }),
];

// display become admin form

const getAdminForm = (req: Request, res: Response) => {
  res.render("become-admin", { user: req.user });
};

// post become admin form

const postAdminForm = [
  body("admin")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Admin password is required"),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (req.body.admin === "admin") {
      const user: any = req.user;
      const userId = user._id;
      await User.findByIdAndUpdate(userId, { membership: "admin" });
      res.redirect("/");
    } else {
      res.render("become-admin", {
        user: req.user,
        errors: errors.array(),
        passwordError: "Incorrect password. The password is 'admin'",
      });
    }
  }),
];

const userController = {
  signUpGet,
  signUpPost,
  logInGet,
  profileGet,
  logInPost,
  logOutPost,
  getJoinClub,
  postJoinClub,
  getAdminForm,
  postAdminForm,
};

export default userController;
