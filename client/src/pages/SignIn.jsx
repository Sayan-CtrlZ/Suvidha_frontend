import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import TickerBanner from '../components/TickerBanner';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext.jsx';

const SignIn = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign in successful!');
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

      {/* Sign In Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 grow">
        <div className="max-w-md mx-auto">
          {/* Sign In Card */}
          <div className="bg-white border-2 border-gray-300 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
              <p className="text-gray-600">Access your SUVIDHA account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address or User ID
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or user ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-semibold">
                  Forgot your password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-600 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-700 mb-3">
                Don't have an account?
              </p>
              <Link 
                to="/signup" 
                className="w-full px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg font-bold uppercase tracking-wider hover:bg-green-50 transition-all text-center block"
              >
                Create Account
              </Link>
            </div>

          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-700 mb-3">Need help signing in?</p>
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

export default SignIn;
