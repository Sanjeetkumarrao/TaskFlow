import express from 'express';
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { authMiddleware } from './middleware/authMiddleware.js';
import cors from 'cors'
const app = express();

app.use(cors({
    origin: "https://inspiring-scone-85621e.netlify.app"
    // origin: "http://localhost:5173"
}))

app.use(express.json());


app.get('/', (req , res ) => {
    res.send("Server is running")
});


app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

export default app;