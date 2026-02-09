import { motion } from 'framer-motion';
import { Target, Users, Globe } from 'lucide-react';

export const AboutPage = () => {
    return (
        <div className="bg-white min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-lg mb-6 border border-gray-100">
                        Our Mission
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
                        Democratizing wealth for <span className="text-green-600">everyone.</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed">
                        Finexa is building the financial infrastructure for the next generation of African investors. We believe access to global markets shouldn't be a privilege.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    <ValueCard
                        icon={<Target size={24} />}
                        title="Precision First"
                        description="We provide institutional-grade data and simulation tools that help you make decisions with absolute confidence."
                    />
                    <ValueCard
                        icon={<Users size={24} />}
                        title="Community Driven"
                        description="We are building a community of educated investors who learn, grow, and succeed together."
                    />
                    <ValueCard
                        icon={<Globe size={24} />}
                        title="Global Access"
                        description="From Lagos to London, we bridge the gap between local capital and global opportunities."
                    />
                </div>

                {/* Story Section */}
                <div className="bg-black text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-black mb-6">Our Story</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Founded in 2024, Finexa started with a simple observation: financial literacy tools in Africa were either too simple or too expensive. We set out to build a platform that combines the power of a professional trading terminal with the simplicity of a consumer app.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs font-bold">
                                        Team
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-bold text-gray-400">
                                Built by a team of finance & tech veterans.
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/20 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-300"
    >
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-black border border-gray-100">
            {icon}
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 font-medium text-sm leading-relaxed">{description}</p>
    </motion.div>
);
