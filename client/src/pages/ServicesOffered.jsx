import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Droplet, Flame, Trash2, FileText, ArrowRight } from 'lucide-react';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Footer from '../components/common/Footer';
import BackButton from '../components/common/BackButton';
import PageHeader from '../components/common/PageHeader';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext';

const ServicesOffered = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  const services = [
    {
      id: 1,
      nameKey: 'services.electricityUtilities',
      descriptionKey: 'services.electricityDesc',
      icon: Zap,
      gradient: 'from-violet-600 to-indigo-600',
      shadowColor: 'hover:shadow-violet-500/70',
      link: '/services/electricity',
      buttonStyle: 'bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-500 border-b-violet-800 shadow-violet-200 group-hover:shadow-violet-400'
    },
    {
      id: 2,
      nameKey: 'services.gasServices',
      descriptionKey: 'services.gasDesc',
      icon: Flame,
      gradient: 'from-orange-500 to-red-600',
      shadowColor: 'hover:shadow-orange-500/70',
      link: '/services/gas',
      buttonStyle: 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 border-b-orange-800 shadow-orange-200 group-hover:shadow-orange-400'
    },
    {
      id: 3,
      nameKey: 'services.waterServices',
      descriptionKey: 'services.waterDesc',
      icon: Droplet,
      gradient: 'from-cyan-500 to-blue-600',
      shadowColor: 'hover:shadow-cyan-500/70',
      link: '/services/water',
      buttonStyle: 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-500 border-b-blue-800 shadow-cyan-200 group-hover:shadow-cyan-400'
    },
    {
      id: 4,
      nameKey: 'services.wasteManagement',
      descriptionKey: 'services.wasteManagementDesc',
      icon: Trash2,
      gradient: 'from-emerald-500 to-green-600',
      shadowColor: 'hover:shadow-emerald-500/70',
      link: '/services/waste',
      buttonStyle: 'bg-gradient-to-r from-emerald-500 to-green-600 border-emerald-500 border-b-emerald-800 shadow-emerald-200 group-hover:shadow-emerald-400'
    },
    {
      id: 5,
      nameKey: 'services.municipalGrievance',
      descriptionKey: 'services.municipalGrievanceDesc',
      icon: FileText,
      gradient: 'from-teal-500 to-emerald-600',
      shadowColor: 'hover:shadow-teal-500/70',
      link: '/services/grievance',
      buttonStyle: 'bg-gradient-to-r from-teal-500 to-emerald-600 border-teal-500 border-b-teal-800 shadow-teal-200 group-hover:shadow-teal-400'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      {/* Animated Background Bubbles & Waves */}
      <AnimatedBackground />

      <div id="welcome-tour-step"></div>
      <div id="search-tour-step">
        <NavBar />
      </div>

      {/* SUVIDHA Services Header - Enhanced Aesthetic */}
      <PageHeader
        title={t('services.title')}
        description={t('services.desc')}
        to={user ? "/dashboard" : "/"}
        backText={user ? t('nav.backToDashboard') : t('common.back')}
        watermarkIcon={Zap}
      />

      {/* Main Services Grid */}
      <section className="py-12 px-4 sm:px-6 mb-12 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => navigate(service.link)}
                  className={`group relative h-96 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl transition-[transform,box-shadow] ${service.shadowColor.replace('shadow-', 'shadow-[0_0_40px_rgba(').replace('70', '0.3)]')}`}
                >
                  {/* Decorative Wave & Bubbles */}
                  <div className={`absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity ease-out`} />
                  <div className={`absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-gradient-to-tr ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity ease-out`} />
                  <svg className={`absolute bottom-0 left-0 w-full h-24 text-gray-900/5 group-hover:text-gray-900/10 transition-colors pointer-events-none`} viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,256L48,245.3C96,235,192,213,288,192C384,171,480,149,576,160C672,171,768,213,864,229.3C960,245,1056,235,1152,224C1248,213,1344,203,1392,197.3L1440,192V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"></path>
                  </svg>

                  <div className="relative h-full p-8 pb-12 flex flex-col justify-between z-10 text-left">
                    <div>
                      {/* Icon Box */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-shadow`}>
                        <Icon size={36} className="text-white drop-shadow-md" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-colors">
                        {t(service.nameKey)}
                      </h3>
                      <p className="text-gray-500 font-medium text-lg leading-relaxed line-clamp-3">
                        {t(service.descriptionKey)}
                      </p>
                    </div>

                    {/* Action Footer */}
                    <div className={`w-full mt-6 py-3 px-4 border border-b-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all group-active:border-b-0 group-active:translate-y-1 ${service.buttonStyle}`}>
                      <span>{t('services.viewServices')}</span>
                      <ArrowRight size={18} className="text-white/90" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -ml-24 -mb-24"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t('cta.readyToStart')}
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              {t('cta.joinMillions')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 transition-transform"
              >
                {t('auth.createaccount')}
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg backdrop-blur-sm transition-colors">
                {t('hero.learnmore')}
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ServicesOffered;
