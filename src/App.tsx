import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Home } from './pages/Home';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { PortfolioPage } from './pages/dashboard/PortfolioPage';
import { MarketPage } from './pages/dashboard/MarketPage';
import { AssetDetailPage } from './pages/dashboard/AssetDetailPage';
import { SimulatorPage } from './pages/dashboard/SimulatorPage';
import { HistoryPage } from './pages/dashboard/HistoryPage';
import { AuthProvider } from './context/AuthContext';
import { SimulationProvider } from './context/SimulationContext';

function App() {
  return (
    <AuthProvider>
      <SimulationProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/simulator" element={<SimulatorPage />} />
            </Route>

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="market" element={<MarketPage />} />
              <Route path="market/:symbol" element={<AssetDetailPage />} />
              <Route path="history" element={<HistoryPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Router>
      </SimulationProvider>
    </AuthProvider>
  );
}

export default App;

