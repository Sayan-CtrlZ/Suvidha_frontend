import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import TickerBanner from '../components/TickerBanner';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext.jsx';

const Home = () => {
  const { t } = useLanguage();

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
      <section className="w-full py-8 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">One Platform for All Citizen Services</h1>
          <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto">
            Access essential civic services quickly, securely, and transparently.
          </p>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What Can You Do Today?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/services" className="bg-white border-2 border-gray-300 rounded-3xl p-6 hover:shadow-xl transition-all text-center group">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase">Services Offered</h3>
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">Explore a comprehensive range of government services. Pay utility bills, apply for permits, check application status, and more - all in one secure platform.</p>
              <ul className="text-left text-gray-600 text-xs mb-3 space-y-1">
                <li>✓ Electricity & Gas Bills</li>
                <li>✓ Water Connection</li>
                <li>✓ Sanitation Services</li>
                <li>✓ Municipal Grievances</li>
              </ul>
              <div className="mt-4 text-green-600 group-hover:text-green-700 font-bold text-sm">View All Services →</div>
            </Link>
            <Link to="/signin" className="bg-white border-2 border-gray-300 rounded-3xl p-6 hover:shadow-xl transition-all text-center group">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase">Sign In</h3>
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">Access your personalized dashboard to manage all your service requests. Track application status, download certificates, and receive real-time notifications.</p>
              <ul className="text-left text-gray-600 text-xs mb-3 space-y-1">
                <li>✓ Account Dashboard</li>
                <li>✓ Application Tracking</li>
                <li>✓ Document Downloads</li>
                <li>✓ Payment History</li>
              </ul>
              <div className="mt-4 text-green-600 group-hover:text-green-700 font-bold text-sm">Sign In Now →</div>
            </Link>
            <Link to="/help" className="bg-white border-2 border-gray-300 rounded-3xl p-6 hover:shadow-xl transition-all text-center group">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase">Help & Support</h3>
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">Get instant assistance from our support team. Find answers to frequently asked questions, submit support tickets, and track service requests effortlessly.</p>
              <ul className="text-left text-gray-600 text-xs mb-3 space-y-1">
                <li>✓ 24/7 Support Available</li>
                <li>✓ Live Chat Assistance</li>
                <li>✓ FAQ & Guides</li>
                <li>✓ Contact Support Team</li>
              </ul>
              <div className="mt-6 text-green-600 group-hover:text-green-700 font-bold text-base">Get Help →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Authority Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            An official government digital service platform.
          </p>
          <p className="text-gray-600 text-base mt-3">
            Committed to transparency and efficiency.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-green-700 to-green-800 text-white overflow-hidden relative mt-12">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
            {t('readyToStart')}
          </h2>
          <p className="text-green-100 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('joinMillions')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-green-700 rounded-2xl hover:bg-gray-50 transition font-bold text-base shadow-lg hover:shadow-xl w-full sm:w-auto transform hover:-translate-y-0.5">
              {t('createaccount')}
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 transition font-bold text-base w-full sm:w-auto backdrop-blur-sm">
              {t('learnmore')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
