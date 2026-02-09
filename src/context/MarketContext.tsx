import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Asset, MOCK_ASSETS } from '../services/AssetService';

interface MarketContextType {
    assets: Asset[];
    getAssetBySymbol: (symbol: string) => Asset | undefined;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider = ({ children }: { children: React.ReactNode }) => {
    const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);

    useEffect(() => {
        const interval = setInterval(() => {
            setAssets(prevAssets =>
                prevAssets.map(asset => {
                    // Small random fluctuation (-0.2% to +0.25%)
                    const fluctuation = (Math.random() * 0.45 - 0.2) / 100;
                    const newPrice = asset.price * (1 + fluctuation);

                    // Update change based on original price (simulated daily start price)
                    // For demo, we just slightly drift the change percentage too
                    const newChange = asset.change + (fluctuation * 100);

                    return {
                        ...asset,
                        price: parseFloat(newPrice.toFixed(2)),
                        change: parseFloat(newChange.toFixed(2))
                    };
                })
            );
        }, 3000); // Live real-time updates every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const getAssetBySymbol = (symbol: string) => {
        return assets.find(a => a.symbol.toUpperCase() === symbol.toUpperCase());
    };

    return (
        <MarketContext.Provider value={{ assets, getAssetBySymbol }}>
            {children}
        </MarketContext.Provider>
    );
};

export const useMarket = () => {
    const context = useContext(MarketContext);
    if (context === undefined) {
        throw new Error('useMarket must be used within a MarketProvider');
    }
    return context;
};
