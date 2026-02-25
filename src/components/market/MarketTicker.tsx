import { useMarket } from '../../context/MarketContext';
import { motion } from 'framer-motion';

export const MarketTicker = () => {
    const { assets } = useMarket();
    const ngxAssets = assets.filter(a => a.type === 'NGX');

    return (
        <div className="w-full bg-black text-white h-10 flex items-center overflow-hidden border-t border-white/10 z-[100] fixed bottom-0 left-0">
            <motion.div
                className="flex whitespace-nowrap gap-12 px-6"
                animate={{ x: [0, -2000] }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Duplicate items for seamless loop */}
                {[...ngxAssets, ...ngxAssets].map((asset, idx) => (
                    <div key={`${asset.symbol}-${idx}`} className="flex items-center gap-3">
                        <span className="font-black text-[10px] tracking-widest">{asset.symbol}</span>
                        <span className="font-bold text-xs">₦{asset.price.toLocaleString()}</span>
                        <span className={`text-[10px] font-black ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {asset.change >= 0 ? '▲' : '▼'} {Math.abs(asset.change)}%
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
