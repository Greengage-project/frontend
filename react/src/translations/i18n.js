import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import store from 'store';
import TRANSLATIONS_EN from './en';
import TRANSLATIONS_ES from './es';
import TRANSLATIONS_LV from './lv';
import TRANSLATIONS_IT from './it';
import TRANSLATIONS_NL from './nl';
import TRANSLATIONS_DA from './da';
import { ALLOWED_LANGUAGES, DEFAULT_LANGUAGE } from '../configuration';

export const LANGUAGES = [
  ...ALLOWED_LANGUAGES.includes('en') ? [
    {
      label: 'English',
      value: 'en',
    }
  ] : [],
  ...ALLOWED_LANGUAGES.includes('es') ? [
    {
      label: 'Español',
      value: 'es',
    }
  ] : [],
  ...ALLOWED_LANGUAGES.includes('lv') ? [
    {
      label: 'Latviešu',
      value: 'lv',
    }
  ] : [],
  ...ALLOWED_LANGUAGES.includes('it') ? [
    {
      label: 'Italiano',
      value: 'it',
    }
  ] : [],
  ...ALLOWED_LANGUAGES.includes('nl') ? [
    {
      label: 'Dutch',
      value: 'nl',
    }
  ] : [],
  ...ALLOWED_LANGUAGES.includes('da') ? [
    {
      label: 'Danish',
      value: 'da',
    }
  ] : [],
];

export const setLanguage = (language) => {
  if (ALLOWED_LANGUAGES.includes(language)) {
    console.log(`Setting ${language} language`);
    store.set('language', language);
    i18n.changeLanguage(language);
    window.location.reload();
    // axiosInstance.defaults.headers['Accept-Language'] = language;
  } else {
    console.error('Language', language, 'not supported. Only:', ALLOWED_LANGUAGES);
  }
};

export const getLanguage = () => store.get('language', DEFAULT_LANGUAGE);

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: TRANSLATIONS_ES,
      },
      en: {
        translation: TRANSLATIONS_EN,
      },
      it: {
        translation: TRANSLATIONS_IT,
      },
      lv: {
        translation: TRANSLATIONS_LV,
      },
      nl: {
        translation: TRANSLATIONS_NL,
      },
      da: {
        translation: TRANSLATIONS_DA,
      },
    },
    lng: getLanguage(), // if you're using a language detector, do not define the lng option
    returnEmptyString: false,
    fallbackLng: 'en',
    debug: false,
  });

export default i18n;
