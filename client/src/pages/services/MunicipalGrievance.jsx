import React, { useState } from 'react';
import { FileText, ClipboardList, ArrowRight, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import TopBar from '../../components/common/TopBar';
import NavBar from '../../components/common/NavBar';
import AnimatedBackground from '../../components/common/AnimatedBackground';
import Footer from '../../components/common/Footer';

import PageHeader from '../../components/common/PageHeader';
import ComplaintForm from '../../components/forms/ComplaintForm';
import TrackStatusModal from '../../components/forms/TrackStatusModal';

const MunicipalGrievancePage = () => {
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showTrackStatus, setShowTrackStatus] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <AnimatedBackground />

      <div id="search-tour-step" className="relative z-10">
        <NavBar />
      </div>

      {/* Hero Header - Enhanced Aesthetic */}
      <PageHeader
        title={t('services.municipalGrievance')}
        description={t('services.municipalGrievanceDesc')}
        icon={Building2}
        watermarkIcon={Building2}
        to="/services"
        gradient="bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-900"
        stripeColor="via-teal-400/30"
        orb1Color="from-teal-400/15 to-emerald-500/15"
        orb2Color="from-cyan-400/10 to-teal-500/10"
      />

      {/* Main Feature Grid (Huge Cards) */}
      <section className="py-12 px-4 sm:px-6 mb-12 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* File Complaint Card */}
            <button
              onClick={() => setShowComplaintForm(true)}
              className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(220,38,38,0.3)] transition-all duration-500 border border-white/50 bg-white/80 backdrop-blur-lg text-left"
            >
              {/* Decorative Wave & Bubbles */}
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br from-red-500 to-rose-600 opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out" />
              <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-gradient-to-tr from-red-500 to-rose-600 opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out" />
              <svg className="absolute bottom-0 left-0 w-full h-32 text-red-900/5 group-hover:text-red-900/10 transition-colors duration-500 pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
              </svg>

              <div className="relative h-full p-10 pb-16 flex flex-col justify-between z-10">
                <div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg mb-8 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] transition-shadow duration-300">
                    <FileText size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-red-700 transition-colors">File a Complaint</h3>
                  <p className="text-gray-500 font-medium text-xl leading-relaxed">
                    Report potholes, garbage, street light issues or water supply problems.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-red-600 mt-6">
                  <span>Start Now</span>
                  <ArrowRight size={24} className="transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </button>

            {/* Track Status Card */}
            <button
              onClick={() => setShowTrackStatus(true)}
              className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.3)] transition-all duration-500 border border-white/50 bg-white/80 backdrop-blur-lg text-left"
            >
              {/* Decorative Wave & Bubbles */}
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out" />
              <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 opacity-10 group-hover:opacity-20 transition-opacity duration-700 ease-out" />
              <svg className="absolute bottom-0 left-0 w-full h-32 text-indigo-900/5 group-hover:text-indigo-900/10 transition-colors duration-500 pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,170.7C672,160,768,192,864,208C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
              </svg>

              <div className="relative h-full p-10 pb-16 flex flex-col justify-between z-10">
                <div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mb-8 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transition-shadow duration-300">
                    <ClipboardList size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">Track Status</h3>
                  <p className="text-gray-500 font-medium text-xl leading-relaxed">
                    Check the real-time progress of your filed complaints and view reports.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-blue-600 mt-6">
                  <span>Check Status</span>
                  <ArrowRight size={24} className="transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </button>

          </div>
        </div>
      </section>

      <ComplaintForm
        isOpen={showComplaintForm}
        onClose={() => setShowComplaintForm(false)}
      />

      <TrackStatusModal
        isOpen={showTrackStatus}
        onClose={() => setShowTrackStatus(false)}
      />

      <Footer />
    </div>
  );
};

export default MunicipalGrievancePage;
