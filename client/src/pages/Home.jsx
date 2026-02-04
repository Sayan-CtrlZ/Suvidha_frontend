import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import TickerBanner from '../components/home/TickerBanner';
import HeroSection from '../components/home/HeroSection';
import Footer from '../components/common/Footer';
import { useLanguage } from '../context/LanguageContext.jsx';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

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

      {/* Welcome Section */}
      <main id="main-content" tabIndex="-1" className="outline-none">
        <section className="w-full py-4 sm:py-8 px-3 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">{t('hero.onePlatformTitle')}</h1>
            <p className="text-gray-600 text-sm sm:text-xl leading-relaxed max-w-3xl mx-auto">
              {t('hero.accessServices')}
            </p>
          </div>
        </section>

      {/* Quick Links Section */}
      <section className="py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">{t('home.whatCanYouDo')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
            <Link to="/services" className="bg-white border-2 border-gray-300 rounded-2xl sm:rounded-3xl p-3 sm:p-6 hover:shadow-xl transition-all text-center group">
              <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">⚡</div>
              <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase">{t('home.servicesOfferedTitle')}</h3>
              <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">{t('home.servicesOfferedDesc')}</p>
              <ul className="text-left text-gray-600 text-[10px] sm:text-xs mb-2 sm:mb-3 space-y-0.5 sm:space-y-1">
                <li>✓ {t('services.electricityBill')}</li>
                <li>✓ {t('services.waterConnection')}</li>
                <li>✓ {t('services.sanitation')}</li>
                <li>✓ {t('services.municipalGrievances')}</li>
              </ul>
              <div className="mt-2 sm:mt-4 text-green-600 group-hover:text-green-700 font-bold text-xs sm:text-sm">{t('services.viewAll')} →</div>
            </Link>
            <Link to="/signin" className="bg-white border-2 border-gray-300 rounded-2xl sm:rounded-3xl p-3 sm:p-6 hover:shadow-xl transition-all text-center group">
              <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">🔐</div>
              <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase">{t('home.signInTitle')}</h3>
              <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">{t('home.signInDesc')}</p>
              <ul className="text-left text-gray-600 text-[10px] sm:text-xs mb-2 sm:mb-3 space-y-0.5 sm:space-y-1">
                <li>✓ {t('home.accountDashboard')}</li>
                <li>✓ {t('home.applicationTracking')}</li>
                <li>✓ {t('home.documentDownloads')}</li>
                <li>✓ {t('home.paymentHistory')}</li>
              </ul>
              <div className="mt-2 sm:mt-4 text-green-600 group-hover:text-green-700 font-bold text-xs sm:text-sm">{t('home.signInNow')} →</div>
            </Link>
            <Link to="/help" className="bg-white border-2 border-gray-300 rounded-2xl sm:rounded-3xl p-3 sm:p-6 hover:shadow-xl transition-all text-center group">
              <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">💬</div>
              <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 uppercase">{t('home.helpTitle')}</h3>
              <p className="text-gray-700 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">{t('home.helpDesc')}</p>
              <ul className="text-left text-gray-600 text-[10px] sm:text-xs mb-2 sm:mb-3 space-y-0.5 sm:space-y-1">
                <li>✓ {t('home.support247')}</li>
                <li>✓ {t('home.liveChat')}</li>
                <li>✓ {t('home.faqGuides')}</li>
                <li>✓ {t('home.contactSupport')}</li>
              </ul>
              <div className="mt-3 sm:mt-6 text-green-600 group-hover:text-green-700 font-bold text-xs sm:text-base">{t('home.getHelp')} →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Authority Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            {t('home.officialPlatform')}
          </p>
          <p className="text-gray-600 text-base mt-3">
            {t('home.commitment')}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-green-700 to-green-800 text-white overflow-hidden relative mt-12">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
            {t('cta.readyToStart')}
          </h2>
          <p className="text-green-100 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('cta.joinMillions')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white text-green-700 rounded-2xl hover:bg-gray-50 transition font-bold text-base shadow-lg hover:shadow-xl w-full sm:w-auto transform hover:-translate-y-0.5 text-center"
            >
              {t('auth.createaccount')}
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 transition font-bold text-base w-full sm:w-auto backdrop-blur-sm">
              {t('hero.learnmore')}
            </button>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
