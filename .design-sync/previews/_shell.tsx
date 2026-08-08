// Shared preview scaffolding. Not a component preview — the converter only
// compiles `<ComponentName>.tsx`, so an underscore-prefixed file is never an
// entry point.
//
// Caveat for re-syncs: grade keys hash each `<Name>.tsx`, not this file. Edit
// it and the grades of the previews that import it are NOT invalidated — force
// a re-grade by hand if you change it materially.
import type { ReactNode } from "react";

/**
 * The site's own ground, lifted from the <html>/<body> classNames in
 * src/app/[locale]/(main)/layout.tsx. Every component in this DS is designed
 * against this dark gradient; rendered on a bare white card they read as
 * broken, so each preview cell composes inside it.
 *
 * No `transform` here on purpose: it would make the shell a stacking context,
 * and the post cover images are painted at `-z-10` — they would disappear
 * behind this background. Use `Viewport` for the components that need a
 * containing block instead.
 */
export const Shell = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-gray-900 bg-linear-to-b from-gray-900 to-black font-sans text-base text-slate-200 ${className}`}
  >
    {children}
  </div>
);

/**
 * Shell for the chrome that is `position: fixed` in the real page (the header).
 * The transform creates a containing block so it renders inside the card rather
 * than pinning itself to the browser window.
 */
export const Viewport = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className="relative overflow-hidden" style={{ transform: "translateZ(0)" }}>
    <Shell className={className}>{children}</Shell>
  </div>
);

/** The main column width the site uses for page content. */
export const Main = ({ children }: { children: ReactNode }) => (
  <Shell className="p-5">
    <div className="mx-auto w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">{children}</div>
  </Shell>
);
