import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import PageHeader from '../components/common/PageHeader';
import { User, Mail, Phone, MapPin, Save, ShieldCheck, Calendar, CreditCard, AlertTriangle, X, Search, Globe } from 'lucide-react';
import { locationData } from '../constants/locations';

const Account = () => {
    const { user, updateUser } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        state: user?.state || '',
        district: user?.district || '',
        subDistrict: user?.subDistrict || '',
        village: user?.village || '',
        pincode: user?.pincode ? String(user.pincode) : '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showAddressErrors, setShowAddressErrors] = useState(false);
    const [tempAddress, setTempAddress] = useState({ ...formData });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    const handleTempAddressChange = (e) => {
        const { name, value } = e.target;
        setTempAddress(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'state') newData.district = '';
            return newData;
        });
    };

    const isAddressValid = () => {
        return tempAddress.village.trim() !== '' &&
            tempAddress.subDistrict?.trim() !== '' &&
            tempAddress.pincode.trim().length === 6 &&
            tempAddress.state !== '' &&
            tempAddress.district !== '';
    };

    const saveAddressModal = () => {
        if (!isAddressValid()) {
            setShowAddressErrors(true);
            return;
        }

        setFormData(prev => ({
            ...prev,
            state: tempAddress.state,
            district: tempAddress.district,
            subDistrict: tempAddress.subDistrict,
            village: tempAddress.village,
            pincode: tempAddress.pincode
        }));
        setIsDirty(true);
        setShowAddressModal(false);
        setShowAddressErrors(false);
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

    const getAddressSummary = () => {
        const parts = [
            formData.village,
            formData.subDistrict,
            formData.district,
            formData.state,
            formData.pincode
        ].filter(Boolean);
        return parts.join(', ') || 'Address not complete';
    };

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />

            <div className="relative z-10">
                <NavBar />
            </div>

            <main className="flex-1 pb-12 relative z-10">
                <PageHeader
                    title={t('account.accountDetails')}
                    description="Manage your personal information and account settings"
                    to="/dashboard"
                    backText={t('account.back')}
                    icon={User}
                    watermarkIcon={CreditCard}
                    onBackClick={(e) => {
                        if (isDirty) {
                            e.preventDefault();
                            setShowExitModal(true);
                        }
                    }}
                />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Profile Header Section */}
                        <div className="p-8 border-b border-gray-100 bg-slate-50/50">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="relative group">
                                    <div className="w-28 h-28 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center text-indigo-600 text-3xl font-bold shadow-sm transition-transform group-hover:scale-105">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white border-2 border-white shadow-md">
                                        <ShieldCheck size={16} />
                                    </div>
                                </div>
                                <div className="text-center md:text-left flex-grow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900 mb-1">{user?.name}</h2>
                                            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 text-sm">
                                                <Mail size={16} className="text-slate-400" />
                                                {user?.email}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="p-8 md:p-10">
                            <div className="flex items-center gap-2 mb-8 border-b border-gray-50 pb-4">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                                        <User className="text-indigo-600" size={18} />
                                    </div>
                                    {t('account.personalInfo')}
                                </h3>
                            </div>

                            {message && (
                                <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            {t('account.name')}
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 text-sm font-medium"
                                                required
                                            />
                                            <User size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            {t('account.email')}
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 text-sm font-medium"
                                                required
                                            />
                                            <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            {t('account.phone')}
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 text-sm font-medium"
                                            />
                                            <Phone size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                                            {t('account.address')}
                                        </label>
                                        <div className="relative group">
                                            <div
                                                onClick={() => {
                                                    setTempAddress({ ...formData });
                                                    setShowAddressModal(true);
                                                    setShowAddressErrors(false);
                                                }}
                                                className="w-full pl-4 pr-32 py-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <MapPin size={18} className="text-indigo-500 shrink-0" />
                                                    <span className="text-slate-600 text-sm font-medium truncate">
                                                        {getAddressSummary()}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-white border border-indigo-200 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors"
                                                >
                                                    {t('common.edit')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8 border-t border-gray-50">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="w-full md:w-auto px-10 py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Save size={18} className="group-hover:scale-110 transition-transform" />
                                        )}
                                        {t('account.saveChanges')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Address Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <style>
                        {`
                        @keyframes shake {
                            0%, 100% { transform: translateX(0); }
                            25% { transform: translateX(-4px); }
                            75% { transform: translateX(4px); }
                        }
                        .animate-shake {
                            animation: shake 0.2s ease-in-out 0s 2;
                        }
                        `}
                    </style>
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                                    <MapPin size={22} />
                                </div>
                                Update Address
                            </h3>
                            <button
                                onClick={() => setShowAddressModal(false)}
                                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Village / Town</label>
                                    <input
                                        type="text"
                                        name="village"
                                        value={tempAddress.village}
                                        onChange={handleTempAddressChange}
                                        className={`w-full px-4 py-3 bg-white border ${showAddressErrors && !tempAddress.village?.trim() ? 'border-red-500 ring-4 ring-red-50 animate-shake' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 text-sm transition-all`}
                                        placeholder="Enter village"
                                        required
                                    />
                                    {showAddressErrors && !tempAddress.village?.trim() && (
                                        <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                                            <AlertTriangle size={10} /> Please fill this field
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Sub District / City</label>
                                    <input
                                        type="text"
                                        name="subDistrict"
                                        value={tempAddress.subDistrict}
                                        onChange={handleTempAddressChange}
                                        className={`w-full px-4 py-3 bg-white border ${showAddressErrors && !tempAddress.subDistrict?.trim() ? 'border-red-500 ring-4 ring-red-50 animate-shake' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 text-sm transition-all`}
                                        placeholder="Enter sub district or city"
                                        required
                                    />
                                    {showAddressErrors && !tempAddress.subDistrict?.trim() && (
                                        <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                                            <AlertTriangle size={10} /> Please fill this field
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">PIN Code</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={tempAddress.pincode}
                                        onChange={handleTempAddressChange}
                                        className={`w-full px-4 py-3 bg-white border ${showAddressErrors && (!tempAddress.pincode?.trim() || tempAddress.pincode.length !== 6) ? 'border-red-500 ring-4 ring-red-50 animate-shake' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 text-sm transition-all`}
                                        placeholder="6-digit PIN code"
                                        maxLength="6"
                                        required
                                    />
                                    {showAddressErrors && (!tempAddress.pincode?.trim() || tempAddress.pincode.length !== 6) && (
                                        <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                                            <AlertTriangle size={10} /> {!tempAddress.pincode?.trim() ? 'Please fill this field' : 'Must be 6 digits'}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('account.state')}</label>
                                    <div className="relative">
                                        <select
                                            name="state"
                                            value={tempAddress.state}
                                            onChange={handleTempAddressChange}
                                            className={`w-full px-4 py-3 bg-white border ${showAddressErrors && !tempAddress.state ? 'border-red-500 ring-4 ring-red-50 animate-shake' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-slate-700 text-sm appearance-none transition-all`}
                                            required
                                        >
                                            <option value="">Select State</option>
                                            {Object.keys(locationData || {}).sort().map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                        <ArrowRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                                    </div>
                                    {showAddressErrors && !tempAddress.state && (
                                        <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                                            <AlertTriangle size={10} /> Please select a state
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{t('account.district')}</label>
                                    <div className="relative">
                                        <select
                                            name="district"
                                            value={tempAddress.district}
                                            onChange={handleTempAddressChange}
                                            className={`w-full px-4 py-3 bg-white border ${showAddressErrors && !tempAddress.district ? 'border-red-500 ring-4 ring-red-50 animate-shake' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'} rounded-xl focus:ring-2 outline-none text-slate-700 text-sm appearance-none disabled:bg-slate-50 w-full transition-all`}
                                            disabled={!tempAddress.state}
                                            required
                                        >
                                            <option value="">Select District</option>
                                            {tempAddress.state && locationData[tempAddress.state] && [...locationData[tempAddress.state]].sort().map(dist => (
                                                <option key={dist} value={dist}>{dist}</option>
                                            ))}
                                        </select>
                                        <ArrowRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" />
                                    </div>
                                    {showAddressErrors && !tempAddress.district && (
                                        <p className="text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1">
                                            <AlertTriangle size={10} /> Please select a district
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 flex gap-4">
                            <button
                                onClick={() => setShowAddressModal(false)}
                                className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveAddressModal}
                                className="flex-1 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all text-sm"
                            >
                                Update Address
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
