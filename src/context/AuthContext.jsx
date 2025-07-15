import { createContext, useEffect, useState } from "react";

// 1. Krijo kontekstin
export const AuthContext = createContext();

// 2. Krijo komponentin qe do te mbeshtjelle aplikacionin
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // perdoruesi i loguar
    const [token, setToken] = useState(null);   // tokeni i autentikimit

    // 3. Ruaje token-in ne localStorage per sesione te ardhshme
    useEffect(() => {
        const savedToken = localStorage.getItem("auth_token");
        const savedUserRaw = localStorage.getItem("auth_user");

        if (savedToken && savedUserRaw) {
            try {
                const parsedUser = JSON.parse(savedUserRaw);
                setToken(savedToken);
                setUser(parsedUser);
            } catch (err) {
                console.error("Failed to parse user from localStorage", err);
                // Nese ndodh ndonje error, pastroj localStorage qe te mos ndodhe perseri
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
            }
        }
    }, []);

    // 4. Funksioni login
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(userData));
    };

    // 5. Funksioni logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
    };

    // 6. Vlera qe do te jete ne dispozicion ne gjithe aplikacionin
    const value = { user, token, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}