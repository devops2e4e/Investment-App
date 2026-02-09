import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Briefcase, TrendingUp, History } from 'lucide-react';

const sidebarItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Simulated Portfolio', path: '/dashboard/portfolio', icon: Briefcase },
    { label: 'Market Data', path: '/dashboard/market', icon: TrendingUp },
    { label: 'Simulation History', path: '/dashboard/history', icon: History },
];

export const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-gray-50 border-r border-gray-100 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto duration-300">
            <div className="p-6 space-y-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
                    Menu
                </div>
                {sidebarItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${isActive
                                ? 'bg-black text-white shadow-xl shadow-black/10 translate-x-1'
                                : 'text-gray-600 hover:bg-black hover:text-white hover:translate-x-1 transition-smooth'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute left-0 w-1 h-6 bg-green-500 rounded-r-full"
                                />
                            )}
                            <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            </span>
                            <span className="font-bold text-sm tracking-wide">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto p-8">
                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Sim Token</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-bold text-gray-900">Live Simulation</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

