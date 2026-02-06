import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Info, CheckCircle } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

type Step = 'input' | 'review' | 'success';

interface InvestModalProps {
    isOpen: boolean;
    onClose: () => void;
    asset: {
        symbol: string;
        name: string;
        price: number;
    };
}

export const InvestModal = ({ isOpen, onClose, asset }: InvestModalProps) => {
    const { balance, executeTrade } = useSimulation();
    const [step, setStep] = useState<Step>('input');
    const [amount, setAmount] = useState('');
    const [inputType, setInputType] = useState<'fiat' | 'units'>('fiat');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setStep('input');
            setAmount('');
            setIsLoading(false);
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen || !asset) return null;

    const numericAmount = parseFloat(amount) || 0;
    const price = asset.price;

    // Calculations
    const units = inputType === 'fiat' ? numericAmount / price : numericAmount;
    const totalCost = inputType === 'fiat' ? numericAmount : numericAmount * price;
    const fee = totalCost * 0.015; // 1.5% simulated fee
    const grandTotal = totalCost + fee;

    // Actions
    const handleNext = () => {
        if (grandTotal > balance) {
            setError('Insufficient virtual funds');
            return;
        }
        if (grandTotal > 0) setStep('review');
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Add slight artificial delay
            await new Promise(resolve => setTimeout(resolve, 800));
            executeTrade(asset, totalCost, 'Buy');
            setStep('success');
        } catch (err: any) {
            setError(err.message || 'Trade failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg">
                        {step === 'success' ? 'Added to Simulator' : `Simulate Buy: ${asset.symbol}`}
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6">
                    {/* STEP 1: INPUT */}
                    {step === 'input' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 text-blue-800 p-3 rounded-xl text-xs font-medium border border-blue-100">
                                This is a simulation. No real funds are moved.
                            </div>

                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${inputType === 'fiat' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                                    onClick={() => setInputType('fiat')}
                                >
                                    Buy in Naira (₦)
                                </button>
                                <button
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${inputType === 'units' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                                    onClick={() => setInputType('units')}
                                >
                                    Buy in Shares
                                </button>
                            </div>

                            <div className="text-center py-4">
                                <span className="text-gray-400 text-sm font-bold block mb-2">
                                    {inputType === 'fiat' ? 'Amount to invest' : 'Shares to buy'}
                                </span>
                                <div className="flex items-center justify-center gap-1 text-4xl font-bold">
                                    {inputType === 'fiat' && <span>₦</span>}
                                    <input
                                        type="number"
                                        className="w-48 text-center bg-transparent focus:outline-none focus:placeholder-gray-200 placeholder-gray-300"
                                        placeholder="0"
                                        autoFocus
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                <div className="text-sm font-medium text-gray-400 mt-2">
                                    ≈ {inputType === 'fiat'
                                        ? `${units.toFixed(4)} Units`
                                        : `₦${totalCost.toLocaleString()}`
                                    }
                                </div>
                            </div>

                            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-xs font-medium flex items-start gap-2">
                                <Info size={14} className="mt-0.5" />
                                Available Balance: ₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
                                    ⚠️ {error}
                                </div>
                            )}

                            <button
                                onClick={handleNext}
                                disabled={grandTotal <= 0 || grandTotal > balance}
                                className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/10"
                            >
                                Review Order
                            </button>
                        </div>
                    )}

                    {/* STEP 2: REVIEW */}
                    {step === 'review' && (
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Asset</span>
                                    <span className="font-bold">{asset.name} ({asset.symbol})</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Quantity</span>
                                    <span className="font-bold">{units.toFixed(4)} Units</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Price per unit</span>
                                    <span className="font-bold">₦{price.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-gray-200" />
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-bold">₦{totalCost.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Fee (1.5%)</span>
                                    <span className="font-bold">₦{fee.toLocaleString()}</span>
                                </div>
                                <div className="h-px bg-gray-200" />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total Cost</span>
                                    <span>₦{grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="text-xs text-gray-400 text-center leading-relaxed">
                                By confirming, you agree to the Terms of Service. Market orders are executed immediately at the best available price.
                            </div>

                            <button
                                onClick={handleConfirm}
                                disabled={isLoading}
                                className="w-full py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Confirm Purchase'
                                )}
                            </button>
                            <button
                                onClick={() => setStep('input')}
                                disabled={isLoading}
                                className="w-full py-2 text-gray-500 font-bold hover:text-black transition-colors"
                            >
                                Back
                            </button>
                        </div>
                    )}

                    {/* STEP 3: SUCCESS */}
                    {step === 'success' && (
                        <div className="text-center py-6">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                    <CheckCircle size={40} />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Executed!</h2>
                            <p className="text-gray-500 mb-8">
                                You have successfully purchased <strong>{units.toFixed(4)} {asset.symbol}</strong>.
                            </p>

                            <div className="space-y-3">
                                <Link
                                    to="/dashboard/portfolio"
                                    className="block w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
                                >
                                    View Portfolio
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="block w-full py-3 text-gray-500 font-bold hover:text-black transition-colors"
                                >
                                    Make Another Trade
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
