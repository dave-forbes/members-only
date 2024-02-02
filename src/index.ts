// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// mongoose connection
require("dotenv").config();

mongoose.set("strictQuery", false);
main().catch((err) => console.error("MongoDB connection error:", err));

async function main() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI not found in environment variables');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");



app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
