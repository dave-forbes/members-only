import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import passport from "passport";
import bcrypt from "bcrypt";

// display sign-up form

export const signUpGet = (req: Request, res: Response) => {
  res.render("sign-up");
};

// post sign-up form to create user

export const signUpPost = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name is required"),
  body("lastName")
    .trim()
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

export const logInGet = (req: Request, res: Response) => {
  res.render("log-in");
};

// post log in form to log in user

export const logInPost = passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/log-in",
  failureFlash: true, // Enable flash messages for failures
});

// display profile

export const profileGet = (req: Request, res: Response) => {
  res.render("profile", { user: req.user });
};
