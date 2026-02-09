import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SearchX, TrendingUp, Filter, X, Check } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export const MarketPage = () => {
    const { assets } = useMarket();
    const navigate = useNavigate();
    // ... rest of state
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [activeTab, setActiveTab] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState<'none' | 'price-desc' | 'price-asc' | 'change' | 'name'>('none');

    useEffect(() => {
        const query = searchParams.get('search');
        if (query) setSearchQuery(query);
    }, [searchParams]);

    // Live Filtering based on type and search query
    let filteredAssets = assets;

    // Apply tab filter if no search
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredAssets = assets.filter(a =>
            a.symbol.toLowerCase().includes(lowerQuery) ||
            a.name.toLowerCase().includes(lowerQuery) ||
            a.sector.toLowerCase().includes(lowerQuery) ||
            a.description.toLowerCase().includes(lowerQuery)
        );
    } else if (activeTab !== 'All') {
        filteredAssets = assets.filter(a => a.type === activeTab);
    }

    // Apply Sorting
    if (sortBy === 'price-desc') {
        filteredAssets = [...filteredAssets].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-asc') {
        filteredAssets = [...filteredAssets].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'change') {
        filteredAssets = [...filteredAssets].sort((a, b) => b.change - a.change);
    } else if (sortBy === 'name') {
        filteredAssets = [...filteredAssets].sort((a, b) => a.symbol.localeCompare(b.symbol));
    }

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
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Market</h1>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-green-100">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Live
                        </div>
                    </div>
                    <p className="text-gray-500 font-medium">Discover top local and global assets.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-[450px] relative group"
                >
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-black transition-colors" />
                    <input
                        type="text"
                        placeholder="Search assets, sectors, or descriptions..."
                        className="w-full pl-14 pr-24 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold text-gray-900 shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-gray-400 hover:text-black transition-colors mr-1"
                            >
                                <X size={18} />
                            </button>
                        )}
                        <div className="h-6 w-[1px] bg-gray-200" />
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`p-2 rounded-xl transition-all ${isFilterOpen ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black bg-white hover:bg-gray-50'}`}
                        >
                            <Filter size={20} />
                        </button>
                    </div>

                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-full mt-4 w-64 bg-white rounded-3xl border border-gray-100 shadow-2xl p-4 z-50 space-y-2"
                            >
                                <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort By</div>
                                {[
                                    { id: 'none', label: 'Default' },
                                    { id: 'price-desc', label: 'Highest Price' },
                                    { id: 'price-asc', label: 'Lowest Price' },
                                    { id: 'change', label: 'Top Gainers' },
                                    { id: 'name', label: 'Alphabetical' }
                                ].map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => {
                                            setSortBy(option.id as any);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${sortBy === option.id ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {option.label}
                                        {sortBy === option.id && <Check size={16} strokeWidth={3} />}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Tabs & Search Indicator */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-8 border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth flex-1"
                    >
                        {['All', 'NGX', 'Global', 'Crypto', 'Bonds'].map(tab => (
                            <TabButton
                                key={tab}
                                label={tab}
                                isActive={searchQuery ? false : activeTab === tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setSearchQuery('');
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-600 bg-green-50 w-fit px-3 py-1.5 rounded-lg border border-green-100"
                    >
                        <Search size={12} />
                        Global Search Active: "{searchQuery}"
                    </motion.div>
                )}
            </div>

            {/* Assets Grid */}
            <motion.div
                key={`${activeTab}-${searchQuery}-${sortBy}`}
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
                        className="p-8 rounded-2xl border-2 border-gray-100 bg-white shadow-2xl shadow-gray-200/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-black transition-all duration-500 group cursor-pointer relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-black/10 transition-transform duration-500 group-hover:scale-110">
                                {asset.symbol[0]}
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${asset.change >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-700'}`}>
                                {asset.change >= 0 ? '+' : ''}{asset.change}%
                            </span>
                        </div>

                        <div className="mb-8">
                            <h3 className="font-black text-2xl text-gray-900 tracking-tight group-hover:text-green-600 transition-colors">{asset.symbol}</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">{asset.name}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-50 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-gray-100">
                                    {asset.sector}
                                </span>
                                <span className="px-2 py-1 bg-gray-50 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-gray-100">
                                    Vol: {(parseInt(asset.id) * 1.5).toFixed(1)}M
                                </span>
                            </div>
                        </div>

                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-[10px] text-gray-400 font-black mb-1 uppercase tracking-[0.2em]">Latest Price</div>
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
