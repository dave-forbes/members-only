// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// mongoose connection


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");



app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
