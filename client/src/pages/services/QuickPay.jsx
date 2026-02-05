import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Search, CreditCard, ChevronRight, AlertCircle, ShieldCheck } from 'lucide-react';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';
import { useLanguage } from '../../context/LanguageContext.jsx';
import BackButton from '../../components/common/BackButton';

const QuickPay = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [consumerNumber, setConsumerNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (!consumerNumber) {
            setError('Please enter a valid Consumer Number');
            return;
        }
        setIsLoading(true);
        setError('');
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setError('No pending bills found for this Consumer Number. Please verify and try again.');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />
            <div id="search-tour-step">
                <NavBar />
            </div>

            <main className="grow relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 relative">
                        <BackButton className="absolute left-0 top-1/2 -translate-y-1/2 scale-75 origin-left" />
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight flex items-center justify-center gap-3">
                            <Zap className="text-violet-600" size={36} />
                            {t('nav.quickPay')}
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
                            Pay your utility bills instantly without signing in. Just enter your consumer ID and proceed to payment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Search Card */}
                        <div className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Search size={22} className="text-green-600" />
                                Find Your Bill
                            </h2>

                            <form onSubmit={handleSearch} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Select Utility Type
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button type="button" className="p-4 rounded-2xl border-2 border-green-600 bg-green-50 flex flex-col items-center gap-2 transition-all">
                                            <Zap size={24} className="text-green-600" />
                                            <span className="text-xs font-bold text-green-700">Electricity</span>
                                        </button>
                                        <button type="button" className="p-4 rounded-2xl border-2 border-transparent bg-gray-50 hover:bg-gray-100 flex flex-col items-center gap-2 transition-all">
                                            <CreditCard size={24} className="text-gray-400" />
                                            <span className="text-xs font-bold text-gray-600">Water</span>
                                        </button>
                                        <button type="button" className="p-4 rounded-2xl border-2 border-transparent bg-gray-50 hover:bg-gray-100 flex flex-col items-center gap-2 transition-all">
                                            <Search size={24} className="text-gray-400" />
                                            <span className="text-xs font-bold text-gray-600">Gas</span>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Consumer Number / Account ID
                                    </label>
                                    <input
                                        type="text"
                                        value={consumerNumber}
                                        onChange={(e) => setConsumerNumber(e.target.value)}
                                        placeholder="e.g. 1234567890"
                                        className="w-full bg-white border border-gray-300 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all font-mono"
                                    />
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                                        <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                        <p className="text-red-700 text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white font-bold py-4 rounded-xl hover:from-green-800 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest"
                                >
                                    {isLoading ? "Searching..." : "Fetch Bill Details"}
                                    <ChevronRight size={20} />
                                </button>
                            </form>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <ShieldCheck size={100} />
                                </div>
                                <h3 className="text-lg font-bold mb-4 relative z-10 tracking-tight">Why use Quick Pay?</h3>
                                <ul className="space-y-4 relative z-10">
                                    <li className="flex gap-3 text-sm font-medium text-violet-100">
                                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</div>
                                        No registration required
                                    </li>
                                    <li className="flex gap-3 text-sm font-medium text-violet-100">
                                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</div>
                                        Instant payment confirmation
                                    </li>
                                    <li className="flex gap-3 text-sm font-medium text-violet-100">
                                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</div>
                                        Secure encrypted transactions
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
                                <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">Help & Support</h3>
                                <p className="text-sm text-gray-500 mb-4 font-medium">Having trouble finding your Consumer ID?</p>
                                <button
                                    onClick={() => navigate('/help')}
                                    className="text-green-700 text-sm font-bold hover:underline"
                                >
                                    Contact Support →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default QuickPay;
