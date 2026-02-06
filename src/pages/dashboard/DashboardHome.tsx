import { useAuth } from '../../context/AuthContext';
import { useSimulation } from '../../context/SimulationContext';
import { PriceHistoryChart } from '../../components/market/PriceHistoryChart';
import {
    TrendingUp,
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    Activity,
    Gamepad2,
    ChevronRight,
    Search
} from 'lucide-react';

export const DashboardHome = () => {
    const { user } = useAuth();
    const { balance, holdings, transactions } = useSimulation();

    // Calculate portfolio value from holdings
    const portfolioHoldingsValue = holdings.reduce((sum, h) => sum + (h.units * h.avgPrice), 0);
    const totalPortfolioValue = balance + portfolioHoldingsValue;

    // For demo, we keep profitLoss mock until we have historical tracking
    const profitLoss = +45000;
    const profitLossPercent = +3.75;

    const recentActivity = transactions.slice(0, 3);

    return (
        <div className="space-y-8 pb-12">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 border border-blue-100">
                        <Gamepad2 size={14} />
                        Simulation Mode
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}</h1>
                    <p className="text-gray-500 mt-1 font-medium">Here's what's happening with your virtual portfolio today.</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-black hover:border-gray-200 transition-all shadow-sm">
                        <Search size={20} />
                    </button>
                    <button className="px-6 py-3 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                        + Invest
                    </button>
                </div>
            </div>


            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-black text-white rounded-[2rem] shadow-xl transition-all hover:scale-[1.02] duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <TrendingUp size={80} />
                    </div>
                    <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Total Portfolio Value</p>
                    <h2 className="text-4xl font-black tracking-tight">₦{totalPortfolioValue.toLocaleString()}</h2>
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-green-500/20 text-green-400 text-xs font-black">
                        <ArrowUpRight size={14} strokeWidth={3} />
                        <span>{profitLossPercent}% (+₦{profitLoss.toLocaleString()})</span>
                    </div>
                </div>

                <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Buying Power</p>
                    <h2 className="text-4xl font-black tracking-tight text-gray-900">₦{balance.toLocaleString()}</h2>
                    <div className="mt-6 flex items-center gap-2 text-gray-400">
                        <Wallet size={16} />
                        <span className="text-xs font-bold">Ready to deploy</span>
                    </div>
                </div>

                <div className="p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Assets Held</p>
                    <h2 className="text-4xl font-black tracking-tight text-green-600">{holdings.length}</h2>
                    <div className="mt-6 flex items-center gap-2 text-gray-400">
                        <Activity size={16} />
                        <span className="text-xs font-bold">Diversified holdings</span>
                    </div>
                </div>
            </div>

            {/* Portfolio Performance Chart */}
            <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm p-10 transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Portfolio Performance</h3>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Historical growth analysis over 30 days</p>
                    </div>
                    <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                        {['1D', '1W', '1M', '1Y', 'ALL'].map((range) => (
                            <button
                                key={range}
                                className={`px-4 py-2 text-xs font-black rounded-xl transition-all ${range === '1M' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-80 w-full">
                    <PriceHistoryChart basePrice={totalPortfolioValue} />
                </div>
            </div>


            {/* Recent Activity */}
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Recent Activity</h3>
                    <button className="flex items-center gap-1 text-green-600 font-black text-sm group">
                        View transactions
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden transition-all">
                    {recentActivity.map((item) => (
                        <div key={item.id} className="p-8 border-b border-gray-50 last:border-0 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm
                                    ${item.type === 'Buy' ? 'bg-blue-50 text-blue-600 shadow-blue-100/50' :
                                        item.type === 'Sell' ? 'bg-orange-50 text-orange-600 shadow-orange-100/50' : 'bg-green-50 text-green-600 shadow-green-100/50'}`}>
                                    {item.type === 'Buy' ? <ArrowDownLeft size={24} strokeWidth={2.5} /> :
                                        item.type === 'Sell' ? <ArrowUpRight size={24} strokeWidth={2.5} /> :
                                            <Wallet size={24} strokeWidth={2.5} />}
                                </div>
                                <div>
                                    <h4 className="font-black text-lg text-gray-900 tracking-tight">{item.assetSymbol}</h4>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.type} • {item.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`font-black text-lg block tracking-tight ${item.type === 'Buy' ? 'text-gray-900' : 'text-green-600'}`}>
                                    {item.type === 'Buy' ? '-' : '+'}₦{item.amount.toLocaleString()}
                                </span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.status}</span>
                            </div>
                        </div>
                    ))}

                    {recentActivity.length === 0 && (
                        <div className="p-10 text-center text-gray-500 text-sm italic">
                            No recent simulation activity.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
