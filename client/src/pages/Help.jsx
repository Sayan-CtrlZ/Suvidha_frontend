import React, { useState } from 'react';
import {
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  FileText,
  Shield,
  Users,
  Zap,
  Droplet,
  Flame,
  Trash2,
  AlertCircle,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';


import Footer from '../components/common/Footer';
import AnimatedBackground from '../components/common/AnimatedBackground';
import PageHeader from '../components/common/PageHeader';
import { useLanguage } from '../context/LanguageContext';

const HelpPage = () => {
  const { t } = useLanguage();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: 1,
      question: 'How do I create an account on SUVIDHA?',
      answer: 'To create an account, click on the "Sign Up" button on the homepage. Fill in your personal details including name, email, phone number, and create a password. You will receive a verification email/OTP to confirm your account. Once verified, you can access all citizen services.',
      category: 'Account'
    },
    {
      id: 2,
      question: 'How can I pay my utility bills online?',
      answer: 'Navigate to the specific service (Electricity, Water, Gas) from the Services page. Enter your consumer number, view your current bill, and click "Pay Now". You can pay using UPI, Credit/Debit Card, Net Banking, or Digital Wallets. You will receive instant confirmation and a digital receipt.',
      category: 'Payments'
    },
    {
      id: 3,
      question: 'What documents are required for new service connections?',
      answer: 'For new connections, you typically need: Valid ID proof (Aadhaar, Passport, Voter ID), Address proof, Property ownership documents or rent agreement, Passport size photographs, and NOC from landlord (for rented premises). Specific requirements may vary by service.',
      category: 'Services'
    },
    {
      id: 4,
      question: 'How do I track my application status?',
      answer: 'After submitting any application, you receive a unique Application ID. Go to "Track Application" section, enter your Application ID, and view real-time status updates. You will also receive SMS/Email notifications at each stage of processing.',
      category: 'Applications'
    },
    {
      id: 5,
      question: 'What should I do in case of an emergency (gas leak, water main burst)?',
      answer: 'For emergencies, use the "Report Emergency" button on the respective service page or call our 24/7 emergency helpline at 1800-XXX-XXXX. Provide your location and describe the issue. Our response team will be dispatched immediately.',
      category: 'Emergency'
    },
    {
      id: 6,
      question: 'How do I file a grievance or complaint?',
      answer: 'Go to Municipal Grievance section under Services. Click "File New Grievance", select the category, provide details with photos if applicable, and submit. You will receive a Grievance ID for tracking. Standard resolution time is 7-15 working days.',
      category: 'Grievances'
    },
    {
      id: 7,
      question: 'Can I download my previous bills and receipts?',
      answer: 'Yes, log into your account and navigate to the specific service. Under "Bill History" or "Download Bills", you can select the time period and download bills in PDF format. Payment receipts are also available for all transactions.',
      category: 'Payments'
    },
    {
      id: 8,
      question: 'How secure is my personal and payment information?',
      answer: 'SUVIDHA uses bank-grade 256-bit SSL encryption for all transactions. Your data is stored on government-certified secure servers. We comply with IT Act 2000 and data protection guidelines. Payment processing is done through RBI-authorized payment gateways.',
      category: 'Security'
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      titleKey: 'help.helpline',
      detailKeys: ['help.tollFree', 'help.emergency'],
      details: ['1800-XXX-XXXX', '112'],
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Mail,
      titleKey: 'help.emailSupport',
      details: ['support@suvidha.gov.in', 'grievance@suvidha.gov.in'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Clock,
      titleKey: 'help.workingHours',
      detailKeys: ['help.monFri', 'help.sat'],
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: MapPin,
      titleKey: 'help.headOffice',
      details: ['SUVIDHA Bhawan, Sector 17', 'City Center, State - 110001'],
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const quickLinks = [
    { icon: Zap, titleKey: 'services.electricityUtilities', path: '/services/electricity', color: 'bg-yellow-100 text-yellow-600' },
    { icon: Droplet, titleKey: 'services.waterServices', path: '/services/water', color: 'bg-blue-100 text-blue-600' },
    { icon: Flame, titleKey: 'services.gasServices', path: '/services/gas', color: 'bg-orange-100 text-orange-600' },
    { icon: Trash2, titleKey: 'services.wasteManagement', path: '/services/waste', color: 'bg-green-100 text-green-600' },
    { icon: AlertCircle, titleKey: 'services.municipalGrievance', path: '/services/grievance', color: 'bg-red-100 text-red-600' },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full Banner Section */}
      <TopBar />
      <AnimatedBackground />

      <NavBar />



      <PageHeader
        title={t('help.title')}
        description={t('help.desc')}
        icon={HelpCircle}
        watermarkIcon={HelpCircle}
        to="/"
        gradient="bg-gradient-to-br from-emerald-800 via-green-700 to-emerald-800"
        stripeColor="via-emerald-400/30"
        orb1Color="from-emerald-400/15 to-green-500/15"
        orb2Color="from-teal-400/10 to-emerald-500/10"
      />

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            {/* Search Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 p-6 mb-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 opacity-5 pointer-events-none" />
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                <Search className="w-5 h-5 text-green-600" />
                {t('help.searchTopics')}
              </h2>
              <div className="relative z-10">
                <input
                  type="text"
                  placeholder={t('help.typeQuestion')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700 bg-white/70"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 p-6 mb-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 opacity-5 pointer-events-none" />
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                <FileText className="w-5 h-5 text-green-600" />
                {t('help.quickLinks')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-green-400 hover:shadow-md transition-all group"
                  >
                    <div className={`p-3 rounded-full ${link.color} group-hover:shadow-lg transition-shadow`}>
                      <link.icon className="w-6 h-6" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700 text-center">{t(link.titleKey)}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* FAQs Section */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 p-6 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 opacity-5 pointer-events-none" />
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    {t('help.faqs')}
                  </h2>

                  <div className="space-y-3 relative z-10">
                    {filteredFaqs.length > 0 ? (
                      filteredFaqs.map((faq) => (
                        <div
                          key={faq.id}
                          className="border border-gray-200 rounded-lg overflow-hidden bg-white/40 backdrop-blur-sm"
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 text-left">
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                                {faq.category}
                              </span>
                              <span className="font-medium text-gray-800">{faq.question}</span>
                            </div>
                            {expandedFaq === faq.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {expandedFaq === faq.id && (
                            <div className="px-4 py-4 bg-white/60 border-t border-gray-200">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <HelpCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>{t('help.noFaqsFound')}</p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="mt-2 text-green-600 hover:underline"
                        >
                          {t('help.clearSearch')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact & Support Section */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 p-6 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-5 pointer-events-none" />
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                    <Phone className="w-5 h-5 text-green-600" />
                    {t('help.contactInfo')}
                  </h2>
                  <div className="space-y-4 relative z-10">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${info.color}`}>
                          <info.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{t(info.titleKey)}</h3>
                          {info.detailKeys ? (
                            info.detailKeys.map((key, idx) => (
                              <p key={idx} className="text-sm text-gray-600">{t(key)}: {info.details?.[idx]}</p>
                            ))
                          ) : (
                            info.details?.map((detail, idx) => (
                              <p key={idx} className="text-sm text-gray-600">{detail}</p>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Guidelines */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/60 p-6 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 pointer-events-none" />
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                    <Shield className="w-5 h-5 text-green-600" />
                    {t('help.guidelines')}
                  </h2>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{t('help.guideline1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{t('help.guideline2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{t('help.guideline3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{t('help.guideline4')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{t('help.guideline5')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Still Need Help Banner */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{t('help.stillNeedHelp')}</h3>
                    <p className="text-blue-100">{t('help.supportTeamAvailable')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                    {t('help.liveChat')}
                  </button>
                  <Link to="/contact" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors border border-white/30">
                    {t('help.submitTicket')}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpPage;
