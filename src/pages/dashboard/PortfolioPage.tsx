import { motion } from 'framer-motion';
import { AssetAllocationChart } from '../../components/dashboard/AssetAllocationChart';
import { HoldingsList } from '../../components/dashboard/HoldingsList';
import { useSimulation } from '../../context/SimulationContext';
import {
    Wallet,
    TrendingUp,
    ArrowUpRight,
    PieChart,
    Briefcase
} from 'lucide-react';

export const PortfolioPage = () => {
    const { balance, holdings } = useSimulation();

    // Calculate total net worth
    const holdingsValue = holdings.reduce((sum, h) => sum + (h.units * h.avgPrice), 0);
    const netWorth = balance + holdingsValue;

    // Placeholder for returns, assuming it would come from simulation context or calculation
    const returns = 2500000; // Example value

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
            className="space-y-10 pb-12"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Portfolio</h1>
                    <p className="text-gray-500 mt-2 font-medium">Track and monitor your virtual simulation holdings.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Summary & Chart */}
                <div className="space-y-8">
                    <motion.div
                        variants={itemVariants}
                        className="bg-black text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
                    >
                        <Wallet size={100} className="absolute -bottom-6 -right-6 text-white/5 group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative z-10">
                            <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Total Net Worth</p>
                            <h2 className="text-4xl font-black tracking-tight mb-8">₦{netWorth.toLocaleString()}</h2>

                            <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Total Returns</p>
                                    <p className="text-xl font-black text-green-400 flex items-center gap-1">
                                        <TrendingUp size={16} strokeWidth={3} />
                                        +{returns.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Day Change</p>
                                    <p className="text-xl font-black text-green-400 flex items-center gap-1">
                                        <ArrowUpRight size={16} strokeWidth={3} />
                                        ₦12,450
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                                <PieChart size={24} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Allocation</h3>
                        </div>
                        <AssetAllocationChart />
                    </motion.div>
                </div>

                {/* Right Column: Holdings List */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-2"
                >
                    <div className="p-8 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">My Holdings</h3>
                        </div>
                    </div>
                    <HoldingsList />
                </motion.div>
            </div>
        </motion.div>
    );
};

