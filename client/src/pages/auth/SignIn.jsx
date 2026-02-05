import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import BackButton from '../../components/common/BackButton';

const SignIn = () => {
  const { t } = useLanguage();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      // Redirect to intended destination or dashboard
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Green Top Bar */}
      <TopBar />

      {/* Animated Background Bubbles & Waves */}
      <AnimatedBackground />

      {/* Hero Section - Banner with SUVIDHA branding */}
      <div id="welcome-tour-step">

      </div>

      {/* White Navigation Bar */}
      <div id="search-tour-step">
        <NavBar />
      </div>

      {/* Ticker Banner */}


      {/* Sign In Section */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 grow relative z-10">
        <div className="max-w-md mx-auto">
          {/* Sign In Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-5 pb-8 shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden">

            {/* Decorative Wave & Bubbles on Card */}
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 opacity-10 pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-gradient-to-tr from-green-500 to-emerald-500 opacity-10 pointer-events-none" />
            <svg className="absolute bottom-0 left-0 w-full h-24 text-green-500/5 pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
            </svg>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('auth.signin')}</h1>
                <p className="text-gray-600 text-base">{t('auth.signinDesc')}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 px-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('auth.emailOrUserId')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.enterEmail')}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                    autoFocus
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t('auth.password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('auth.enterPassword')}
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

                {/* Forgot Password Link */}
                <div className="text-right">
                  <a href="/forgot-password" className="text-sm text-green-700 hover:text-green-900 font-semibold">
                    {t('auth.forgotPassword')}
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-3 text-base bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white rounded-lg font-bold uppercase tracking-wider hover:from-green-800 hover:via-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? t('auth.signingIn') : t('auth.signin')}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm font-medium text-center">{error}</p>
                  </div>
                )}

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
                  className="w-full px-3 py-1.5 text-sm border-2 bg-gradient-to-r from-green-700 via-green-600 to-green-700 bg-clip-border text-white rounded-md font-bold uppercase tracking-wider hover:from-green-800 hover:via-green-700 hover:to-green-800 transition-all text-center block shadow-md hover:shadow-lg"
                >
                  {t('auth.createaccount')}
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

export default SignIn;
