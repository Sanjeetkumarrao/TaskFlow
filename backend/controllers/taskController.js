import Task from "../models/Task.js";

export const createTask = async (req , res ) => {
    try {
        const {title, priority} = req.body;
        const userId = req.userId;

        const task = await Task.create({
            title: title,
            priority: priority,
            user: userId
        });

        return res.status(201).json({
            message: "Task created successfully.",
            task: task
        })
    } catch (error) {
        res.status(500).json({message:  error.message})
    }
}