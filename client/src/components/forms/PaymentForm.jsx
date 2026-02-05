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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-5xl my-4 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-200 bg-white transform transition-all scale-100">
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
            <div className="bg-gradient-to-r from-violet-700 to-violet-600 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap size={32} className="text-violet-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">ELECTRICITY BILL PAYMENT</h2>
                    <p className="text-violet-100 text-lg mt-1 font-medium">Consumer No: {userData?.consumerNumber}</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all active:scale-95"
                >
                  <X size={32} className="text-white" />
                </button>
              </div>
            </div>

            {/* Bill Summary Card */}
            <div className="mx-6 mt-6">
              <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-md overflow-hidden">
                <div className="bg-gray-50 px-8 py-5 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wider flex items-center gap-3">
                    <FileText size={24} className="text-violet-600" />
                    Bill Summary
                  </h3>
                </div>
                <div className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-violet-50 rounded-2xl flex items-center justify-center border-2 border-violet-100">
                      <IndianRupee size={40} className="text-violet-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Total Amount Due</p>
                      <p className="text-4xl font-extrabold text-gray-900 mt-1">₹{billData?.amount?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-500 mb-2">
                      <Clock size={20} />
                      <span className="text-sm font-bold uppercase tracking-wide">Billing Period</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{billData?.billingPeriod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="mx-4 my-4">
              <div className="bg-white rounded-xl border-2 border-gray-200 shadow-md overflow-hidden">
                {/* Payment Methods Header */}
                <div className="bg-gray-50 px-8 py-5 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 text-lg uppercase tracking-wider flex items-center gap-3">
                    <CreditCard size={24} className="text-violet-600" />
                    Select Payment Method
                  </h3>
                </div>

                {/* Payment Method Tabs */}
                <div className="p-6 border-b border-gray-100">
                  <div className="grid grid-cols-4 gap-4">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-6 rounded-2xl border-2 text-center transition-all shadow-sm ${paymentMethod === method.id
                            ? 'border-violet-600 bg-violet-50 ring-2 ring-violet-200'
                            : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'
                            }`}
                        >
                          <IconComponent
                            size={32}
                            className={`mx-auto mb-3 ${paymentMethod === method.id ? 'text-violet-700' : 'text-gray-500'}`}
                          />
                          <span className={`font-bold text-lg block ${paymentMethod === method.id ? 'text-violet-800' : 'text-gray-700'}`}>
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
                      <div className="space-y-6 max-w-2xl mx-auto py-4">
                        <div>
                          <label className="block text-lg font-bold text-gray-700 mb-3 ml-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-6 py-5 border-2 border-gray-300 rounded-xl text-xl tracking-wider focus:border-violet-600 focus:ring-4 focus:ring-violet-100 focus:outline-none transition-all bg-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-lg font-bold text-gray-700 mb-3 ml-1">Cardholder Name</label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Name as on card"
                            className="w-full px-6 py-5 border-2 border-gray-300 rounded-xl text-xl focus:border-violet-600 focus:ring-4 focus:ring-violet-100 focus:outline-none transition-all bg-white"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-lg font-bold text-gray-700 mb-3 ml-1">Expiry</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-6 py-5 border-2 border-gray-300 rounded-xl text-xl text-center focus:border-violet-600 focus:ring-4 focus:ring-violet-100 focus:outline-none transition-all bg-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-lg font-bold text-gray-700 mb-3 ml-1">CVV</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                              placeholder="•••"
                              className="w-full px-6 py-5 border-2 border-gray-300 rounded-xl text-xl text-center focus:border-violet-600 focus:ring-4 focus:ring-violet-100 focus:outline-none transition-all bg-white"
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
                      <div className="max-w-xl mx-auto mt-8 mb-4">
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className={`w-full px-8 py-5 rounded-2xl font-bold text-xl text-white flex items-center justify-center gap-4 transition-all transform active:scale-95 ${isProcessing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl ring-4 ring-violet-200'
                            }`}
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              <Shield size={24} />
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
