// Stands in for `next/link` (and the locale-aware `Link` from
// `@/src/i18n/navigation`) outside a Next.js router: a plain anchor.
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | { pathname?: string };
  children?: ReactNode;
  locale?: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
};

const Link = ({
  href,
  children,
  locale: _locale,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  shallow: _shallow,
  ...rest
}: Props) => {
  const resolved = typeof href === "string" ? href : (href?.pathname ?? "#");

  return (
    <a href={resolved} {...rest}>
      {children}
    </a>
  );
};

export default Link;
