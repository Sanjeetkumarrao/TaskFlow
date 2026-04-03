import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/70 backdrop-blur-2xl px-4 sm:px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-white font-bold text-2xl tracking-tight">
                    Task<span className="text-blue-400">Flow</span>
                </h1>

                {/* Right side */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-zinc-400 text-sm hidden sm:block">
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
            </div>
        </nav>
    );
}

export default Navbar;