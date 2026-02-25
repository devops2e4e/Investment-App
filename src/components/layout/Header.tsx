import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown, Settings } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Simulator', path: '/simulator' },
        { name: 'Market', path: '/dashboard/market' },
        { name: 'Learn', path: '/learn' },
        { name: 'About', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
                {/* Left: Logo */}
                <div className="flex-1 flex justify-start">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <Logo />
                    </Link>
                </div>

                {/* Center: Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8 justify-center">
                    {navLinks.map(link => {
                        const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative text-sm font-bold transition-all whitespace-nowrap py-2 ${isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="header-active"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right: Auth Actions */}
                <div className="flex-1 flex justify-end items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                                        {user?.name?.[0] || 'U'}
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                        {user?.name?.split(' ')[0]}
                                    </span>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                                            Dashboard
                                        </Link>
                                        <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                                            <Settings size={16} />
                                            Settings
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-green-600 transition-colors">
                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-6 py-2.5 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all shadow-sm"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 space-y-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 max-h-[calc(100vh-5rem)] overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-bold text-gray-900 py-2 border-b border-gray-50"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Dashboard Navigation for Mobile (when authenticated) */}
                    {isAuthenticated && (
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Dashboard</p>
                            <div className="flex flex-col gap-2">
                                <Link
                                    to="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-gray-900 py-3 px-4 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Overview
                                </Link>
                                <Link
                                    to="/dashboard/portfolio"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-gray-900 py-3 px-4 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Simulated Portfolio
                                </Link>
                                <Link
                                    to="/dashboard/market"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-gray-900 py-3 px-4 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Market Data
                                </Link>
                                <Link
                                    to="/dashboard/history"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-gray-900 py-3 px-4 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    Simulation History
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-4 text-center font-bold text-gray-900 bg-gray-50 rounded-xl"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/settings"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-4 text-center font-bold text-gray-900 bg-gray-50 rounded-xl"
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="mb-10 w-full py-4 text-center font-bold text-red-600 bg-red-50 rounded-xl"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="w-full py-4 text-center font-bold text-gray-900 bg-gray-50 rounded-xl">
                                    Log in
                                </Link>
                                <Link to="/signup" className="w-full py-4 text-center font-bold text-white bg-black rounded-xl">
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

