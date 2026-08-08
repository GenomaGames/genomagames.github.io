// Stands in for `@/src/i18n/navigation`. The real module calls next-intl's
// `createNavigation(routing)`, which needs a live Next.js router. Outside one,
// the locale-aware `Link` is a plain anchor and the hooks return static values.
export { default as Link } from "./next-link";

export const usePathname = () => "/";
export const useRouter = () => ({
  push: () => undefined,
  replace: () => undefined,
  back: () => undefined,
  forward: () => undefined,
  refresh: () => undefined,
  prefetch: () => undefined,
});
export const redirect = () => undefined;
export const getPathname = ({ href }: { href: string }) => href;
