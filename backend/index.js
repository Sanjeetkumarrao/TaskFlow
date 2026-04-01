import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});