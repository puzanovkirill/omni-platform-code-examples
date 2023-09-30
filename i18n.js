/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next';
import { sharedRu, sharedEn } from '@3divi/shared-components';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, ru } from './locales';

const detectionOption = {
  // order and from where user language should be detected
  order: ['navigator'],

  // keys or params to lookup language from
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true,
};
const languageDetector = new LanguageDetector(null, detectionOption);
const options = {
  interpolation: {
    escapeValue: false, // not needed for react
  },
  resources: {
    en: {
      common: en.common,
      components: en.components,
      pages: en.pages,
      shared: sharedEn,
    },
    ru: {
      common: ru.common,
      components: ru.components,
      pages: ru.pages,
      shared: sharedRu,
    },
  },
  fallbackLng: 'en',
  ns: ['common', 'components', 'pages', 'shared'],
  defaultNS: 'common',
  initImmediate: false,
  fallbackNS: 'shared',
};

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(options);

export default i18n;
