import { getRequestConfig } from "next-intl/server";

export enum Locale {
  en = "en",
  es = "es",
}

interface Language {
  tag: string;
  i18nKey: string;
}

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../i18n/${locale}.json`)).default,
}));

export const locales: Locale[] = Object.values(Locale);

type Languages = {
  [Key in Locale]: Language;
};

export const languages: Languages = {
  [Locale.en]: {
    i18nKey: "english",
    tag: Locale.en,
  },
  [Locale.es]: {
    i18nKey: "spanish",
    tag: Locale.es,
  },
};

export const defaultLocale = "en";
