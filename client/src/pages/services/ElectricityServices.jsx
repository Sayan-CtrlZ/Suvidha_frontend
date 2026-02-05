import React from 'react';
import {
  Zap, PlusCircle, CreditCard, LifeBuoy, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';

import PageHeader from '../../components/common/PageHeader';

const ElectricityServicesPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      id: 'billing',
      title: 'Bill & Payments',
      icon: CreditCard,
      gradient: 'from-violet-600 to-indigo-600',
      description: 'View current bill, payment history, consumption analytics and make payments.',
      link: '/services/electricity/billing'
    },
    {
      id: 'connection',
      title: 'New Connection',
      icon: PlusCircle,
      gradient: 'from-fuchsia-500 to-purple-600',
      description: 'Apply for a new domestic or commercial connection, or request load enhancement.',
      link: '/services/electricity/new-connection'
    },
    {
      id: 'support',
      title: 'Outage & Support',
      icon: LifeBuoy,
      gradient: 'from-amber-500 to-orange-600',
      description: 'Report power failures, meter issues, or check scheduled maintenance.',
      link: '/services/electricity/support',
      isHighlight: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <AnimatedBackground />

      <div id="search-tour-step" className="relative z-10">
        <NavBar />
      </div>

      {/* Hero Header - Enhanced Aesthetic */}
      <PageHeader
        title={t('services.electricityUtilities')}
        description={t('services.electricityDesc')}
        icon={Zap}
        watermarkIcon={Zap}
        to="/services"
        gradient="bg-gradient-to-br from-violet-900 via-indigo-800 to-violet-900"
        stripeColor="via-violet-400/30"
        orb1Color="from-violet-400/15 to-indigo-500/15"
        orb2Color="from-purple-400/10 to-violet-500/10"
      />

      {/* Main Feature Grid */}
      <section className="py-12 px-4 sm:px-6 mb-12 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  onClick={() => navigate(service.link)}
                  className={`group relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 bg-white/80 backdrop-blur-lg`}
                >
                  {/* Decorative Wave & Bubbles */}
                  <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out`} />
                  <div className={`absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-tr ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out`} />
                  <svg className={`absolute bottom-0 left-0 w-full h-20 text-indigo-900/5 group-hover:text-indigo-900/10 transition-colors duration-500 pointer-events-none`} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,112C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
                  </svg>

                  <div className="relative h-full p-8 pb-16 flex flex-col justify-between z-10">
                    <div>
                      {/* Icon Box */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-8 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-shadow duration-300`}>
                        <Icon size={40} className="text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-800 group-hover:to-indigo-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-900 transition-colors mt-6 pt-6 border-t border-gray-100">
                      <span>Access Services</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}

          </div>

          {/* Quick Pay / Smart Meter Upsell or Info */}
          <div className="mt-12 bg-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full filter blur-3xl opacity-20 -ml-16 -mb-16"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-white mb-2">Smart Meter Installation</h3>
                <p className="text-gray-400 text-lg max-w-xl">
                  Upgrade to a Smart Meter today for real-time consumption tracking and automated billing. No more manual readings.
                </p>
              </div>
              <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap">
                Check Eligibility
              </button>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ElectricityServicesPage;
