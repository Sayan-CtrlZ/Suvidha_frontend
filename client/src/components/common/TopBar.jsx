import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MinusCircle, Circle, PlusCircle, ChevronDown, Globe, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const TopBar = () => {
  const { language, setLanguage, t, languages, currentLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    // Get saved font size from localStorage or default to 1 (normal)
    return parseFloat(localStorage.getItem('fontSize')) || 1;
  });

  // Apply font size to document root
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize * 16}px`;
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsLanguageModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isLanguageModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLanguageModalOpen]);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsLanguageModalOpen(false);
  };

  const handleDecreaseFontSize = () => {
    setFontSize(prev => Math.max(0.75, prev - 0.1)); // Min 75%, decrease by 10%
  };

  const handleResetFontSize = () => {
    setFontSize(1); // Reset to normal (100%)
  };

  const handleIncreaseFontSize = () => {
    setFontSize(prev => Math.min(1.5, prev + 0.1)); // Max 150%, increase by 10%
  };

  return (
    <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border-b border-gray-200 text-gray-800 w-full relative">
      <div className="w-full px-4 py-1">
        <div className="flex justify-between items-center text-sm font-bold">
          <div className="flex items-center gap-3">
            <span className="text-gray-800 text-sm">🇮🇳 {t('footer.govOfIndia')}</span>
            <span className="text-gray-300">|</span>
            <a
              href="tel:08149203888"
              className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 border border-gray-200 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-[#138808]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-lg" />
              <Phone size={16} className="relative z-10 transition-colors group-hover:text-[#138808]" />
              <span className="text-gray-900 text-sm relative z-10 transition-colors group-hover:text-[#138808]">08149203888</span>
            </a>
            <span className="text-gray-300 hidden xl:inline">|</span>
            <a
              href="mailto:support@suvidha.gov.in"
              className="group relative hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 border border-gray-200 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-[#138808]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-lg" />
              <Mail size={16} className="relative z-10 transition-colors group-hover:text-[#138808]" />
              <span className="text-gray-900 text-sm relative z-10 transition-colors group-hover:text-[#138808]">support@suvidha.gov.in</span>
            </a>
            <span className="text-gray-300 hidden lg:inline">|</span>
            <span className="text-gray-700 hidden lg:inline text-xs">📅 {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Skip to Content - Now on Right Side */}
            <a
              href="#main-content"
              className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/50 border border-gray-200 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-[#138808]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-lg" />
              <span className="text-gray-900 text-xs relative z-10 transition-colors group-hover:text-[#138808]">{t('accessibility.skipToContent')}</span>
            </a>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => {
                alert('Screen Reader Access: This website is optimized for screen readers. Use Tab to navigate, Enter to select.');
              }}
              className="group relative px-3 py-1.5 rounded-lg bg-white/50 border border-gray-200 shadow-sm text-gray-800 text-sm focus:underline transition-all duration-400 hover:scale-105 active:scale-95"
              title="Screen Reader Access Information"
            >
              <div className="absolute inset-0 bg-[#138808]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-lg" />
              <span className="relative z-10 transition-colors group-hover:text-[#138808]">{t('accessibility.screenReader')}</span>
            </button>
            <div className="flex items-center gap-0.5 bg-white/50 rounded-lg border border-gray-200 p-0.5">
              <button
                onClick={handleDecreaseFontSize}
                className="group relative p-1.5 rounded-md text-gray-800 transition-all duration-400 hover:bg-white"
                title={t('accessibility.decrease')}
              >
                <MinusCircle size={16} className="relative z-10 transition-colors group-hover:text-[#138808]" />
              </button>
              <button
                onClick={handleResetFontSize}
                className="group relative p-1.5 rounded-md text-gray-800 transition-all duration-400 hover:bg-white"
                title={t('accessibility.reset')}
              >
                <Circle size={14} className="relative z-10 transition-colors group-hover:text-[#138808]" />
              </button>
              <button
                onClick={handleIncreaseFontSize}
                className="group relative p-1.5 rounded-md text-gray-800 transition-all duration-400 hover:bg-white"
                title={t('accessibility.increase')}
              >
                <PlusCircle size={16} className="relative z-10 transition-colors group-hover:text-[#138808]" />
              </button>
            </div>
            <span className="text-gray-300">|</span>
            {/* Language Selector Button */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/50 border border-gray-200 shadow-sm transition-all duration-400 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-[#138808]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-lg" />
                <Globe size={16} className="relative z-10 transition-colors group-hover:text-[#138808]" />
                <span className="text-xs font-bold text-gray-900 relative z-10 transition-colors group-hover:text-[#138808]">{currentLanguage?.nativeName || 'English'}</span>
                <ChevronDown size={14} className="relative z-10 transition-colors group-hover:text-[#138808]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Language Selection Modal */}
      {isLanguageModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsLanguageModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe size={24} className="text-white" />
                <h2 className="text-xl font-bold text-white">{t('common.selectLanguage')}</h2>
              </div>
              <button
                onClick={() => setIsLanguageModalOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Languages Grid */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`p-4 rounded-xl border-2 transition-colors text-left ${language === lang.code
                      ? 'border-green-600 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-green-300'
                      }`}
                  >
                    <span className={`block text-lg font-bold ${language === lang.code ? 'text-green-700' : 'text-gray-900'
                      }`}>
                      {lang.nativeName}
                    </span>
                    <span className={`block text-sm ${language === lang.code ? 'text-green-600' : 'text-gray-500'
                      }`}>
                      {lang.name}
                    </span>
                    {language === lang.code && (
                      <div className="mt-2 flex items-center gap-1 text-green-600 text-xs font-semibold">
                        <span className="w-2 h-2 bg-green-600 rounded-full shrink-0"></span>
                        <span className="truncate">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
