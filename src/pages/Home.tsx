import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    TrendingUp,
    Shield,
    Globe,
    Zap,
    BarChart3,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';

export const Home = () => {
    return (
        <div className="overflow-hidden bg-white">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-xl"
                    >
                        <h1 className="text-6xl font-black leading-[1.05] mb-6 tracking-tight text-gray-900 lg:text-7xl">
                            Invest in your future, <span className="text-green-600">fearlessly.</span>
                        </h1>
                        <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                            Commission-free investing for Nigerians. Access local NGX stocks, US equities, and global markets in one simple, secure platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link to="/signup" className="inline-flex items-center justify-center px-10 py-4 bg-black text-white font-bold rounded-full text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-1">
                                Start Investing
                            </Link>
                            <Link to="/simulator" className="inline-flex items-center justify-center px-10 py-4 bg-white text-black border-2 border-gray-100 font-bold rounded-full text-lg hover:border-gray-900 transition-all group">
                                Try Simulator
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                        </div>
                        <div className="mt-8 flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                        JD
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 font-bold">
                                Joined by <span className="text-black">50,000+</span> investors
                            </p>
                        </div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 max-w-md ml-auto transform transition-transform duration-700 hover:rotate-0 rotate-[-1deg]">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Portfolio Value</div>
                                    <div className="text-4xl font-black text-gray-900">₦14,560,000</div>
                                </div>
                                <div className="h-14 w-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shadow-sm shadow-green-100/50">
                                    <TrendingUp size={32} strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="h-48 bg-gray-50 rounded-2xl mb-8 flex items-end overflow-hidden p-0 relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent" />
                                <svg className="w-full h-full text-green-500" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <motion.path
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                        d="M0,80 C20,75 40,85 60,30 S80,15 100,5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                    <path d="M0,80 C20,75 40,85 60,30 S80,15 100,5 L100,100 L0,100 Z" fill="currentColor" opacity="0.05" />
                                </svg>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all cursor-default">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-lg shadow-yellow-200">MTN</div>
                                        <div>
                                            <div className="font-black text-gray-900">MTN Nigeria</div>
                                            <div className="text-xs text-gray-500 font-bold">25 shares</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-gray-900">₦5,670</div>
                                        <div className="text-xs text-green-600 font-black flex items-center justify-end gap-1">
                                            <ArrowUpRight size={12} strokeWidth={3} />
                                            12.4%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 bg-gray-50 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl font-black mb-6 text-gray-900 tracking-tight">Everything needed to build wealth</h2>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed">Whether you're starting with ₦5,000 or ₦5,000,000, we have the tools to help you grow.</p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Globe size={32} />}
                            title="Global Access"
                            description="Invest in US stocks like Apple and Tesla right alongside Nigerian giants like Dangote Cement."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Zap size={32} />}
                            title="Powerful Simulation"
                            description="Test your strategies with our advanced simulator before risking real money. Learn by doing."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Shield size={32} />}
                            title="Bank-Grade Security"
                            description="Your assets are protected with 256-bit encryption and regulated by the SEC. Your trust is our priority."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Simplified Simulator Preview Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 bg-black text-white p-14 rounded-[3rem] relative min-h-[500px] flex flex-col justify-center shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <BarChart3 size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="mb-10">
                                <div className="text-gray-400 text-xs font-black mb-2 tracking-[0.2em] uppercase">Projected Portfolio Value</div>
                                <div className="text-6xl font-black text-green-400">₦12.5M</div>
                            </div>

                            <div className="space-y-8 max-w-sm">
                                <div>
                                    <div className="flex justify-between text-sm mb-3">
                                        <span className="text-gray-400 font-bold">Monthly Investment</span>
                                        <span className="font-black text-white">₦100,000</span>
                                    </div>
                                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden p-1">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '66%' }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16">
                                <Link to="/simulator" className="px-8 py-4 bg-green-600 text-white font-black rounded-2xl hover:bg-green-500 transition-all inline-flex items-center gap-2 group shadow-xl shadow-green-900/20">
                                    Open Full Simulator
                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tight">See your future,<br />before you build it.</h2>
                            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                                Don't guess. Use our Scenario Calculator to model different outcomes. See the power of compound interest in real-time.
                            </p>
                            <div className="space-y-4">
                                {[
                                    'Accurate historical data modeling',
                                    'Adjustable risk profiles',
                                    'Compound interest visualization'
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3 font-bold text-gray-900">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <Zap size={14} fill="currentColor" />
                                        </div>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="bg-white p-10 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
    >
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-black mb-8 group-hover:bg-black group-hover:text-white transition-colors duration-500">
            {icon}
        </div>
        <h3 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">{title}</h3>
        <p className="text-gray-500 leading-relaxed font-medium">{description}</p>
    </motion.div>
);

