import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DataPoint {
    month: number;
    year: number;
    invested: number;
    value: number;
    formattedDate: string;
}

interface ProjectionChartProps {
    initialDeposit: number;
    monthlyContribution: number;
    durationYears: number;
    riskProfile: 'low' | 'moderate' | 'high';
}

export const ProjectionChart = ({ initialDeposit, monthlyContribution, durationYears, riskProfile }: ProjectionChartProps) => {
    const generateData = () => {
        const data: DataPoint[] = [];
        let currentInvested = initialDeposit;
        let currentValue = initialDeposit;

        const rate = riskProfile === 'low' ? 0.08 : riskProfile === 'moderate' ? 0.12 : 0.18;
        const monthlyRate = rate / 12;

        const totalMonths = durationYears * 12;
        const now = new Date();

        for (let i = 0; i <= totalMonths; i++) {
            if (i > 0) {
                currentInvested += monthlyContribution;
                currentValue += monthlyContribution;
            }
            currentValue = currentValue * (1 + monthlyRate);
            if (i === 0 || i % 12 === 0 || i === totalMonths) {
                const date = new Date(now);
                date.setMonth(date.getMonth() + i);
                data.push({
                    month: i,
                    year: date.getFullYear(),
                    invested: Math.round(currentInvested),
                    value: Math.round(currentValue),
                    formattedDate: date.getFullYear().toString(),
                });
            }
        }
        return data;
    };

    const data = generateData();
    const primaryColor = '#16a34a';

    const finalPoint = data[data.length - 1];
    const totalProjected = finalPoint.value;
    const totalInvested = finalPoint.invested;
    const totalReturn = totalProjected - totalInvested;

    return (
        <div className="flex flex-col h-full w-full">
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Total Projected Value</p>
                    <h4 className="text-2xl font-black text-green-900">₦{totalProjected.toLocaleString()}</h4>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Contributions</p>
                    <h4 className="text-2xl font-black text-gray-900">₦{totalInvested.toLocaleString()}</h4>
                </div>
                <div className="p-5 bg-black text-white rounded-2xl">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Estimated Returns</p>
                    <h4 className="text-2xl font-black text-white">₦{totalReturn.toLocaleString()}</h4>
                </div>
            </div>

            <div className="min-h-[450px] w-full mt-4">
                <div className="flex justify-between items-center mb-8 px-2">
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Growth Projection</h3>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500 shadow-sm shadow-green-200"></div>
                            <span className="text-xs font-bold text-gray-600">Total Value</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border-2 border-gray-300 bg-transparent"></div>
                            <span className="text-xs font-bold text-gray-600">Invested</span>
                        </div>
                    </div>
                </div>

                <div className="h-[380px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValueProj" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={primaryColor} stopOpacity={0.25} />
                                    <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="year"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 600 }}
                                tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`}
                                dx={-10}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' }}
                                formatter={(v: any) => [`₦${Number(v).toLocaleString()}`, 'Value']}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={primaryColor}
                                fill="url(#colorValueProj)"
                                strokeWidth={4}
                                animationDuration={2000}
                                activeDot={{ r: 6, strokeWidth: 0, fill: primaryColor }}
                            />
                            <Area
                                type="monotone"
                                dataKey="invested"
                                stroke="#cbd5e1"
                                fill="transparent"
                                strokeWidth={2}
                                strokeDasharray="6 6"
                                activeDot={{ r: 4, strokeWidth: 0, fill: '#cbd5e1' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};


