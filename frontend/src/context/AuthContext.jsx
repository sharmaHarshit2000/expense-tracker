import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ childern }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {childern}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)