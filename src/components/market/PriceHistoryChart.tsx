import { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PricePoint {
    date: string;
    price: number;
}

// Mock data generator for demo purposes
const generateData = (startPrice: number, range: string): PricePoint[] => {
    let currentPrice = startPrice;
    const data: PricePoint[] = [];
    const now = new Date();

    let points = 30;
    let formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

    switch (range) {
        case '1D':
            points = 24;
            formatOptions = { hour: '2-digit', minute: '2-digit' };
            break;
        case '1W':
            points = 7;
            break;
        case '1M':
            points = 30;
            break;
        case '3M':
            points = 90;
            break;
        case '1Y':
            points = 52; // Weekly points for a year
            break;
        case 'ALL':
            points = 100;
            break;
    }

    // Adjust start price backwards based on random walk to make end price match current totalPortfolioValue
    for (let i = points; i >= 0; i--) {
        const date = new Date(now);
        if (range === '1D') {
            date.setHours(date.getHours() - i);
        } else if (range === '1Y' || range === 'ALL') {
            date.setDate(date.getDate() - (i * 7));
        } else {
            date.setDate(date.getDate() - i);
        }

        // Random walk
        const volatility = range === '1D' ? 0.005 : 0.02;
        const change = (Math.random() - 0.48) * (startPrice * volatility); // Slight upward bias
        currentPrice += change;

        data.push({
            date: date.toLocaleDateString('en-US', formatOptions),
            price: Math.max(0.1, currentPrice),
        });
    }

    // Normalize so the last point matches the base price (simulated current value)
    const lastPoint = data[data.length - 1];
    const diff = startPrice - lastPoint.price;
    return data.map(p => ({ ...p, price: p.price + diff }));
};

interface PriceHistoryChartProps {
    basePrice: number;
    color?: string;
    range?: string;
}

export const PriceHistoryChart = ({ basePrice, color = '#16a34a', range = '1M' }: PriceHistoryChartProps) => {
    // Generate static-ish data based on basePrice so it looks consistent for the session
    const data = useMemo(() => generateData(basePrice, range), [basePrice, range]);

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
                        formatter={(val: any) => {
                            if (val === undefined || val === null) return ['', 'Price'];
                            const numericVal = typeof val === 'number' ? val : parseFloat(val);
                            return [`₦${numericVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Price'];
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
