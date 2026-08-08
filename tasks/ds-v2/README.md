# Handoff: DS v2 «Pixel» → genomagames-web

Paquete para ejecutar la migración con **Claude Code** dentro del repo
`GenomaGames/genomagames-web` (rama `main`).

## Cómo usarlo

1. Descomprime este zip en la raíz del repo como `tasks/ds-v2/` (el repo ya usa `tasks/` para trabajo planificado).
2. Abre Claude Code en el repo y dale un prompt tipo:

   > Lee `tasks/ds-v2/PLAN.md` y ejecuta el **PR 1** tal cual está descrito.
   > Los archivos fuente a copiar están en `tasks/ds-v2/` (css/, fonts/, icons/).
   > Las medidas y estados exactos de cada componente están en `tasks/ds-v2/specs/`.
   > No avances a otro PR sin que yo lo revise.

3. Un PR por sesión, en orden (1 → 6). Cada PR del plan lista los archivos exactos del repo a tocar y los que no hay que tocar.

## Qué es cada cosa

- `PLAN.md` — el plan archivo por archivo, 6 PRs + re-sync de `.design-sync/`. Es la fuente de verdad del orden y el alcance.
- `specs/*.md` — spec por familia de componentes (fundaciones, botones, cards, navegación, formularios, fondo, contenido). Cada componente existente lleva su bloque «Migración v1 → v2» con las clases v1 exactas a sustituir.
- `css/tokens.css` — escala de color + tokens semánticos + tipografía/motion. En el repo: la escala va dentro de `@theme` (Tailwind 4), los semánticos en `:root` (detalle en PLAN.md, PR 1).
- `css/utilities.css` — utilidades nuevas (biseles, rings, chip, btn, input, glass, groove, animaciones). Convertir a `@utility` de Tailwind 4 donde se quieran variantes.
- `fonts/` — Silkscreen, Pixelify Sans e IBM Plex Mono (TTF) con licencias OFL. Destino: `public/fonts/` (sustituyen a Born2bSportyFS.otf y JosefinSans.ttf).
- `icons/` — iconos pixel (pixelarticons, MIT) + `brands/` (Steam/Discord, simple-icons). Sustituyen a FontAwesome y flag-icons. Destino sugerido: `public/icons/`.

## Fidelidad

**Hi-fi**: los valores de tokens, medidas y estados de las specs son finales — copiar tal cual,
no aproximar. Los archivos CSS de `css/` se copian literalmente (solo adaptar la envoltura
`@theme`/`@utility` de Tailwind 4).

## Reglas de oro (repetidas del plan)

- Radius 0 en todo; profundidad solo con biseles `inset` 2px; contornos con `box-shadow` interior, nunca `border`.
- Silkscreen 700 solo MAYÚSCULAS (labels/títulos); IBM Plex Mono cuerpo/UI; Pixelify Sans display.
- Texto de botón 14px; hit targets ≥ 44px; foco visible 3px `--focus` offset 2px.
- `prefers-reduced-motion` congela blink/shake/fade y el canvas de partículas.
- No renombrar `markdown-styles.module.css`; no tocar el split View/async de post-item/posts-list; copy nuevo siempre vía i18n (`en.json`/`es.json`), nunca hardcodeado.
- Los chips de categoría/proyecto están **pospuestos** (ver «Pospuesto» en PLAN.md).
