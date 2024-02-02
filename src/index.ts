import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import session from "express-session";
import logger from "morgan";
import router from "./router";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/user";
import bcrypt from "bcrypt";
import flash from "express-flash";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// mongoose connection
require("dotenv").config();

mongoose.set("strictQuery", false);

async function main() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI not found in environment variables");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

main().catch((err) => console.error("MongoDB connection error:", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// middleware

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

app.use(flash());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });

      if (!user) {
        console.log("User not found:", username);
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        console.log("Incorrect password for user:", username);
        return done(null, false, { message: "Incorrect password" });
      }

      console.log("Authentication successful for user:", username);
      return done(null, user);
    } catch (err) {
      console.error("Error during authentication:", err);
      return done(err);
    }
  })
);

passport.serializeUser((user: any, done) => {
  console.log("Serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  console.log("Deserializing user with id:", id);
  try {
    const user = await User.findById(id);
    console.log("Deserialized user:", user);
    done(null, user);
  } catch (err) {
    console.error("Error during deserialization:", err);
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const parentDir = path.resolve(__dirname, "..");
app.use(express.static(path.join(parentDir, "public")));
app.use("/node_modules", express.static(path.join(parentDir, "node_modules")));

app.use("/", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  const httpErr = err as createHttpError.HttpError;
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? httpErr : {};

  // render the error page
  res.status(httpErr.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
