import dotenv from "dotenv";
dotenv.config();

console.log(process.env.EMAIL)
console.log(process.env.EMAIL_PASSWORD)
import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});