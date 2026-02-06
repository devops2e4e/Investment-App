import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    riskTolerance?: 'low' | 'moderate' | 'high';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password?: string) => void;
    logout: () => void;
    register: (email: string, name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('finexa_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user session", e);
                localStorage.removeItem('finexa_user');
            }
        }
    }, []);

    const login = (email: string) => {
        // Mock login
        const mockUser = {
            id: '1',
            name: 'Finexa User',
            email,
            riskTolerance: 'moderate' as const,
        };
        setUser(mockUser);
        localStorage.setItem('finexa_user', JSON.stringify(mockUser));
    };

    const register = (email: string, name: string) => {
        // Mock register
        const newUser = {
            id: '2',
            name,
            email,
            riskTolerance: 'moderate' as const,
        };
        setUser(newUser);
        localStorage.setItem('finexa_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('finexa_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
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
