import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import th from './locales/th';

const storedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem('khiw_language') : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    th: { translation: th },
  },
  lng: storedLanguage === 'th' ? 'th' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

const syncDocumentLanguage = (language: string) => {
  if (typeof document !== 'undefined') document.documentElement.lang = language;
  if (typeof window !== 'undefined') window.localStorage.setItem('khiw_language', language);
};

syncDocumentLanguage(i18n.language);
i18n.on('languageChanged', syncDocumentLanguage);

export default i18n;
