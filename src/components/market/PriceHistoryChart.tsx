import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PricePoint {
    date: string;
    price: number;
}

// Mock data generator for demo purposes
const generateData = (startPrice: number, points: number): PricePoint[] => {
    let currentPrice = startPrice;
    const data: PricePoint[] = [];
    const now = new Date();

    for (let i = points; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Random walk
        const change = (Math.random() - 0.5) * (startPrice * 0.05);
        currentPrice += change;

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: Math.max(0.1, currentPrice),
        });
    }
    return data;
};

interface PriceHistoryChartProps {
    basePrice: number;
    color?: string;
}

export const PriceHistoryChart = ({ basePrice, color = '#16a34a' }: PriceHistoryChartProps) => {
    // Generate static-ish data based on basePrice so it looks consistent for the session
    const data = generateData(basePrice, 30);

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`colorPrice-${basePrice}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        minTickGap={30}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        tickFormatter={(val) => `₦${val.toLocaleString()}`}
                        width={60}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(val: number | undefined) => {
                            if (val === undefined) return ['', 'Price'];
                            return [`₦${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Price'];
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={color}
                        fill={`url(#colorPrice-${basePrice})`}
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
