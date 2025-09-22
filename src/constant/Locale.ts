import { I18nManager, Platform } from 'react-native';

export type Languages =
  | 'en'
  | 'ar'
  | 'es'
  | 'fr'
  | 'ur'
  | 'sq'
  | 'am'
  | 'my'
  | 'zh'
  | 'km'
  | 'de'
  | 'gu'
  | 'he'
  | 'hi'
  | 'hu'
  | 'id'
  | 'it'
  | 'ja'
  | 'ko'
  | 'ku'
  | 'mn'
  | 'ne'
  | 'fa'
  | 'pt'
  | 'ru'
  | 'sr'
  | 'te'
  | 'th'
  | 'tr';

export const RTL_LOCALE = 'RTL';

export const { isRTL } = I18nManager;

export const allowedLanguagesList: Languages[] = [
  'en',
  'ar',
  'es',
  'fr',
  'ur',
  'sq',
  'am',
  'my',
  'zh',
  'km',
  'de',
  'gu',
  'he',
  'hi',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'ku',
  'mn',
  'ne',
  'fa',
  'pt',
  'ru',
  'sr',
  'te',
  'th',
  'tr',
];

export const defaultLanguage: Languages = 'en';

export function checkLanguage(language: Languages): Languages {
  if (allowedLanguagesList.includes(language)) {
    return language as Languages;
  }

  return defaultLanguage;
}

export const isIOS: boolean = Platform.OS === 'ios';
interface LanguageMappings {
  [key: string]: string;
}

export const languageMappings: LanguageMappings = {
  en: 'Garage:english',
  ar: 'Garage:arabic',
  es: 'Garage:spanish',
  fr: 'Garage:french',
  ur: 'Garage:urdu',
  sq: 'Garage:albanian',
  am: 'Garage:amharic',
  my: 'Garage:burmese',
  zh: 'Garage:chinese',
  km: 'Garage:cambodian',
  de: 'Garage:german',
  gu: 'Garage:gujarati',
  he: 'Garage:hebrew',
  hi: 'Garage:hindi',
  hu: 'Garage:hungarian',
  id: 'Garage:indonesian',
  it: 'Garage:italian',
  ja: 'Garage:japanese',
  ko: 'Garage:korean',
  ku: 'Garage:kurdish',
  mn: 'Garage:mongolian',
  ne: 'Garage:nepali',
  fa: 'Garage:persian',
  pt: 'Garage:portuguese',
  ru: 'Garage:russian',
  sr: 'Garage:serbian',
  te: 'Garage:telugu',
  th: 'Garage:thai',
  tr: 'Garage:turkish',
};

export const Maps: LanguageMappings = {
  carto: 'Garage:carto_bae_map',
  googleTerrain: 'Garage:open_Street_Map',
  googleSatellite: 'Garage:google_Terrain',
  googleHybrid: 'Garage:google_Satellite',
  googleRoad: 'Garage:open_Hybrid',
  openRoad: 'Garage:open_Road',
};
