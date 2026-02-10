import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';


import Footer from '../../components/common/Footer';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import BackButton from '../../components/common/BackButton';

const SignUp = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);
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
    <div className="min-h-screen flex flex-col">

      {/* Green Top Bar */}
      <TopBar />
      <AnimatedBackground />

      {/* Hero Section - Banner with SUVIDHA branding */}
      <div id="welcome-tour-step">

      </div>

      {/* White Navigation Bar */}
      <div id="search-tour-step">
        <NavBar />
      </div>

      {/* Ticker Banner */}


      {/* Sign Up Section */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 grow relative z-10">
        <div className="max-w-md mx-auto">
          {/* Sign Up Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-5 pb-8 shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden">

            {/* Decorative Wave & Bubbles on Card */}
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 opacity-10 pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-10 pointer-events-none" />
            <svg className="absolute bottom-0 left-0 w-full h-24 text-indigo-500/5 pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
            </svg>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-black text-gray-900 mb-1 uppercase tracking-tight italic">SUVIDHA</h1>
                <p className="text-gray-600 text-sm font-bold">{t('auth.createaccountDesc')}</p>
              </div>


              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 px-6">
                {/* Full Name Input */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                    {t('auth.fullName')}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t('auth.enterFullName')}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                  />
                </div>

                {/* Email or Phone Input with OTP Button */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                    {t('auth.emailOrPhone')}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="emailOrPhone"
                      value={formData.emailOrPhone}
                      onChange={handleChange}
                      placeholder={t('auth.enterEmailOrPhone')}
                      className="flex-1 px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      disabled={otpVerified}
                      required
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpVerified || otpLoading}
                      className="px-4 py-3 text-sm bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white rounded-xl font-bold uppercase tracking-wider hover:from-green-800 hover:via-green-700 hover:to-green-800 transition-all shadow-[0_4px_0_0_rgba(21,128,61,1)] active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {otpLoading ? t('auth.sendingOtp') : otpSent ? t('auth.resendOtp') : t('auth.sendOtp')}
                    </button>
                  </div>
                  {otpVerified && (
                    <p className="text-green-600 text-sm mt-1 font-semibold">✓ {t('auth.verified')}</p>
                  )}
                </div>

                {/* OTP Input - Shows after Send OTP is clicked */}
                {otpSent && !otpVerified && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
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
                          className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all"
                        />
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={otp.join('').length !== 6 || otpLoading}
                        className="flex-1 px-3 py-4 text-sm bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white rounded-xl font-bold uppercase tracking-wider shadow-[0_4px_0_0_rgba(21,128,61,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {otpLoading ? t('auth.verifying') : t('auth.verifyOtp')}
                      </button>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendTimer > 0 || otpLoading}
                        className="flex-1 px-3 py-4 text-sm border-2 border-green-600 text-green-600 rounded-xl font-bold uppercase tracking-wider hover:bg-green-50 shadow-[0_4px_0_0_rgba(22,163,74,0.1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {resendTimer > 0 ? `${t('auth.resendIn')} (${resendTimer}${t('auth.seconds')})` : t('auth.resendOtp')}
                      </button>
                    </div>
                  </div>
                )}

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                    {t('auth.password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={t('auth.createPassword')}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent pr-20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 font-semibold text-sm px-3 py-2"
                    >
                      {showPassword ? t('auth.hide') : t('auth.show')}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    {t('auth.confirmPassword')}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder={t('auth.reenterPassword')}
                      className={`w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent pr-20 ${!passwordMatch && formData.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 font-semibold text-sm px-3 py-2"
                    >
                      {showConfirmPassword ? t('auth.hide') : t('auth.show')}
                    </button>
                  </div>
                  {!passwordMatch && formData.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">{t('alerts.passwordMismatch')}</p>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-0.5 w-5 h-5 cursor-pointer accent-green-600"
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the
                    <a href="#" className="text-green-700 hover:text-green-900 font-semibold underline"> Terms & Conditions</a> and
                    <a href="#" className="text-green-700 hover:text-green-900 font-semibold underline"> Privacy Policy</a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !passwordMatch}
                  className="w-full px-4 py-4 text-lg bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white rounded-2xl font-black uppercase tracking-widest hover:from-green-800 hover:via-green-700 hover:to-green-800 transition-all shadow-[0_8px_0_0_rgba(21,128,61,1)] active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed mt-4"
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
                  className="w-full px-3 py-3 text-sm border-2 bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700 text-white rounded-xl font-bold uppercase tracking-wider transition-all text-center block shadow-[0_4px_0_0_rgba(15,23,42,1)] active:translate-y-0.5 active:shadow-none"
                >
                  {t('auth.signin')}
                </Link>
              </div>
            </div>

          </div>

          {/* Help Section */}
          <div className="mt-4 text-center">
            <p className="text-gray-700 text-sm mb-2">{t('auth.needHelp')}</p>
            <Link
              to="/help"
              className="text-green-700 hover:text-green-900 font-semibold hover:underline text-sm"
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
