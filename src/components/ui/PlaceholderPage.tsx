import { Link } from 'react-router-dom';

interface PlaceholderProps {
    title: string;
    description?: string;
    icon?: string;
}

export const PlaceholderPage = ({
    title,
    description = "This feature is currently under development and will be available soon.",
    icon = "🚧"
}: PlaceholderProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
                {icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                {description}
            </p>
            <div className="flex gap-4">
                <Link
                    to="/dashboard"
                    className="px-6 py-2.5 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10"
                >
                    Back to Overview
                </Link>
            </div>
        </div>
    );
};
