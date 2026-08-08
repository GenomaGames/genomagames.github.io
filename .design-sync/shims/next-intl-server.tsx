// Stands in for `next-intl/server`. The server APIs are async by nature; the
// preview runtime has no request scope, so they resolve against the same
// `i18n/en.json` the client shim uses.
import { createTranslator, DEFAULT_LOCALE } from "./next-intl";

export const getLocale = async () => DEFAULT_LOCALE;
export const getTranslations = async (namespace?: string) => createTranslator(namespace);
export const getMessages = async () => (await import("@/i18n/en.json")).default;
export const getNow = async () => new Date();
export const getTimeZone = async () => "UTC";
