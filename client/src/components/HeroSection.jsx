import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import emblem from '../assets/emblem.png';
import logo from '../assets/logo.png';
import banner from '../assets/banner.png';

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
        <div className="w-full px-6 py-10">
          <div className="flex justify-between items-center">
            {/* SUVIDHA Logo */}
            <div className="flex items-center gap-3">
              <div className="w-40 h-40">
                <img src={logo} alt="SUVIDHA Logo" draggable="false" className="w-full h-full object-contain pointer-events-none select-none" />
              </div>
            </div>

            {/* Center Branding */}
            <div className="text-center flex-1 px-4">
              <div className="text-sm text-gray-900 mb-1 font-bold tracking-wide">GOVERNMENT OF INDIA</div>
              <h1 className="text-3xl md:text-7xl font-black">
                <span 
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #FF6B00 0%, #00A651 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                    paddingBottom: '4px'
                  }}
                >
                  SUVIDHA
                </span>
              </h1>
              <div className="text-sm text-gray-900 mt-1 font-bold tracking-wide">A GOVERNMENT OF INDIA INITIATIVE</div>
            </div>

            {/* SUVIDHA Emblem */}
            <div className="w-40 h-40">
              <img src={emblem} alt="SUVIDHA Emblem" draggable="false" className="w-full h-full object-contain pointer-events-none select-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
