import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Zap,
    Droplet,
    Flame,
    Search,
    CreditCard,
    ChevronRight,
    AlertCircle,
    ShieldCheck,
    CheckCircle2,
    User,
    Receipt,
    Smartphone,
    Mail,
    Calendar,
    IndianRupee,
    ArrowLeft,
    Loader2
} from 'lucide-react';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import Footer from '../../components/common/Footer';
import PageHeader from '../../components/common/PageHeader';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { fetchBillDetails, mockQuickPay } from '../../context/mockApi';
import { locationData } from '../../constants/locations';

const QuickPay = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    // Flow State
    const [step, setStep] = useState(1); // 1: Select Service, 2: Verify ID, 3: Bill Info, 4: Success
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Accessibility State
    const [showHowItWorks, setShowHowItWorks] = useState(true);
    const [showBillHelper, setShowBillHelper] = useState(false);

    // Form Data
    const [selectedService, setSelectedService] = useState(null);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [consumerNumber, setConsumerNumber] = useState('');
    const [billData, setBillData] = useState(null);
    const [payerInfo, setPayerInfo] = useState({
        email: '',
        mobile: ''
    });
    const [transactionResult, setTransactionResult] = useState(null);

    const services = [
        { id: 'electricity', name: 'Electricity', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
        { id: 'water', name: 'Water', icon: Droplet, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
        { id: 'gas', name: 'Gas', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
    ];

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedDistrict(''); // Reset district when state changes
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!selectedState || !selectedDistrict) {
            setError('Please select your State and District first.');
            return;
        }
        if (!consumerNumber || consumerNumber.length < 8) {
            setError('Please enter a valid Consumer Number (at least 8 digits)');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await fetchBillDetails(consumerNumber, selectedService.name);
            if (result.success) {
                setBillData(result.billDetails);
                setStep(3);
                window.scrollTo(0, 0);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An error occurred during verification. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!payerInfo.email || !payerInfo.mobile) {
            setError('Please fill in all payer details to receive your receipt.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await mockQuickPay({ amount: billData.amount });
            if (result.success) {
                setTransactionResult(result);
                setStep(4);
                window.scrollTo(0, 0);
            }
        } catch (err) {
            setError('Payment simulation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetFlow = () => {
        setStep(1);
        setSelectedService(null);
        setSelectedState('');
        setSelectedDistrict('');
        setConsumerNumber('');
        setBillData(null);
        setPayerInfo({ email: '', mobile: '' });
        setTransactionResult(null);
        setError('');
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <TopBar />
            <div id="search-tour-step">
                <NavBar />
            </div>
            <AnimatedBackground />

            <PageHeader
                title={t('nav.quickPay')}
                description="Pay your utility bills instantly and securely without signing in."
                icon={Zap}
                watermarkIcon={CreditCard}
                gradient="bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900"
            />

            <main className="grow relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">

                    {/* How it Works - Accessibility Guide */}
                    {step === 1 && showHowItWorks && (
                        <div className="mb-12 bg-indigo-50 border-2 border-indigo-100 rounded-[2rem] p-8 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
                            <button
                                onClick={() => setShowHowItWorks(false)}
                                className="absolute top-6 right-6 text-indigo-400 hover:text-indigo-600 transition-colors"
                            >
                                <CheckCircle2 size={24} />
                            </button>

                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg shrink-0">
                                    <ShieldCheck size={40} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-indigo-900 mb-2 uppercase tracking-tight">How it Works</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                        {[
                                            { step: "1", text: "Choose what you want to pay" },
                                            { step: "2", text: "Enter your Consumer ID" },
                                            { step: "3", text: "Pay and Save Receipt" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-start">
                                                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">{item.step}</div>
                                                <div>
                                                    <p className="font-bold text-indigo-900 text-sm">{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Progress Stepper */}
                    {step < 4 && (
                        <div className="flex items-center justify-between mb-12 px-4 overflow-x-auto pb-4 scrollbar-hide">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="flex items-center flex-1 last:flex-none">
                                    <div className={`flex flex-col items-center gap-2 transition-all duration-300 ${step >= num ? 'opacity-100' : 'opacity-40'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= num ? 'bg-violet-600 border-violet-600 text-white shadow-lg' : 'bg-white border-gray-300 text-gray-400'}`}>
                                            {step > num ? <CheckCircle2 size={20} /> : num}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap ${step >= num ? 'text-violet-700' : 'text-gray-400'}`}>
                                            {num === 1 ? 'Select' : num === 2 ? 'Verify' : 'Payment'}
                                        </span>
                                    </div>
                                    {num < 3 && (
                                        <div className={`h-1 flex-1 mx-4 rounded-full transition-all duration-500 ${step > num ? 'bg-violet-600' : 'bg-gray-200'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Interaction Area */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Step 1: Service Selection */}
                            {step === 1 && (
                                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                                            <Receipt className="text-violet-600" size={24} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span>Select What to Pay</span>
                                        </div>
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {services.map((service) => (
                                            <button
                                                key={service.id}
                                                onClick={() => handleServiceSelect(service)}
                                                className={`group relative p-8 rounded-[2rem] border-2 transition-all duration-200 flex flex-col items-center gap-4 shadow-[0_8px_0_0_rgba(0,0,0,0.05)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.05)] hover:translate-y-[4px] active:translate-y-[8px] active:shadow-none ${service.bg} ${service.border} hover:border-violet-500`}
                                            >
                                                <div className={`p-5 rounded-2xl bg-white shadow-md transition-transform group-hover:rotate-12`}>
                                                    <service.icon size={36} className={service.color} />
                                                </div>
                                                <div className="text-center">
                                                    <span className="block font-black text-gray-900 text-xl uppercase tracking-tight">{service.name}</span>
                                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Instant Pay</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Verification */}
                            {step === 2 && (
                                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-500">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="mb-8 flex items-center gap-2 text-violet-600 font-bold hover:text-violet-700 transition-colors uppercase tracking-widest text-xs"
                                    >
                                        <ArrowLeft size={16} /> Back to Selection
                                    </button>

                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                                                <Search className="text-violet-600" size={24} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span>Search Your Bill</span>
                                            </div>
                                        </h2>
                                        <div className={`px-4 py-2 rounded-full ${selectedService.bg} ${selectedService.color} font-bold text-sm flex items-center gap-2 border ${selectedService.border}`}>
                                            <selectedService.icon size={16} />
                                            {selectedService.name}
                                        </div>
                                    </div>

                                    <form onSubmit={handleVerify} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* State Selection */}
                                            <div className="group">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">
                                                    Select State
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={selectedState}
                                                        onChange={handleStateChange}
                                                        className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-4 pr-10 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-bold text-slate-700 shadow-sm appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Choose State</option>
                                                        {Object.keys(locationData).map(state => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <ChevronRight size={18} className="rotate-90" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* District Selection */}
                                            <div className="group">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">
                                                    Select District
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={selectedDistrict}
                                                        onChange={(e) => setSelectedDistrict(e.target.value)}
                                                        disabled={!selectedState}
                                                        className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-4 pr-10 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-bold text-slate-700 shadow-sm appearance-none cursor-pointer disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed"
                                                    >
                                                        <option value="">{selectedState ? 'Choose District' : 'Select State First'}</option>
                                                        {selectedState && locationData[selectedState].map(district => (
                                                            <option key={district} value={district}>{district}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <ChevronRight size={18} className="rotate-90" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <div className="flex justify-between items-end mb-3 px-1">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest transition-colors group-focus-within:text-violet-600">
                                                    Consumer Number / आईडी नंबर
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowBillHelper(!showBillHelper)}
                                                    className="text-[10px] font-black text-violet-600 border-b-2 border-violet-100 hover:border-violet-500 transition-all uppercase tracking-tighter"
                                                >
                                                    Where is it? / यह कहाँ है?
                                                </button>
                                            </div>

                                            {showBillHelper && (
                                                <div className="mb-4 p-4 bg-orange-50 border-2 border-orange-100 rounded-2xl animate-in zoom-in-95 duration-300">
                                                    <p className="text-xs font-bold text-orange-800 mb-2 flex items-center gap-2">
                                                        <Search size={14} /> Look for "Consumer ID" or "Account No" on your old bill.
                                                    </p>
                                                    <div className="h-32 bg-white rounded-xl border border-orange-100 flex items-center justify-center relative overflow-hidden grayscale">
                                                        <div className="p-4 w-full h-full text-[8px] font-mono text-slate-300 leading-tight">
                                                            GOVERNMENT UTILITY BILL<br />
                                                            NAME: RAJESH KUMAR<br />
                                                            <span className="bg-yellow-200 text-slate-900 font-bold text-[10px] p-0.5">CONSUMER NO: 12345678</span><br />
                                                            DUE DATE: 25-FEB-2026
                                                        </div>
                                                        <div className="absolute inset-0 border-2 border-dashed border-yellow-500/50 rounded-xl pointer-events-none" />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={consumerNumber}
                                                    onChange={(e) => setConsumerNumber(e.target.value)}
                                                    placeholder="Example: 12345678"
                                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all font-mono text-xl shadow-sm"
                                                />
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" size={22} />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 animate-in shake duration-300">
                                                <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                                <p className="text-red-700 text-sm font-medium">{error}</p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-20 bg-gradient-to-r from-violet-700 via-indigo-600 to-violet-700 text-white font-black rounded-3xl shadow-[0_8px_0_0_rgba(76,29,149,1)] hover:shadow-[0_4px_0_0_rgba(76,29,149,1)] hover:translate-y-[4px] active:translate-y-[8px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xl group"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="animate-spin" size={28} />
                                            ) : (
                                                <>
                                                    Verify & Fetch Bill
                                                    <ChevronRight size={26} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Step 3: Bill Info & Payer Form */}
                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    {/* Bill Summary Card */}
                                    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-12 opacity-5 transform translate-x-1/4 -translate-y-1/4">
                                            {billData.serviceType === 'Electricity' ? <Zap size={200} /> : <Receipt size={200} />}
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                                <div>
                                                    <h3 className="text-indigo-200 uppercase tracking-widest text-xs font-bold mb-1">Bill Summary</h3>
                                                    <p className="text-3xl font-black tracking-tight">{billData.consumerName}</p>
                                                </div>
                                                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                                                    <span className="text-indigo-200 text-xs font-bold uppercase block mb-1">Total Amount Due</span>
                                                    <div className="flex items-center gap-1 text-2xl font-black">
                                                        <IndianRupee size={20} />
                                                        {billData.amount.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-white/10">
                                                <div>
                                                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider block mb-1">Consumer ID</span>
                                                    <span className="font-mono text-sm">{billData.consumerId}</span>
                                                </div>
                                                <div>
                                                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider block mb-1">Billing Month</span>
                                                    <span className="text-sm font-semibold">{billData.billingMonth}</span>
                                                </div>
                                                <div>
                                                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider block mb-1">Due Date</span>
                                                    <span className="text-sm font-semibold text-orange-400">{billData.dueDate}</span>
                                                </div>
                                                <div>
                                                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider block mb-1">Status</span>
                                                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-orange-500 rounded-full text-white inline-block">Unpaid</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payer Info Form */}
                                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                                                <User className="text-violet-600" size={24} />
                                            </div>
                                            Your Receipt Information
                                        </h2>

                                        <form onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">
                                                    Email for Receipt
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        required
                                                        value={payerInfo.email}
                                                        onChange={(e) => setPayerInfo({ ...payerInfo, email: e.target.value })}
                                                        placeholder="email@example.com"
                                                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:bg-white focus:border-violet-500 transition-all shadow-sm"
                                                    />
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" size={20} />
                                                </div>
                                            </div>

                                            <div className="group">
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">
                                                    Mobile Number
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={payerInfo.mobile}
                                                        onChange={(e) => setPayerInfo({ ...payerInfo, mobile: e.target.value })}
                                                        placeholder="+91-XXXXXXXXXX"
                                                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:bg-white focus:border-violet-500 transition-all shadow-sm"
                                                    />
                                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors" size={20} />
                                                </div>
                                            </div>

                                            {error && (
                                                <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                                                    <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                                    <p className="text-red-700 text-sm font-medium">{error}</p>
                                                </div>
                                            )}

                                            <div className="md:col-span-2 pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="w-full h-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white font-black rounded-3xl shadow-[0_8px_0_0_rgba(6,78,59,1)] hover:shadow-[0_4px_0_0_rgba(6,78,59,1)] hover:translate-y-[4px] active:translate-y-[8px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xl group"
                                                >
                                                    {isLoading ? <Loader2 className="animate-spin" size={28} /> : (
                                                        <>
                                                            Pay Bill Now
                                                            <CreditCard size={26} className="group-hover:scale-110 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                                <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-[0.1em] mt-6">
                                                    Secure 256-bit Encrypted Transaction
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Success */}
                            {step === 4 && (
                                <div className="bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] p-12 shadow-2xl text-center animate-in zoom-in-95 duration-700 max-w-2xl mx-auto">
                                    <div className="relative inline-block mb-8">
                                        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse" />
                                        <div className="relative w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg mx-auto">
                                            <CheckCircle2 size={48} className="text-emerald-600" />
                                        </div>
                                    </div>

                                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">Payment Success!</h2>
                                    <p className="text-slate-500 font-medium text-lg mb-10">Your utility bill has been paid successfully. A receipt has been sent to your email.</p>

                                    <div className="bg-slate-50 border-2 border-slate-100 rounded-3xl p-8 mb-10 text-left space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400 font-bold uppercase tracking-wider">Transaction ID</span>
                                            <span className="font-mono font-black text-slate-800">{transactionResult.transactionId}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400 font-bold uppercase tracking-wider">Amount Paid</span>
                                            <span className="font-black text-emerald-700 flex items-center gap-0.5 text-lg">
                                                <IndianRupee size={16} />
                                                {transactionResult.amount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400 font-bold uppercase tracking-wider">Date & Time</span>
                                            <span className="font-bold text-slate-800">{transactionResult.date}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => window.print()}
                                            className="flex-1 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                                        >
                                            <IndianRupee size={18} /> Print Receipt
                                        </button>
                                        <button
                                            onClick={resetFlow}
                                            className="flex-1 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-violet-500 hover:text-violet-600 transition-all uppercase tracking-widest text-sm"
                                        >
                                            New Payment
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Sidebar Info - Persists through steps */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <ShieldCheck size={120} />
                                </div>
                                <h3 className="text-xl font-black mb-6 relative z-10 tracking-tight flex items-center gap-2 uppercase">
                                    <ShieldCheck size={24} /> Instant & Secure
                                </h3>
                                <ul className="space-y-5 relative z-10">
                                    {[
                                        { title: 'No Account Required', desc: 'Fast, secure guest checkout.', icon: User },
                                        { title: 'Zero Convenience Fee', desc: 'Honest pricing, no hidden costs.', icon: CreditCard },
                                        { title: 'Secure Gateway', desc: 'Bank-grade 256-bit encryption.', icon: Zap }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex gap-4 group">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white/20 transition-colors">
                                                <item.icon size={20} className="text-violet-200" />
                                            </div>
                                            <div>
                                                <span className="block font-bold text-white tracking-tight">{item.title}</span>
                                                <span className="text-xs text-violet-200 leading-tight block mt-0.5">{item.desc}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-lg">
                                <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-[10px] flex items-center gap-2">
                                    <Smartphone size={14} className="text-violet-600" /> Digital Support
                                </h3>
                                <div className="space-y-6">
                                    <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                                        <p className="text-xs font-black text-emerald-800 mb-3 uppercase tracking-tight">Facing Difficulty?</p>
                                        <p className="text-sm text-emerald-700 mb-6 leading-relaxed font-semibold">Call or WhatsApp our assistant for help with payment.</p>
                                        <div className="space-y-3">
                                            <a href="tel:1800123456" className="w-full bg-emerald-600 text-white py-3 rounded-xl text-xs font-black hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm">
                                                <Smartphone size={14} /> Call Support: 1800-XXX-XXXX
                                            </a>
                                            <button
                                                onClick={() => navigate('/help')}
                                                className="w-full bg-white border-2 border-emerald-200 py-3 rounded-xl text-xs font-black text-emerald-700 hover:border-emerald-500 transition-all flex items-center justify-center gap-2"
                                            >
                                                View Guide / गाइड देखें
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support Live 24/7</span>
                                    </div>
                                </div>
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
