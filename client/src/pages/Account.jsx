import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import BackButton from '../components/common/BackButton';
import { User, Mail, Phone, MapPin, Save, ShieldCheck, Calendar, IdCard, AlertTriangle, X } from 'lucide-react';

const Account = () => {
    const { user, updateUser } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        updateUser(formData);
        setIsSaving(false);
        setIsDirty(false);
        setMessage(t('account.profileUpdated'));

        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />

            <div className="relative z-10">
                <NavBar />
            </div>

            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <div className="mb-6">
                        <BackButton
                            to="/dashboard"
                            text={t('account.back')}
                            onClick={(e) => {
                                if (isDirty) {
                                    e.preventDefault();
                                    setShowExitModal(true);
                                }
                            }}
                        />
                    </div>

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-xl text-green-700">
                                <User size={28} />
                            </div>
                            {t('account.accountDetails')}
                        </h1>
                        <p className="text-gray-600 mt-2 ml-14">
                            Manage your personal information and account settings
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                        {/* Profile Header Section */}
                        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg ring-4 ring-white shrink-0">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="text-center md:text-left flex-grow">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                                    <p className="text-gray-500 mb-6 flex items-center justify-center md:justify-start gap-2">
                                        <Mail size={16} />
                                        {user?.email}
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                                        <div className="p-3 bg-white/50 rounded-2xl border border-white/50">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <Calendar size={14} />
                                                <p className="text-[10px] uppercase tracking-wider font-bold">{t('account.memberSince')}</p>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-700">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                                        </div>
                                        <div className="p-3 bg-white/50 rounded-2xl border border-white/50">
                                            <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                                                <IdCard size={14} />
                                                <p className="text-[10px] uppercase tracking-wider font-bold">{t('account.userId')}</p>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-700">#{user?.id?.slice(-8).toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                                <ShieldCheck className="text-green-600" size={22} />
                                {t('account.personalInfo')}
                            </h3>

                            {message && (
                                <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-300">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                            <User size={14} className="text-gray-400" />
                                            {t('account.name')}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                            <Mail size={14} className="text-gray-400" />
                                            {t('account.email')}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                            <Phone size={14} className="text-gray-400" />
                                            {t('account.phone')}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                            <MapPin size={14} className="text-gray-400" />
                                            {t('account.address')}
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex justify-start pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Save size={20} />
                                        )}
                                        {t('account.saveChanges')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Unsaved Changes Modal */}
            {showExitModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                                    <AlertTriangle size={24} />
                                </div>
                                <button
                                    onClick={() => {
                                        setShowExitModal(false);
                                    }}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {t('account.unsavedChanges')}
                            </h3>
                            <p className="text-gray-500">
                                {t('account.leaveConfirm')}
                            </p>
                        </div>

                        <div className="p-6 bg-gray-50/50 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => {
                                    setShowExitModal(false);
                                    navigate('/dashboard');
                                }}
                                className="flex-1 px-6 py-3.5 border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all text-sm"
                            >
                                {t('account.leave')}
                            </button>
                            <button
                                onClick={() => {
                                    setShowExitModal(false);
                                }}
                                className="flex-1 px-6 py-3.5 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all text-sm"
                            >
                                {t('account.stay')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Account;
