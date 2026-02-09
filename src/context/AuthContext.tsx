import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    riskTolerance?: 'low' | 'moderate' | 'high';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, name: string, password: string) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    verifyPassword: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('finexa_user');
        const token = localStorage.getItem('finexa_token');
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user session", e);
                localStorage.removeItem('finexa_user');
                localStorage.removeItem('finexa_token');
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user: userData } = response.data;

            setUser(userData);
            localStorage.setItem('finexa_token', token);
            localStorage.setItem('finexa_user', JSON.stringify(userData));
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    };

    const register = async (email: string, name: string, password: string) => {
        try {
            await api.post('/auth/register', { username: name, email, password });
            // After register, we could auto-login or redirect to login
            await login(email, password);
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Registration failed');
        }
    };

    const verifyPassword = async (password: string): Promise<boolean> => {
        if (!user?.email) return false;
        try {
            await api.post('/auth/login', { email: user.email, password });
            return true;
        } catch (error) {
            return false;
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('finexa_user', JSON.stringify(updatedUser));
        // In a real app, you would also PUT to API here
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('finexa_user');
        localStorage.removeItem('finexa_token');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, updateProfile, verifyPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
