import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
    // Marrim te dhenat e perdoruesit dhe funksionin logout nga konteksti
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    // Funksioni qe therret logout dhe kthen perdoruesin ne login
    const handleLogoutClick = () => setShowConfirm(true);
    const handleConfirmLogout = () => {
        logout();   // Pastrohet localStorage dhe context
        window.location.href = "/"; // Shkon në landing direkt, jashtë rrugëve të mbrojtura
    };
    // Kur klikohet "Logout" per here te pare
    const handleCancelLogout = () => setShowConfirm(false);

    return (
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
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
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
  );
}