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
import { MarketProvider } from './context/MarketContext';
import { MarketTicker } from './components/market/MarketTicker';
import { Header } from './components/layout/Header';
import { ScrollToTop } from './components/layout/ScrollToTop';

import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { PressPage } from './pages/PressPage';
import { LearnPage } from './pages/LearnPage';
import { SettingsPage } from './pages/SettingsPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

function App() {
  return (
    <AuthProvider>
      <MarketProvider>
        <SimulationProvider>
          <Router>
            <ScrollToTop />
            <MarketTicker />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/simulator" element={<SimulatorPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/press" element={<PressPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/disclosures" element={<TermsPage />} />
              </Route>

              <Route path="/settings" element={
                <>
                  <Header />
                  <main className="pt-16">
                    <SettingsPage />
                  </main>
                </>
              } />

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
      </MarketProvider>
    </AuthProvider>
  );
}

export default App;
