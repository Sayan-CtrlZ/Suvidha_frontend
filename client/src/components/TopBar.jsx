import React, { useState, useEffect } from 'react';
import { Phone, Mail, MinusCircle, Circle, PlusCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TopBar = () => {
  const { language, setLanguage } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    // Get saved font size from localStorage or default to 1 (normal)
    return parseFloat(localStorage.getItem('fontSize')) || 1;
  });

  // Apply font size to document root
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize * 16}px`;
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'regional', name: 'आञ्चलिक' },
  ];

  const currentLang = languages.find(l => l.code === language)?.name || 'English';

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsLanguageDropdownOpen(false);
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
    <div className="bg-green-500 text-gray-50 w-full">
      <div className="w-full px-6 py-2">
        <div className="flex justify-between items-center text-sm font-semibold">
          <div className="flex items-center gap-4">
            <a 
              href="tel:08149203888"
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Phone size={18} />
              <span className="text-gray-50">08149203888/8904085030</span>
            </a>
            <a 
              href="mailto:ONEHELPDESK@SUVIDHA.GOV.IN"
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Mail size={18} />
              <span className="text-gray-50">ONEHELPDESK@SUVIDHA.GOV.IN</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/signin" className="hover:text-gray-900 transition text-gray-50">SIGN IN</a>
            <span className="text-gray-50">|</span>
            <a href="/signup" className="hover:text-gray-900 transition text-gray-50">SIGN UP</a>
            <span className="text-gray-50">|</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={handleDecreaseFontSize}
                className="hover:text-gray-900 text-gray-50 transition"
                title="Decrease Font Size"
              >
                <MinusCircle size={18} />
              </button>
              <button 
                onClick={handleResetFontSize}
                className="hover:text-gray-900 text-gray-50 transition"
                title="Reset Font Size"
              >
                <Circle size={18} />
              </button>
              <button 
                onClick={handleIncreaseFontSize}
                className="hover:text-gray-900 text-gray-50 transition"
                title="Increase Font Size"
              >
                <PlusCircle size={18} />
              </button>
            </div>
            <span className="text-gray-50">|</span>
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="hover:text-gray-900 transition text-sm font-semibold text-gray-50"
              >
                {currentLang}
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-green-600 rounded-lg shadow-lg z-50 border border-green-400">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 transition text-sm font-medium ${
                        language === lang.code
                          ? 'bg-green-700 text-gray-50'
                          : 'bg-green-600 text-gray-50 hover:bg-green-700'
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
