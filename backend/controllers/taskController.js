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


export const getTasks = async (req ,res ) => {
    try {
        const userId = req.userId;
        const task = await Task.find({user: userId});
    
        return res.status(200).json({
            message: "Tasks fetched .",
            task
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error ",
            error: error.message
        })
    }
}