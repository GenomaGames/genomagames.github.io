// Stands in for `next-intl` outside a Next.js request context. It is NOT a
// mock: the messages come from the repo's real `i18n/en.json`, so previews show
// the same copy the site ships. Missing keys fall back to the key itself
// instead of throwing, which keeps a preview visible while it is authored.
import type { ReactNode } from "react";

import messages from "@/i18n/en.json";

export const DEFAULT_LOCALE = "en";

type Messages = Record<string, unknown>;

const lookup = (namespace: string | undefined, key: string): unknown => {
  const path = (namespace ? `${namespace}.${key}` : key).split(".");
  let node: unknown = messages as Messages;

  for (const segment of path) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Messages)[segment];
  }

  return node;
};

export const useLocale = () => DEFAULT_LOCALE;

export const createTranslator = (namespace?: string) => {
  const translate = (key: string, values?: Record<string, unknown>) => {
    const value = lookup(namespace, key);
    if (typeof value !== "string") return key;

    return values
      ? value.replace(/\{(\w+)\}/g, (match, name: string) =>
          name in values ? String(values[name]) : match,
        )
      : value;
  };

  translate.rich = (key: string) => translate(key) as ReactNode;
  translate.markup = (key: string) => translate(key);
  translate.raw = (key: string) => lookup(namespace, key);
  translate.has = (key: string) => lookup(namespace, key) !== undefined;

  return translate;
};

export const useTranslations = (namespace?: string) => createTranslator(namespace);

export const useMessages = () => messages;
export const useNow = () => new Date();
export const useTimeZone = () => "UTC";
export const useFormatter = () => ({
  dateTime: (date: Date) => date.toISOString(),
  number: (value: number) => String(value),
  relativeTime: (date: Date) => date.toISOString(),
  list: (values: Iterable<string>) => [...values].join(", "),
});

export const NextIntlClientProvider = ({ children }: { children?: ReactNode }) => <>{children}</>;
