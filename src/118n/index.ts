// import 'intl-pluralrules';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locale';
import {
  Languages,
  allowedLanguagesList,
  checkLanguage,
  defaultLanguage,
} from '@constant';

export const i18nLanguages = Object.keys(resources);

export const initializeTranslations = async (language: Languages) => {
  const lng = checkLanguage(language);

  return i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        // am: resources.am,
        ar: resources.ar,
        // de: resources.de,
        en: resources.en,
        // es: resources.es,
        // fa: resources.fa,
        // fr: resources.fr,
        // gu: resources.gu,
        // he: resources.he,
        // hi: resources.hi,
        // hu: resources.hu,
        // id: resources.id,
        // it: resources.it,
        // ja: resources.ja,
        // km: resources.km,
        // ko: resources.ko,
        // ku: resources.ku,
        // mn: resources.mn,
        // my: resources.my,
        // ne: resources.ne,
        // pt: resources.pt,
        // ru: resources.ru,
        // sq: resources.sq,
        // sr: resources.sr,
        // te: resources.te,
        // th: resources.th,
        // tr: resources.tr,
        // ur: resources.ur,
        // zh: resources.zh,
      },
      lng,
      fallbackLng: defaultLanguage,
      supportedLngs: allowedLanguagesList,
      defaultNS: 'auth',
      react: {
        useSuspense: true,
      },
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
};
