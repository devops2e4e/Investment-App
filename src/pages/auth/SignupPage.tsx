import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../../components/ui/Logo';
import { Mail, User, Lock, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Real-time validation states
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    const navigate = useNavigate();
    const { register } = useAuth();

    // Email validation regex
    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Final validation before submit
        if (!agreedToTerms) {
            setError('Please agree to the Terms & Privacy Policy');
            return;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await register(email, name, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Real-time validation effects
    useEffect(() => {
        if (email && !validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    }, [email]);

    useEffect(() => {
        if (password && password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
        } else {
            setPasswordError('');
        }
    }, [password]);

    useEffect(() => {
        if (name && name.length < 3) {
            setNameError('Name must be at least 3 characters');
        } else {
            setNameError('');
        }
    }, [name]);

    const isFormValid = name.length >= 3 && validateEmail(email) && password.length >= 8 && agreedToTerms;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 pb-16 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-block mb-6"
                    >
                        <Logo />
                    </motion.div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">Join Finexa</h1>
                    <p className="text-gray-500 font-medium text-sm">Start your premium investment simulation.</p>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/40">
                    <AnimatePresence>
                        {(error || nameError || emailError || passwordError) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 overflow-hidden"
                            >
                                <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-3">
                                    <AlertCircle size={14} strokeWidth={3} />
                                    {error || nameError || emailError || passwordError}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${nameError ? 'text-red-400' : 'text-gray-400 group-focus-within:text-black'}`} size={20} />
                                <input
                                    type="text"
                                    required
                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all outline-none font-bold text-gray-900 ${nameError ? 'bg-red-50/50 border-red-200 border' : 'bg-gray-50 border-transparent border focus:bg-white focus:border-black'}`}
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${emailError ? 'text-red-400' : 'text-gray-400 group-focus-within:text-black'}`} size={20} />
                                <input
                                    type="email"
                                    required
                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all outline-none font-bold text-gray-900 ${emailError ? 'bg-red-50/50 border-red-200 border' : 'bg-gray-50 border-transparent border focus:bg-white focus:border-black'}`}
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${passwordError ? 'text-red-400' : 'text-gray-400 group-focus-within:text-black'}`} size={20} />
                                <input
                                    type="password"
                                    required
                                    className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all outline-none font-bold text-gray-900 ${passwordError ? 'bg-red-50/50 border-red-200 border' : 'bg-gray-50 border-transparent border focus:bg-white focus:border-black'}`}
                                    placeholder="Minimum 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                type="button"
                                onClick={() => setAgreedToTerms(!agreedToTerms)}
                                className="flex items-center gap-3 text-xs font-bold text-gray-500 hover:text-black transition-colors"
                            >
                                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${agreedToTerms ? 'bg-black border-black text-white' : 'border-gray-200'}`}>
                                    {agreedToTerms && <CheckCircle2 size={14} strokeWidth={3} />}
                                </div>
                                <span>I agree to the <a href="#" className="text-black hover:underline underline-offset-2">Terms & Privacy Policy</a></span>
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !isFormValid}
                            className="w-full py-4 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-30 disabled:grayscale disabled:scale-100"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Profile
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                        <p className="text-gray-500 font-medium text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-black font-black hover:underline uppercase tracking-widest text-[13px]">Log In</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-center gap-2 text-gray-300">
                    <ShieldCheck size={18} className="text-green-500/50" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">SEC Regulated & Encrypted</span>
                </div>
            </motion.div>
        </div>
    );
};
