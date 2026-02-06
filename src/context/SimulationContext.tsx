import React, { createContext, useContext, useState, useEffect } from 'react';

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
    executeTrade: (asset: { symbol: string, name: string, price: number }, amount: number, type: 'Buy' | 'Sell') => void;
    resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: React.ReactNode }) => {
    const [balance, setBalance] = useState<number>(1000000); // Default 1M Naira
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Load from LocalStorage
    useEffect(() => {
        const savedBalance = localStorage.getItem('finexa_sim_balance');
        const savedHoldings = localStorage.getItem('finexa_sim_holdings');
        const savedTransactions = localStorage.getItem('finexa_sim_transactions');

        if (savedBalance) setBalance(JSON.parse(savedBalance));
        if (savedHoldings) setHoldings(JSON.parse(savedHoldings));
        if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    }, []);

    // Sync to LocalStorage
    useEffect(() => {
        localStorage.setItem('finexa_sim_balance', JSON.stringify(balance));
        localStorage.setItem('finexa_sim_holdings', JSON.stringify(holdings));
        localStorage.setItem('finexa_sim_transactions', JSON.stringify(transactions));
    }, [balance, holdings, transactions]);

    const executeTrade = (asset: { symbol: string, name: string, price: number }, amount: number, type: 'Buy' | 'Sell') => {
        const units = amount / asset.price;
        const fee = amount * 0.015; // 1.5% fee
        const totalCost = amount + fee;

        if (type === 'Buy') {
            if (balance < totalCost) {
                throw new Error('Insufficient virtual funds');
            }

            setBalance(prev => prev - totalCost);

            // Update Holdings
            setHoldings(prev => {
                const existing = prev.find(h => h.symbol === asset.symbol);
                if (existing) {
                    const newTotalUnits = existing.units + units;
                    const newAvgPrice = ((existing.units * existing.avgPrice) + (units * asset.price)) / newTotalUnits;
                    return prev.map(h => h.symbol === asset.symbol
                        ? { ...h, units: newTotalUnits, avgPrice: newAvgPrice }
                        : h
                    );
                }
                return [...prev, { symbol: asset.symbol, name: asset.name, units, avgPrice: asset.price }];
            });
        } else {
            // Sell logic
            const existing = holdings.find(h => h.symbol === asset.symbol);
            if (!existing || existing.units < units) {
                throw new Error('Insufficient units to sell');
            }

            setBalance(prev => prev + (amount - fee));
            setHoldings(prev => {
                const updatedUnits = existing.units - units;
                if (updatedUnits <= 0.0001) {
                    return prev.filter(h => h.symbol !== asset.symbol);
                }
                return prev.map(h => h.symbol === asset.symbol
                    ? { ...h, units: updatedUnits }
                    : h
                );
            });
        }

        // Add Transaction
        const newTransaction: Transaction = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            assetSymbol: asset.symbol,
            assetName: asset.name,
            amount: totalCost,
            units,
            price: asset.price,
            date: new Date().toLocaleString(),
            status: 'Completed'
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const resetSimulation = () => {
        setBalance(1000000);
        setHoldings([]);
        setTransactions([]);
        localStorage.removeItem('finexa_sim_balance');
        localStorage.removeItem('finexa_sim_holdings');
        localStorage.removeItem('finexa_sim_transactions');
    };

    return (
        <SimulationContext.Provider value={{ balance, holdings, transactions, executeTrade, resetSimulation }}>
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
