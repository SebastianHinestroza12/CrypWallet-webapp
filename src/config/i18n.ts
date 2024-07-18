import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslation from '../langs/es/es.json';
import enTranslation from '../langs/en/en.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;