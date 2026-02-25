import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PriceHistoryChart } from '../../components/market/PriceHistoryChart';
import { InvestModal } from '../../components/dashboard/InvestModal';
import { InfoTooltip } from '../../components/ui/InfoTooltip';
import { useMarket } from '../../context/MarketContext';
import {
    SearchX,
    Zap,
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Globe,
    Info
} from 'lucide-react';

export const AssetDetailPage = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const { getAssetBySymbol } = useMarket();
    const asset = symbol ? getAssetBySymbol(symbol) : null;

    if (!asset) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <SearchX size={48} />
                </div>
                <h2 className="text-3xl font-black mb-2 text-gray-900">Asset Not Found</h2>
                <p className="text-gray-500 mb-8 font-medium">We couldn't find the asset you're looking for.</p>
                <Link to="/dashboard/market" className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all">
                    <ArrowLeft size={20} />
                    Back to Market
                </Link>
            </motion.div>
        );
    }

    const [activeRange, setActiveRange] = useState('1M');
    const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
    const isPositive = true; // Mocking "green" day for simplicity

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-full space-y-12 pb-12"
        >
            {/* Header / Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 font-bold mb-4 uppercase tracking-widest">
                <Link to="/dashboard/market" className="hover:text-black transition-colors">Market</Link>
                <span className="text-gray-200">/</span>
                <span className="text-black">{asset.name}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content: Chart & Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Title Block */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="flex gap-6">
                                <div className="w-20 h-20 bg-black text-white rounded-[1.5rem] flex items-center justify-center text-2xl font-black shadow-xl shadow-black/20">
                                    {symbol?.substring(0, 2)}
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none mb-3">{symbol}</h1>
                                    <div className="flex items-center gap-2 text-gray-500 font-black text-xs uppercase tracking-widest">
                                        <Globe size={14} className="text-blue-500" />
                                        {asset.name}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-black text-gray-900 tracking-tight mb-2">₦{asset.price.toLocaleString()}</div>
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-black text-xs ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                    {isPositive ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
                                    1.24% Today
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="mb-8 min-h-[350px]">
                            <PriceHistoryChart basePrice={asset.price} range={activeRange} />
                        </div>



                        {/* Time Ranges */}
                        <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl w-fit">
                            {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setActiveRange(range)}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeRange === range ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                <Info size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">About {symbol}</h3>
                        </div>
                        <p className="text-gray-500 leading-relaxed font-medium text-lg">
                            {asset.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-10 border-t border-gray-50">
                            <StatBlock label="Sector" value={asset.sector} />
                            <StatBlock label="Market Cap" value="₦4.5T" tooltip="The total value of all a company's shares of stock." />
                            <StatBlock label="Vol (24h)" value="₦245M" tooltip="The amount of an asset that has changed hands over the last 24 hours." />
                            <StatBlock label="P/E Ratio" value="12.4" tooltip="Price-to-Earnings Ratio. A high P/E ratio could mean that a company's stock is over-valued." />
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar: Actions */}
                <div className="space-y-6">
                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/40 sticky top-24"
                    >
                        <h3 className="text-2xl font-black mb-8 text-gray-900 tracking-tight">Analysis Tools</h3>

                        <button
                            onClick={() => setIsInvestModalOpen(true)}
                            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-green-900/20 active:scale-95 mb-4"
                        >
                            Simulate Buy
                        </button>

                        <Link
                            to="/simulator"
                            className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-100 text-gray-600 font-black rounded-2xl hover:border-black hover:text-black transition-all mb-8 group"
                        >
                            <Zap size={20} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                            Projection Engine
                        </Link>

                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Market Status</span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                View historical performance and project future growth based on market analysis.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>


            <InvestModal
                isOpen={isInvestModalOpen}
                onClose={() => setIsInvestModalOpen(false)}
                asset={{ symbol: symbol || '', name: asset.name, price: asset.price }}
            />
        </motion.div>
    );
};

const StatBlock = ({ label, value, tooltip }: { label: string, value: string, tooltip?: string }) => (
    <div>
        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5 flex items-center gap-1">
            {label}
            {tooltip && <InfoTooltip content={tooltip} />}
        </div>
        <div className="text-lg font-black text-gray-900 tabular-nums tracking-tight">{value}</div>
    </div>
);
