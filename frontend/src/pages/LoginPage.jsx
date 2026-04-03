import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import api from "../utils/api";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() => {
        try {
            const response = await api.post('/auth/login',{
                email,
                password
            })

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            console.log(response.data);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] flex items-center justify-center px-4">
            {/* Background Glow */}
            <div className="absolute top-25 -left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>
            <div className="absolute -bottom-25 -right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.08),transparent_25%)]"></div>

            <div className="relative z-10 w-full max-w-sm">
                {/* Logo */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        TaskFlow
                    </h1>
                    <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                        Welcome back, sign in to continue
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-6 sm:p-7">
                    <div className="space-y-4">
                        {/* Email Input */}
                        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3.5 transition-all duration-300 hover:border-white/20 focus-within:border-blue-500/60 focus-within:ring-4 focus-within:ring-blue-500/10">
                            <Mail
                                size={18}
                                className="text-zinc-500 transition-colors duration-300 group-focus-within:text-blue-400"
                            />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent text-white text-sm outline-none w-full placeholder:text-zinc-500"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3.5 transition-all duration-300 hover:border-white/20 focus-within:border-blue-500/60 focus-within:ring-4 focus-within:ring-blue-500/10">
                            <Lock
                                size={18}
                                className="text-zinc-500 transition-colors duration-300 group-focus-within:text-blue-400"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-transparent text-white text-sm outline-none w-full placeholder:text-zinc-500"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            className="group w-full rounded-2xl bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 active:scale-[0.99] flex items-center justify-center gap-2"
                        >
                            Log in
                            <ArrowRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </button>
                        {error && (
                        <p className="text-red-400 text-sm text-center mt-2">
                            {error}
                        </p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-zinc-500 text-sm text-center mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;