import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, TrendingUp, DollarSign, PieChart } from 'lucide-react';

export const LearnPage = () => {
    return (
        <div className="bg-white min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6">
                        Learn to invest <span className="text-green-600">confidently.</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">
                        Master the markets with our curated guides, tutorials, and financial literacy courses.
                    </p>
                </div>

                {/* Categories */}
                <div className="grid md:grid-cols-4 gap-4 mb-20">
                    <CategoryCard icon={<BookOpen size={20} />} label="Investing 101" active />
                    <CategoryCard icon={<TrendingUp size={20} />} label="Market Analysis" />
                    <CategoryCard icon={<DollarSign size={20} />} label="Personal Finance" />
                    <CategoryCard icon={<PieChart size={20} />} label="Advanced Strategies" />
                </div>

                {/* Featured Guide - Big Card */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 p-10 bg-gray-50 rounded-[3rem] border border-gray-100">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-6">
                            Featured Course
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">The Fundamentals of Value Investing</h2>
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            Learn how to read balance sheets, understand P/E ratios, and identify undervalued companies in the Nigerian market. Perfect for beginners.
                        </p>
                        <div className="flex items-center gap-6 text-sm font-bold text-gray-500 mb-8">
                            <span className="flex items-center gap-2"><BookOpen size={16} /> 12 Modules</span>
                            <span className="flex items-center gap-2"><PlayCircle size={16} /> 4.5 Hours</span>
                        </div>
                        <button className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                            Start Learning Free
                        </button>
                    </div>
                    <div className="h-80 bg-white rounded-[2.5rem] border border-gray-200 shadow-xl flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-50 to-transparent opacity-50" />
                        <PieChart size={120} className="text-green-600/20 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute bottom-6 right-6 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg">
                            <PlayCircle size={32} fill="currentColor" className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Latest Articles */}
                <div>
                    <h2 className="text-2xl font-black mb-10">Latest Guides</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <ArticleCard
                            category="Tax & Law"
                            title="Understanding Capital Gains Tax in Nigeria"
                            readTime="5 min read"
                        />
                        <ArticleCard
                            category="Crypto"
                            title="Safe Custody: How to Secure Your Digital Assets"
                            readTime="8 min read"
                        />
                        <ArticleCard
                            category="Risk Management"
                            title="Diversification: Why You Need More Than Just Stocks"
                            readTime="6 min read"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CategoryCard = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <button className={`flex items-center justify-center gap-3 p-6 rounded-2xl border transition-all ${active ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'}`}>
        {icon}
        <span className="font-bold text-sm">{label}</span>
    </button>
);

const ArticleCard = ({ category, title, readTime }: { category: string, title: string, readTime: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 bg-white border border-gray-100 rounded-3xl hover:border-black cursor-pointer transition-all shadow-sm hover:shadow-lg hover:shadow-gray-200/20"
    >
        <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                <BookOpen size={20} className="text-gray-400" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                {category}
            </span>
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight">{title}</h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{readTime}</p>
    </motion.div>
);
