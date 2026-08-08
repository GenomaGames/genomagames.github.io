# Aplicar DS v2 «Pixel» en `GenomaGames/genomagames-web`

Plan archivo por archivo, verificado contra `main` (2026-08-08). Contexto del repo:
Next 16 · Tailwind 4 vía PostCSS **sin config JS** (tema stock, tokens van en `@theme`) ·
next-intl · componentes en `src/components/*.tsx` · shell en `src/app/[locale]/(main)/layout.tsx` ·
pipeline de sync en `.design-sync/`. Specs de referencia: `ds-v2/specs/*.md` de este proyecto.

---

## PR 1 — Fundaciones (solo CSS + fuentes; la UI v1 sigue en pie)

**`public/fonts/`**
- Añadir los woff2 de `assets/fonts/` de este proyecto: Silkscreen 700, Pixelify Sans 600, IBM Plex Mono 400/500, con sus `OFL.txt`.
- Borrar `Born2bSportyFS.otf` y `JosefinSans.ttf` — NOTES.md confirma que nada los usa.

**`src/styles/globals.css`**
- Sustituir los dos `@font-face` por los de las tres familias nuevas (mismo patrón actual, sin `next/font`).
- Tras `@import "tailwindcss"`, añadir `@import "./tokens.css"` y `@import "./utilities.css"` (copiados de `ds-v2/`).
- La **escala** de color (`--navy-*`, `--green-*`, …) va dentro de `@theme` → genera utilidades (`bg-navy-800`, `text-green-400`). Los **semánticos** (`--surface-*`, `--accent*`, `--text-*`, `--focus`) quedan en `:root` como están.
- Globales nuevos: `-webkit-font-smoothing: none`, `:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px }`.
- En `utilities.css`, declarar los biseles/rings como `@utility` (sintaxis v4) para que funcionen con variantes `hover:`/`active:`.
- No tocar la capa de compatibilidad `border-color` ni `scroll-behavior`.

## PR 2 — Shell y fondo

**Nuevos** (spec `navigation-shell.md` + `background.md`):
- `src/components/particle-field.tsx` — `"use client"`, canvas cuantizado 2px/11fps, props `density/parallax/colors/fadeToFooter`, `prefers-reduced-motion` = frame estático.
- `src/components/section-shell.tsx`, `groove-separator.tsx`, `game-over-bar.tsx`.

**`src/app/[locale]/(main)/layout.tsx`**
- `<html className>`: `bg-gray-900 bg-linear-to-b from-gray-900 to-black font-sans text-slate-200` → `bg-page font-mono-ui text-secondary` (+ scanlines).
- En `<body>`: `<ParticleField />` detrás, contenido en secciones `glass` (z-4). Quitar el `mt-16` de `<main>` (el header fijo desaparece en PR 3).

## PR 3 — Navegación

- `src/components/header.tsx` → **HeroMenu** (grid 2×2 en el hero de la home; fila compacta `glass` en páginas interiores). Fuera FontAwesome (`faGamepad`, `faXTwitter`) y `flag-icons`.
- `src/components/language-selector.tsx`: el drawer entero se sustituye por el par ES/EN 44px con `aria-pressed` (spec). Desaparecen `flag-icons`, `faLanguage`, `faXmark` y el efecto de bloqueo de scroll.
- `src/components/footer.tsx`: barra mínima `bg-sunken` (icono pixel + lema mono 10px + LanguageSelector); `mt-auto` se mantiene. El enlace `#top` (faArrowUp) pasa a ser el «↑ RESTART ↑» del GameOverBar.
- `package.json`: quitar `flag-icons`. FontAwesome aún no (lo usan post-item/footer/draft hasta PR 4–6).
- Iconos pixel: copiar los SVG necesarios de `assets/icons/` de este proyecto (pixelarticons, MIT; Steam/Discord de simple-icons) a `public/icons/` o como componentes.

## PR 4 — Cards y listas

