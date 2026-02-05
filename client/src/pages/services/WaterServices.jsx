import React from 'react';
import {
  CreditCard, Droplet, PlusCircle, ClipboardList, ArrowRight, LifeBuoy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';

import PageHeader from '../../components/common/PageHeader';

const WaterServicesPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      id: 'billing',
      title: 'Water Bill & Payment',
      icon: CreditCard,
      gradient: 'from-blue-500 to-blue-600',
      description: 'Pay your water tax instantly, view past bills and download receipts.',
    },
    {
      id: 'connection',
      title: 'New Connection',
      icon: PlusCircle,
      gradient: 'from-teal-500 to-teal-600',
      description: 'Request a new water connection, transfer ownership or update details.',
    },
    {
      id: 'complaint',
      title: 'Report Issues',
      icon: ClipboardList,
      gradient: 'from-indigo-500 to-indigo-600',
      description: 'Report leakages, no water supply, low pressure or billing errors.',
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
        title={t('services.waterServices')}
        description={t('services.waterDesc')}
        icon={Droplet}
        watermarkIcon={Droplet}
        to="/services"
        gradient="bg-gradient-to-br from-cyan-900 via-blue-800 to-cyan-900"
        stripeColor="via-cyan-400/30"
        orb1Color="from-cyan-400/15 to-blue-500/15"
        orb2Color="from-sky-400/10 to-cyan-500/10"
      />

      {/* Main Feature Grid */}
      <section className="py-12 px-4 sm:px-6 mb-12 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Using a focused grid for just 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  onClick={() => {
                    if (service.id === 'billing') {
                      navigate('/services/water/billing');
                    } else if (service.id === 'connection') {
                      navigate('/services/water/new-connection');
                    } else {
                      navigate(`/services/water/${service.id}`);
                    }
                  }}
                  className={`group relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 bg-white/80 backdrop-blur-lg`}
                >
                  {/* Decorative Wave & Bubbles */}
                  <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out`} />
                  <div className={`absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-tr ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out`} />
                  <svg className={`absolute bottom-0 left-0 w-full h-20 text-blue-900/5 group-hover:text-blue-900/10 transition-colors duration-500 pointer-events-none`} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,128L48,117.3C96,107,192,85,288,90.7C384,96,480,128,576,133.3C672,139,768,117,864,106.7C960,96,1056,96,1152,106.7C1248,117,1344,139,1392,149.3L1440,160V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
                  </svg>

                  <div className="relative h-full p-8 pb-12 flex flex-col justify-between z-10">
                    <div>
                      {/* Icon Box */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-8 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-shadow duration-300`}>
                        <Icon size={40} className="text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-900 transition-colors mt-6 pt-6 border-t border-gray-100">
                      <span>Proceed</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}

          </div>

          {/* Help Banner */}
          <div className="mt-12 bg-white border border-gray-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                <LifeBuoy size={28} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Need Help?</h3>
                <p className="text-gray-600 mt-1">Check our Water Quality Guidelines or Contact Support.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/help')}
                className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-colors"
              >
                View FAQs
              </button>
              <button
                onClick={() => navigate('/services/water/complaint')}
                className="px-8 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg transition-all hover:shadow-xl"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WaterServicesPage;
