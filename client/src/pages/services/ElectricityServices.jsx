import React, { useState } from 'react';
import { Zap, Calendar, Download, CreditCard, TrendingUp, FileText, ChevronDown, Check, AlertCircle, User, MapPin, Gauge, Hash, Shield, Building2, X, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import TickerBanner from '../../components/home/TickerBanner';
import HeroSection from '../../components/home/HeroSection';
import Footer from '../../components/common/Footer';
import PaymentForm from '../../components/forms/PaymentForm';

const ElectricityServicesPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedBillPeriod, setSelectedBillPeriod] = useState('');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAllPayments, setShowAllPayments] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Mock user data
  const userData = {
    consumerNumber: 'ELEC-2024-78542',
    name: 'Sayan Kumar',
    address: '123, Green Park, Sector 5, Kolkata - 700001',
    connectionType: 'Domestic',
    sanctionedLoad: '5 kW',
    meterNumber: 'MTR-456789'
  };

  // Mock billing data
  const currentBill = {
    amount: 2450,
    dueDate: '2026-02-15',
    billingPeriod: 'January 2026',
    unitsConsumed: 245,
    ratePerUnit: 8.50,
    status: 'Pending'
  };

  // Mock units/consumption data
  const consumptionData = {
    remainingUnits: 55,
    totalCreditedUnits: 100,
    averageMonthlyUsage: 230,
    lastMonthUsage: 245,
    projectedNextBill: 2100
  };

  // Mock payment history
  const paymentHistory = [
    { id: 1, date: '2026-01-05', amount: 2280, billPeriod: 'December 2025', units: 228, status: 'Paid', transactionId: 'TXN-789456123' },
    { id: 2, date: '2025-12-03', amount: 2150, billPeriod: 'November 2025', units: 215, status: 'Paid', transactionId: 'TXN-789456122' },
    { id: 3, date: '2025-11-04', amount: 1980, billPeriod: 'October 2025', units: 198, status: 'Paid', transactionId: 'TXN-789456121' },
    { id: 4, date: '2025-10-02', amount: 2340, billPeriod: 'September 2025', units: 234, status: 'Paid', transactionId: 'TXN-789456120' },
    { id: 5, date: '2025-09-05', amount: 2560, billPeriod: 'August 2025', units: 256, status: 'Paid', transactionId: 'TXN-789456119' },
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

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `radial-gradient(circle, #d1d5db 0.8px, transparent 0.8px)`,
        backgroundSize: '10px 10px',
        backgroundColor: '#f9fafb'
      }}
    >
      <TopBar />
      
      <div id="welcome-tour-step">
        <HeroSection />
      </div>

      <div id="search-tour-step">
        <NavBar />
      </div>

      <TickerBanner />

      {/* Page Header - Government Style */}
      <section className="w-full py-6 sm:py-8 px-3 sm:px-6 bg-gradient-to-r from-violet-700 to-violet-600 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/services')}
            className="mb-4 text-white/80 hover:text-white font-semibold text-sm flex items-center gap-2 tracking-wide"
          >
            ← {t('nav.backToServices')}
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                <Zap size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">{t('services.electricityUtilities')}</h1>
                <p className="text-white/90 text-sm sm:text-base mt-1 font-medium">{t('services.consumerNo')}: {userData.consumerNumber}</p>
              </div>
            </div>
            {/* Apply for New Connection Button */}
            <button
              onClick={() => navigate('/services/electricity/new-connection')}
              className="flex items-center gap-2 px-5 py-3 bg-violet-500 hover:bg-violet-700 backdrop-blur-sm text-white rounded-xl font-bold text-sm transition-all border-2 border-white/30 hover:border-white/50 shadow-lg"
            >
              <PlusCircle size={20} />
              {t('newConnection.applyNow')}
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-6 sm:py-10 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Top Section: Account Details (left) + Quick Stats (right) */}
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Account Details - Left Side */}
            <div className="lg:w-1/3 bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border-2 border-violet-200 flex items-center justify-center">
                    <User size={20} className="text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">{t('account.accountDetails')}</h3>
                    <p className="text-xs text-gray-600">{t('account.connectionInfo')}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-violet-600" />
                    <span className="text-xs text-gray-500 font-semibold uppercase">{t('account.name')}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{userData.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Hash size={14} className="text-violet-600" />
                    <span className="text-xs text-gray-500 font-semibold uppercase">{t('account.consumerNo')}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900 font-mono">{userData.consumerNumber}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-violet-600" />
                    <span className="text-xs text-gray-500 font-semibold uppercase">{t('account.connectionType')}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{userData.connectionType}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Gauge size={14} className="text-violet-600" />
                    <span className="text-xs text-gray-500 font-semibold uppercase">{t('account.sanctionedLoad')}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{userData.sanctionedLoad}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Hash size={14} className="text-violet-600" />
                    <span className="text-xs text-gray-500 font-semibold uppercase">{t('account.meterNo')}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900 font-mono">{userData.meterNumber}</span>
                </div>
                <div className="flex items-start justify-between py-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-violet-600" />
                    <span className="text-xs text-gray-500 font-semibold uppercase">{t('account.address')}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900 text-right max-w-[60%]">{userData.address}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards - Right Side */}
            <div className="lg:w-2/3 grid grid-cols-2 gap-3 sm:gap-4">
            {/* Current Bill */}
            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border-2 border-violet-200 flex items-center justify-center">
                    <CreditCard size={16} className="text-violet-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t('billing.currentBill')}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">₹{currentBill.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{currentBill.billingPeriod}</p>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="mt-3 w-full px-4 py-2.5 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg font-bold text-xs sm:text-sm hover:from-violet-700 hover:to-violet-800 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <CreditCard size={16} />
                  {t('billing.payNow')}
                </button>
              </div>
            </div>

            {/* Due Date */}
            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border-2 border-violet-200 flex items-center justify-center">
                    <Calendar size={16} className="text-violet-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t('billing.dueDate')}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{formatDate(currentBill.dueDate)}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 rounded text-xs font-semibold text-amber-700">
                  <AlertCircle size={12} />
                  {getDaysUntilDue()} {t('billing.daysLeft')}
                </div>
              </div>
            </div>

            {/* Units Consumed */}
            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border-2 border-violet-200 flex items-center justify-center">
                    <TrendingUp size={16} className="text-violet-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t('consumption.unitsConsumed')}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{currentBill.unitsConsumed}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">@ ₹{currentBill.ratePerUnit}/unit</p>
              </div>
            </div>

            {/* Remaining Units */}
            <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border-2 border-violet-200 flex items-center justify-center">
                    <Zap size={16} className="text-violet-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{t('consumption.remainingUnits')}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{consumptionData.remainingUnits}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{t('consumption.totalCredited')}: {consumptionData.totalCreditedUnits}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-violet-500 to-violet-600 h-2 rounded-full"
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
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-violet-200 flex items-center justify-center">
                  <Download size={20} className="text-violet-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide">{t('billing.downloadBills')}</h3>
                  <p className="text-xs text-gray-600">{t('billing.selectPeriod')}</p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-col gap-4">
                {/* Period Selection */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative flex-1">
                    <button
                      onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-between hover:border-violet-300 transition-colors focus:outline-none focus:border-violet-400"
                    >
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-violet-600" />
                        <span className={selectedBillPeriod && selectedBillPeriod !== 'custom' ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                          {selectedBillPeriod && selectedBillPeriod !== 'custom' ? billPeriods.find(p => p.value === selectedBillPeriod)?.label : t('billing.selectPeriod')}
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
                                setShowPeriodDropdown(false);
                                setCustomStartDate('');
                                setCustomEndDate('');
                              }
                            }}
                            disabled={period.disabled}
                            className={`w-full px-4 py-3 text-left flex items-center justify-between border-b border-gray-100 last:border-b-0 ${
                              period.disabled 
                                ? 'bg-gray-50 text-gray-400 cursor-default font-semibold'
                                : selectedBillPeriod === period.value 
                                  ? 'bg-violet-50 text-violet-700 hover:bg-violet-50' 
                                  : 'text-gray-700 hover:bg-violet-50'
                            }`}
                          >
                            {period.label}
                            {selectedBillPeriod === period.value && !period.disabled && <Check size={18} className="text-violet-600" />}
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
                      setShowPeriodDropdown(false);
                    }}
                    className={`px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all border-2 ${
                      selectedBillPeriod === 'custom'
                        ? 'bg-red-50 border-red-400 text-red-700 hover:bg-red-100'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-600'
                    }`}
                    title={selectedBillPeriod === 'custom' ? 'Cancel Custom Selection' : 'Custom Date Range'}
                  >
                    {selectedBillPeriod === 'custom' ? (
                      <>
                        <X size={20} />
                        <span className="hidden sm:inline">{t('common.cancel')}</span>
                      </>
                    ) : (
                      <>
                        <Calendar size={20} />
                        <span className="hidden sm:inline">{t('billing.customRange')}</span>
                      </>
                    )}
                  </button>

                  {selectedBillPeriod && selectedBillPeriod !== 'custom' && (
                    <button
                      onClick={handleDownloadBills}
                      className="px-6 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:from-violet-700 hover:to-violet-800 shadow-sm"
                    >
                      <Download size={18} />
                      {t('common.download')} PDF
                    </button>
                  )}
                </div>

                {/* Custom Date Range */}
                {selectedBillPeriod === 'custom' && (
                  <div className="p-4 bg-violet-50 border-2 border-violet-200 rounded-lg">
                    <p className="text-sm font-semibold text-violet-800 mb-3 uppercase tracking-wide">{t('billing.customRange')}</p>
                    <div className="flex flex-col sm:flex-row gap-3 items-end">
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{t('billing.startDate')}</label>
                        <input
                          type="date"
                          value={customStartDate}
                          onChange={(e) => setCustomStartDate(e.target.value)}
                          max={customEndDate || undefined}
                          className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-violet-400 transition-colors"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{t('billing.endDate')}</label>
                        <input
                          type="date"
                          value={customEndDate}
                          onChange={(e) => setCustomEndDate(e.target.value)}
                          min={customStartDate || undefined}
                          className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-violet-400 transition-colors"
                        />
                      </div>
                      <button
                        onClick={handleDownloadBills}
                        disabled={!customStartDate || !customEndDate}
                        className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                          customStartDate && customEndDate
                            ? 'bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:from-violet-700 hover:to-violet-800 shadow-sm'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Download size={18} />
                        {t('billing.downloadBills')}
                      </button>
                    </div>
                    {customStartDate && customEndDate && (
                      <p className="mt-3 text-xs text-violet-700 font-medium">
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
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-violet-200 flex items-center justify-center">
                  <FileText size={20} className="text-violet-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide">{t('billing.paymentHistory')}</h3>
                  <p className="text-xs text-gray-600">{t('billing.recentPayments')}</p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-3 text-xs font-bold text-gray-600 uppercase tracking-wide">{t('billing.dueDate')}</th>
                      <th className="text-left py-3 px-3 text-xs font-bold text-gray-600 uppercase tracking-wide">{t('billing.billingPeriod')}</th>
                      <th className="text-left py-3 px-3 text-xs font-bold text-gray-600 uppercase tracking-wide hidden sm:table-cell">{t('consumption.unitsConsumed')}</th>
                      <th className="text-left py-3 px-3 text-xs font-bold text-gray-600 uppercase tracking-wide">{t('billing.amount')}</th>
                      <th className="text-left py-3 px-3 text-xs font-bold text-gray-600 uppercase tracking-wide">{t('billing.status')}</th>
                      <th className="text-left py-3 px-3 text-xs font-bold text-gray-600 uppercase tracking-wide hidden md:table-cell">{t('billing.transactionId')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(showAllPayments ? paymentHistory : paymentHistory.slice(0, 3)).map((payment, index) => (
                      <tr key={payment.id} className={`border-b border-gray-100 hover:bg-violet-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                        <td className="py-3 px-3 text-xs sm:text-sm text-gray-900 font-medium">{formatDate(payment.date)}</td>
                        <td className="py-3 px-3 text-xs sm:text-sm text-gray-700">{payment.billPeriod}</td>
                        <td className="py-3 px-3 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">{payment.units} kWh</td>
                        <td className="py-3 px-3 text-xs sm:text-sm font-bold text-gray-900">₹{payment.amount.toLocaleString()}</td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-violet-100 text-violet-700 border border-violet-200 rounded text-xs font-semibold">
                            <Check size={12} />
                            {t('billing.paid')}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs text-gray-500 font-mono hidden md:table-cell">{payment.transactionId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Load More Button */}
              {!showAllPayments && paymentHistory.length > 3 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowAllPayments(true)}
                    className="px-6 py-2.5 text-sm font-semibold text-violet-700 border-2 border-violet-200 hover:bg-violet-50 rounded-lg transition-all"
                  >
                    Load More ({paymentHistory.length - 3} more)
                  </button>
                </div>
              )}
              {showAllPayments && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowAllPayments(false)}
                    className="px-6 py-2.5 text-sm font-semibold text-gray-600 border-2 border-gray-200 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    {t('billing.showLess')}
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
                  onClick={() => setShowPaymentModal(true)}
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg font-bold text-xs hover:from-violet-700 hover:to-violet-800 transition-all shadow-sm"
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
        onClose={() => setShowPaymentModal(false)}
        billData={currentBill}
        userData={userData}
      />

      <Footer />
    </div>
  );
};

export default ElectricityServicesPage;
