import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
    role: string | null;
    isAuthenticated: boolean;
    setAuth: (role: string | null, token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedRole = localStorage.getItem('role');
        const token = localStorage.getItem('token');
        if (savedRole && token) {
            setRole(savedRole);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const setAuth = (role: string | null, token: string | null) => {
        if (role && token) {
            localStorage.setItem('role', role);
            localStorage.setItem('token', token);
            setRole(role);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            setRole(null);
            setIsAuthenticated(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // O un spinner de carga
    }

    return (
        <AuthContext.Provider value={{ role, isAuthenticated, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};