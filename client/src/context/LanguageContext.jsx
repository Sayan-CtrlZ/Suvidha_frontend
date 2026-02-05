import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { languages, getLanguageInfo, isRTL as checkRTL } from '../utils/i18n';

/**
 * Context for managing language and translations across the application
 * @type {React.Context}
 */
const LanguageContext = createContext();

/**
 * Language Provider Component
 * Provides language state and translation functions to all child components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component
 */
export const LanguageProvider = ({ children }) => {
  const { t, i18n } = useTranslation();

  const language = i18n.language;
  const currentLanguage = getLanguageInfo(language);
  const isRTL = checkRTL(language);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  /**
   * Change the application language
   * @param {string} code - Language code (e.g., 'en', 'hi', 'ta')
   */
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
        isRTL
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to access language context
 * @returns {Object} Language context value
 * @throws {Error} If used outside LanguageProvider
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default LanguageContext;
