# Handoff: DS v2 «Pixel» → genomagames-web

Paquete para ejecutar la migración con **Claude Code** dentro del repo
`GenomaGames/genomagames-web` (rama `main`).

> **El PR 1 ya está construido y en `main`.** Estos documentos se reconciliaron después contra
> lo que se construyó de verdad: donde el paquete original y el código no coincidían, mandan
> estos documentos, y el porqué de cada decisión está en los mensajes de commit del
> [PR #42](https://github.com/GenomaGames/genomagames-web/pull/42). Lo que queda por ejecutar es
> del PR 2 en adelante.

## Cómo usarlo

1. El paquete ya está en el repo, en `tasks/ds-v2/`. Las fuentes y los tokens también: los trajo el PR 1.
2. Abre Claude Code en el repo y dale un prompt tipo:

   > Lee `tasks/ds-v2/PLAN.md` y ejecuta el **PR 2** tal cual está descrito.
   > El vocabulario ya está en `src/styles/`; de este paquete solo quedan por llevarse los
   > iconos de `tasks/ds-v2/icons/`, y `css/` es el retrato de lo que ya hay, no un origen.
   > Las medidas y estados exactos de cada componente están en `tasks/ds-v2/specs/`.
   > No avances a otro PR sin que yo lo revise.

3. Un PR por sesión, en orden (1 → 6). Cada PR del plan lista los archivos exactos del repo a tocar y los que no hay que tocar.

## Qué es cada cosa

- `PLAN.md` — el plan archivo por archivo, 6 PRs + re-sync de `.design-sync/`. Es la fuente de verdad del orden y el alcance.
- `specs/*.md` — spec por familia de componentes (fundaciones, botones, cards, navegación, formularios, fondo, contenido). Cada componente existente lleva su bloque «Migración v1 → v2» con las clases v1 exactas a sustituir.
- `css/tokens.css` — escala de color + tokens semánticos + tipografía/motion, ya con los nombres del repo: la escala vive en `@theme static` y ahí Tailwind exige el prefijo `--color-` (`--color-navy-800`), los semánticos en `:root` (detalle en PLAN.md, PR 1).
- `css/utilities.css` — las utilidades nuevas (biseles, rings, chip, btn, input, glass, groove, animaciones). En el repo son las 39 que el PR 1 declaró como `@utility` de Tailwind 4, todas, para que admitan variantes. La 40, `bg-active`, está pendiente y la emite el PR 4.
- `fonts/` — Silkscreen, Pixelify Sans e IBM Plex Mono (TTF) con sus `OFL-*.txt`. **Ya servidas**: el PR 1 las convirtió a woff2 en `public/fonts/`, y retiró Born2bSportyFS.otf y JosefinSans.ttf.
- `icons/` — iconos pixel (pixelarticons, MIT) + `brands/` (Steam/Discord, simple-icons). Sustituyen a FontAwesome y flag-icons. Destino sugerido: `public/icons/`.

## Fidelidad

**Hi-fi**: los valores de tokens, medidas y estados de las specs son finales — copiar tal cual,
no aproximar.

Lo que ya está construido no se recopia. `css/` era el origen del PR 1 y hoy es el **retrato**
de lo que hay en `src/styles/`: se lee para saber qué existe, no se vuelca encima. Si una spec y
el código se contradicen, gana el código y se corrige la spec — nunca al revés sin decidirlo
antes.

## Reglas de oro (repetidas del plan)

- Radius 0 en todo; profundidad solo con biseles `inset` 2px; contornos con `box-shadow` interior, nunca `border` — la regla habla del contorno y de la profundidad, no de un divisor de un solo lado, que sí es `border-top`.
- Silkscreen 700 solo MAYÚSCULAS (labels/títulos); IBM Plex Mono cuerpo/UI; Pixelify Sans display.
- Texto de botón 14px; hit targets ≥ 44px; foco visible 3px `--focus` offset 2px.
- `prefers-reduced-motion` congela blink/shake/fade y el canvas de partículas.
- No renombrar `markdown-styles.module.css`; no tocar el split View/async de post-item/posts-list; copy nuevo siempre vía i18n (`en.json`/`es.json`), nunca hardcodeado.
- Ningún símbolo monocromo se escribe como carácter: se pone como icono pixel de `icons/` o dibujado, con `aria-hidden` (ver «Símbolos que las fuentes pixel no traen» en PLAN.md).
- Los chips de categoría/proyecto están **pospuestos** (ver «Pospuesto» en PLAN.md).
