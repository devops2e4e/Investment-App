import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="mb-8">
                            <Logo />
                        </div>
                        <p className="text-gray-500 max-w-sm mb-10 text-lg leading-relaxed font-medium">
                            Commission-free investing for everyone.
                            We're democratizing finance for the next generation of Nigerian investors.
                        </p>
                        <div className="flex gap-5">
                            <SocialIcon icon={<Twitter size={20} />} href="#" />
                            <SocialIcon icon={<Instagram size={20} />} href="#" />
                            <SocialIcon icon={<Linkedin size={20} />} href="#" />
                            <SocialIcon icon={<Github size={20} />} href="#" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Product</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/invest" className="hover:text-green-600">Invest</Link></li>
                            <li><Link to="/simulator" className="hover:text-green-600">Simulator</Link></li>
                            <li><Link to="/crypto" className="hover:text-green-600">Crypto</Link></li>
                            <li><Link to="/learn" className="hover:text-green-600">Learn</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/about" className="hover:text-green-600">About</Link></li>
                            <li><Link to="/careers" className="hover:text-green-600">Careers</Link></li>
                            <li><Link to="/press" className="hover:text-green-600">Press</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link to="/terms" className="hover:text-green-600">Terms</Link></li>
                            <li><Link to="/privacy" className="hover:text-green-600">Privacy</Link></li>
                            <li><Link to="/disclosures" className="hover:text-green-600">Disclosures</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>© 2026 FINEXA Securities. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <span>SEC Regulated</span>
                        <span>NDPR Compliant</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
    <motion.a
        href={href}
        whileHover={{ scale: 1.1, backgroundColor: '#000', color: '#fff' }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 transition-colors duration-300"
    >
        {icon}
    </motion.a>
);
