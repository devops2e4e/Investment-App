import { motion } from 'framer-motion';

export const PrivacyPage = () => {
    return (
        <div className="bg-white min-h-screen pt-12 pb-24">
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-black text-gray-900 mb-8">Privacy Policy</h1>
                    <div className="prose prose-gray max-w-none space-y-6 text-gray-600 font-medium">
                        <p>Last updated: February 8, 2026</p>
                        <section>
                            <h2 className="text-xl font-black text-gray-900 mb-4">1. Data Collection</h2>
                            <p>We collect minimal data necessary to provide the simulation experience, including your username and email address.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-black text-gray-900 mb-4">2. Use of Data</h2>
                            <p>Your data is used solely to manage your simulation account and provide feature updates. We do not sell your personal information.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-black text-gray-900 mb-4">3. Security</h2>
                            <p>We implement balanced security measures to protect your information within our educational environment.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
