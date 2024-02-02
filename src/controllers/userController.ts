import { Request, Response } from "express";

// display sign-up form

const getSignUp = (req: Request, res: Response) => res.render("sign-up");

export { getSignUp };
