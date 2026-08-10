# Content — v2 (PostArticle, PostHeader, PostFooter, ItchioWidget)

## PostHeader — Migración v1 → v2
- Título: Pixelify Sans 600, clamp(24→34px), `--text-primary`; fecha mono 11px `--text-muted`.
- Chip de categoría v2 encima del título; tag de proyecto al lado (mono 9px `--info`).
- v1 `text-3xl font-sans text-white` → `font-display text-primary`.

## PostArticle — Migración v1 → v2
La tipografía markdown interna pasa a: cuerpo IBM Plex Mono 14px/1.75 `--text-secondary`;
h2/h3 Silkscreen verde/morado alternos; enlaces `--link`/`--link-hover` subrayado 2px;
`code` en `bg-sunken .inset-ring-2`; blockquote con ranura `.groove` vertical (borde
izquierdo 8px); imágenes `.pixelated .inset-ring-2`; hr = GrooveSeparator.
`content` sigue siendo HTML compilado — solo cambia la hoja de estilos del scope.

### La negrita del cuerpo es el peso 500
Solo se sirven IBM Plex Mono 400 y 500. El `IBMPlexMono-SemiBold.ttf` del paquete **queda sin
convertir a propósito**: añadir el 600 obligaba a volver a tocar las fundaciones, y el 500 da el
contraste que el cuerpo necesita.

Consecuencia para el PR 6: los `font-bold`/`font-semibold` de
`src/styles/markdown-styles.module.css` se mapean a Silkscreen —los títulos, que esta spec ya
manda— o al 500 real (`th`, `li::marker`, `strong`, resaltados de código). **Nunca se deja que
el navegador sintetice la negrita**: emborrona el pixel, que es justo lo que el sistema evita.

## PostFooter — Migración v1 → v2
- v1: enlaces de compartir con `rounded` + emerald. v2: fila de LinkAction (flecha pixel + mono 11px `--accent-text`) separada con `border-top 2px --border-default`.

## ItchioWidget — Migración v1 → v2
- El iframe no se toca (necesita red). v2 lo enmarca como ProjectCard: contenedor `bg-raised .inset-ring-3` con padding 3px y, mientras carga o sin red, CapsulePlaceholder detrás.

## DraftLabel
Ver `buttons-chips.md` (chip de estado `--warning`).
