import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/70 backdrop-blur-2xl px-4 sm:px-6 py-3 sm:py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                
                {/* Logo */}
                <h1 className="text-white font-bold text-xl sm:text-2xl tracking-tight">
                    Task<span className="text-blue-400">Flow</span>
                </h1>

                {/* Desktop Right */}
                <div className="hidden sm:flex items-center gap-4">
                    <span className="text-zinc-400 text-sm">
                        Hey,{" "}
                        <span className="text-white font-medium">
                            {user?.name}
                        </span>
                    </span>

                    <button
                        onClick={handleLogout}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Right */}
                <div className="sm:hidden flex items-center gap-2">
                    
                    {/* Small Avatar */}
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm text-white font-medium">
                        {user?.name?.charAt(0)}
                    </div>

                    {/* Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-300"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="sm:hidden mt-3 px-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 space-y-3">
                        
                        <p className="text-sm text-zinc-400">
                            Hey,{" "}
                            <span className="text-white font-medium">
                                {user?.name}
                            </span>
                        </p>

                        <button
                            onClick={handleLogout}
                            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-2.5 text-sm font-semibold text-white"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;