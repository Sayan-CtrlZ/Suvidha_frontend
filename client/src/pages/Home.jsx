import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Lock, MessageCircle, ArrowRight } from 'lucide-react';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import TickerBanner from '../components/home/TickerBanner';
import HeroSection from '../components/home/HeroSection';
import Footer from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Green Top Bar */}
      <TopBar />

      {/* Animated Background Bubbles & Waves */}
      <AnimatedBackground />

      {/* Hero Section - Banner with SUVIDHA branding */}
      <div id="welcome-tour-step">
        <HeroSection />
      </div>

      {/* White Navigation Bar */}
      <div id="search-tour-step">
        <NavBar />
      </div>

      {/* Ticker Banner */}
      <div className="relative z-10">
        <TickerBanner />
      </div>

      {/* Welcome Section */}
      <main id="main-content" tabIndex="-1" className="outline-none">
        <section className="w-full py-8 sm:py-12 px-3 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">{t('hero.onePlatformTitle')}</h1>
            <p className="text-gray-600 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
              {t('hero.accessServices')}
            </p>
          </div>
        </section>

        {/* Quick Links Section - Premium Cards */}
        <section className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10 text-center">{t('home.whatCanYouDo')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

              {/* Services Card */}
              <Link to="/services" className="group relative h-[480px] rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] transition-[transform,box-shadow]">
                {/* Decorative Wave & Bubbles */}
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 group-hover:opacity-20 transition-opacity ease-out" />
                <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 opacity-10 group-hover:opacity-20 transition-opacity ease-out" />
                <svg className="absolute bottom-0 left-0 w-full h-24 text-blue-500/5 group-hover:text-blue-500/10 transition-colors pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
                  <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
                </svg>

                <div className="relative h-full p-8 pb-12 flex flex-col justify-between z-10 text-left">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg mb-6 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-shadow">
                      <Zap size={32} className="text-white drop-shadow-md" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-cyan-600 transition-colors uppercase tracking-tight">
                      {t('home.servicesOfferedTitle')}
                    </h3>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed mb-4">
                      {t('home.servicesOfferedDesc')}
                    </p>
                    <ul className="text-gray-500 text-sm space-y-2 font-medium">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {t('services.electricityBill')}</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> {t('services.waterConnection')}</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {t('services.municipalGrievances')}</li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-800 transition-colors pt-6 border-t border-gray-100 mt-2">
                    <span>{t('services.viewAll')}</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Sign In Card */}
              <Link to="/signin" className="group relative h-[480px] rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-[0_0_40px_rgba(22,163,74,0.3)] transition-[transform,box-shadow]">
                {/* Decorative Wave & Bubbles */}
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 opacity-10 group-hover:opacity-20 transition-opacity ease-out" />
                <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-gradient-to-tr from-green-500 to-emerald-500 opacity-10 group-hover:opacity-20 transition-opacity ease-out" />
                <svg className="absolute bottom-0 left-0 w-full h-24 text-green-500/5 group-hover:text-green-500/10 transition-colors pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
                  <path fill="currentColor" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
                </svg>

                <div className="relative h-full p-8 pb-12 flex flex-col justify-between z-10 text-left">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg mb-6 group-hover:shadow-[0_0_20px_rgba(22,163,74,0.5)] transition-shadow">
                      <Lock size={32} className="text-white drop-shadow-md" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-700 group-hover:to-emerald-600 transition-colors uppercase tracking-tight">
                      {t('home.signInTitle')}
                    </h3>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed mb-4">
                      {t('home.signInDesc')}
                    </p>
                    <ul className="text-gray-500 text-sm space-y-2 font-medium">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {t('home.accountDashboard')}</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t('home.paymentHistory')}</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> {t('home.applicationTracking')}</li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-green-600 group-hover:text-green-800 transition-colors pt-6 border-t border-gray-100 mt-2">
                    <span>{t('home.signInNow')}</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Help Card */}
              <Link to="/help" className="group relative h-[480px] rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-[0_0_40px_rgba(234,88,12,0.3)] transition-[transform,box-shadow]">
                {/* Decorative Wave & Bubbles */}
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 opacity-10 group-hover:opacity-20 transition-opacity ease-out" />
                <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 opacity-10 group-hover:opacity-20 transition-opacity ease-out" />
                <svg className="absolute bottom-0 left-0 w-full h-24 text-orange-500/5 group-hover:text-orange-500/10 transition-colors pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
                  <path fill="currentColor" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
                </svg>

                <div className="relative h-full p-8 pb-12 flex flex-col justify-between z-10 text-left">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg mb-6 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.5)] transition-shadow">
                      <MessageCircle size={32} className="text-white drop-shadow-md" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-700 group-hover:to-amber-600 transition-colors uppercase tracking-tight">
                      {t('home.helpTitle')}
                    </h3>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed mb-4">
                      {t('home.helpDesc')}
                    </p>
                    <ul className="text-gray-500 text-sm space-y-2 font-medium">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> {t('home.support247')}</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {t('home.faqGuides')}</li>
                      <Link to="/contact" className="flex items-center gap-2 hover:text-orange-600 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {t('home.contactSupport')}
                      </Link>
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-600 group-hover:text-orange-800 transition-colors pt-6 border-t border-gray-100 mt-2">
                    <span>{t('home.getHelp')}</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>

            </div>
          </div>
        </section>

        {/* Trust & Authority Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-500 text-lg leading-relaxed font-medium grayscale hover:grayscale-0 transition-opacity">
              {t('home.officialPlatform')}
            </p>
            <div className="h-1 w-20 bg-green-500 mx-auto mt-6 mb-6 rounded-full opacity-50"></div>
            <p className="text-gray-400 text-base font-medium">
              {t('home.commitment')}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative shadow-xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight tracking-tight">
                {t('cta.readyToStart')}
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                {t('cta.joinMillions')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-green-500/30 transition-transform w-full sm:w-auto"
                >
                  {t('auth.createaccount')}
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-base sm:text-lg backdrop-blur-sm transition-colors w-full sm:w-auto">
                  {t('hero.learnmore')}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
