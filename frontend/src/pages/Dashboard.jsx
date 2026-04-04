import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Navbar from "../components/Navbar.jsx";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("low");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data.task);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async () => {
        if (!title.trim()) return;

        try {
            const task = await api.post("/tasks", { title, priority });

            if (task) {
                fetchTasks();
            }

            setTitle("");
            setPriority("low");
        } catch (error) {
            console.log(error);
        }
    };

    const updateTaskTitle = async (taskId) => {
        if (!editedTitle.trim()) return;

        try {
            await api.put(`/tasks/${taskId}`, {
                title: editedTitle,
            });

            setEditingTaskId(null);
            setEditedTitle("");
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task._id);
        setEditedTitle(task.title);
    };

    const toggleStatus = async(taskId, currentStatus) => {
        try {
            const newStatus = currentStatus === "pending" ? "completed" : "pending"
            await api.put(`/tasks/${taskId}`, {status: newStatus})
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[-100px] left-[-80px] h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>
            <div className="absolute bottom-[-100px] right-[-80px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

            {/* Navbar */}
            <Navbar />

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
                
                {/* Page Heading */}
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Your Tasks
                    </h1>
                    <p className="text-zinc-400 text-sm sm:text-base mt-2">
                        Organize your day and stay productive.
                    </p>
                </div>

                {/* Add Task Card */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row gap-3">
                        
                        {/* Input */}
                        <input
                            type="text"
                            placeholder="Task title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="flex-1 bg-zinc-900/70 border border-white/10 text-white text-sm sm:text-base placeholder:text-zinc-500 px-4 py-3.5 rounded-2xl outline-none transition-all duration-300 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10"
                        />

                        {/* Select */}
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="bg-zinc-900/70 border border-white/10 text-zinc-300 text-sm sm:text-base px-4 py-3.5 rounded-2xl outline-none transition-all duration-300 focus:border-blue-500/60"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                        {/* Button */}
                        <button
                            onClick={addTask}
                            className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-blue-500/30 active:scale-[0.98]"
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <p className="text-center text-zinc-500 text-sm mt-6">
                        Loading tasks...
                    </p>
                ) : tasks.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
                        <h2 className="text-lg font-semibold text-white">
                            No tasks yet
                        </h2>
                        <p className="text-zinc-400 text-sm mt-2">
                            Add your first task to get started.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl px-5 py-4 transition-all duration-300 hover:border-white/20"
                            >
                                <div className="min-w-0">
                                    {editingTaskId === task._id ? (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={editedTitle}
                                                onChange={(e) => setEditedTitle(e.target.value)}
                                                className="w-full bg-zinc-900/70 border border-white/10 text-white text-sm placeholder:text-zinc-500 px-4 py-2.5 rounded-xl outline-none transition-all duration-300 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10"
                                            />

                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <button
                                                    onClick={() => updateTaskTitle(task._id)}
                                                    className="w-full sm:w-auto text-xs font-medium px-4 py-2 rounded-xl transition-all duration-300 border border-blue-400/20 bg-blue-500/10 text-blue-400 hover:bg-blue-500/15 hover:border-blue-400/40 hover:text-blue-300 active:scale-[0.98]"
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setEditingTaskId(null);
                                                        setEditedTitle("");
                                                    }}
                                                    className="w-full sm:w-auto text-xs font-medium px-4 py-2 rounded-xl transition-all duration-300 border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-white font-medium break-words">
                                            {task.title}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                                        <span className="text-zinc-500 capitalize">
                                            {task.priority}
                                        </span>
                                        <span className="text-zinc-700">•</span>
                                        <span
                                            className={`capitalize ${
                                                task.status === "completed"
                                                    ? "text-green-400"
                                                    : "text-yellow-400"
                                            }`}
                                        >
                                            {task.status}
                                        </span>
                                    </div>
                                </div>

                                {editingTaskId !== task._id && (
                                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={() => handleEditClick(task)}
                                            className="w-full sm:w-auto text-xs font-medium text-blue-400 hover:text-blue-300 border border-blue-400/20 hover:border-blue-400/40 bg-blue-500/5 hover:bg-blue-500/10 px-4 py-2 rounded-xl transition-all duration-300 active:scale-[0.98]"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => toggleStatus(task._id, task.status)}
                                            className={`w-full sm:w-auto text-xs font-medium px-4 py-2 rounded-xl transition-all duration-300 border active:scale-[0.98] ${
                                                task.status === "completed"
                                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-400/20 hover:bg-emerald-500/20 hover:border-emerald-400/40 hover:text-emerald-300"
                                                    : "bg-green-500/10 text-green-400 border-green-400/20 hover:bg-green-500/15 hover:border-green-400/40 hover:text-green-300"
                                            }`}
                                        >
                                            {task.status === "pending" ? "✓ Complete" : "↺ Mark Pending"}
                                        </button>

                                        <button
                                            onClick={() => deleteTask(task._id)}
                                            className="w-full sm:w-auto text-xs font-medium text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/40 bg-red-500/5 hover:bg-red-500/10 px-4 py-2 rounded-xl transition-all duration-300 active:scale-[0.98]"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;