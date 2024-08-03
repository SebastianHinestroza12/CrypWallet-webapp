import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useStoreCrypto } from '../stores/cryptocurrencies';
import esTranslation from '../langs/es/es.json';
import enTranslation from '../langs/en/en.json';
import frTranslation from '../langs/fr/fr.json';
import itTranslation from '../langs/it/it.json';
import deTranslation from '../langs/de/de.json';
import ruTranslation from '../langs/ru/ru.json';
import zhTranslation from '../langs/zh/zh.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  it: {
    translation: itTranslation,
  },
  de: {
    translation: deTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
};

const selectedLanguage = useStoreCrypto.getState().appLanguage;

i18n.use(initReactI18next).init({
  resources,
  lng: selectedLanguage,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
