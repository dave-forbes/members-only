import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

// display sign-up form

export const getSignUp = (req: Request, res: Response) => {
  res.render("sign-up");
};

// post sign-up form to create user

export const postSignUp = [
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.render("sign-up");
  }),
];
