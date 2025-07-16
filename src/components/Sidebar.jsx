import { Link, useLocation } from "react-router-dom";

// Komponenti Sidebar qe do shfaqet ne anen e majte te Dashboard-it
export default function Sidebar() {
    // Marrim rrugen aktuale per te stilizuar linkun aktiv
    const location = useLocation();

    // Lista e faqeve qe do shfaqen ne sidebar
    const navItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "My Habits", path: "/habits" },
        { name: "Completed", path: "/completed" },
        { name: "Profile", path: "/profile" },
    ];

    return (
        // aside eshte element semantic per sidebar
        <aside className="w-64 bg-white h-full shadow-md p-6 hidden md:block">

            {/* Titulli i aplikacionit ne krye te sidebar-it */}
            <h2 className="text-2xl font-bold text-[#4B7ABF] mb-6">Daily Habits</h2>

            {/* Navigimi me linkat e faqeve */}
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-2 rounded-md font-medium transition ${
                            location.pathname === item.path
                                ? "bg-[#4B7ABF] text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}