- `src/components/posts-list.tsx` (`PostsListView`): lista vertical → grid `repeat(auto-fit, minmax(300px, 1fr))` gap 8px; el primer post renderiza como FeaturedPostItem. El split View/async y la prop `locale` del view **no se tocan** (los necesita design-sync).
- `src/components/post-item.tsx` (`PostItemView`): card `bg-raised inset-ring-2` + título Pixelify (spec `cards.md`). Fuera `faCalendarDay`, `rounded-*`, `drop-shadow-*`, `hover:scale`.
  - **Sin chips por ahora**: `category`/`project` no existen en el dominio `Post` — la card v2 se aplica sin chip (título + meta). Los chips quedan pospuestos hasta decidir frontmatter vs. derivación; `DraftLabel` es el único chip visible.
- `src/components/draft-label.tsx`: `chip chip-status` en `--warning`, radius 0; fuera `faHammer`.
- `src/app/[locale]/(main)/page.tsx`: el Link `more_posts` emerald → botón outline v2 (`.btn bg-transparent inset-ring-3`).
- Páginas de juegos (`games/page.tsx` y por juego): **ProjectCard**, **CapsulePlaceholder** y **LoadingBlocks** nuevos; `itchio-widget.tsx` no se toca por dentro — se enmarca como ProjectCard con CapsulePlaceholder de fallback (spec `content.md`).

## PR 5 — Formulario alpha

- `src/components/alpha-sign-up-form.tsx` (24 KB): solo piel — lógica de submit, botid y next-intl intactos.
  - Nuevos `field-label` + `.input` (48px `bg-sunken` ring 2px) + `FieldError` (`role="status"`, min-height fija).
  - Botón `bevel-accent-2` (morado, flujo suscripción); validación fallida = efecto daño `.shake` + `bevel-danger` 300 ms (contador de golpe en estado).
  - Éxito → SuccessPanel morado «✓ APUNTADO».
- `i18n/en.json` + `es.json`: claves nuevas para errores en tono de juego y el microcopy «Sin spam. Te vas cuando quieras.» — nada hardcodeado.

## PR 6 — Contenido markdown + limpieza final

- `src/styles/markdown-styles.module.css`: reescribir los `@apply` emerald/indigo → v2 (spec `content.md`: cuerpo mono 14/1.75, h2/h3 Silkscreen verde/morado alternos, code `bg-sunken inset-ring-2`, blockquote con groove, imágenes `.pixelated`, hr = GrooveSeparator). ⚠️ **No renombrar el archivo**: design-sync deriva `markdown_styles_markdown` del nombre.
- `src/components/post-header.tsx`: título Pixelify clamp(24→34px), chip encima; el velo `bg-black/50` se mantiene.
- `src/components/post-footer.tsx`: hr indigo + botón «Post this» → fila de LinkAction con `border-top 2px --border-default`.
- Limpieza: en `@theme`, `--color-*: initial` + solo la paleta v2 → cualquier clase emerald/indigo/rounded superviviente queda sin estilo y se ve en review. Quitar deps FontAwesome si no queda ningún uso.

---

## Después: re-sync del design system (`.design-sync/`)

1. `node .design-sync/build-css.mjs` antes del converter, siempre.
2. Añadir los componentes nuevos a `entry.tsx`, `cfg.componentSrcMap` y `previews/` (ParticleField, HeroMenu, SectionShell, ProjectCard, CapsulePlaceholder, LoadingBlocks, GameOverBar, SegmentedControl…).
3. `cfg.dtsPropsFor` es manual: actualizar props nuevas (variant, damaged, busy, density…) o el `.d.ts` mentirá.
4. `_shell.tsx` debe pasar a ground v2 (`bg-page` + ParticleField) — está fuera de la grade key: forzar re-grade a mano.
5. El set de ~250 utilidades compiladas cambia por completo: los diseños construidos contra el vocabulario v1 se rompen. Es esperado — v2 lo sustituye.

## Reglas transversales en cada review

Radius 0 · profundidad solo biseles inset 2px (nunca `border` ni sombra exterior) · texto de botón 14px · Silkscreen solo MAYÚSCULAS · hit targets ≥ 44px · `prefers-reduced-motion` congela blink/shake/fade y el canvas · foco 3px `--focus`.

## Pospuesto

Chips de categoría/proyecto en PostItem: requieren `category` y `project` en el frontmatter y el dominio `Post`. Cuando se decida (frontmatter explícito vs. derivar de la ruta), añadirlos como PR propio; las clases `.chip chip-*` ya quedan disponibles desde PR 1.
