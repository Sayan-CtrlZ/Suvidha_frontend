import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MinusCircle, Circle, PlusCircle, ChevronDown, Globe, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const TopBar = () => {
  const { language, setLanguage, t, languages, currentLanguage } = useLanguage();
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
    <div className="bg-gradient-to-r from-green-600 via-white to-orange-500 text-gray-900 w-full relative">
      {/* Skip to Content - Accessible link that appears on focus */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-700 focus:text-white focus:px-4 focus:py-2 focus:font-bold focus:rounded-br-lg focus:shadow-lg focus:outline-none"
      >
        {t('accessibility.skipToContent')}
      </a>
      
      <div className="w-full px-4 py-1">
        <div className="flex justify-between items-center text-xs font-semibold">
          <div className="flex items-center gap-3">
            <span className="text-gray-800">🇮🇳 {t('footer.govOfIndia')}</span>
            <span className="text-gray-400">|</span>
            <a 
              href="tel:08149203888"
              className="flex items-center gap-1 hover:text-green-800 transition"
            >
              <Phone size={14} />
              <span className="text-gray-900">08149203888</span>
            </a>
            <span className="text-gray-400">|</span>
            <a 
              href="tel:8904085030"
              className="flex items-center gap-1 hover:text-green-800 transition"
            >
              <Phone size={14} />
              <span className="text-gray-900">8904085030</span>
            </a>
            <span className="text-gray-400">|</span>
            <a 
              href="mailto:ONEHELPDESK@SUVIDHA.GOV.IN"
              className="flex items-center gap-1 hover:text-green-800 transition"
            >
              <Mail size={14} />
              <span className="text-gray-900">ONEHELPDESK@SUVIDHA.GOV.IN</span>
            </a>
            <span className="text-gray-400">|</span>
            <span className="text-gray-800">📅 {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href="#main-content" 
              className="hover:text-green-800 transition text-gray-900 focus:underline"
              title="Skip navigation and go to main content"
            >
              {t('accessibility.skipToContent')}
            </a>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => {
                // Toggle high contrast or announce screen reader mode
                alert('Screen Reader Access: This website is optimized for screen readers. Use Tab to navigate, Enter to select.');
              }}
              className="hover:text-green-800 transition text-gray-900 focus:underline"
              title="Screen Reader Access Information"
            >
              {t('accessibility.screenReader')}
            </button>
            <span className="text-gray-400">|</span>
            <a href="/signin" className="hover:text-green-800 transition text-gray-900 uppercase">{t('nav.signIn')}</a>
            <span className="text-gray-400">|</span>
            <a href="/signup" className="hover:text-green-800 transition text-gray-900 uppercase">{t('nav.signUp')}</a>
            <span className="text-gray-400">|</span>
            <div className="flex items-center gap-0.5">
              <button 
                onClick={handleDecreaseFontSize}
                className="hover:text-green-800 text-gray-900 transition"
                title={t('accessibility.decrease')}
              >
                <MinusCircle size={14} />
              </button>
              <button 
                onClick={handleResetFontSize}
                className="hover:text-green-800 text-gray-900 transition"
                title={t('accessibility.reset')}
              >
                <Circle size={14} />
              </button>
              <button 
                onClick={handleIncreaseFontSize}
                className="hover:text-green-800 text-gray-900 transition"
                title={t('accessibility.increase')}
              >
                <PlusCircle size={14} />
              </button>
            </div>
            <span className="text-gray-400">|</span>
            {/* Language Selector Button */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="flex items-center gap-1 hover:text-green-800 transition text-xs font-semibold text-gray-900"
              >
                <Globe size={14} />
                <span>{currentLanguage?.nativeName || 'English'}</span>
                <ChevronDown size={12} />
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
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg hover:-translate-y-0.5 ${
                      language === lang.code
                        ? 'border-green-600 bg-green-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <span className={`block text-lg font-bold ${
                      language === lang.code ? 'text-green-700' : 'text-gray-900'
                    }`}>
                      {lang.nativeName}
                    </span>
                    <span className={`block text-sm ${
                      language === lang.code ? 'text-green-600' : 'text-gray-500'
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
