import React, { useState } from 'react';
import { FileText, ClipboardList, AlertTriangle, Droplet, Construction, MapPin, Bell, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import TickerBanner from '../../components/home/TickerBanner';
import HeroSection from '../../components/home/HeroSection';
import Footer from '../../components/common/Footer';

const MunicipalGrievancePage = () => {
  const [expandedService, setExpandedService] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const grievanceServices = [
    {
      id: 1,
      name: 'Report Pothole Issues',
      description: 'Report potholes and road damage in your area',
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-500',
      buttonText: 'Report Pothole',
      details: {
        overview: 'Report potholes, road damage, and hazardous road conditions for quick repair and maintenance.',
        features: [
          'Pin exact location on map',
          'Upload photos of the pothole',
          'Specify road name and landmarks',
          'Rate severity level',
          'Get complaint reference number',
          'Track repair status in real-time'
        ],
        requirements: 'Location details and photos of the issue'
      }
    },
    {
      id: 2,
      name: 'Water Supply Issues',
      description: 'Report water supply problems and leakages',
      icon: Droplet,
      color: 'from-blue-500 to-cyan-500',
      buttonText: 'Report Issue',
      details: {
        overview: 'Report water supply disruptions, pipeline leakages, contamination, or low pressure issues in your area.',
        features: [
          'Report water supply disruption',
          'Complain about pipeline leakage',
          'Report water contamination',
          'Report low water pressure',
          'Specify affected area/locality',
          'Request water tanker service'
        ],
        requirements: 'Address and description of water issue'
      }
    },
    {
      id: 3,
      name: 'Construction Complaints',
      description: 'Report illegal or hazardous construction activities',
      icon: Construction,
      color: 'from-orange-500 to-amber-500',
      buttonText: 'File Complaint',
      details: {
        overview: 'Report unauthorized construction, building violations, encroachments, or construction causing public nuisance.',
        features: [
          'Report illegal construction',
          'Complain about encroachment',
          'Report building code violations',
          'Report construction noise/debris issues',
          'Upload evidence photos/videos',
          'Request site inspection'
        ],
        requirements: 'Location details, photos, and description of violation'
      }
    },
    {
      id: 4,
      name: 'Track Grievance Status',
      description: 'Track status of all your submitted grievances',
      icon: ClipboardList,
      color: 'from-green-500 to-emerald-500',
      buttonText: 'Track Status',
      details: {
        overview: 'Track the real-time status of all your submitted grievances and get updates on resolution progress.',
        features: [
          'View all active grievances',
          'Real-time status updates',
          'See assigned department and officer',
          'View expected resolution timeline',
          'Check action taken reports',
          'Escalate delayed grievances'
        ],
        requirements: 'Grievance reference number or registered account'
      }
    },
    {
      id: 5,
      name: 'Submit General Grievance',
      description: 'Submit any civic issue or municipal complaint',
      icon: FileText,
      color: 'from-purple-500 to-indigo-500',
      buttonText: 'Submit Grievance',
      details: {
        overview: 'Submit any civic grievance related to municipal services, infrastructure, or public amenities.',
        features: [
          'Report streetlight issues',
          'Complain about drainage problems',
          'Report garbage dumping',
          'Report stray animal nuisance',
          'Report public property damage',
          'Any other civic issue'
        ],
        requirements: 'Location, category, and description of the issue'
      }
    },
    {
      id: 6,
      name: 'Location-based Reporting',
      description: 'Report issues with precise location tagging',
      icon: MapPin,
      color: 'from-teal-500 to-green-500',
      buttonText: 'Report on Map',
      details: {
        overview: 'Use map-based reporting to pinpoint exact locations of civic issues for faster resolution.',
        features: [
          'Drop pin on exact issue location',
          'Auto-detect current location',
          'Add landmarks for reference',
          'View nearby reported issues',
          'See ward and zone information',
          'Attach photos with geo-tagging'
        ],
        requirements: 'GPS-enabled device and location access'
      }
    },
    {
      id: 7,
      name: 'Email & SMS Updates',
      description: 'Receive updates via email and SMS notifications',
      icon: Bell,
      color: 'from-yellow-500 to-orange-500',
      buttonText: 'Configure Alerts',
      details: {
        overview: 'Set up notifications to receive real-time updates on your grievances via email and SMS.',
        features: [
          'Instant acknowledgment on submission',
          'Status change notifications',
          'Resolution update alerts',
          'Feedback request notifications',
          'Choose notification preferences',
          'Digest emails for multiple updates'
        ],
        requirements: 'Registered mobile number and/or email address'
      }
    },
    {
      id: 8,
      name: 'Help & Information',
      description: 'Get help and information about grievance process',
      icon: HelpCircle,
      color: 'from-pink-500 to-rose-500',
      buttonText: 'Get Help',
      details: {
        overview: 'Get information about the grievance process, timelines, escalation procedures, and contact details.',
        features: [
          'FAQs on grievance process',
          'View department contact details',
          'Understand escalation procedure',
          'Check service level agreements',
          'Download grievance forms',
          'Access citizen charter'
        ],
        requirements: 'None'
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
            ← {t('nav.backToServices')}
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <FileText size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">{t('services.municipalGrievance')}</h1>
              <p className="text-white/90 text-sm sm:text-base mt-1 font-medium">{t('services.municipalGrievanceDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-20 sm:pb-32 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {grievanceServices.map((service) => {
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
                      <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Features</h4>
                        <ul className="space-y-2">
                          {service.details.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs sm:text-sm">
                              <span className="text-green-600 font-bold mt-0.5">•</span>
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

export default MunicipalGrievancePage;
