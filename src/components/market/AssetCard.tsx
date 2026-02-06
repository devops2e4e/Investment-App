import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';

interface AssetCardProps {
    symbol: string;
    name: string;
    price: number;
    change: number; // Percent change
    type: 'NG Stock' | 'US Stock' | 'Bond' | 'ETF';
}

export const AssetCard = ({ symbol, name, price, change, type }: AssetCardProps) => {
    const isPositive = change >= 0;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Link
                to={`/dashboard/market/${symbol}`}
                className="group bg-white p-6 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 block relative overflow-hidden"
            >
                <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-lg shadow-black/10 transition-transform duration-500 group-hover:scale-110">
                        {symbol.substring(0, 2)}
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 uppercase tracking-wider ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {isPositive ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
                        {isPositive ? '+' : ''}{change}%
                    </span>
                </div>

                <div className="mb-4">
                    <h3 className="font-black text-xl text-gray-900 group-hover:text-green-600 transition-colors tracking-tight">{symbol}</h3>
                    <p className="text-xs text-gray-500 font-bold truncate tracking-wide">{name}</p>
                </div>

                <div className="flex items-end justify-between mt-6">
                    <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Current Price</div>
                        <div className="font-black text-2xl tracking-tight text-gray-900">
                            {type === 'US Stock' ? '$' : '₦'}{price.toLocaleString()}
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl border-2 border-gray-50 flex items-center justify-center text-gray-300 group-hover:border-black group-hover:text-black transition-all">
                        <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

