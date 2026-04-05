import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
import enAdmin from './locales/en/admin.json';
import arAdmin from './locales/ar/admin.json';

const resources = {
  en: {
    admin: enAdmin,
  },
  ar: {
    admin: arAdmin,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    
    // We already use ContentContext for most landing page content,
    // so we'll use i18next primarily for admin dashboard and static UI elements first
    defaultNS: 'admin',
    
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language', // Match the key used in ContentContext
    },
  });

export default i18n;
