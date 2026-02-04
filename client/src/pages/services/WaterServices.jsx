import React, { useState } from 'react';
import { BarChart3, CreditCard, PlusCircle, Gauge, ClipboardList, Download, History, HelpCircle, Droplet, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import TickerBanner from '../../components/home/TickerBanner';
import HeroSection from '../../components/home/HeroSection';
import Footer from '../../components/common/Footer';

const WaterServicesPage = () => {
  const [expandedService, setExpandedService] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const waterServices = [
    {
      id: 1,
      name: 'View Water Consumption',
      description: 'Monitor your water usage and consumption patterns',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      buttonText: 'View Consumption',
      details: {
        overview: 'Track your daily, weekly, and monthly water consumption with detailed analytics and usage insights.',
        features: [
          'Real-time water usage monitoring',
          'Daily, weekly, and monthly consumption graphs',
          'Compare usage with previous billing periods',
          'Set consumption alerts and notifications',
          'Identify unusual usage patterns',
          'Tips to reduce water consumption'
        ],
        requirements: 'Active water connection with meter installation'
      }
    },
    {
      id: 2,
      name: 'Pay Water Bill',
      description: 'Pay your current water bill online securely',
      icon: CreditCard,
      color: 'from-green-500 to-emerald-500',
      buttonText: 'Pay Now',
      details: {
        overview: 'Make secure online payments for your water bills using multiple payment options with instant confirmation.',
        features: [
          'Multiple payment options: UPI, Credit/Debit Card, Net Banking',
          'Instant payment confirmation and digital receipt',
          'View current bill amount and due date',
          'Pay for multiple connections at once',
          'Set up recurring payments',
          'Save payment methods for faster checkout'
        ],
        requirements: 'Valid consumer number and any digital payment method'
      }
    },
    {
      id: 3,
      name: 'Apply for New Connection',
      description: 'Apply for a new water connection for your property',
      icon: PlusCircle,
      color: 'from-purple-500 to-indigo-500',
      buttonText: 'Apply Now',
      details: {
        overview: 'Apply for a new water connection for residential or commercial properties with easy online application.',
        features: [
          'Apply for domestic or commercial connections',
          'Upload required documents online',
          'Track application status in real-time',
          'Schedule site inspection',
          'Choose connection size as per requirement',
          'Get estimated connection timeline and charges'
        ],
        requirements: 'Valid ID proof, address proof, property documents, and NOC if applicable'
      }
    },
    {
      id: 4,
      name: 'Request Meter Inspection',
      description: 'Request official meter inspection or replacement',
      icon: Gauge,
      color: 'from-orange-500 to-amber-500',
      buttonText: 'Request Inspection',
      details: {
        overview: 'Request meter inspection for faulty readings, meter replacement, or routine checkup.',
        features: [
          'Report faulty or damaged meter',
          'Request meter accuracy testing',
          'Apply for meter replacement',
          'Schedule convenient inspection time',
          'Track inspection request status',
          'View inspection reports online'
        ],
        requirements: 'Consumer number and description of meter issue'
      }
    },
    {
      id: 5,
      name: 'Track Service Requests',
      description: 'Track status of all your service requests instantly',
      icon: ClipboardList,
      color: 'from-teal-500 to-green-500',
      buttonText: 'Track Requests',
      details: {
        overview: 'Track all your pending service requests, complaints, and applications in one place.',
        features: [
          'View all pending requests at a glance',
          'Real-time status updates',
          'Get estimated resolution time',
          'Receive SMS/Email notifications on updates',
          'View complete request history',
          'Escalate delayed requests'
        ],
        requirements: 'Registered account with active requests'
      }
    },
    {
      id: 6,
      name: 'Download Bills',
      description: 'Download current and past water bills as PDF',
      icon: Download,
      color: 'from-indigo-500 to-violet-500',
      buttonText: 'Download Bills',
      details: {
        overview: 'Access and download your current and past water bills in PDF format for your records.',
        features: [
          'Download current month bill instantly',
          'Access bills from the last 24 months',
          'Bills available in PDF format',
          'Email bills directly to your email',
          'Bulk download option for multiple bills',
          'Digital signature for authenticity'
        ],
        requirements: 'Registered account with verified mobile number or email'
      }
    },
    {
      id: 7,
      name: 'Billing History',
      description: 'View complete billing and payment history',
      icon: History,
      color: 'from-yellow-500 to-orange-500',
      buttonText: 'View History',
      details: {
        overview: 'Access your complete billing and payment history with detailed consumption records.',
        features: [
          'View billing history for up to 5 years',
          'Track consumption trends over time',
          'View payment transaction history',
          'Compare billing across different periods',
          'Identify billing discrepancies',
          'Export data for record keeping'
        ],
        requirements: 'Registered account with active or past connection'
      }
    },
    {
      id: 8,
      name: 'Help & Support',
      description: 'Get assistance with water service related queries',
      icon: HelpCircle,
      color: 'from-pink-500 to-rose-500',
      buttonText: 'Get Help',
      details: {
        overview: 'Get help with any water service related queries, complaints, or information through multiple support channels.',
        features: [
          'FAQs for common queries',
          'Live chat support during business hours',
          'Raise support tickets online',
          'Report water supply issues',
          'Callback request option',
          'Access user guides and tutorials'
        ],
        requirements: 'Consumer number for account-specific queries'
      }
    }
  ];

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `radial-gradient(circle, #d1d5db 0.8px, transparent 0.8px)`,
        backgroundSize: '10px 10px',
        backgroundColor: '#f9fafb'
      }}
    >
      <TopBar />
      
      <div id="welcome-tour-step">
        <HeroSection />
      </div>

      <div id="search-tour-step">
        <NavBar />
      </div>

      <TickerBanner />

      {/* Page Header - Government Style */}
      <section className="w-full py-6 sm:py-8 px-3 sm:px-6 bg-gradient-to-r from-green-700 to-green-600 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/services')}
            className="mb-4 text-white/80 hover:text-white font-semibold text-sm flex items-center gap-2 tracking-wide"
          >
            {t('nav.backToServices')}
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <Droplet size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">{t('services.waterServices')}</h1>
              <p className="text-white/90 text-sm sm:text-base mt-1 font-medium">{t('services.waterDetails')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-20 sm:pb-32 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {waterServices.map((service) => {
            const IconComponent = service.icon;
            const isExpanded = expandedService === service.id;
            
            return (
              <div 
                key={service.id}
                className="bg-white rounded-2xl border-2 border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                {/* Service Header - Always Visible */}
                <div 
                  className="p-4 sm:p-6 cursor-pointer"
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-xl font-bold text-gray-900">{service.name}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm mt-0.5">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        className={`hidden sm:block px-6 py-2.5 bg-gradient-to-r ${service.color} text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5`}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle button action
                        }}
                      >
                        {service.buttonText}
                      </button>
                      <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        {isExpanded ? (
                          <ChevronUp size={20} className="text-gray-600" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100">
                    <div className="pt-4 sm:pt-6 space-y-4">
                      {/* Overview */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Overview</h4>
                        <p className="text-gray-700 text-xs sm:text-sm">{service.details.overview}</p>
                      </div>

                      {/* Features */}
                      <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Features</h4>
                        <ul className="space-y-2">
                          {service.details.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs sm:text-sm">
                              <span className="text-blue-600 font-bold mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div className="bg-amber-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Requirements</h4>
                        <p className="text-gray-700 text-xs sm:text-sm">{service.details.requirements}</p>
                      </div>

                      {/* Mobile Button */}
                      <button 
                        className={`sm:hidden w-full px-6 py-3 bg-gradient-to-r ${service.color} text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all`}
                      >
                        {service.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WaterServicesPage;
