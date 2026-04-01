import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enAdmin from './locales/en/admin.json';
import arAdmin from './locales/ar/admin.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { admin: enAdmin },
      ar: { admin: arAdmin },
    },
    fallbackLng: 'en',
    defaultNS: 'admin',
    ns: ['admin'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: [],
    },
  });

export default i18n;
