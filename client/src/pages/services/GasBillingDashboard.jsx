import React, { useState } from 'react';
import { Flame, Calendar, Download, CreditCard, TrendingUp, FileText, ChevronDown, Check, AlertCircle, User, MapPin, X, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';

import PageHeader from '../../components/common/PageHeader';
import PaymentForm from '../../components/forms/PaymentForm';
import { useToggle } from '../../hooks';

const GasBillingDashboard = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [selectedBillPeriod, setSelectedBillPeriod] = useState('');
    const [showPeriodDropdown, togglePeriodDropdown, , closePeriodDropdown] = useToggle(false);
    const [showPaymentModal, , openPaymentModal, closePaymentModal] = useToggle(false);
    const [showAllPayments, toggleAllPayments] = useToggle(false);
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    // Mock user data
    const userData = {
        consumerNumber: 'GAS-2024-78542',
        name: 'Sayan Kumar',
        address: '123, Green Park, Sector 5, Kolkata - 700001',
        connectionType: 'Domestic',
        sanctionedLoad: '15 kg/month',
        meterNumber: 'MTR-GAS-456789'
    };

    // Mock billing data
    const currentBill = {
        amount: 1850,
        dueDate: '2026-02-15',
        billingPeriod: 'January 2026',
        unitsConsumed: 18.5,
        ratePerUnit: 75.00,
        status: 'Pending'
    };

    // Mock consumption data
    const consumptionData = {
        remainingUnits: 8.5,
        totalCreditedUnits: 15,
        averageMonthlyUsage: 16.2,
        lastMonthUsage: 18.5,
        projectedNextBill: 1650
    };

    // Mock payment history
    const paymentHistory = [
        { id: 1, date: '2026-01-05', amount: 1680, billPeriod: 'December 2025', units: 16.8, status: 'Paid', transactionId: 'TXN-789456123' },
        { id: 2, date: '2025-12-03', amount: 1550, billPeriod: 'November 2025', units: 15.5, status: 'Paid', transactionId: 'TXN-789456122' },
        { id: 3, date: '2025-11-04', amount: 1480, billPeriod: 'October 2025', units: 14.8, status: 'Paid', transactionId: 'TXN-789456121' },
        { id: 4, date: '2025-10-02', amount: 1740, billPeriod: 'September 2025', units: 17.4, status: 'Paid', transactionId: 'TXN-789456120' },
        { id: 5, date: '2025-09-05', amount: 1960, billPeriod: 'August 2025', units: 19.6, status: 'Paid', transactionId: 'TXN-789456119' },
    ];

    // Bill download periods
    const billPeriods = [
        { value: '', label: '— Select Time Period —', disabled: true },
        { value: 'current', label: 'Current Bill (January 2026)' },
        { value: 'last-1', label: 'Last Month' },
        { value: 'last-3', label: 'Last 3 Months' },
        { value: 'last-6', label: 'Last 6 Months' },
        { value: 'last-12', label: 'Last 12 Months (1 Year)' },
        { value: 'last-24', label: 'Last 24 Months (2 Years)' },
        { value: 'all', label: 'All Bills' },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const getDaysUntilDue = () => {
        const today = new Date();
        const dueDate = new Date(currentBill.dueDate);
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const handleDownloadBills = () => {
        if (selectedBillPeriod === 'custom') {
            if (customStartDate && customEndDate) {
                alert(`Downloading bills from ${formatDate(customStartDate)} to ${formatDate(customEndDate)}`);
            } else {
                alert('Please select both start and end dates');
                return;
            }
        } else if (selectedBillPeriod) {
            alert(`Downloading bills for: ${billPeriods.find(p => p.value === selectedBillPeriod)?.label}`);
        }
    };

    const generateReceipt = (payment) => {
        const receiptWindow = window.open('', '_blank');
        receiptWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Payment Receipt - ${payment.transactionId}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                    .header { text-align: center; border-bottom: 3px solid #ea580c; padding-bottom: 20px; margin-bottom: 30px; }
                    .header h1 { color: #ea580c; margin: 0; }
                    .header p { color: #666; margin: 5px 0; }
                    .section { margin: 20px 0; }
                    .section h2 { color: #333; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
                    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
                    .detail-label { font-weight: bold; color: #666; }
                    .detail-value { color: #333; }
                    .amount { font-size: 24px; font-weight: bold; color: #ea580c; }
                    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #666; font-size: 12px; }
                    .status-paid { background: #fed7aa; color: #9a3412; padding: 5px 15px; border-radius: 20px; display: inline-block; }
                    @media print { body { padding: 20px; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>SUVIDHA</h1>
                    <p>Municipal Services Platform</p>
                    <p>Gas Payment Receipt</p>
                </div>
                <div class="section">
                    <h2>Transaction Details</h2>
                    <div class="detail-row"><span class="detail-label">Transaction ID:</span><span class="detail-value">${payment.transactionId}</span></div>
                    <div class="detail-row"><span class="detail-label">Payment Date:</span><span class="detail-value">${formatDate(payment.date)}</span></div>
                    <div class="detail-row"><span class="detail-label">Status:</span><span class="status-paid">PAID</span></div>
                </div>
                <div class="section">
                    <h2>Bill Information</h2>
                    <div class="detail-row"><span class="detail-label">Consumer Number:</span><span class="detail-value">${userData.consumerNumber}</span></div>
                    <div class="detail-row"><span class="detail-label">Consumer Name:</span><span class="detail-value">${userData.name}</span></div>
                    <div class="detail-row"><span class="detail-label">Billing Period:</span><span class="detail-value">${payment.billPeriod}</span></div>
                    <div class="detail-row"><span class="detail-label">Gas Consumed:</span><span class="detail-value">${payment.units} kg</span></div>
                </div>
                <div class="section">
                    <h2>Payment Summary</h2>
                    <div class="detail-row"><span class="detail-label">Amount Paid:</span><span class="amount">₹${payment.amount.toLocaleString()}</span></div>
                </div>
                <div class="footer">
                    <p>This is a computer-generated receipt and does not require a signature.</p>
                    <p>For any queries, please contact support@suvidha.gov.in or call 1800-000-SUVIDHA</p>
                    <p>© ${new Date().getFullYear()} SUVIDHA. All rights reserved.</p>
                </div>
                <script>window.onload = function() { window.print(); }</script>
            </body>
            </html>
        `);
        receiptWindow.document.close();
    };

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <AnimatedBackground />

            <div id="welcome-tour-step">

            </div>

            <div id="search-tour-step">
                <NavBar />
            </div>



            {/* Page Header - Government Style - Enhanced Aesthetic */}
            <PageHeader
                title="Gas Utilities"
                description={
                    <span className="text-orange-50 text-sm sm:text-base mt-1 font-medium">Consumer No: {userData.consumerNumber}</span>
                }
                icon={Flame}
                watermarkIcon={Flame}
                to="/services/gas"
                gradient="bg-gradient-to-br from-orange-900 via-red-800 to-orange-900"
                stripeColor="via-orange-400/30"
                orb1Color="from-orange-400/15 to-red-500/15"
                orb2Color="from-red-400/10 to-orange-500/10"
            >
                <button
                    onClick={() => navigate('/services/gas/new-connection')}
                    className="flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-700 backdrop-blur-sm text-white rounded-xl font-bold text-sm transition-all border-2 border-white/30 hover:border-white/50 shadow-lg"
                >
                    <PlusCircle size={20} />
                    Apply for New Connection
                </button>
            </PageHeader>

            {/* Dashboard Content */}
            <section className="py-6 sm:py-10 px-3 sm:px-6">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Top Section: Account Details (left) + Quick Stats (right) */}
                    <div className="flex flex-col lg:flex-row gap-4">

                        {/* Account Details - Left Side */}
                        <div className="lg:w-1/3 bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white border-2 border-orange-200 flex items-center justify-center">
                                        <User size={20} className="text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">Account Details</h3>
                                        <p className="text-xs text-gray-600">Connection Information</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 space-y-2">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <User size={14} className="text-orange-600" />
                                        <span className="text-xs text-gray-500 font-semibold uppercase">Name</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{userData.name}</span>
                                </div>
                                {/* Due Amount Card */}
                                <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-8 text-white shadow-xl transform transition-transform hover:scale-[1.02] flex flex-col justify-between min-h-[220px]">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                                                <AlertCircle size={32} className="text-white" />
                                            </div>
                                            <h2 className="text-xl font-bold uppercase tracking-wider text-orange-100">Current Bill Due</h2>
                                        </div>
                                        <div className="flex items-baseline gap-2 mt-2">
                                            <span className="text-5xl font-extrabold tracking-tight">₹{currentBill.amount.toLocaleString()}</span>
                                            <span className="text-xl font-medium text-orange-200">Due</span>
                                        </div>
                                        <p className="mt-4 text-lg font-medium text-orange-100 flex items-center gap-2">
                                            Due Date: <span className="bg-white/20 px-3 py-1 rounded-lg">{formatDate(currentBill.dueDate)}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={openPaymentModal}
                                        className="mt-6 w-full py-4 bg-white text-orange-700 rounded-2xl font-bold text-xl hover:bg-orange-50 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        <CreditCard size={24} />
                                        Pay Now
                                    </button>
                                </div>

                                {/* Consumer Details Card */}
                                <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-xl flex flex-col justify-between min-h-[220px]">
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 bg-orange-100 rounded-2xl">
                                                <User size={32} className="text-orange-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wider">Consumer Details</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                <span className="text-gray-500 font-medium text-lg">Name</span>
                                                <span className="font-bold text-gray-800 text-lg">{userData.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                <span className="text-gray-500 font-medium text-lg">Consumer No</span>
                                                <span className="font-mono font-bold text-gray-800 text-lg">{userData.consumerNumber}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                                <span className="text-gray-500 font-medium text-lg">Meter No</span>
                                                <span className="font-mono font-bold text-gray-800 text-lg">{userData.meterNumber}</span>
                                            </div>
                                            <div className="flex items-start justify-between py-2">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={18} className="text-orange-600" />
                                                    <span className="text-lg font-medium text-gray-500">Address</span>
                                                </div>
                                                <span className="text-lg font-bold text-gray-900 text-right max-w-[60%]">{userData.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Cards - Right Side */}
                        <div className="lg:w-2/3 grid grid-cols-2 gap-3 sm:gap-4">
                            {/* Current Bill */}
                            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-white border-2 border-orange-200 flex items-center justify-center">
                                            <CreditCard size={16} className="text-orange-600" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Current Bill</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">₹{currentBill.amount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">{currentBill.billingPeriod}</p>
                                    <button
                                        onClick={openPaymentModal}
                                        className="mt-3 w-full px-4 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-bold text-xs sm:text-sm hover:from-orange-700 hover:to-orange-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <CreditCard size={16} />
                                        Pay Now
                                    </button>
                                </div>
                            </div>

                            {/* Due Date */}
                            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-white border-2 border-orange-200 flex items-center justify-center">
                                            <Calendar size={16} className="text-orange-600" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Due Date</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{formatDate(currentBill.dueDate)}</p>
                                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 rounded text-xs font-semibold text-amber-700">
                                        <AlertCircle size={12} />
                                        {getDaysUntilDue()} days left
                                    </div>
                                </div>
                            </div>

                            {/* Units Consumed */}
                            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-white border-2 border-orange-200 flex items-center justify-center">
                                            <TrendingUp size={16} className="text-orange-600" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Gas Consumed</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{currentBill.unitsConsumed} kg</p>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">@ ₹{currentBill.ratePerUnit}/kg</p>
                                </div>
                            </div>

                            {/* Remaining Units */}
                            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-white border-2 border-orange-200 flex items-center justify-center">
                                            <Flame size={16} className="text-orange-600" />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Remaining</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{consumptionData.remainingUnits} kg</p>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">Total Credited: {consumptionData.totalCreditedUnits} kg</p>
                                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                                            style={{ width: `${(consumptionData.remainingUnits / consumptionData.totalCreditedUnits) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Download Bills Section */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200">
                        <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 rounded-t-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white border-2 border-orange-200 flex items-center justify-center">
                                    <Download size={20} className="text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide">Download Bills</h3>
                                    <p className="text-xs text-gray-600">Select time period to download</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex flex-col gap-4">
                                {/* Period Selection */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <div className="relative flex-1">
                                        <button
                                            onClick={togglePeriodDropdown}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-between hover:border-orange-300 transition-colors focus:outline-none focus:border-orange-400"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} className="text-orange-600" />
                                                <span className={selectedBillPeriod && selectedBillPeriod !== 'custom' ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                                                    {selectedBillPeriod && selectedBillPeriod !== 'custom' ? billPeriods.find(p => p.value === selectedBillPeriod)?.label : 'Select Time Period'}
                                                </span>
                                            </div>
                                            <ChevronDown size={20} className={`text-gray-400 transition-transform ${showPeriodDropdown ? 'rotate-180' : ''}`} />
                                        </button>

                                        {showPeriodDropdown && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden max-h-64 overflow-y-auto">
                                                {billPeriods.map((period) => (
                                                    <button
                                                        key={period.value || 'default'}
                                                        onClick={() => {
                                                            if (!period.disabled) {
                                                                setSelectedBillPeriod(period.value);
                                                                closePeriodDropdown();
                                                                setCustomStartDate('');
                                                                setCustomEndDate('');
                                                            }
                                                        }}
                                                        disabled={period.disabled}
                                                        className={`w-full px-4 py-3 text-left flex items-center justify-between border-b border-gray-100 last:border-b-0 ${period.disabled
                                                            ? 'bg-gray-50 text-gray-400 cursor-default font-semibold'
                                                            : selectedBillPeriod === period.value
                                                                ? 'bg-orange-50 text-orange-700 hover:bg-orange-50'
                                                                : 'text-gray-700 hover:bg-orange-50'
                                                            }`}
                                                    >
                                                        {period.label}
                                                        {selectedBillPeriod === period.value && !period.disabled && <Check size={18} className="text-orange-600" />}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Custom Date Range Button / Cancel Button */}
                                    <button
                                        onClick={() => {
                                            if (selectedBillPeriod === 'custom') {
                                                // Cancel custom selection - reset to default
                                                setSelectedBillPeriod('');
                                                setCustomStartDate('');
                                                setCustomEndDate('');
                                            } else {
                                                setSelectedBillPeriod('custom');
                                            }
                                            closePeriodDropdown();
                                        }}
                                        className={`px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors border-2 ${selectedBillPeriod === 'custom'
                                            ? 'bg-red-50 border-red-400 text-red-700 hover:bg-red-100'
                                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
                                            }`}
                                        title={selectedBillPeriod === 'custom' ? 'Cancel Custom Selection' : 'Custom Date Range'}
                                    >
                                        {selectedBillPeriod === 'custom' ? (
                                            <>
                                                <X size={20} />
                                                <span className="hidden sm:inline">Cancel</span>
                                            </>
                                        ) : (
                                            <>
                                                <Calendar size={20} />
                                                <span className="hidden sm:inline">Custom Range</span>
                                            </>
                                        )}
                                    </button>

                                    {selectedBillPeriod && selectedBillPeriod !== 'custom' && (
                                        <button
                                            onClick={handleDownloadBills}
                                            className="px-6 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 shadow-sm"
                                        >
                                            <Download size={18} />
                                            Download PDF
                                        </button>
                                    )}
                                </div>

                                {/* Custom Date Range */}
                                {selectedBillPeriod === 'custom' && (
                                    <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                                        <p className="text-sm font-semibold text-orange-800 mb-3 uppercase tracking-wide">Custom Date Range</p>
                                        <div className="flex flex-col sm:flex-row gap-3 items-end">
                                            <div className="flex-1">
                                                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Start Date</label>
                                                <input
                                                    type="date"
                                                    value={customStartDate}
                                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                                    max={customEndDate || undefined}
                                                    className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-orange-400 transition-colors"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">End Date</label>
                                                <input
                                                    type="date"
                                                    value={customEndDate}
                                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                                    min={customStartDate || undefined}
                                                    className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-orange-400 transition-colors"
                                                />
                                            </div>
                                            <button
                                                onClick={handleDownloadBills}
                                                disabled={!customStartDate || !customEndDate}
                                                className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${customStartDate && customEndDate
                                                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 shadow-sm'
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    }`}
                                            >
                                                <Download size={18} />
                                                Download Bills
                                            </button>
                                        </div>
                                        {customStartDate && customEndDate && (
                                            <p className="mt-3 text-xs text-orange-700 font-medium">
                                                Bills from {formatDate(customStartDate)} to {formatDate(customEndDate)} will be downloaded
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Payment History */}
                    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-white border-2 border-orange-200 flex items-center justify-center">
                                    <FileText size={20} className="text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide">Payment History</h3>
                                    <p className="text-xs text-gray-600">Recent payment transactions</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200 bg-gray-50">
                                            <th className="text-left py-5 px-5 text-sm font-bold text-gray-600 uppercase tracking-wide">Date</th>
                                            <th className="text-left py-5 px-5 text-sm font-bold text-gray-600 uppercase tracking-wide">Billing Period</th>
                                            <th className="text-left py-5 px-5 text-sm font-bold text-gray-600 uppercase tracking-wide hidden sm:table-cell">Gas Consumed</th>
                                            <th className="text-left py-5 px-5 text-sm font-bold text-gray-600 uppercase tracking-wide">Amount</th>
                                            <th className="text-left py-5 px-5 text-sm font-bold text-gray-600 uppercase tracking-wide">Status</th>
                                            <th className="text-left py-5 px-5 text-sm font-bold text-gray-600 uppercase tracking-wide hidden md:table-cell">Transaction ID</th>
                                            <th className="text-left py-5 px-5 text-sm font-bold text-gray-600 uppercase tracking-wide">Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(showAllPayments ? paymentHistory : paymentHistory.slice(0, 3)).map((payment, index) => (
                                            <tr key={payment.id} className={`border-b border-gray-100 hover:bg-orange-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                                <td className="py-5 px-5 text-base text-gray-900 font-medium">{formatDate(payment.date)}</td>
                                                <td className="py-5 px-5 text-base text-gray-700">{payment.billPeriod}</td>
                                                <td className="py-5 px-5 text-base text-gray-700 hidden sm:table-cell">{payment.units} kg</td>
                                                <td className="py-5 px-5 text-base font-bold text-gray-900">₹{payment.amount.toLocaleString()}</td>
                                                <td className="py-5 px-5">
                                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 border border-orange-200 rounded-lg text-sm font-bold">
                                                        <Check size={16} />
                                                        Paid
                                                    </span>
                                                </td>
                                                <td className="py-5 px-5 text-sm text-gray-500 font-mono hidden md:table-cell">{payment.transactionId}</td>
                                                <td className="py-5 px-5">
                                                    <button
                                                        onClick={() => generateReceipt(payment)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm active:scale-95"
                                                        title="Download Receipt"
                                                    >
                                                        <Download size={18} />
                                                        <span className="hidden lg:inline">Receipt</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Load More Button */}
                            {!showAllPayments && paymentHistory.length > 3 && (
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={toggleAllPayments}
                                        className="px-6 py-2.5 text-sm font-semibold text-orange-700 border-2 border-orange-200 hover:bg-orange-50 rounded-lg transition-colors"
                                    >
                                        Load More ({paymentHistory.length - 3} more)
                                    </button>
                                </div>
                            )}
                            {showAllPayments && (
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={toggleAllPayments}
                                        className="px-6 py-2.5 text-sm font-semibold text-gray-600 border-2 border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        Show Less
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Current Bill Alert */}
                        <div className="mx-5 mb-5 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg flex items-start gap-3">
                            <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-bold text-amber-800 uppercase tracking-wide">Current Bill Pending</p>
                                <p className="text-xs text-amber-700 mt-1">
                                    Your bill for {currentBill.billingPeriod} of ₹{currentBill.amount.toLocaleString()} is due on {formatDate(currentBill.dueDate)}.
                                    Pay now to avoid late fees.
                                </p>
                                <button
                                    onClick={openPaymentModal}
                                    className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-bold text-xs hover:from-orange-700 hover:to-orange-800 transition-colors shadow-sm"
                                >
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Form Modal */}
            <PaymentForm
                isOpen={showPaymentModal}
                onClose={closePaymentModal}
                billData={currentBill}
                userData={userData}
            />

            <Footer />
        </div>
    );
};

export default GasBillingDashboard;
