
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
    { id: '1', symbol: 'MTNN', name: 'MTN Nigeria Communications', price: 215.00, change: 1.25, type: 'NGX', sector: 'Telecommunications', description: 'Nigeria\'s largest mobile operator and telecommunications provider.' },
    { id: '2', symbol: 'DANGCEM', name: 'Dangote Cement', price: 650.00, change: -0.50, type: 'NGX', sector: 'Industrial Goods', description: 'Sub-Saharan Africa\'s leading cement producer.' },
    { id: '3', symbol: 'AIRTELAFRI', name: 'Airtel Africa', price: 2200.00, change: 0.45, type: 'NGX', sector: 'Telecommunications', description: 'Leading provider of telecommunications and mobile money services.' },
    { id: '4', symbol: 'BUAFOODS', name: 'BUA Foods', price: 380.00, change: 0.85, type: 'NGX', sector: 'Consumer Goods', description: 'Leading food and fast-moving consumer goods company in Nigeria.' },
    { id: '5', symbol: 'BUACEMENT', name: 'BUA Cement', price: 143.00, change: 1.15, type: 'NGX', sector: 'Industrial Goods', description: 'Major cement manufacturing company and building materials provider.' },
    { id: '6', symbol: 'ZENITHBANK', name: 'Zenith Bank', price: 35.50, change: 2.10, type: 'NGX', sector: 'Financial Services', description: 'Premium Nigerian financial services provider.' },
    { id: '7', symbol: 'GTCO', name: 'Guaranty Trust Holding', price: 41.20, change: 0.85, type: 'NGX', sector: 'Financial Services', description: 'Leading Nigerian multinational financial services group.' },
    { id: '8', symbol: 'SEPLAT', name: 'Seplat Energy', price: 3400.00, change: 1.50, type: 'NGX', sector: 'Oil & Gas', description: 'Leading independent Nigerian energy company.' },
    { id: '9', symbol: 'GEREGU', name: 'Geregu Power', price: 1000.00, change: 2.30, type: 'NGX', sector: 'Utilities', description: 'Major power generation company in Nigeria.' },
    { id: '10', symbol: 'ACCESSCORP', name: 'Access Holdings', price: 17.80, change: -0.30, type: 'NGX', sector: 'Financial Services', description: 'Multinational financial services holding company.' },
    { id: '11', symbol: 'FBNH', name: 'FBN Holdings', price: 22.50, change: 0.10, type: 'NGX', sector: 'Financial Services', description: 'Parent company of First Bank of Nigeria.' },
    { id: '12', symbol: 'UBA', name: 'United Bank for Africa', price: 23.00, change: 0.40, type: 'NGX', sector: 'Financial Services', description: 'Leading pan-African financial services institution.' },
    { id: '13', symbol: 'NESTLE', name: 'Nestle Nigeria', price: 900.00, change: -1.20, type: 'NGX', sector: 'Consumer Goods', description: 'Leading food and beverage manufacturing company.' },
    { id: '14', symbol: 'STANBIC', name: 'Stanbic IBTC Holdings', price: 55.00, change: 0.75, type: 'NGX', sector: 'Financial Services', description: 'Comprehensive financial services provider.' },
    { id: '15', symbol: 'TRANSCORP', name: 'Transnational Corp', price: 11.50, change: 3.20, type: 'NGX', sector: 'Conglomerate', description: 'Diversified conglomerate with interests in power, energy, and hospitality.' },
    { id: '16', symbol: 'OKOMUOIL', name: 'Okomu Oil Palm', price: 270.00, change: 0.00, type: 'NGX', sector: 'Agriculture', description: 'Leading Nigerian oil palm and rubber producer.' },
    { id: '17', symbol: 'PRESCO', name: 'Presco PLC', price: 250.00, change: 0.05, type: 'NGX', sector: 'Agriculture', description: 'Integrated oil palm plantation and processing company.' },
    { id: '18', symbol: 'FLOURMILL', name: 'Flour Mills of Nigeria', price: 36.50, change: -0.15, type: 'NGX', sector: 'Consumer Goods', description: 'Leading Nigerian agribusiness and food company.' },
    { id: '19', symbol: 'TOTAL', name: 'TotalEnergies Marketing', price: 385.00, change: 0.90, type: 'NGX', sector: 'Oil & Gas', description: 'Energy marketing and distribution company.' },
    { id: '20', symbol: 'UNILEVER', name: 'Unilever Nigeria', price: 16.00, change: 0.20, type: 'NGX', sector: 'Consumer Goods', description: 'Leading manufacturer of food and home care products.' },

    // Global Stocks (Simplified Selection)
    { id: '101', symbol: 'AAPL', name: 'Apple Inc.', price: 235000.00, change: 0.85, type: 'Global', sector: 'Technology', description: 'Global technology leader.' },
    { id: '102', symbol: 'TSLA', name: 'Tesla Inc.', price: 185000.00, change: -1.20, type: 'Global', sector: 'Automotive', description: 'EV and clean energy pioneer.' },
    { id: '103', symbol: 'MSFT', name: 'Microsoft', price: 420000.00, change: 1.10, type: 'Global', sector: 'Technology', description: 'Global software and cloud leader.' },
    { id: '104', symbol: 'NVDA', name: 'NVIDIA', price: 125000.00, change: 4.20, type: 'Global', sector: 'Technology', description: 'Leader in AI and GPU computing.' },

    // Crypto (Core Assets)
    { id: '201', symbol: 'BTC', name: 'Bitcoin', price: 98000000.00, change: 3.50, type: 'Crypto', sector: 'Digital Currency', description: 'First decentralized cryptocurrency.' },
    { id: '202', symbol: 'ETH', name: 'Ethereum', price: 4500000.00, change: 2.80, type: 'Crypto', sector: 'Smart Contracts', description: 'Leading smart contract platform.' },
    { id: '203', symbol: 'SOL', name: 'Solana', price: 150000.00, change: -5.40, type: 'Crypto', sector: 'High Performance', description: 'High-speed layer-1 blockchain.' },

    // Bonds
    { id: '301', symbol: 'FGN2030', name: 'FGN Bond 2030', price: 1000.00, change: 0.05, type: 'Bonds', sector: 'Sovereign', description: 'Federal Government of Nigeria sovereign bond.' },
    { id: '302', symbol: 'FGN2035', name: 'FGN Bond 2035', price: 1000.00, change: 0.02, type: 'Bonds', sector: 'Sovereign', description: 'Long-term government debt security.' },
];

