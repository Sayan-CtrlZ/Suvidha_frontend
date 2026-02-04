import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import TickerBanner from '../../components/home/TickerBanner';
import HeroSection from '../../components/home/HeroSection';
import Footer from '../../components/common/Footer';
import { useLanguage } from '../../context/LanguageContext.jsx';

const SignUp = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleOtpChange = (index, value) => {
    // Get only the last character if multiple were entered
    const digit = value.slice(-1);
    
    // Only allow digits
    if (digit && !/^[0-9]$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (digit && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace - move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || '';
      }
      setOtp(newOtp);
      // Focus last filled or last input
      const focusIndex = Math.min(pastedData.length, 5);
      const input = document.getElementById(`otp-${focusIndex}`);
      if (input) input.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Check password match
    if (name === 'password' || name === 'confirmPassword') {
      const pwd = name === 'password' ? value : formData.password;
      const confirm = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordMatch(pwd === confirm || confirm === '');
    }
  };

  const handleSendOtp = () => {
    if (!formData.emailOrPhone) {
      alert(t('alerts.enterEmailPhone'));
      return;
    }
    
    setOtpLoading(true);
    // Clear any previously entered OTP
    setOtp(['', '', '', '', '', '']);
    
    // Simulate API call
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
      setResendTimer(30);
      alert(`${t('alerts.otpSent')}: ${formData.emailOrPhone}`);
      
      // Auto-focus first OTP input
      setTimeout(() => {
        const firstInput = document.getElementById('otp-0');
        if (firstInput) firstInput.focus();
      }, 100);
      
      // Start countdown timer
      const interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      alert(t('alerts.enterCompleteOtp'));
      return;
    }
    
    setOtpLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpLoading(false);
      setOtpVerified(true);
      alert(t('alerts.otpVerified'));
    }, 1000);
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      handleSendOtp();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert(t('alerts.passwordMismatch'));
      return;
    }

    if (!formData.agreeTerms) {
      alert(t('alerts.agreeTerms'));
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(t('alerts.accountCreated'));
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `
          radial-gradient(circle, #d1d5db 0.8px, transparent 0.8px)
        `,
        backgroundSize: '10px 10px',
        backgroundColor: '#f9fafb'
      }}
    >
      
      {/* Green Top Bar */}
      <TopBar />

      {/* Hero Section - Banner with SUVIDHA branding */}
      <div id="welcome-tour-step">
        <HeroSection />
      </div>

      {/* White Navigation Bar */}
      <div id="search-tour-step">
        <NavBar />
      </div>

      {/* Ticker Banner */}
      <TickerBanner />

      {/* Sign Up Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 grow">
        <div className="max-w-md mx-auto">
          {/* Sign Up Card */}
          <div className="bg-white border-2 border-gray-300 rounded-2xl p-4 pb-8 shadow-md hover:shadow-lg transition-all">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('auth.createaccount')}</h1>
              <p className="text-gray-600 text-sm">{t('auth.createaccountDesc')}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2 px-6">
              {/* Full Name Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  {t('auth.fullName')}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t('auth.enterFullName')}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  required
                />
              </div>

              {/* Email or Phone Input with OTP Button */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  {t('auth.emailOrPhone')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="emailOrPhone"
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                    placeholder={t('auth.enterEmailOrPhone')}
                    className="flex-1 px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    disabled={otpVerified}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpVerified || otpLoading}
                    className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-md font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {otpLoading ? t('auth.sendingOtp') : otpSent ? t('auth.resendOtp') : t('auth.sendOtp')}
                  </button>
                </div>
                {otpVerified && (
                  <p className="text-green-600 text-xs mt-1 font-semibold">✓ {t('auth.verified')}</p>
                )}
              </div>

              {/* OTP Input - Shows after Send OTP is clicked */}
              {otpSent && !otpVerified && (
                <div>
                  <label className="block text-xs font-semibold text-gray-900 mb-1">
                    {t('auth.enterOtp')}
                  </label>
                  <div className="flex justify-between gap-1">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        maxLength="1"
                        className="w-9 h-9 text-center text-sm font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all"
                      />
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otp.join('').length !== 6 || otpLoading}
                      className="flex-1 px-2 py-1.5 text-xs bg-green-600 text-white rounded-md font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {otpLoading ? t('auth.verifying') : t('auth.verifyOtp')}
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0 || otpLoading}
                      className="flex-1 px-2 py-1.5 text-xs border-2 border-green-600 text-green-600 rounded-md font-bold uppercase tracking-wider hover:bg-green-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resendTimer > 0 ? `${t('auth.resendIn')} (${resendTimer}${t('auth.seconds')})` : t('auth.resendOtp')}
                    </button>
                  </div>
                </div>
              )}

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t('auth.createPassword')}
                    className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1.5 text-gray-600 hover:text-gray-900 font-semibold text-xs"
                  >
                    {showPassword ? t('auth.hide') : t('auth.show')}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t('auth.reenterPassword')}
                    className={`w-full px-2.5 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${
                      !passwordMatch && formData.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1.5 text-gray-600 hover:text-gray-900 font-semibold text-xs"
                  >
                    {showConfirmPassword ? t('auth.hide') : t('auth.show')}
                  </button>
                </div>
                {!passwordMatch && formData.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1">{t('alerts.passwordMismatch')}</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-3.5 h-3.5 cursor-pointer accent-green-600"
                  required
                />
                <label className="text-xs text-gray-700">
                  I agree to the 
                  <a href="#" className="text-green-600 hover:text-green-700 font-semibold"> Terms & Conditions</a> and 
                  <a href="#" className="text-green-600 hover:text-green-700 font-semibold"> Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !passwordMatch}
                className="w-full px-2.5 py-1.5 text-sm bg-green-600 text-white rounded-md font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-3"
              >
                {isLoading ? t('auth.creatingAccount') : t('auth.createaccount')}
              </button>
            </form>

            {/* Divider */}
            <div className="my-4 flex items-center px-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-600 text-xs">{t('auth.hasAccount')}</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Sign In Link */}
            <div className="px-6">
              <Link 
                to="/signin" 
                className="w-full px-3 py-1.5 text-sm border-2 border-green-600 text-green-600 rounded-md font-bold uppercase tracking-wider hover:bg-green-50 transition-all text-center block"
              >
                {t('auth.signin')}
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-4 text-center">
            <p className="text-gray-700 text-sm mb-2">{t('auth.needHelp')}</p>
            <Link 
              to="/help" 
              className="text-green-600 hover:text-green-700 font-semibold hover:underline text-sm"
            >
              {t('auth.visitHelpCenter')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignUp;
