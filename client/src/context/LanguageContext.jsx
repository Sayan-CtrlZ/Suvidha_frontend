import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, languagesByRegion, regionLabels, getLanguageInfo, isRTL as checkRTL } from '../utils/i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  
  const language = i18n.language;
  const currentLanguage = getLanguageInfo(language);
  const isRTL = checkRTL(language);

  // Handle RTL and language attribute
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  // Change language
  const setLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        currentLanguage,
        languages,
        languagesByRegion,
        regionLabels,
        isRTL
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default LanguageContext;
