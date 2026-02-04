import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building2, Wallet, Check, Shield, Zap, Eye, IndianRupee, FileText, Clock } from 'lucide-react';
import QrImage from '../../assets/Qr.png';

const PaymentForm = ({ isOpen, onClose, billData, userData }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [showQR, setShowQR] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone },
    { id: 'card', name: 'Card', icon: CreditCard },
    { id: 'netbanking', name: 'Net Banking', icon: Building2 },
    { id: 'wallet', name: 'Wallet', icon: Wallet },
  ];

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Kotak Mahindra Bank',
    'Yes Bank',
  ];

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
  };

  const handleClose = () => {
    setPaymentSuccess(false);
    setPaymentMethod('upi');
    setShowQR(false);
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setCardName('');
    setSelectedBank('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-4xl my-2 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 0.8px, transparent 0.8px)`,
          backgroundSize: '10px 10px',
          backgroundColor: '#f9fafb'
        }}
      >
        {/* Success Screen */}
        {paymentSuccess ? (
          <div className="bg-white m-4 rounded-xl p-8 text-center shadow-lg border border-gray-100">
            <div className="w-20 h-20 mx-auto bg-violet-100 rounded-full flex items-center justify-center mb-6 border-4 border-violet-200">
              <Check size={40} className="text-violet-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Payment Successful</h2>
            <p className="text-gray-600 mb-6">Your electricity bill has been paid successfully.</p>
            
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6 text-left">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 text-sm font-medium">Amount Paid</span>
                <span className="font-bold text-gray-900">₹{billData?.amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600 text-sm font-medium">Transaction ID</span>
                <span className="font-mono text-sm text-gray-900">TXN-{Date.now()}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600 text-sm font-medium">Date & Time</span>
                <span className="text-sm text-gray-900">{new Date().toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <FileText size={18} />
                Download Receipt
              </button>
              <button 
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Check size={18} />
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Official Header */}
            <div className="bg-gradient-to-r from-violet-700 to-violet-600 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                    <Zap size={28} className="text-violet-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">ELECTRICITY BILL PAYMENT</h2>
                    <p className="text-violet-100 text-sm mt-0.5">Consumer No: {userData?.consumerNumber}</p>
                  </div>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={22} className="text-white" />
                </button>
              </div>
            </div>

            {/* Bill Summary Card */}
            <div className="mx-4 mt-4">
              <div className="bg-white rounded-xl border-2 border-gray-200 shadow-md overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide flex items-center gap-2">
                    <FileText size={16} className="text-violet-600" />
                    Bill Summary
                  </h3>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-violet-50 rounded-xl flex items-center justify-center border-2 border-violet-100">
                      <IndianRupee size={28} className="text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Amount Due</p>
                      <p className="text-3xl font-bold text-gray-900">₹{billData?.amount?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Clock size={14} />
                      <span className="text-xs font-medium uppercase tracking-wide">Billing Period</span>
                    </div>
                    <p className="font-semibold text-gray-900">{billData?.billingPeriod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="mx-4 my-4">
              <div className="bg-white rounded-xl border-2 border-gray-200 shadow-md overflow-hidden">
                {/* Payment Methods Header */}
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide flex items-center gap-2">
                    <CreditCard size={16} className="text-violet-600" />
                    Select Payment Method
                  </h3>
                </div>

                {/* Payment Method Tabs */}
                <div className="p-4 border-b border-gray-100">
                  <div className="grid grid-cols-4 gap-2">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            paymentMethod === method.id
                              ? 'border-violet-500 bg-violet-50 shadow-sm'
                              : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
                          }`}
                        >
                          <IconComponent 
                            size={22} 
                            className={`mx-auto mb-1.5 ${paymentMethod === method.id ? 'text-violet-600' : 'text-gray-500'}`} 
                          />
                          <span className={`font-semibold text-xs ${paymentMethod === method.id ? 'text-violet-700' : 'text-gray-700'}`}>
                            {method.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Details */}
                <div className="p-5">
                  <form onSubmit={handlePayment}>
                    {paymentMethod === 'upi' && (
                      <div className="text-center">
                        <div className="inline-block bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <p className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Scan QR Code to Pay</p>
                          <div className="relative w-56 h-56 mx-auto">
                            <div className={`w-full h-full bg-white rounded-xl p-3 border-2 border-gray-300 shadow-inner transition-all duration-300 ${!showQR ? 'blur-md' : ''}`}>
                              <img 
                                src={QrImage} 
                                alt="Payment QR Code" 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            
                            {!showQR && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => setShowQR(true)}
                                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-sm shadow-lg transition-all flex items-center gap-2"
                                >
                                  <Eye size={16} />
                                  Show QR Code
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-4">
                            Scan with any UPI app: GPay, PhonePe, Paytm, BHIM
                          </p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 max-w-md mx-auto">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none transition-all bg-gray-50"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Name as on card"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none transition-all bg-gray-50"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none transition-all bg-gray-50"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                              placeholder="•••"
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none transition-all bg-gray-50"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="max-w-md mx-auto">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Your Bank</label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none transition-all bg-gray-50"
                          required
                        >
                          <option value="">-- Choose your bank --</option>
                          {banks.map((bank) => (
                            <option key={bank} value={bank}>{bank}</option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                          <Shield size={12} />
                          You will be redirected to your bank's secure payment page
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'wallet' && (
                      <div className="max-w-md mx-auto">
                        <div className="grid grid-cols-3 gap-3">
                          {['Paytm', 'PhonePe', 'Amazon Pay'].map((wallet) => (
                            <button
                              key={wallet}
                              type="button"
                              className="p-4 border-2 border-gray-200 rounded-lg hover:border-violet-400 hover:bg-violet-50 transition-all text-center"
                            >
                              <p className="font-semibold text-sm text-gray-800">{wallet}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Submit Button - Only for non-UPI methods */}
                    {paymentMethod !== 'upi' && (
                      <div className="max-w-md mx-auto mt-6">
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className={`w-full px-6 py-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all ${
                            isProcessing
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-violet-600 hover:bg-violet-700 shadow-md hover:shadow-lg'
                          }`}
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              <Shield size={18} />
                              Pay ₹{billData?.amount?.toLocaleString()} Securely
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                </div>

                {/* Security Footer */}
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield size={14} className="text-violet-600" />
                    <span>256-bit SSL Encrypted | RBI Compliant | 100% Secure Payment Gateway</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
