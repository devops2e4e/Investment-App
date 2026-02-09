import { useState } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
    content: string;
}

export const InfoTooltip = ({ content }: InfoTooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative inline-block ml-1 align-middle">
            <button
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-help"
                aria-label="Info"
            >
                <Info size={14} />
            </button>

            {isVisible && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-black text-white text-xs rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                    {content}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black" />
                </div>
            )}
        </div>
    );
};
