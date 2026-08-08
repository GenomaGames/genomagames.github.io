# Navigation & Shell — v2

## HeroMenu (sustituye al Header fijo v1)
`<nav aria-label>` en grid 2×2 (≥820px) / 1 col (móvil): items `bg-control` bevel-raised,
48–50px, label Silkscreen 14px `--text-primary` + índice «01» mono 9px a la derecha.
Cursor: triángulo verde 9px que **se mueve al item bajo hover/focus** (opacity por item,
reset en `mouseleave`/`blur`). Active: bisel invertido + fondo `--navy-800` + 2px abajo.
CTA «▼ START GAME ▼» Silkscreen 14px `--warning` con `.blink`.

### Header — Migración v1 → v2
- v1: barra fija translúcida con links. v2: menú del hero (arriba) — el `mt-16` de main desaparece; en páginas interiores el HeroMenu colapsa a una fila compacta `glass` pegada arriba.

## SectionShell
Sección de contenido sobre el fondo de partículas: `glass` (blur 3px) + `position: relative;
z-index: 4`. La primera lleva `.glass-bezel` + gradiente de luz superior (120px). La última
funde a `--surface-sunken` con gradiente hasta el color del footer. Columna interior
max-width 1120px, padding clamp(36→64px) / clamp(20→48px).
Cabecera: h2 Silkscreen clamp(18→24px) verde/morado alternos + subtítulo mono 12px `--text-muted`.

## GrooveSeparator
Hendidura entre secciones de cristal: `.groove` (8px) extendida al ancho del bloque
(márgenes negativos hasta 1120px), `aria-hidden`.

## GameOverBar
Franja `bg-sunken` centrada: «GAME OVER» Silkscreen 14px `--danger` + enlace «↑ RESTART ↑»
`--text-muted` (solo el texto es clickable, padding 4px 10px); hover aclara, active verde.

## Footer — Migración v1 → v2
- v1: bloque oscuro con navegación repetida. v2: barra mínima `bg-sunken`: icono pixel 20px + lema mono 10px a la izquierda, LanguageSelector a la derecha. `mt-auto` se mantiene.

## LanguageSelector — Migración v1 → v2
- v1: dropdown con banderas. v2: par de botones cuadrados 44px «ES/EN» Silkscreen 14px; activo `bg: --accent` texto `--text-on-accent`, inactivo transparente + `.inset-ring-2`; `role="group" aria-label="Idioma"` + `aria-pressed`.
