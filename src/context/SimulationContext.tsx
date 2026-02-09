import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

export interface Transaction {
    id: string;
    type: 'Buy' | 'Sell' | 'Deposit' | 'Withdraw';
    assetSymbol: string;
    assetName: string;
    amount: number;
    units: number;
    price: number;
    date: string;
    status: 'Completed' | 'Pending';
}

export interface Holding {
    symbol: string;
    name: string;
    units: number;
    avgPrice: number;
}

interface SimulationContextType {
    balance: number;
    holdings: Holding[];
    transactions: Transaction[];
    executeTrade: (asset: { symbol: string, name: string, price: number }, amount: number, type: 'Buy' | 'Sell') => Promise<void>;
    resetSimulation: () => Promise<void>;
    refreshState: () => Promise<void>;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const [balance, setBalance] = useState<number>(1000000); // Default 1M Naira
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const refreshState = async () => {
        if (!isAuthenticated) return;
        try {
            const response = await api.get('/simulation/state');
            setBalance(response.data.balance);
            setHoldings(response.data.holdings.map((h: any) => ({
                symbol: h.symbol,
                name: h.name,
                units: h.units,
                avgPrice: h.avg_price
            })));
            setTransactions(response.data.transactions.map((t: any) => ({
                id: t.id,
                type: t.type,
                assetSymbol: t.asset_symbol,
                assetName: t.asset_name,
                amount: t.amount,
                units: t.units,
                price: t.price,
                date: t.date,
                status: t.status
            })));
        } catch (error) {
            console.error('Failed to fetch simulation state', error);
        }
    };

    // Load from API when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            refreshState();
        } else {
            // Reset local state when logged out
            setBalance(1000000);
            setHoldings([]);
            setTransactions([]);
        }
    }, [isAuthenticated]);

    const executeTrade = async (asset: { symbol: string, name: string, price: number }, amount: number, type: 'Buy' | 'Sell') => {
        try {
            await api.post('/simulation/trade', { asset, amount, type });
            await refreshState();
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Trade failed');
        }
    };

    const resetSimulation = async () => {
        try {
            await api.post('/simulation/reset');
            await refreshState();
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Reset failed');
        }
    };

    return (
        <SimulationContext.Provider value={{ balance, holdings, transactions, executeTrade, resetSimulation, refreshState }}>
            {children}
        </SimulationContext.Provider>
    );
};

export const useSimulation = () => {
    const context = useContext(SimulationContext);
    if (context === undefined) {
        throw new Error('useSimulation must be used within a SimulationProvider');
    }
    return context;
};
