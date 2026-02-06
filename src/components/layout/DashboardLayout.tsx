import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="pt-16 flex max-w-7xl mx-auto">
                <Sidebar />
                <main className="flex-1 min-w-0 p-6 lg:p-8">
                    <div className="animate-in fade-in duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
