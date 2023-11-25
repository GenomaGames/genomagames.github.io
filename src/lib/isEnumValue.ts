import { Locale } from "../i18n";

export const isLocale = (value: unknown): value is Locale => {
  return Object.values(Locale).includes(value as Locale);
};
