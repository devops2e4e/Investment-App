import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CareersPage = () => {
    return (
        <div className="bg-white min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-6">
                        Build the future of <br />
                        <span className="text-green-600">finance with us.</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-medium">
                        We're looking for extraordinary people to help us build the next generation of investment tools.
                    </p>
                </div>

                {/* Benefits Section */}
                <div className="mb-24">
                    <h2 className="text-2xl font-black mb-10">Why Finexa?</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {['Competitive Equity', 'Remote First', 'Premium Gear', 'Health Coverage'].map((benefit) => (
                            <div key={benefit} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <CheckCircle2 className="text-green-600" size={20} />
                                <span className="font-bold text-gray-900 text-sm">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Open Roles */}
                <div>
                    <h2 className="text-2xl font-black mb-8 px-2">Open Positions</h2>
                    <div className="space-y-4">
                        <JobCard
                            role="Senior Frontend Engineer"
                            department="Engineering"
                            location="Remote (Lagos/London)"
                            type="Full-time"
                        />
                        <JobCard
                            role="Product Designer"
                            department="Design"
                            location="Remote"
                            type="Full-time"
                        />
                        <JobCard
                            role="Financial Analyst"
                            department="Data"
                            location="Lagos, NG"
                            type="Full-time"
                        />
                        <JobCard
                            role="Growth Manager"
                            department="Marketing"
                            location="Remote"
                            type="Contract"
                        />
                    </div>
                </div>

                {/* Culture Plug */}
                <div className="mt-24 p-12 bg-gray-50 rounded-[3rem] text-center border border-gray-100">
                    <Briefcase size={40} className="mx-auto text-gray-400 mb-6" />
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Don't see your role?</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto font-medium">
                        We are always looking for talent. Send your portfolio and resume to careers@finexa.com
                    </p>
                    <button className="px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition-all">
                        Email Us
                    </button>
                </div>
            </div>
        </div>
    );
};

const JobCard = ({ role, department, location, type }: { role: string, department: string, location: string, type: string }) => (
    <motion.div
        whileHover={{ scale: 1.01 }}
        className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-white border border-gray-100 rounded-3xl hover:border-black transition-all cursor-pointer shadow-sm hover:shadow-lg hover:shadow-gray-200/20"
    >
        <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-black text-gray-900 group-hover:text-green-600 transition-colors">{role}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 font-bold">
                <span>{department}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{location}</span>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-gray-50 text-xs font-black uppercase tracking-widest rounded-xl text-gray-500">
                {type}
            </span>
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                <ArrowRight size={18} />
            </div>
        </div>
    </motion.div>
);
