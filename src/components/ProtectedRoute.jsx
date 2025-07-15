import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const { user, loading } = useContext(AuthContext);

    // Nese ende po ngarkohet useri nga localStorage, mos shfaq asgje
    if (loading) {
        return <div className="text-center py-10">Loading...</div>; // ose Spinner me vone
    }

    // Nese nuk ka user, ktheje te login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Nese gjithcka eshte ne rregull, lejo kalimin
    return children;
}