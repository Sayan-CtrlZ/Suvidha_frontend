import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const QuickActionCard = ({ icon: Icon, title, description, ctaText, variant = 'default' }) => {
  const { t } = useLanguage();
  const baseStyles = "p-6 sm:p-8 rounded-2xl border transition duration-300 flex flex-col items-center justify-center text-center min-h-64 sm:min-h-72 flex-1";

  const variants = {
    default: "bg-white/40 backdrop-blur-md border-white/60 hover:bg-white/50 hover:shadow-lg",
    primary: "bg-gradient-to-br from-blue-500 to-indigo-600 border-white/30 text-white hover:shadow-xl hover:from-blue-600 hover:to-indigo-700",
    secondary: "bg-gradient-to-br from-emerald-500 to-teal-600 border-white/30 text-white hover:shadow-xl hover:from-emerald-600 hover:to-teal-700",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]}`}>
      <div className={`mb-4 ${variant === 'default' ? 'text-blue-600' : 'text-white'}`}>
        <Icon size={40} className="mx-auto" />
      </div>
      <h3 className={`text-lg sm:text-xl font-bold mb-2 ${variant === 'default' ? 'text-gray-900' : 'text-white'}`}>
        {title}
      </h3>
      <p className={`text-sm mb-6 ${variant === 'default' ? 'text-gray-600' : 'text-white/90'}`}>
        {description}
      </p>
      <button
        className={`px-6 py-2 rounded-lg font-semibold text-sm transition ${
          variant === 'default'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-white text-blue-600 hover:bg-gray-100'
        }`}
      >
        {ctaText}
      </button>
    </div>
  );
};

export default QuickActionCard;
