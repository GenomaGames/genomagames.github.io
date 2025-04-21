import { Locale } from "./Locale";

export const isLocale = (value: unknown): value is Locale => {
  return Object.values(Locale).includes(value as Locale);
};
