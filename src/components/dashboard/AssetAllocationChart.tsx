import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface AssetData {
    name: string;
    value: number;
    color: string;
}

const data: AssetData[] = [
    { name: 'NG Stocks', value: 4500000, color: '#16a34a' }, // green-600
    { name: 'US Stocks', value: 3200000, color: '#2563eb' }, // blue-600
    { name: 'Bonds', value: 1500000, color: '#ea580c' }, // orange-600
    { name: 'Cash', value: 800000, color: '#64748b' }, // slate-500
];

export const AssetAllocationChart = () => {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full transition-all">
            <h3 className="font-bold text-gray-900 mb-6">Asset Allocation</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: 'none',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                padding: '8px 12px'
                            }}
                            itemStyle={{ color: '#1e293b' }}
                            formatter={(value: any) => `₦${Number(value).toLocaleString()}`}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => <span className="text-sm font-medium text-gray-600 ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                <span className="text-gray-500">Total Assets</span>
                <span className="font-bold text-gray-900">₦10,000,000</span>
            </div>
        </div>
    );
};
