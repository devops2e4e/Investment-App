import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';

export const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="pt-20 pb-10 flex max-w-[1600px] mx-auto min-h-screen">
                <Sidebar />
                <main className="flex-1 min-w-0 p-10 lg:p-14">
                    <Breadcrumbs />
                    <div className="animate-in fade-in duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
