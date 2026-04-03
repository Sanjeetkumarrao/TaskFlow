import { useEffect, useState } from "react";
import api from "../utils/api.js";
import Navbar from "../components/Navbar.jsx";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("low");

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

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">

            {/* Background Glow (same as login/register) */}
            <div className="absolute top-[-100px] left-[-80px] h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>
            <div className="absolute bottom-[-100px] right-[-80px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

            {/* Navbar */}
            <Navbar />

            <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 space-y-6">

                {/* Add Task Card */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-4 sm:p-5 flex gap-3">
                    
                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Task title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 bg-zinc-900/70 border border-white/10 text-white text-sm placeholder:text-zinc-500 px-4 py-3 rounded-2xl outline-none transition-all duration-300 focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10"
                    />

                    {/* Select */}
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="bg-zinc-900/70 border border-white/10 text-zinc-300 text-sm px-4 py-3 rounded-2xl outline-none transition-all duration-300 focus:border-blue-500/60"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    {/* Button */}
                    <button
                        onClick={addTask}
                        className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-blue-500/30 active:scale-[0.98]"
                    >
                        Add
                    </button>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl px-5 py-4 transition-all duration-300 hover:border-white/20"
                        >
                            <div>
                                <p className="text-white font-medium">
                                    {task.title}
                                </p>

                                <div className="flex items-center gap-2 mt-1 text-xs">
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

                            {/* Delete Button */}
                            <button className="text-xs text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/40 px-3 py-1.5 rounded-xl transition-all duration-300">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <p className="text-center text-zinc-500 text-sm mt-6">
                        Loading tasks...
                    </p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;