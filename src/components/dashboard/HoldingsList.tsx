import { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Search, X } from 'lucide-react';

export const HoldingsList = () => {
    const { holdings } = useSimulation();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredHoldings = holdings.filter(h =>
        h.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h3 className="font-bold text-gray-900">Your Holdings</h3>

                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search holdings..."
                        className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Asset</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Units</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Price</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredHoldings.map((stock) => {
                            const marketValue = stock.units * stock.avgPrice;

                            return (
                                <tr key={stock.symbol} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">
                                                {stock.symbol[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{stock.symbol}</div>
                                                <div className="text-xs text-gray-500">{stock.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right font-bold text-gray-900">
                                        {stock.units.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-5 text-right font-medium text-gray-600">
                                        ₦{stock.avgPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-5 text-right font-bold text-gray-900">
                                        ₦{marketValue.toLocaleString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredHoldings.length === 0 && (
                    <div className="p-10 text-center text-gray-400 text-sm italic">
                        {searchQuery ? `No holdings matching "${searchQuery}"` : "No assets held in this simulation yet."}
                    </div>
                )}
            </div>
        </div>
    );
};

