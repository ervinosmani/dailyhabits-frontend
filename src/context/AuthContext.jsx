import { createContext, useEffect, useState } from "react";

// 1. Krijo kontekstin
export const AuthContext = createContext();

// 2. Krijo komponentin qe do te mbeshtjelle aplikacionin
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // perdoruesi i loguar
    const [loading, setLoading] = useState(true); // gjendje fillestare

    // 3. Ruaje user-in ne localStorage per sesione te ardhshme
    useEffect(() => {
        const savedUserRaw = localStorage.getItem("auth_user");

        if (savedUserRaw) {
            try {
                const parsedUser = JSON.parse(savedUserRaw);
                setUser(parsedUser);
            } catch (err) {
                // console.error("Failed to parse user from localStorage", err);
                // Nese ndodh ndonje error, pastroj localStorage qe te mos ndodhe perseri
                localStorage.removeItem("auth_user");
            }
        }

        
        setLoading(false); // pasi mbaron kontrolli, vendosim loading false
    }, []);

    // 4. Funksioni login
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("auth_user", JSON.stringify(userData));
    };

    // 5. Funksioni logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("auth_user");
    };

    // 6. Vlera qe do te jete ne dispozicion ne gjithe aplikacionin
    const value = { user, login, logout, loading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}