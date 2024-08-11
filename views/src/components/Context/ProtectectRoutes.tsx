import React from 'react';
import { useAuth } from './AuthContext';
import { Redirect, Route } from 'wouter';

interface ProtectedRouteProps {
    path: string;
    allowedRoles: string[]; // Lista de roles permitidos
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, allowedRoles, children }) => {
    const { role, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Redirect to="/login/HJQL9823" />; 
    }

    if (!allowedRoles.includes(role || '')) {
        return <Redirect to="/" />;
    }

    return <Route path={path}>{children}</Route>;
};