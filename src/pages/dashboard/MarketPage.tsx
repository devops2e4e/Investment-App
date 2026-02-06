import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SearchX, TrendingUp, Filter } from 'lucide-react';
import { AssetService } from '../../services/AssetService';

export const MarketPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    const filteredAssets = AssetService.getFiltered(activeTab, searchQuery);

    const handleAssetClick = (symbol: string) => {
        navigate(`/dashboard/market/${symbol}`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-10 pb-12">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Market</h1>
                    <p className="text-gray-500 mt-2 font-medium">Discover top local and global assets.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-[450px] relative group"
                >
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-black transition-colors" />
                    <input
                        type="text"
                        placeholder="Search symbols (e.g., MTNN, AAPL)..."
                        className="w-full pl-14 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-gray-900 shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                        <Filter size={18} />
                    </div>
                </motion.div>
            </div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-8 border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth"
            >
                {['All', 'NGX', 'Global', 'Crypto', 'Bonds'].map(tab => (
                    <TabButton
                        key={tab}
                        label={tab}
                        isActive={activeTab === tab}
                        onClick={() => setActiveTab(tab)}
                    />
                ))}
            </motion.div>

            {/* Assets Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredAssets.map(asset => (
                    <motion.div
                        key={asset.id}
                        variants={itemVariants}
                        onClick={() => handleAssetClick(asset.symbol)}
                        className="p-8 rounded-[2.5rem] border border-gray-50 bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-black/10 transition-transform duration-500 group-hover:scale-110">
                                {asset.symbol[0]}
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${asset.change >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-700'}`}>
                                {asset.change >= 0 ? '+' : ''}{asset.change}%
                            </span>
                        </div>

                        <div className="mb-10">
                            <h3 className="font-black text-2xl text-gray-900 tracking-tight group-hover:text-green-600 transition-colors">{asset.symbol}</h3>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{asset.name}</p>
                        </div>

                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-[10px] text-gray-400 font-black mb-1 uppercase tracking-[0.2em]">Live Price</div>
                                <div className="font-black text-gray-900 text-2xl tracking-tight">₦{asset.price.toLocaleString()}</div>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center group-hover:scale-110 transition-all shadow-xl shadow-black/20">
                                <TrendingUp size={22} strokeWidth={2.5} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {filteredAssets.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-200">
                            <SearchX size={40} />
                        </div>
                    </div>
                    <h3 className="font-black text-2xl text-gray-900 tracking-tight">No assets found</h3>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto mt-2">Try adjusting your search or filters to see more results.</p>
                </motion.div>
            )}
        </div>
    );
};

const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`pb-5 text-sm font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${isActive
            ? 'text-black'
            : 'text-gray-400 hover:text-gray-600'
            }`}
    >
        {label}
        {isActive && (
            <motion.span
                layoutId="activeTab"
                className="absolute bottom-0 left-0 w-full h-1 bg-black rounded-full"
            />
        )}
    </button>
);

