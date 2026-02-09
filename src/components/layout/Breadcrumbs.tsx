import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (location.pathname === '/' || location.pathname === '/dashboard') return null;

    return (
        <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
            <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-black transition-colors">
                <Home size={14} />
                <span>Dashboard</span>
            </Link>

            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                // Skip the first 'dashboard' segment if we're inside the dashboard
                if (name === 'dashboard' && index === 0) return null;

                return (
                    <div key={name} className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-gray-300" />
                        {isLast ? (
                            <span className="text-black">{name.replace(/-/g, ' ')}</span>
                        ) : (
                            <Link to={routeTo} className="hover:text-black transition-colors">
                                {name.replace(/-/g, ' ')}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};
