interface SliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    unit?: string;
    suffix?: string;
}

export const SliderControl = ({ label, value, onChange, min, max, step, unit = '₦', suffix = '' }: SliderProps) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                <span className="text-lg font-bold text-gray-900">{unit}{value.toLocaleString()}{suffix}</span>
            </div>

            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-green-600"
            />

            <div className="flex justify-between text-xs text-gray-400 font-medium">
                <span>{unit}{min.toLocaleString()}{suffix}</span>
                <span>{unit}{max.toLocaleString()}{suffix}</span>
            </div>
        </div>
    );
};

