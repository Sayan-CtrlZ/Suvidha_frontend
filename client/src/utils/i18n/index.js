import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English
import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enServices from './locales/en/services.json';
import enDashboard from './locales/en/dashboard.json';
import enAdmin from './locales/en/admin.json';

// Hindi
import hiCommon from './locales/hi/common.json';
import hiAuth from './locales/hi/auth.json';
import hiServices from './locales/hi/services.json';
import hiDashboard from './locales/hi/dashboard.json';
import hiAdmin from './locales/hi/admin.json';

// Tamil
import taCommon from './locales/ta/common.json';
import taAuth from './locales/ta/auth.json';
import taServices from './locales/ta/services.json';
import taDashboard from './locales/ta/dashboard.json';
import taAdmin from './locales/ta/admin.json';

// Telugu
import teCommon from './locales/te/common.json';
import teAuth from './locales/te/auth.json';
import teServices from './locales/te/services.json';
import teDashboard from './locales/te/dashboard.json';
import teAdmin from './locales/te/admin.json';

// Bengali
import bnCommon from './locales/bn/common.json';
import bnAuth from './locales/bn/auth.json';
import bnServices from './locales/bn/services.json';
import bnDashboard from './locales/bn/dashboard.json';
import bnAdmin from './locales/bn/admin.json';

// Marathi
import mrCommon from './locales/mr/common.json';
import mrAuth from './locales/mr/auth.json';
import mrServices from './locales/mr/services.json';
import mrDashboard from './locales/mr/dashboard.json';
import mrAdmin from './locales/mr/admin.json';

// Gujarati
import guCommon from './locales/gu/common.json';
import guAuth from './locales/gu/auth.json';
import guServices from './locales/gu/services.json';
import guDashboard from './locales/gu/dashboard.json';
import guAdmin from './locales/gu/admin.json';

// Kannada
import knCommon from './locales/kn/common.json';
import knAuth from './locales/kn/auth.json';
import knServices from './locales/kn/services.json';
import knDashboard from './locales/kn/dashboard.json';
import knAdmin from './locales/kn/admin.json';

// Malayalam
import mlCommon from './locales/ml/common.json';
import mlAuth from './locales/ml/auth.json';
import mlServices from './locales/ml/services.json';
import mlDashboard from './locales/ml/dashboard.json';
import mlAdmin from './locales/ml/admin.json';

// Punjabi
import paCommon from './locales/pa/common.json';
import paAuth from './locales/pa/auth.json';
import paServices from './locales/pa/services.json';
import paDashboard from './locales/pa/dashboard.json';
import paAdmin from './locales/pa/admin.json';

// Odia
import orCommon from './locales/or/common.json';
import orAuth from './locales/or/auth.json';
import orServices from './locales/or/services.json';
import orDashboard from './locales/or/dashboard.json';
import orAdmin from './locales/or/admin.json';

// Assamese
import asCommon from './locales/as/common.json';
import asAuth from './locales/as/auth.json';
import asServices from './locales/as/services.json';
import asDashboard from './locales/as/dashboard.json';
import asAdmin from './locales/as/admin.json';

// Urdu
import urCommon from './locales/ur/common.json';
import urAuth from './locales/ur/auth.json';
import urServices from './locales/ur/services.json';
import urDashboard from './locales/ur/dashboard.json';
import urAdmin from './locales/ur/admin.json';

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

const en = { ...enCommon, ...enAuth, ...enServices, ...enDashboard, ...enAdmin };
const hi = { ...hiCommon, ...hiAuth, ...hiServices, ...hiDashboard, ...hiAdmin };
const ta = { ...taCommon, ...taAuth, ...taServices, ...taDashboard, ...taAdmin };
const te = { ...teCommon, ...teAuth, ...teServices, ...teDashboard, ...teAdmin };
const bn = { ...bnCommon, ...bnAuth, ...bnServices, ...bnDashboard, ...bnAdmin };
const mr = { ...mrCommon, ...mrAuth, ...mrServices, ...mrDashboard, ...mrAdmin };
const gu = { ...guCommon, ...guAuth, ...guServices, ...guDashboard, ...guAdmin };
const kn = { ...knCommon, ...knAuth, ...knServices, ...knDashboard, ...knAdmin };
const ml = { ...mlCommon, ...mlAuth, ...mlServices, ...mlDashboard, ...mlAdmin };
const pa = { ...paCommon, ...paAuth, ...paServices, ...paDashboard, ...paAdmin };
const or = { ...orCommon, ...orAuth, ...orServices, ...orDashboard, ...orAdmin };
const as = { ...asCommon, ...asAuth, ...asServices, ...asDashboard, ...asAdmin };
const ur = { ...urCommon, ...urAuth, ...urServices, ...urDashboard, ...urAdmin };

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
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'suvidha-language',
      caches: ['localStorage'],
    },
  });

export const isRTL = (langCode) => {
  return languages.find(l => l.code === langCode)?.rtl || false;
};

export const getLanguageInfo = (langCode) => {
  return languages.find(l => l.code === langCode) || languages[0];
};

export default i18n;
