import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
