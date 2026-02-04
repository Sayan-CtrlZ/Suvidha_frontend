import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = ({ compact = false }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'regional', name: 'आञ्चलिक', flag: '📍' },
  ];

  const currentLang = languages.find(l => l.code === language);

  if (compact) {
    return (
      <div className="flex items-center gap-1 bg-white/40 backdrop-blur-md rounded-lg border border-white/60 p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`
              px-2 md:px-3 py-1 md:py-2 rounded text-xs md:text-sm font-semibold transition
              ${
                language === lang.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }
            `}
            title={lang.name}
          >
            <span className="hidden sm:inline">{lang.flag}</span>
            <span className="sm:hidden">{lang.name.substring(0, 2)}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition text-sm md:text-base font-medium"
      >
        <Globe size={18} />
        <span className="hidden md:inline">{currentLang?.name}</span>
        <span className="md:hidden">{currentLang?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center justify-between transition text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                <span className="text-gray-700">{lang.name}</span>
              </div>
              {language === lang.code && <Check size={18} className="text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
