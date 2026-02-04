import React, { useState } from 'react';
import { FileText, ClipboardList, Calendar, Bell, MapPin, Truck, History, HelpCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import TickerBanner from '../../components/home/TickerBanner';
import HeroSection from '../../components/home/HeroSection';
import Footer from '../../components/common/Footer';

const WasteManagementPage = () => {
  const [expandedService, setExpandedService] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const wasteServices = [
    {
      id: 1,
      name: 'File Waste Collection Complaint',
      description: 'Report issues with waste collection in your area',
      icon: FileText,
      color: 'from-red-500 to-rose-500',
      buttonText: 'File Complaint',
      details: {
        overview: 'Report any issues related to waste collection such as missed pickups, irregular collection, or improper disposal.',
        features: [
          'Report missed waste collection',
          'Complain about irregular pickup schedules',
          'Report improper waste disposal by collectors',
          'Upload photos as evidence',
          'Specify exact location on map',
          'Get complaint reference number instantly'
        ],
        requirements: 'Registered address and description of the issue'
      }
    },
    {
      id: 2,
      name: 'Track Complaint Status',
      description: 'Track the status of your filed complaints',
      icon: ClipboardList,
      color: 'from-blue-500 to-cyan-500',
      buttonText: 'Track Status',
      details: {
        overview: 'Track the real-time status of all your filed complaints and get updates on resolution progress.',
        features: [
          'View all active complaints',
          'Real-time status updates',
          'See assigned officer details',
          'View expected resolution timeline',
          'Get SMS/Email notifications on updates',
          'Escalate unresolved complaints'
        ],
        requirements: 'Complaint reference number or registered account'
      }
    },
    {
      id: 3,
      name: 'Schedule Pickup Request',
      description: 'Schedule special waste pickup for bulk items',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      buttonText: 'Schedule Pickup',
      details: {
        overview: 'Schedule special pickup requests for bulk waste, construction debris, garden waste, or hazardous materials.',
        features: [
          'Schedule bulk waste pickup',
          'Request e-waste collection',
          'Book construction debris removal',
          'Schedule garden waste pickup',
          'Choose convenient date and time slot',
          'Get confirmation and reminder notifications'
        ],
        requirements: 'Registered address and type of waste for pickup'
      }
    },
    {
      id: 4,
      name: 'Receive Timely Updates',
      description: 'Get notifications about waste collection and updates',
      icon: Bell,
      color: 'from-yellow-500 to-orange-500',
      buttonText: 'Configure Alerts',
      details: {
        overview: 'Set up notifications to receive timely updates about waste collection schedules, holidays, and service changes.',
        features: [
          'Daily collection reminders',
          'Holiday schedule notifications',
          'Service disruption alerts',
          'Complaint resolution updates',
          'New initiatives and programs',
          'Choose SMS, Email, or Push notifications'
        ],
        requirements: 'Registered mobile number or email address'
      }
    },
    {
      id: 5,
      name: 'Collection Schedule',
      description: 'View waste collection schedule for your area',
      icon: MapPin,
      color: 'from-purple-500 to-indigo-500',
      buttonText: 'View Schedule',
      details: {
        overview: 'Check the waste collection schedule for your area including regular pickup days and timings.',
        features: [
          'View weekly collection schedule',
          'Check dry and wet waste collection days',
          'See collection timings for your area',
          'View holiday adjustments',
          'Download schedule as calendar',
          'Set reminders for collection days'
        ],
        requirements: 'Area/Ward details or registered address'
      }
    },
    {
      id: 6,
      name: 'Track Collection Vehicle',
      description: 'Track waste collection vehicle in real-time',
      icon: Truck,
      color: 'from-teal-500 to-green-500',
      buttonText: 'Track Vehicle',
      details: {
        overview: 'Track the waste collection vehicle in real-time to know when it will arrive at your location.',
        features: [
          'Real-time GPS tracking of collection vehicle',
          'Estimated arrival time at your location',
          'View vehicle route for the day',
          'Get alert when vehicle is nearby',
          'Report if vehicle skips your area',
          'View collection completion status'
        ],
        requirements: 'Registered address in serviceable area'
      }
    },
    {
      id: 7,
      name: 'Complaint History',
      description: 'View history of all your past complaints',
      icon: History,
      color: 'from-indigo-500 to-violet-500',
      buttonText: 'View History',
      details: {
        overview: 'Access complete history of all your past complaints, their resolutions, and feedback.',
        features: [
          'View all past complaints',
          'See resolution details and timelines',
          'Download complaint reports',
          'View feedback and ratings given',
          'Re-open resolved complaints if needed',
          'Filter by date, type, or status'
        ],
        requirements: 'Registered account'
      }
    },
    {
      id: 8,
      name: 'Help & Support',
      description: 'Get assistance with waste management queries',
      icon: HelpCircle,
      color: 'from-pink-500 to-rose-500',
      buttonText: 'Get Help',
      details: {
        overview: 'Get help with any waste management related queries, guidelines, or information.',
        features: [
          'FAQs on waste segregation',
          'Guidelines for different waste types',
          'Contact local sanitation office',
          'Raise support tickets',
          'Report unauthorized dumping',
          'Information on recycling programs'
        ],
        requirements: 'None for general queries, consumer ID for specific issues'
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
              <Trash2 size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">{t('services.wasteManagement')}</h1>
              <p className="text-white/90 text-sm sm:text-base mt-1 font-medium">{t('services.wasteManagementDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-20 sm:pb-32 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {wasteServices.map((service) => {
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
                      <div className="bg-purple-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Features</h4>
                        <ul className="space-y-2">
                          {service.details.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs sm:text-sm">
                              <span className="text-purple-600 font-bold mt-0.5">•</span>
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

export default WasteManagementPage;
