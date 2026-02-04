import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import TickerBanner from '../../components/home/TickerBanner';
import HeroSection from '../../components/home/HeroSection';
import Footer from '../../components/common/Footer';
import { useLanguage } from '../../context/LanguageContext.jsx';

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
      <section className="py-8 px-4 sm:px-6 lg:px-8 grow">
        <div className="max-w-md mx-auto">
          {/* Sign In Card */}
          <div className="bg-white border-2 border-gray-300 rounded-2xl p-4 pb-8 shadow-md hover:shadow-lg transition-all">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('auth.signin')}</h1>
              <p className="text-gray-600 text-sm">{t('auth.signinDesc')}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2 px-6">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  {t('auth.emailOrUserId')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.enterEmail')}
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.enterPassword')}
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

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="/forgot-password" className="text-xs text-green-600 hover:text-green-700 font-semibold">
                  {t('auth.forgotPassword')}
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-2.5 py-1.5 text-sm bg-green-600 text-white rounded-md font-bold uppercase tracking-wider hover:bg-green-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-3"
              >
                {isLoading ? t('auth.signingIn') : t('auth.signin')}
              </button>
            </form>

            {/* Divider */}
            <div className="my-4 flex items-center px-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-600 text-xs">{t('auth.or')}</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center px-6">
              <p className="text-gray-700 text-sm mb-2">
                {t('auth.noAccount')}
              </p>
              <Link 
                to="/signup" 
                className="w-full px-3 py-1.5 text-sm border-2 border-green-600 text-green-600 rounded-md font-bold uppercase tracking-wider hover:bg-green-50 transition-all text-center block"
              >
                {t('auth.createaccount')}
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

export default SignIn;
