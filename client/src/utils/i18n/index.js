import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import en from './locales/en.json';
import hi from './locales/hi.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import bn from './locales/bn.json';
import mr from './locales/mr.json';
import gu from './locales/gu.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import pa from './locales/pa.json';
import or from './locales/or.json';
import as from './locales/as.json';
import ur from './locales/ur.json';

// All supported languages with metadata
export const languages = [
  // National
  { code: 'en', name: 'English', nativeName: 'English', region: 'National' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'North' },
  
  // South India
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'South' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'South' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'South' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'South' },
  
  // East India
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'East' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'East' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', region: 'East' },
  
  // West India
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'West' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'West' },
  
  // North India
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'North' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', region: 'North', rtl: true },
];

// Group languages by region
export const languagesByRegion = {
  'National': languages.filter(l => l.region === 'National'),
  'North': languages.filter(l => l.region === 'North'),
  'South': languages.filter(l => l.region === 'South'),
  'East': languages.filter(l => l.region === 'East'),
  'West': languages.filter(l => l.region === 'West'),
};

// Region labels with emojis
export const regionLabels = {
  'National': '🌐 National',
  'North': '🏔️ उत्तर (North)',
  'South': '🌴 दक्षिण (South)',
  'East': '🌊 पूर्व (East)',
  'West': '🏜️ पश्चिम (West)',
};

// Resources object for i18next
const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ta: { translation: ta },
  te: { translation: te },
  bn: { translation: bn },
  mr: { translation: mr },
  gu: { translation: gu },
  kn: { translation: kn },
  ml: { translation: ml },
  pa: { translation: pa },
  or: { translation: or },
  as: { translation: as },
  ur: { translation: ur },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'suvidha-language',
      caches: ['localStorage'],
    },
  });

// Helper to check if current language is RTL
export const isRTL = (langCode) => {
  return languages.find(l => l.code === langCode)?.rtl || false;
};

// Get language info by code
export const getLanguageInfo = (langCode) => {
  return languages.find(l => l.code === langCode) || languages[0];
};

export default i18n;
