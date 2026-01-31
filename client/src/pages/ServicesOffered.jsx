import React, { useState, useEffect } from 'react';
import { Zap, Flame, Droplet, Trash2, FileText } from 'lucide-react';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import TickerBanner from '../components/TickerBanner';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { fetchServices, fetchQuickActionStats } from '../context/mockApi';
import { useLanguage } from '../context/LanguageContext.jsx';

const ServicesOffered = () => {
  const [services, setServices] = useState([
    { 
      id: 1, 
      name: 'Electricity Bill', 
      description: 'Pay your electricity bills online securely and conveniently.',
      details: 'View your electricity consumption, download bills, check pending payments, and set up automatic payments. Get instant payment receipts and billing history.',
      icon: 'Zap' 
    },
    { 
      id: 2, 
      name: 'Gas Connection', 
      description: 'Manage your gas services and track consumption easily.',
      details: 'Apply for new gas connections, pay bills, request meter readings, report leaks, and manage your account settings. Real-time notifications for all updates.',
      icon: 'Flame' 
    },
    { 
      id: 3, 
      name: 'Water Bill', 
      description: 'Pay water charges easily and manage your water account.',
      details: 'View water consumption, pay bills online, apply for new connections, request meter inspection, and track service requests instantly.',
      icon: 'Droplet' 
    },
    { 
      id: 4, 
      name: 'Sanitation', 
      description: 'Report waste management issues and track resolutions.',
      details: 'File complaints about waste collection, track complaint status, schedule pickup requests, and receive timely updates on issue resolution.',
      icon: 'Trash2' 
    },
    { 
      id: 5, 
      name: 'Municipal Grievances', 
      description: 'File complaints and track status of all civic issues.',
      details: 'Submit grievances about potholes, water issues, construction complaints, and more. Track status in real-time and receive updates via email and SMS.',
      icon: 'FileText' 
    },
  ]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsData = await fetchQuickActionStats();
        setStats(statsData);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadData();
  }, []);

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

      {/* SUVIDHA Services Header */}
      <section className="w-full py-8 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">SUVIDHA Services</h2>
          <p className="text-gray-600 text-lg">Access all government services in one place. Pay bills, apply for permits, check status, and more.</p>
        </div>
      </section>

      {/* Services List Section - SUVIDHA Style */}
      <section className="pt-8 pb-48 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
          {(
            <div className="flex flex-wrap w-full max-w-7xl justify-center" style={{gap: '24px'}}>
              {services.map((service, index) => {
                // Define colors for each service
                const colorMap = {
                  1: { bg: 'from-yellow-500 to-orange-500', icon: 'text-yellow-600', light: 'bg-yellow-100' },
                  2: { bg: 'from-red-500 to-rose-500', icon: 'text-red-600', light: 'bg-red-100' },
                  3: { bg: 'from-blue-500 to-cyan-500', icon: 'text-blue-600', light: 'bg-blue-100' },
                  4: { bg: 'from-purple-500 to-indigo-500', icon: 'text-purple-600', light: 'bg-purple-100' },
                  5: { bg: 'from-green-500 to-emerald-500', icon: 'text-green-600', light: 'bg-green-100' },
                };
                
                const colors = colorMap[service.id] || { bg: 'from-gray-500 to-gray-600', icon: 'text-gray-600', light: 'bg-gray-100' };
                
                const iconMap = {
                  'Zap': Zap,
                  'Flame': Flame,
                  'Droplet': Droplet,
                  'Trash2': Trash2,
                  'FileText': FileText,
                };
                
                const IconComponent = iconMap[service.icon] || FileText;
                
                // All cards have equal width
                const cardWidth = 'calc(33.333% - 16px)';
                
                return (
                  <div
                    key={service.id}
                    style={{width: cardWidth}}
                    className="group relative bg-white border-2 border-gray-300 rounded-3xl p-8 py-10 hover:shadow-xl transition-all duration-300 shadow-md overflow-hidden"
                  >
                    {/* Ribbon at the top */}
                    <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-r ${colors.bg} rounded-t-xl`}></div>
                    
                    {/* Subtle background effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center pt-2">
                      {/* Icon Circle */}
                      <div className={`w-20 h-20 rounded-sm bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-md`}>
                        <IconComponent size={36} className="text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">{service.name}</h3>
                      <p className="text-gray-700 text-sm mb-6 leading-relaxed max-w-xs font-semibold">{service.description}</p>
                      
                      <div className="flex flex-col gap-3 items-center mb-4">
                        <button className="w-60 px-8 py-3 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-orange-200 transition-all font-bold text-sm shadow-md hover:shadow-lg uppercase tracking-wider hover:-translate-y-1">
                          Pay Now
                        </button>
                        <button 
                          onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                          className="w-60 px-8 py-3 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-green-200 transition-all font-bold text-sm shadow-md hover:shadow-lg uppercase tracking-wider hover:-translate-y-1"
                        >
                          {expandedService === service.id ? 'Hide Details' : 'Details'}
                        </button>
                      </div>

                      {/* Details Container Below Buttons with smooth expansion */}
                      <div
                        style={{
                          maxHeight: expandedService === service.id ? '500px' : '0',
                          opacity: expandedService === service.id ? 1 : 0,
                          overflow: 'hidden',
                          transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out'
                        }}
                      >
                        <div className="w-full bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                          <ul className="text-left text-gray-700 text-sm space-y-2">
                            {service.details.split('.').filter(item => item.trim()).map((detail, idx) => (
                              <li key={idx} className="font-semibold flex gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>{detail.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-green-700 to-green-800 text-white overflow-hidden relative">
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

export default ServicesOffered;
