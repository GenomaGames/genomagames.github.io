import { getRequestConfig } from "next-intl/server";

export enum Locale {
  en = "en",
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
};

export const defaultLocale = "en";
