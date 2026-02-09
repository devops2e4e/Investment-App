import { motion } from 'framer-motion';

export const TermsPage = () => {
    return (
        <div className="bg-white min-h-screen pt-12 pb-24">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-black text-gray-900 mb-8">Terms of Service</h1>
                    <div className="prose prose-gray max-w-none space-y-6 text-gray-600 font-medium">
                        <p>Last updated: February 8, 2026</p>
                        <section>
                            <h2 className="text-xl font-black text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p>By accessing and using Finexa, you agree to be bound by these Terms of Service. This is a simulation platform for educational purposes only.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-black text-gray-900 mb-4">2. Simulation Only</h2>
                            <p>All data, currency, and transactions on Finexa are simulated. No real money is involved, and no actual trades are executed on any exchange.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-black text-gray-900 mb-4">3. No Financial Advice</h2>
                            <p>Finexa does not provide financial or investment advice. The information provided is for educational purposes only.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
