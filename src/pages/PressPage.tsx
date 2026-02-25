import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, X, Calendar, User } from 'lucide-react';

interface PressItem {
    id: string;
    source: string;
    date: string;
    title: string;
    imageSrc: string;
    summary: string;
}

const PRESS_ITEMS: PressItem[] = [
    {
        id: '1',
        source: 'TechCrunch',
        date: 'Oct 24, 2024',
        title: 'Finexa raises $2M seed to democratize African investments',
        imageSrc: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
        summary: 'Finexa has successfully secured $2M in seed funding led by major venture capital firms. This investment will fuel our mission to provide accessible investment tools across Africa, expanding our engineering team and launching new educational modules.'
    },
    {
        id: '2',
        source: 'Forbes Africa',
        date: 'Sep 15, 2024',
        title: 'The rise of simulation-first trading platforms in Nigeria',
        imageSrc: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800',
        summary: 'Forbes explores how Finexa\'s risk-free simulation environment is changing the way Nigerians approach the stock market, allowing users to build confidence before deploying real capital without the fear of immediate loss.'
    },
    {
        id: '3',
        source: 'BloomBerg',
        date: 'Aug 02, 2024',
        title: 'How Finexa is teaching a generation to build wealth',
        imageSrc: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=800',
        summary: 'Bloomberg profiles Finexa\'s comprehensive educational suite, highlighting our partnership with local universities and the impact of our \'Learn to Earn\' program on youth financial literacy metrics.'
    },
    {
        id: '4',
        source: 'CNBC Africa',
        date: 'July 10, 2024',
        title: 'Finexa plans expansion into West African markets',
        imageSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        summary: 'In an exclusive interview with CNBC, our CEO discusses the strategic roadmap for entering the Ghanaian and Kenyan markets by Q4 2025, bringing our simulation tools to a broader West African audience.'
    }
];

export const PressPage = () => {
    const [selectedNews, setSelectedNews] = useState<PressItem | null>(null);

    return (
        <div className="bg-white min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6">Press Room</h1>
                    <p className="text-lg text-gray-500 font-medium">
                        Latest news, updates, and brand assets from the Finexa team.
                    </p>
                </div>

                {/* Featured News */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {PRESS_ITEMS.map((item) => (
                        <NewsCard
                            key={item.id}
                            item={item}
                            onClick={() => setSelectedNews(item)}
                        />
                    ))}
                </div>

                {/* Media Kit Section */}
                <div className="bg-black text-white rounded-[3rem] p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-3xl font-black mb-4">Brand Assets</h2>
                        <p className="text-gray-400 font-medium mb-8">
                            Download our official logos, brand guidelines, and executive headshots. Please do not modify our logo without permission.
                        </p>
                        <button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all">
                            <Download size={20} />
                            Download Media Kit (ZIP)
                        </button>
                    </div>

                    {/* Visual representation of brand assets */}
                    <div className="relative z-10 grid grid-cols-2 gap-4 opacity-80">
                        <div className="w-32 h-32 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full" />
                        </div>
                        <div className="w-32 h-32 bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center">
                            <div className="w-16 h-8 bg-gray-800 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Modal */}
            <AnimatePresence>
                {selectedNews && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedNews(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`card-${selectedNews.id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
                        >
                            <button
                                onClick={() => setSelectedNews(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-black/10 hover:bg-black/20 text-black rounded-full flex items-center justify-center transition-all z-20"
                            >
                                <X size={20} />
                            </button>

                            <div className="h-64 relative">
                                <img
                                    src={selectedNews.imageSrc}
                                    alt={selectedNews.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-8 right-8">
                                    <span className="inline-block px-3 py-1 bg-green-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-3">
                                        {selectedNews.source}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 md:p-10">
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-6">
                                    {selectedNews.title}
                                </h2>

                                <div className="flex items-center gap-6 text-sm font-bold text-gray-400 mb-8 border-b border-gray-100 pb-8">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        {selectedNews.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        <span>Press Release</span>
                                    </div>
                                </div>

                                <div className="prose prose-lg text-gray-500 leading-relaxed font-medium">
                                    <p>{selectedNews.summary}</p>
                                    <p className="mt-4">
                                        For full coverage, visit the original publication. This summary is provided for informational purposes regarding Finexa's public milestones.
                                    </p>
                                </div>

                                <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
                                    <button className="flex items-center gap-2 text-black font-black hover:text-green-600 transition-colors uppercase text-sm tracking-widest group">
                                        Read Full Story
                                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const NewsCard = ({ item, onClick }: { item: PressItem, onClick: () => void }) => (
    <motion.div
        layoutId={`card-${item.id}`}
        onClick={onClick}
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
    >
        <div className="h-64 rounded-[2rem] mb-6 relative overflow-hidden border border-gray-100 bg-gray-100">
            <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

            <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10">
                <ExternalLink size={16} className="text-black" />
            </div>
        </div>
        <div className="px-2">
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                <span className="text-black">{item.source}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{item.date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:underline decoration-2 underline-offset-4">{item.title}</h3>
        </div>
    </motion.div>
);
