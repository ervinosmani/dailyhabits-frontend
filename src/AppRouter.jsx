import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";

export default function AppRouter() {
    return (
        // AuthProvider e mbeshtjell gjithe aplikacionin
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    {/* Rruget publike: login & register */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Rruget e mbrojtura: brenda layout-it */}
                    <Route 
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Layout /> 
                            </ProtectedRoute>
                        }
                    >

                        {/* Faqja e dashboard-it (bosh path = faqja baze e layout-it) */}
                        <Route index element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}