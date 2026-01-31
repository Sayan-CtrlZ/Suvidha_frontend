import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import TickerBanner from '../components/TickerBanner';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext.jsx';

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
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

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
      alert('Please enter your email or phone number');
      return;
    }
    
    setOtpLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
      setResendTimer(30);
      alert(`OTP sent to ${formData.emailOrPhone}`);
      
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
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }
    
    setOtpLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpLoading(false);
      setOtpVerified(true);
      alert('OTP verified successfully!');
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
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions!');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Account created successfully! Please sign in.');
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 grow">
        <div className="max-w-md mx-auto">
          {/* Sign Up Card */}
          <div className="bg-white border-2 border-gray-300 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Join SUVIDHA today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  required
                />
              </div>

              {/* Email or Phone Input with OTP Button */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email or Phone Number
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="emailOrPhone"
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                    placeholder="Enter your email or phone number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    disabled={otpVerified}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpVerified || otpLoading}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {otpLoading ? 'Sending...' : otpSent ? 'Resent' : 'Send OTP'}
                  </button>
                </div>
                {otpVerified && (
                  <p className="text-green-600 text-sm mt-2 font-semibold">✓ Verified</p>
                )}
              </div>

              {/* OTP Input - Shows after Send OTP is clicked */}
              {otpSent && !otpVerified && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-center text-lg tracking-widest font-semibold"
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={!otp || otpLoading}
                      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {otpLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0 || otpLoading}
                      className="flex-1 px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg font-bold uppercase tracking-wider hover:bg-green-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resendTimer > 0 ? `Resend (${resendTimer}s)` : 'Resend OTP'}
                    </button>
                  </div>
                </div>
              )}

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-600 hover:text-gray-900 font-semibold text-sm"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${
                      !passwordMatch && formData.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-600 hover:text-gray-900 font-semibold text-sm"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {!passwordMatch && formData.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 cursor-pointer accent-green-600"
                  required
                />
                <label className="text-sm text-gray-700">
                  I agree to the 
                  <a href="#" className="text-green-600 hover:text-green-700 font-semibold"> Terms & Conditions</a> and 
                  <a href="#" className="text-green-600 hover:text-green-700 font-semibold"> Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !passwordMatch}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-600 text-sm">HAVE AN ACCOUNT?</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Sign In Link */}
            <Link 
              to="/signin" 
              className="w-full px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg font-bold uppercase tracking-wider hover:bg-green-50 transition-all text-center block"
            >
              Sign In
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-700 mb-3">Need help creating an account?</p>
            <Link 
              to="/help" 
              className="text-green-600 hover:text-green-700 font-semibold hover:underline"
            >
              Contact Support
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