export const AssetService = {
    getAll: () => MOCK_ASSETS,

    getById: (id: string) => MOCK_ASSETS.find(a => a.id === id),

    getBySymbol: (symbol: string) => MOCK_ASSETS.find(a => a.symbol.toUpperCase() === symbol.toUpperCase()),

    search: (query: string) => {
        const lowerQuery = query.toLowerCase();
        return MOCK_ASSETS.filter(a =>
            a.symbol.toLowerCase().includes(lowerQuery) ||
            a.name.toLowerCase().includes(lowerQuery) ||
            a.sector.toLowerCase().includes(lowerQuery) ||
            a.description.toLowerCase().includes(lowerQuery)
        );
    },

    getFiltered: (type: string, searchQuery: string = '') => {
        let assets = MOCK_ASSETS;

        if (searchQuery) {
            // When searching, we search across ALL categories as requested ("all cards can be searched")
            const lowerQuery = searchQuery.toLowerCase();
            return assets.filter(a =>
                a.symbol.toLowerCase().includes(lowerQuery) ||
                a.name.toLowerCase().includes(lowerQuery) ||
                a.sector.toLowerCase().includes(lowerQuery) ||
                a.description.toLowerCase().includes(lowerQuery)
            );
        }

        // If no search query, apply the tab filter
        if (type !== 'All') {
            return assets.filter(a => a.type === type);
        }

        return assets;
    }
};
