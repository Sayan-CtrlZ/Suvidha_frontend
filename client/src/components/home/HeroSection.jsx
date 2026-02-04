import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import emblem from '../../assets/emblem.png';
import logo from '../../assets/logo.png';
import banner from '../../assets/banner.png';

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="w-full relative bg-white">
      {/* Background banner with opacity */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      ></div>
      
      {/* Government Header */}
      <div className="w-full relative" style={{ zIndex: 1 }}>
        <div className="w-full px-2 sm:px-6 py-3 sm:py-10">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3">
            {/* SUVIDHA Logo */}
            <div className="flex items-center gap-2 sm:gap-3 hidden sm:flex">
              <div className="w-14 sm:w-40 h-14 sm:h-40">
                <img src={logo} alt="SUVIDHA Logo" draggable="false" className="w-full h-full object-contain pointer-events-none select-none" />
              </div>
            </div>

            {/* Center Branding */}
            <div className="text-center flex-1 px-1 sm:px-4">
              <div className="text-[10px] sm:text-sm text-gray-900 mb-0.5 font-bold tracking-tight sm:tracking-wide">{t('hero.govOfIndia')}</div>
              <h1 className="text-sm sm:text-3xl md:text-7xl font-black leading-tight sm:leading-normal">
                <span 
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #FF6B00 0%, #00A651 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                    paddingBottom: '2px'
                  }}
                >
                  SUVIDHA
                </span>
              </h1>
              <div className="text-[10px] sm:text-sm text-gray-900 mt-0.5 sm:mt-1 font-bold tracking-tight sm:tracking-wide">{t('hero.govInitiative')}</div>
            </div>

            {/* SUVIDHA Emblem */}
            <div className="w-14 sm:w-40 h-14 sm:h-40 hidden sm:block">
              <img src={emblem} alt="SUVIDHA Emblem" draggable="false" className="w-full h-full object-contain pointer-events-none select-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
