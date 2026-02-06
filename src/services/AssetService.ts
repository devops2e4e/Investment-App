
export interface Asset {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    type: 'NGX' | 'Global' | 'Crypto' | 'Bonds';
    sector: string;
    description: string;
}

export const MOCK_ASSETS: Asset[] = [
    // Nigeria Stocks (NGX)
    { id: '1', symbol: 'MTNN', name: 'MTN Nigeria', price: 280.50, change: 1.25, type: 'NGX', sector: 'Telecommunications', description: 'Leading telecommunications provider in Nigeria.' },
    { id: '2', symbol: 'DANGCEM', name: 'Dangote Cement', price: 310.00, change: -0.50, type: 'NGX', sector: 'Industrial Goods', description: 'Largest cement producer in Sub-Saharan Africa.' },
    { id: '3', symbol: 'ZENITH', name: 'Zenith Bank', price: 34.50, change: 2.10, type: 'NGX', sector: 'Financial Services', description: 'One of the largest financial institutions in Nigeria.' },
    { id: '4', symbol: 'GTCO', name: 'GT Corporate', price: 38.20, change: 0.85, type: 'NGX', sector: 'Financial Services', description: 'A leading Nigerian multinational financial services group.' },
    { id: '5', symbol: 'NESTLE', name: 'Nestle Nigeria', price: 1050.00, change: -1.20, type: 'NGX', sector: 'Consumer Goods', description: 'A leading nutrition, health and wellness company in Nigeria.' },
    { id: '6', symbol: 'AIRTELAFRI', name: 'Airtel Africa', price: 1200.00, change: 0.45, type: 'NGX', sector: 'Telecommunications', description: 'Global telecommunications provider with operations in 14 countries.' },
    { id: '7', symbol: 'BUACEMENT', name: 'BUA Cement', price: 95.00, change: 1.15, type: 'NGX', sector: 'Industrial Goods', description: 'A major cement manufacturing company in Nigeria.' },

    // Global Stocks
    { id: '10', symbol: 'AAPL', name: 'Apple Inc.', price: 235000.00, change: 0.85, type: 'Global', sector: 'Technology', description: 'Designs and manufactures iPhones, iPads, and Macs.' },
    { id: '11', symbol: 'TSLA', name: 'Tesla Inc.', price: 185000.00, change: -1.20, type: 'Global', sector: 'Automotive', description: 'Electric vehicle and clean energy company.' },
    { id: '12', symbol: 'MSFT', name: 'Microsoft Corp.', price: 420000.00, change: 1.10, type: 'Global', sector: 'Technology', description: 'Leader in software, services, and cloud computing.' },
    { id: '13', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 175000.00, change: 0.95, type: 'Global', sector: 'Consumer Cyclical', description: 'Connects millions of customers with retail and services.' },
    { id: '14', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 125000.00, change: 4.20, type: 'Global', sector: 'Technology', description: 'Pioneer in GPU-accelerated computing.' },
    { id: '15', symbol: 'NFLX', name: 'Netflix Inc.', price: 650000.00, change: 0.30, type: 'Global', sector: 'Communication Services', description: 'Global streaming entertainment service.' },

    // Crypto
    { id: '20', symbol: 'BTC', name: 'Bitcoin', price: 98000000.00, change: 3.50, type: 'Crypto', sector: 'Digital Currency', description: 'First decentralized cryptocurrency.' },
    { id: '21', symbol: 'ETH', name: 'Ethereum', price: 4500000.00, change: 2.80, type: 'Crypto', sector: 'Smart Contracts', description: 'Leading smart contract platform.' },
    { id: '22', symbol: 'SOL', name: 'Solana', price: 150000.00, change: -5.40, type: 'Crypto', sector: 'High Performance', description: 'Layer-1 blockchain for speed and scalability.' },
    { id: '23', symbol: 'BNB', name: 'Binance Coin', price: 650000.00, change: 1.15, type: 'Crypto', sector: 'Exchange Token', description: 'Utility token for the Binance ecosystem.' },

    // Bonds
    { id: '30', symbol: 'FGN2030', name: 'FGN Bond 2030', price: 1000.00, change: 0.05, type: 'Bonds', sector: 'Sovereign', description: 'Federal Government of Nigeria sovereign bond.' },
    { id: '31', symbol: 'FGN2035', name: 'FGN Bond 2035', price: 1000.00, change: 0.02, type: 'Bonds', sector: 'Sovereign', description: 'Long-term government debt security.' },
];

export const AssetService = {
    getAll: () => MOCK_ASSETS,

    getById: (id: string) => MOCK_ASSETS.find(a => a.id === id),

    getBySymbol: (symbol: string) => MOCK_ASSETS.find(a => a.symbol.toUpperCase() === symbol.toUpperCase()),

    search: (query: string) => {
        const lowerQuery = query.toLowerCase();
        return MOCK_ASSETS.filter(a =>
            a.symbol.toLowerCase().includes(lowerQuery) ||
            a.name.toLowerCase().includes(lowerQuery)
        );
    },

    getFiltered: (type: string, searchQuery: string = '') => {
        let assets = MOCK_ASSETS;
        if (type !== 'All') {
            assets = assets.filter(a => a.type === type);
        }
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            assets = assets.filter(a =>
                a.symbol.toLowerCase().includes(lowerQuery) ||
                a.name.toLowerCase().includes(lowerQuery)
            );
        }
        return assets;
    }
};
