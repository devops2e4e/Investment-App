import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Lock,
    Trash2,
    Camera,
    Save,
    Shield,
    Bell,
    Smartphone,
    Check,
    AlertCircle,
    Eye,
    EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SettingsPage = () => {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Account Settings</h1>
                    <p className="text-gray-500 font-medium">Manage your profile, security, and preferences.</p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-2">
                        <TabButton
                            active={activeTab === 'profile'}
                            onClick={() => setActiveTab('profile')}
                            icon={<User size={18} />}
                            label="Profile"
                        />
                        <TabButton
                            active={activeTab === 'security'}
                            onClick={() => setActiveTab('security')}
                            icon={<Lock size={18} />}
                            label="Security"
                        />
                        <TabButton
                            active={activeTab === 'notifications'}
                            onClick={() => setActiveTab('notifications')}
                            icon={<Bell size={18} />}
                            label="Notifications"
                        />
                        <TabButton
                            active={activeTab === 'danger'}
                            onClick={() => setActiveTab('danger')}
                            icon={<Trash2 size={18} />}
                            label="Danger Zone"
                            variant="danger"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8"
                        >
                            {activeTab === 'profile' && <ProfileSettings user={user} updateProfile={updateProfile} />}
                            {activeTab === 'security' && <SecuritySettings />}
                            {activeTab === 'notifications' && <NotificationSettings />}
                            {activeTab === 'danger' && <DangerZone logout={logout} navigate={navigate} />}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label, variant = 'default' }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${active
            ? variant === 'danger' ? 'bg-red-50 text-red-600' : 'bg-black text-white shadow-lg'
            : 'text-gray-500 hover:bg-white hover:shadow-sm'
            }`}
    >
        {icon}
        {label}
    </button>
);

const ProfileSettings = ({ user, updateProfile }: { user: any, updateProfile: any }) => {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [location, setLocation] = useState('Lagos, Nigeria');
    const [phone, setPhone] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));

        await updateProfile({ name, email });
        setIsSaving(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6 pb-8 border-b border-gray-100">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl font-black text-gray-300">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors border-2 border-white">
                        <Camera size={14} />
                    </button>
                </div>
                <div>
                    <h3 className="text-xl font-black text-gray-900">{name || 'User'}</h3>
                    <p className="text-gray-500 text-sm font-medium">Update your photo and personal details.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234..."
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="pt-6 flex justify-end items-center gap-4">
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-green-600 font-bold text-sm"
                        >
                            <Check size={16} /> Saved Successfully
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

const SecuritySettings = () => {
    const { verifyPassword } = useAuth();
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);

    // Visibility states
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleUpdatePassword = async () => {
        if (!currentPass || !newPass || !confirmPass) {
            setMessage({ type: 'error', text: 'Please fill all fields' });
            return;
        }

        // Strict Validation Rules
        if (newPass.length < 8) {
            setMessage({ type: 'error', text: 'New password must be at least 8 characters' });
            return;
        }

        if (newPass !== confirmPass) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        setIsVerifying(true);
        setMessage(null);

        // Verify Current Password
        const isValidCurrent = await verifyPassword(currentPass);

        setIsVerifying(false);

        if (!isValidCurrent) {
            setMessage({ type: 'error', text: 'Current password is incorrect' });
            return;
        }

        // Simulating password update success
        setMessage({ type: 'success', text: 'Password updated successfully!' });
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-black text-gray-900 mb-1">Password</h3>
                <p className="text-gray-500 text-sm font-medium">Ensure your account is using a long, random password to stay secure.</p>
            </div>

            <div className="space-y-4 max-w-md">
                <div className="relative">
                    <input
                        type={showCurrent ? "text" : "password"}
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        placeholder="Current Password"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium pr-12"
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showNew ? "text" : "password"}
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="New Password"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium pr-12"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all font-medium pr-12"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`flex items-center gap-2 text-sm font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}
                        >
                            {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={handleUpdatePassword}
                    disabled={isVerifying}
                    className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all w-full disabled:opacity-70"
                >
                    {isVerifying ? 'Verifying...' : 'Update Password'}
                </button>
            </div>

            <div className="border-t border-gray-100 pt-8">
                <h3 className="text-lg font-black text-gray-900 mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">Text Message (SMS)</div>
                            <div className="text-xs text-gray-500 font-medium">Use your mobile phone to receive security codes.</div>
                        </div>
                    </div>
                    <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors focus:outline-none">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const NotificationSettings = () => {
    // Toggles state
    const [toggles, setToggles] = useState({
        volatility: true,
        portfolio: true,
        news: true
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-black text-gray-900 mb-1">Preferences</h3>
                <p className="text-gray-500 text-sm font-medium">Manage how you receive updates and alerts.</p>
            </div>

            <div className="space-y-4">
                <ToggleOption
                    label="Market Volatility Alerts"
                    description="Get notified when watchlist assets move by >5%."
                    checked={toggles.volatility}
                    onChange={() => handleToggle('volatility')}
                />
                <ToggleOption
                    label="Portfolio Updates"
                    description="Daily summary of your portfolio performance."
                    checked={toggles.portfolio}
                    onChange={() => handleToggle('portfolio')}
                />
                <ToggleOption
                    label="News & Educational Content"
                    description="Weekly curated articles and guides."
                    checked={toggles.news}
                    onChange={() => handleToggle('news')}
                />
            </div>
        </div>
    );
};

const DangerZone = ({ logout, navigate }: { logout: any, navigate: any }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteAccount = () => {
        if (window.confirm('Are you absolutely sure? This action cannot be undone.')) {
            setIsDeleting(true);
            setTimeout(() => {
                logout();
                navigate('/');
            }, 1000);
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4">
                <div className="mt-1 p-2 bg-red-100 text-red-600 rounded-lg">
                    <Shield size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-red-900 mb-1">Delete Account</h3>
                    <p className="text-red-700 text-sm leading-relaxed mb-4">
                        Once you delete your account, there is no going back. Please be certain. All your data, including portfolio history and simulations, will be permanently removed.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                            className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all text-sm disabled:opacity-50"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Account'}
                        </button>
                        <button className="px-6 py-2.5 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-sm">
                            Deactivate Instead
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToggleOption = ({ label, description, checked, onChange }: { label: string, description: string, checked: boolean, onChange: () => void }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div>
            <div className="font-bold text-gray-900 text-sm">{label}</div>
            <div className="text-xs text-gray-500 font-medium">{description}</div>
        </div>
        <button
            onClick={onChange}
            className={`w-12 h-6 ${checked ? 'bg-green-600' : 'bg-gray-200'} rounded-full relative transition-colors cursor-pointer focus:outline-none`}
        >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${checked ? 'left-7' : 'left-1'}`} />
        </button>
    </div>
);
