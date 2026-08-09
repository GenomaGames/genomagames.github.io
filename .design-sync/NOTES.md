# design-sync notes

Repo-specific gotchas for future syncs. First sync: 2026-08-08.

## What this repo is

Not a component library — a Next.js 16 app. There is no `dist/`, no published
package, and every component is a **default** export, so the converter's
synthesized `export *` entry would export nothing. `.design-sync/entry.tsx` is
the explicit named barrel it bundles instead (`cfg.entry`), and
`cfg.componentSrcMap` enumerates the 11 components because there is no `.d.ts`
tree to discover them from.

- `Meta` is excluded (`componentSrcMap: {"Meta": null}`): it renders only
  `<head>` tags, so its preview root would always be empty.
- No `.d.ts` tree means no automatic prop extraction either — every component's
  props are hand-written in `cfg.dtsPropsFor`. **Change a component's props and
  you must update that map by hand**; nothing will warn you.

## Build order

`cfg.buildCmd` = `node .design-sync/build-css.mjs`. Run it **before** the
converter, always: it is this repo's only build step. It compiles Tailwind v4
(`src/styles/globals.css` is `@import "tailwindcss"` — unresolved CSS would ship
unstyled) into `.design-sync/.cache/ds.css`, which `cfg.cssEntry` points at.

## Traps that cost real debugging time

- **`.design-sync/tsconfig.sync.json` must not contain the sequence `/*`.** The
  converter strips comments with a regex before `JSON.parse`, and `"@/*": ["./*"]`
  looks like a block comment to it — the whole paths map silently parses as
  broken JSON, the plugin returns null, and the shims are never applied (you get
  the real `next/image`, `next/link` and next-intl in the bundle, plus
  `ReferenceError: process is not defined`). The `@/…` aliases still resolve
  because esbuild auto-discovers the repo's own `tsconfig.json`; only the shim
  mappings need to be in the sync tsconfig, and none of them contain `/*`.
- **`process` does not exist in the browser.** Components read
  `process.env.NEXT_PUBLIC_*`. `.design-sync/shims/process.ts` defines them and
  is imported FIRST in `entry.tsx` — esbuild preserves import order, so it runs
  before any component module evaluates. Only public values belong there.
- **`markdown-styles.module.css` needs Tailwind.** esbuild's `local-css` loader
  renames the class but does not run `@apply`, so post bodies rendered unstyled.
  `build-css.mjs` compiles that file too, rewriting `.markdown` to
  `markdown_styles_markdown` — the name esbuild derives **from the file name**.
  Rename the module and the mapping silently stops matching.
- **Async server components cannot render in a browser.** `PostItem` and
  `PostsList` awaited the request locale. They were split in place: a
  synchronous `PostItemView` / `PostsListView` taking `locale` as a prop, plus
  the async default export that supplies it. The entry exports the views; call
  sites were not touched.
- **The preview card harness sets `transform` on every cell**, making it a
  stacking context. Anything the app paints at `-z-10` (the post cover art) is
  clipped by an intervening background — so `_shell.tsx`'s `Shell` deliberately
  has no `transform`. `Viewport` (which does) is only for the `fixed` header.
- **itch.io rate-limits.** Two `ItchioWidget` cells pointing at the same game
  render "429 Too Many Requests" in the second. One cell only.

## Findings reported to the repo owner (fixed in this sync)

- `post-header.tsx` used `bg-opacity-50`, dead under Tailwind v4 — the cover art
  was fully hidden behind opaque black on the live site. Changed to `bg-black/50`.
- `tailwind.config.js` was dead config (v3 shape, globs pointing at `./app` and
  `./components`, which do not exist; nothing referenced it via `@config`).
  Deleted at the owner's request. Its brand palette (`Color-Main`,
  `born2bsporty-fs`, …) was never live and is deliberately absent from
  `conventions.md`.
- The three brand faces (Silkscreen 700, Pixelify Sans 600, IBM Plex Mono
  400/500) are declared but unused — the site's type is stock `font-sans`. They
  ship as available assets via `cfg.extraFonts`.

## Preview conventions

`previews/_shell.tsx` and `previews/_fixtures.ts` are shared scaffolding, not
component previews (the converter only compiles `<ComponentName>.tsx`). Post
cover images are inline SVG data URIs because preview cards are served
standalone and a `/posts/...` path would 404.

`LanguageSelector`'s drawer state is internal, so its `Opened` cell clicks the
real trigger once after mount. That is a real interaction, not a faked state —
but it does depend on the button being the first `<button>` in the subtree.

## Known render warns

None. The last full validate was clean: 11/11 previews render, no warn lines.
Any warn on a future sync is new — investigate it, then fix or record it here.

## Re-sync risks

- **`cfg.dtsPropsFor` is hand-maintained** and drifts silently from the real
  props. Diff it against the components before trusting the uploaded `.d.ts`.
- **`shims/process.ts` inlines env values** copied from `.env.example` plus the
  public base URL. If those change, the shim keeps the old ones.
- **`shims/next-intl.tsx` imports `i18n/en.json` directly.** Previews always
  render English regardless of the `locale` prop; new message keys appear
  automatically, but a renamed namespace shows the raw key instead of throwing.
- **`_shell.tsx` is outside the grade key.** Editing it changes every preview's
  render without invalidating a single grade — force a re-grade by hand.
- **`markdown_styles_markdown`** and the `@source` globs in `build-css.mjs` are
  path-coupled to `src/components/**`, `src/app/**` and `previews/**`. Move
  those directories and the shipped CSS quietly loses utilities.
- **`ItchioWidget` and the itch.io embed need network** at capture time.
- The shipped stylesheet only contains the ~250 utilities this site uses. Adding
  pages with new utilities widens it automatically; removing them narrows it,
  which can silently break a design already built against the old vocabulary.
