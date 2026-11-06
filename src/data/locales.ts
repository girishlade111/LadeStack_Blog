export const SUPPORTED_LOCALES = [
  'en',
  'ja',
  'ko',
  'zh',
  'ru',
  'tr',
  'fr',
  'pt',
  'es',
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleInfo {
  code: Locale;
  nativeName: string;
  englishName: string;
  htmlLang: string;
  dateLocale: string;
  prefix: string;
}

export const LOCALE_REGISTRY: Record<Locale, LocaleInfo> = {
  en: {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    htmlLang: 'en',
    dateLocale: 'en-US',
    prefix: '',
  },
  ja: {
    code: 'ja',
    nativeName: '日本語',
    englishName: 'Japanese',
    htmlLang: 'ja',
    dateLocale: 'ja-JP',
    prefix: '/ja',
  },
  ko: {
    code: 'ko',
    nativeName: '한국어',
    englishName: 'Korean',
    htmlLang: 'ko',
    dateLocale: 'ko-KR',
    prefix: '/ko',
  },
  zh: {
    code: 'zh',
    nativeName: '中文',
    englishName: 'Chinese',
    htmlLang: 'zh',
    dateLocale: 'zh-CN',
    prefix: '/zh',
  },
  ru: {
    code: 'ru',
    nativeName: 'Русский',
    englishName: 'Russian',
    htmlLang: 'ru',
    dateLocale: 'ru-RU',
    prefix: '/ru',
  },
  tr: {
    code: 'tr',
    nativeName: 'Türkçe',
    englishName: 'Turkish',
    htmlLang: 'tr',
    dateLocale: 'tr-TR',
    prefix: '/tr',
  },
  fr: {
    code: 'fr',
    nativeName: 'Français',
    englishName: 'French',
    htmlLang: 'fr',
    dateLocale: 'fr-FR',
    prefix: '/fr',
  },
  pt: {
    code: 'pt',
    nativeName: 'Português',
    englishName: 'Portuguese',
    htmlLang: 'pt',
    dateLocale: 'pt-PT',
    prefix: '/pt',
  },
  es: {
    code: 'es',
    nativeName: 'Español',
    englishName: 'Spanish',
    htmlLang: 'es',
    dateLocale: 'es-ES',
    prefix: '/es',
  },
};

export const NON_DEFAULT_LOCALES: Locale[] = SUPPORTED_LOCALES.filter(
  (loc) => loc !== DEFAULT_LOCALE
);

export function isValidLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' &&
    (SUPPORTED_LOCALES as readonly string[]).includes(value)
  );
}
