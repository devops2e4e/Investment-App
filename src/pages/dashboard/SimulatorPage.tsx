import { useState } from 'react';
import { SliderControl } from '../../components/simulator/SliderControl';
import { ProjectionChart } from '../../components/simulator/ProjectionChart';
import { InfoTooltip } from '../../components/ui/InfoTooltip';

export const SimulatorPage = () => {
    // Simulator State
    const [initialDeposit, setInitialDeposit] = useState(500000);
    const [monthlyContribution, setMonthlyContribution] = useState(50000);
    const [durationYears, setDurationYears] = useState(10);
    const [riskProfile, setRiskProfile] = useState<'low' | 'moderate' | 'high'>('moderate');

    const getRiskLabel = (risk: string) => {
        switch (risk) {
            case 'low': return 'Conservative (Bonds/Fixed Income) - ~8%';
            case 'moderate': return 'Balanced (Diversified Mix) - ~12%';
            case 'high': return 'Aggressive (Stocks/Equities) - ~18%';
            default: return '';
        }
    };

    return (
        <div className="pb-20">
            {/* Page Header */}
            <div className="py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                    Investment <span className="text-green-600">Simulator</span>
                </h1>
                <p className="text-gray-500 max-w-2xl">
                    See how your money could grow over time with consistent investing.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Left Column: Controls */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4">Parameters</h2>

                        <div className="space-y-10">
                            <SliderControl
                                label="Initial Deposit"
                                value={initialDeposit}
                                min={10000}
                                max={10000000}
                                step={10000}
                                onChange={setInitialDeposit}
                            />

                            <SliderControl
                                label="Monthly Top-up"
                                value={monthlyContribution}
                                min={5000}
                                max={1000000}
                                step={5000}
                                onChange={setMonthlyContribution}
                            />

                            <SliderControl
                                label="Duration (Years)"
                                value={durationYears}
                                min={1}
                                max={30}
                                step={1}
                                unit=""
                                suffix=" Years"
                                onChange={setDurationYears}
                            />

                            <div>
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center mb-4">
                                    Risk Profile
                                    <InfoTooltip content="Calculates projected returns based on asset mix." />
                                </label>
                                <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100">
                                    {['low', 'moderate', 'high'].map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setRiskProfile(r as any)}
                                            className={`py-2 rounded-lg text-sm font-bold capitalize transition-all ${riskProfile === r
                                                ? 'bg-green-600 text-white shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 mt-4 text-center">
                                    {getRiskLabel(riskProfile)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Chart */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <ProjectionChart
                            initialDeposit={initialDeposit}
                            monthlyContribution={monthlyContribution}
                            durationYears={durationYears}
                            riskProfile={riskProfile}
                        />

                        {/* Disclaimer */}
                        <div className="mt-8 text-xs text-gray-400 text-center italic">
                            * Returns are estimated based on historical market performance and do not guarantee future results.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

