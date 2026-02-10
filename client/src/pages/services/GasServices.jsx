import React from 'react';
import {
  CreditCard, Flame, Droplet, ClipboardList, ArrowRight, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import Footer from '../../components/common/Footer';

import PageHeader from '../../components/common/PageHeader';

const GasServicesPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      id: 'billing',
      title: 'Bill & Payments',
      icon: CreditCard,
      gradient: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-200',
      description: 'View your latest bill, history and make secure payments.',
    },
    {
      id: 'cylinder',
      title: 'Cylinder Booking',
      icon: Droplet,
      gradient: 'from-orange-500 to-orange-600',
      shadow: 'shadow-orange-200',
      description: 'Book a refill, track delivery status and manage bottles.',
    },
    {
      id: 'connection',
      title: 'New Connection',
      icon: Flame,
      gradient: 'from-green-500 to-green-600',
      shadow: 'shadow-green-200',
      description: 'Apply for a new gas connection or transfer existing one.',
    },
    {
      id: 'complaint',
      title: 'Support & Complaints',
      icon: ClipboardList,
      gradient: 'from-red-500 to-red-600',
      shadow: 'shadow-red-200',
      description: 'Report gas leakage, emergencies or billing issues.',
      isHighlight: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      {/* Background Bubbles & Waves */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px]" />

        {/* Subtle Wave Pattern Overlay */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gas-wave" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q25 20 50 10 T100 10 T150 10 T200 10" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-900" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gas-wave)" />
        </svg>
      </div>

      <div id="search-tour-step" className="relative z-10">
        <NavBar />
      </div>

      {/* Hero Header - Enhanced Aesthetic */}
      <PageHeader
        title={t('services.gasServices')}
        description={t('services.gasDesc')}
        icon={Flame}
        watermarkIcon={Flame}
        to="/services"
        gradient="bg-gradient-to-br from-orange-900 via-red-800 to-orange-900"
        stripeColor="via-orange-400/30"
        orb1Color="from-orange-400/30 to-red-500/30"
        orb2Color="from-amber-400/25 to-orange-500/25"
      />

      {/* Main Feature Grid */}
      <section className="py-12 px-4 sm:px-6 mb-12 -mt-8 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  onClick={() => {
                    if (service.id === 'billing') {
                      navigate('/services/gas/billing');
                    } else if (service.id === 'connection') {
                      navigate('/services/gas/new-connection');
                    } else {
                      navigate(`/services/gas/${service.id}`);
                    }
                  }}
                  className={`group relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 bg-white/80 backdrop-blur-lg`}
                >
                  {/* Decorative Wave & Bubbles */}
                  <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out`} />
                  <div className={`absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-tr ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out`} />
                  <svg className={`absolute bottom-0 left-0 w-full h-20 text-orange-900/5 group-hover:text-orange-900/10 transition-colors duration-500 pointer-events-none`} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
                  </svg>

                  <div className="relative h-full p-8 pb-12 flex flex-col justify-between z-10">
                    <div>
                      {/* Icon Box */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-shadow duration-300`}>
                        <Icon size={32} className="text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="w-fit self-center mt-6 py-3 px-16 bg-gradient-to-r from-orange-500 to-red-600 border border-orange-500 border-b-4 border-b-orange-800 rounded-xl flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-200 group-hover:shadow-orange-400 transition-all group-active:border-b-0 group-active:translate-y-1">
                      <span>Access Features</span>
                      <ArrowRight size={18} className="text-white/90" />
                    </div>
                  </div>
                </button>
              );
            })}

          </div>

          {/* Emergency Helper Banner */}
          <div className="mt-12 bg-red-50 border border-red-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                <ShieldCheck size={28} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Smell Gas or Suspect a Leak?</h3>
                <p className="text-gray-600 mt-1">Immediate action is required. Use our emergency reporting tool.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/services/gas/complaint')}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all hover:shadow-red-500/50 whitespace-nowrap"
            >
              Report Emergency Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GasServicesPage;
