import React, { useState } from 'react';
import {
  FileText, ClipboardList, Calendar, Truck, Trash2, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';

import PageHeader from '../../components/common/PageHeader';

const WasteManagementPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      name: 'Collection Schedule',
      description: 'Check pickup days and timings for your area.',
      icon: Calendar,
      gradient: 'from-emerald-500 to-green-600',
    },
    {
      id: 2,
      name: 'Track Collection Vehicle',
      description: 'Real-time GPS tracking of waste vans.',
      icon: Truck,
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      id: 3,
      name: 'Schedule Bulk Pickup',
      description: 'Request special pickup for large items or debris.',
      icon: Trash2,
      gradient: 'from-orange-500 to-amber-600',
    },
    {
      id: 4,
      name: 'Report Missed Pickup',
      description: 'Complaint about irregular collection.',
      icon: FileText,
      gradient: 'from-red-500 to-rose-600',
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
        title={t('services.wasteManagement')}
        description={t('services.wasteManagementDesc')}
        icon={Trash2}
        watermarkIcon={Trash2}
        to="/services"
        gradient="bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900"
        stripeColor="via-emerald-400/30"
        orb1Color="from-emerald-400/15 to-green-500/15"
        orb2Color="from-teal-400/10 to-emerald-500/10"
      />

      {/* Main Feature Grid */}
      <section className="py-12 px-4 sm:px-6 mb-12 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  onClick={() => {
                    if (service.id === 1) {
                      navigate('/services/waste/schedule');
                    } else {
                      // Placeholder for future navigation
                    }
                  }}
                  className={`group relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 bg-white/80 backdrop-blur-lg`}
                >
                  {/* Decorative Wave & Bubbles */}
                  <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out`} />
                  <div className={`absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-tr ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out`} />
                  <svg className={`absolute bottom-0 left-0 w-full h-20 text-emerald-900/5 group-hover:text-emerald-900/10 transition-colors duration-500 pointer-events-none`} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,96C1248,75,1344,85,1392,90.7L1440,96V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
                  </svg>

                  <div className="relative h-full p-8 pb-12 flex flex-col justify-between z-10">
                    <div>
                      {/* Icon Box */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-shadow duration-300`}>
                        <Icon size={32} className="text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {service.name}
                      </h3>
                      <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-900 transition-colors mt-4">
                      <span>Access Features</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WasteManagementPage;
