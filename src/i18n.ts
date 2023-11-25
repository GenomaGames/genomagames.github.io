import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../i18n/${locale}.json`)).default,
}));

export const locales = ["en"];

export const defaultLocale = "en";
