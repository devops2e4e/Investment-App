import { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { ArrowDownLeft, ArrowUpRight, Wallet, History as HistoryIcon, Search, X } from 'lucide-react';

export const HistoryPage = () => {
    const { transactions } = useSimulation();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransactions = transactions.filter(tx =>
        tx.assetSymbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Simulation History</h1>
                    <p className="text-gray-500 mt-1">Track all your virtual simulation activities.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search history..."
                        className="w-full pl-12 pr-10 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all font-bold text-gray-900 shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all">
                {filteredTransactions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 transition-all">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Asset</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Units</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 transition-all">
                                {filteredTransactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-2 rounded-lg ${tx.type === 'Buy' ? 'bg-blue-50 text-blue-600' :
                                                    tx.type === 'Sell' ? 'bg-orange-50 text-orange-600' :
                                                        'bg-green-50 text-green-600'
                                                    }`}>
                                                    {tx.type === 'Buy' ? <ArrowDownLeft size={16} /> :
                                                        tx.type === 'Sell' ? <ArrowUpRight size={16} /> :
                                                            <Wallet size={16} />}
                                                </div>
                                                <span className="font-bold text-sm text-gray-900">{tx.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-900">{tx.assetSymbol}</div>
                                            <div className="text-xs text-gray-500">{tx.assetName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                                            ₦{tx.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                                            {tx.units.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                                            ₦{tx.price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-400 font-medium">
                                            {tx.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20 px-6">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <HistoryIcon size={48} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">
                            {searchQuery ? `No results for "${searchQuery}"` : "No transactions yet"}
                        </h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">
                            {searchQuery ? "Try searching for a different asset or transaction type." : "Explore the market to see your simulation history here."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
