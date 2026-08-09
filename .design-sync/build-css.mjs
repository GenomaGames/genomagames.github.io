// Compiles the site's Tailwind v4 stylesheet into a static CSS file the
// design-sync converter can ship. There is no library build in this repo, so
// this IS the build step: `cfg.buildCmd` runs it before every conversion.
//
// Two things it does that a plain copy of src/styles/globals.css cannot:
//   1. Resolves `@import "tailwindcss"` into real rules. The converter ships
//      static CSS; an unresolved @import would reach Claude Design unstyled.
//   2. Widens the utility scan to src/app/** and the authored previews, so the
//      shipped stylesheet carries the whole class vocabulary the site uses —
//      not only the classes the 11 synced components happen to reference.
//
// The @font-face blocks are stripped here and shipped separately through
// `cfg.extraFonts` (.design-sync/fonts.css), whose url()s are repo-relative and
// therefore resolvable by the converter's font extractor.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import tailwind from "@tailwindcss/postcss";
import postcss from "postcss";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(HERE);
const CACHE = join(HERE, ".cache");
const ENTRY = join(CACHE, "tailwind-entry.css");
const OUT = join(CACHE, "ds.css");

const globals = readFileSync(join(ROOT, "src/styles/globals.css"), "utf8");

/** Imports relative to globals.css resolve to nothing from .cache/, where ENTRY lives. */
const withResolvedImports = globals.replace(
  /@import\s+"\.\/([^"]+)"/g,
  (_match, file) => `@import "${join(ROOT, "src/styles", file)}"`,
);

// Drop the @font-face blocks — fonts.css owns them.
const withoutFonts = withResolvedImports.replace(/@font-face\s*\{[^}]*\}\s*/g, "");

// `#__next` is a Next.js host-page hook that never exists in a rendered design.
const withoutHostHooks = withoutFonts.replace(/#__next\s*\{[^}]*\}\s*/g, "");

// The app shell's ground, lifted verbatim from the className on <body> in
// src/app/[locale]/(main)/layout.tsx. Written as plain CSS rather than @apply
// so the gradient's custom properties resolve in a static stylesheet.
const appShell = `
@layer base {
  body {
    min-height: 100vh;
    background-color: var(--color-gray-900);
    background-image: linear-gradient(
      to bottom,
      var(--color-gray-900),
      var(--color-black)
    );
    color: var(--color-slate-200);
    font-family: var(--font-sans);
    font-size: 1rem;
  }
}
`;

// src/styles/markdown-styles.module.css is a Tailwind `@apply` sheet. esbuild
// bundles it with its `local-css` loader, which renames the class but does NOT
// run Tailwind — the rules reach the bundle as literal `@apply` and every post
// body renders unstyled. Compiling it here, under the name esbuild derives from
// the file (`markdown_styles_markdown`), is what puts those styles back.
//
// That name is derived from the FILE NAME: rename the module and this mapping
// silently stops matching. See .design-sync/NOTES.md.
const MARKDOWN_CLASS = "markdown_styles_markdown";
const markdown = readFileSync(join(ROOT, "src/styles/markdown-styles.module.css"), "utf8")
  .replace(/@reference\s+[^;]+;/g, "")
  .replace(/\.markdown\b/g, `.${MARKDOWN_CLASS}`);

const sources = [
  "../../src/components/**/*.tsx",
  "../../src/app/**/*.tsx",
  "../previews/**/*.tsx",
]
  .map((glob) => `@source "${glob}";`)
  .join("\n");

mkdirSync(CACHE, { recursive: true });
writeFileSync(ENTRY, `${withoutHostHooks}\n${sources}\n${appShell}\n${markdown}`);

const result = await postcss([tailwind()]).process(readFileSync(ENTRY, "utf8"), {
  from: ENTRY,
  to: OUT,
});

writeFileSync(OUT, result.css);

if (!existsSync(OUT) || result.css.length < 1000) {
  console.error(`[BUILD_CSS] ${OUT} looks empty (${result.css.length} bytes)`);
  process.exit(1);
}

console.error(`» build-css: ${OUT} (${Math.round(result.css.length / 1024)} KB)`);
