import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    // Marrim te dhenat e perdoruesit dhe funksionin logout nga konteksti
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showConfirm, setShowConfirm] = useState(false);

    // Funksioni qe therret logout dhe kthen perdoruesin ne login
    const handleLogout = () => {
        logout();       // Pastrohet localStorage dhe context
        navigate("/login");  // Ridrejtohet te faqja e login-it
    };

    // Kur klikohet "Logout" per here te pare
    const handleLogoutClick = () => {
        setShowConfirm(true);   // hap modalin
    };

    // Kur konfirmohet logout
    const handleConfirmLogout = () => {
        logout();
        navigate("/login")
    };

    // Anulo logout
    const handleCancelLogout = () => {
        setShowConfirm(false);
    };

    return (
        // Pjesa kryesore e faqes me gradient dhe padding
        <div className="min-h-screen bg-gradient-to-tr from-[#e3f2fd] to-[#bbdefb] p-6">
            {/* Kuti qendrore e permbajtjes */}
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6">

                {/* Header: pershendetje dhe butoni logout */}
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-[#4B7ABF]">
                        Welcome back, <span className="text-[3A6AA5]">{user?.name}</span>
                    </h1>

                    <button
                        onClick={handleLogoutClick}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                    {showConfirm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
                                <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={handleCancelLogout}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmLogout}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Yes, Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Placeholder per permbajtje qe do te shtojme ne hapat tjere */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Kartat do te vijne ketu (Hapi 2 e tutje) */}
                    <div className="bg-[#e3f2fd] p-4 rounded-lg shadow text-center text-gray-700 font-semibold">
                        Feature 1 Coming soon
                    </div>
                    <div className="bg-[#e3f2fd] p-4 rounded-lg shadow text-center text-gray-700 font-semibold">
                        Feature 2 Coming soon
                    </div>
                    <div className="bg-[#e3f2fd] p-4 rounded-lg shadow text-center text-gray-700 font-semibold">
                        Feature 3 Coming soon
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;