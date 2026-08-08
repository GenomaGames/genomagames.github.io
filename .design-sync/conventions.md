## Genoma Games — how to build with this system

This is the Genoma Games website's own component set: a dark, gradient-grounded
indie-studio site. Eleven components, all real shipped code.

### Setup: no provider, but do set the ground

There is no theme or context provider — mount components directly. What you
**must** do is put the app-shell classes on your root element, because every
component is designed against a dark ground and defines no background of its own:

```jsx
const { Header, PostsList, Footer } = window.GenomaGamesDS;

<div className="min-h-screen bg-gray-900 bg-linear-to-b from-gray-900 to-black font-sans text-base text-slate-200">
  <Header />
  <div className="flex min-h-screen flex-col">
    <main className="mx-auto mt-16 w-full px-5 pt-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
      <PostsList className="mx-auto max-w-sm sm:max-w-full" locale="en" posts={posts} />
    </main>
    <Footer />
  </div>
</div>
```

`Header` is `position: fixed` — that `mt-16` on `<main>` is what keeps content
from sliding under it. `Footer` uses `mt-auto`, so it needs the
`flex min-h-screen flex-col` column above to sit at the bottom.

Copy is English, from the site's own `i18n/en.json`. Components that show text
(`Header`, `Footer`, `LanguageSelector`, `AlphaSignUpForm`) read it internally —
you cannot pass it in. `PostItem` and `PostsList` take `locale` as a prop
(`"en"` or `"es"`); it only builds the post URLs.

**Porting back into the app:** in the Next.js codebase itself, import the
default exports of `post-item` / `posts-list` and **drop `locale`** — those are
async server components that await the request locale themselves. `locale` is a
prop only on the synchronous views this design system ships, which is what makes
them renderable in a browser.

### Styling: Tailwind utilities, from a fixed vocabulary

Style your own layout with Tailwind classes — that is what the components use.
**But `styles.css` ships only the ~250 utilities this site actually uses.** A
class outside that set resolves to nothing and your element renders unstyled.
The vocabulary, in full families:

| Role | Classes |
|---|---|
| Ground / surfaces | `bg-gray-900` `bg-gray-800` `bg-gray-800/40` `bg-slate-800` `bg-slate-900` `bg-black` `bg-black/50` |
| Gradients | `bg-linear-to-b` `bg-linear-to-br` `bg-linear-to-r` + `from-gray-900` `from-slate-800` `from-emerald-500` `from-emerald-900` `via-emerald-700` `to-black` `to-gray-900` `to-indigo-800` `to-indigo-900` |
| Accent (actions, links) | `bg-emerald-600` `bg-emerald-800` `text-emerald-500` `text-emerald-200` `hover:bg-emerald-400` `focus:bg-emerald-400` |
| Secondary accent | `bg-indigo-600` `bg-indigo-700` `hover:bg-indigo-500` `border-indigo-600` `focus:ring-indigo-400` |
| Text | `text-slate-200` (body) `text-slate-300` `text-slate-400` (muted) `text-white` `text-red-400` (errors) `text-slate-900` (on emerald) |
| Sizes | `text-xs` `text-sm` `text-base` `text-lg` `text-xl` `text-2xl` `text-3xl` |
| Shape | `rounded-sm` `rounded-md` `rounded-lg` `drop-shadow-xl` `shadow-md` `shadow-black` |
| Variants | `sm:` `md:` `lg:` `hover:` `focus:` `group-hover:` `group-focus:` `disabled:` |

Beyond that set, use inline styles with the theme custom properties, which ARE
all defined: `--color-emerald-500`, `--color-slate-400`, `--color-gray-800`,
`--color-indigo-600`, `--radius-md`, `--font-sans` (and the same scale for
emerald/indigo/slate/gray 200–950). Example:
`style={{ background: "var(--color-gray-800)" }}`.

Brand faces `'Born2bSporty FS'` and `'Josefin Sans'` ship in `fonts/` and are
available via `font-family`. Nothing currently uses them — the site's type is
the stock `font-sans` stack.

### Where the truth is

- `styles.css` and its imports (`_ds_bundle.css`, `fonts/fonts.css`) — the real
  class and token inventory. Read it before inventing a class name.
- `components/general/<Name>/<Name>.prompt.md` — per-component props and worked
  examples taken from the site's own pages.

### Composition notes

- `PostArticle` = `PostHeader` + rendered markdown + `PostFooter` + `DraftLabel`.
  Its `content` prop is an **HTML string** (markdown is compiled upstream); the
  markdown typography only applies inside that component.
- `PostsList` renders `PostItem` per post; both need the full post shape
  (`title`, `summary`, `slug`, `date` as an epoch number, `coverImage` or `null`,
  `draft`).
- `DraftLabel` is absolutely positioned — give its container `relative`.
- `ItchioWidget` is an itch.io `<iframe>`; it needs network access to show anything.
