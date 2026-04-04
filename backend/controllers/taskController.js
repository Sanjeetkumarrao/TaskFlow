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
            message: error.message
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const data = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            data,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task Updated Successfully",
            updatedTask
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const deleteTask = async(req ,res) =>{
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId)

        return res.status(200).json({
            message: "Task Deleted.",
            deletedTask
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}