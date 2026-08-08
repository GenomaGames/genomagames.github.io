# Foundations — v2

## Color
Roles semánticos sobre la escala (ver `tokens.css`). Regla: superficie navy, texto
frío, un acento por bloque (verde = acción principal, morado = suscripción/alt,
ámbar = aviso, rojo = daño/error, cyan = info/foco). Los títulos de sección alternan
verde/morado siguiendo la hélice de ADN.

## Tipografía
| Rol | Fuente | Uso |
| --- | --- | --- |
| Pixel UI | Silkscreen 700 | labels, títulos, chips, botones — siempre MAYÚSCULAS |
| Display | Pixelify Sans 600 | titulares editoriales y títulos de post |
| Cuerpo/UI | IBM Plex Mono 400/500 | párrafos, metadatos, inputs |

Escala: botón 14px · h2 sección clamp(18px→24px) · cuerpo 12px (14px en desktop) ·
meta 10–11px · chip 9px · field label 10px. `-webkit-font-smoothing: none` global.

## Forma y profundidad
- Radius 0 en todo (`--radius: 0px`).
- Profundidad con biseles inset 2px (`.bevel-*`): luz arriba-izquierda, sombra abajo-derecha; `:active` invierte el bisel y baja 2px.
- Contornos con `box-shadow` interior (`.inset-ring-*`), nunca `border`.

## Motion
`gg-blink` (cursor/CTA), `gg-shake` (daño, .25s), `gg-block-fade` (bloques de carga).
Todo respeta `prefers-reduced-motion`.

## Accesibilidad
Foco visible 3px `--focus` · hit targets ≥ 44px · errores con `role="status"`/`aria-live` ·
`aria-invalid` en inputs con error · `lang` del documento.

## Migración v1 → v2 (global)
- `bg-gray-900 bg-linear-to-b from-gray-900 to-black` → `bg-page` con `ParticleField` + secciones `glass`.
- emerald-* → tokens `--accent*`; indigo-* → `--accent-2*`; `text-slate-*` → `text-secondary`/`text-muted`.
- `rounded-sm/md/lg` → eliminar (radius 0). `drop-shadow-xl`/`shadow-md` → biseles.
- `font-sans` → `font-mono-ui` (cuerpo) y `font-pixel` (labels).
