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
- Radius 0 en todo. `--radius: 0px` existe como declaración de intenciones, pero no lo lee nadie: las dos utilidades que necesitan anularlo —`.btn` y `.input`— escriben `border-radius: 0` literal, y las otras 37 sencillamente no declaran radius. Lo que queda por barrer son las `rounded-*` que la UI v1 todavía trae, y eso lo hace el PR 6.
- Profundidad con biseles inset 2px (`.bevel-*`): luz arriba-izquierda, sombra abajo-derecha; `:active` invierte el bisel y baja 2px.
- Contornos con `box-shadow` interior (`.inset-ring-*`), nunca `border`. La regla es sobre el contorno y la profundidad: un divisor de un solo lado —el `border-top 2px --border-default` que separan cards y pies— sí se escribe como `border`, porque un ring no puede darlo.

## Motion
`gg-blink` (cursor/CTA), `gg-shake` (daño, .25s), `gg-block-fade` (bloques de carga), más
`gg-focus-snap` y `gg-focus-pulse` del foco de aquí abajo: cinco animaciones en total.
Todo respeta `prefers-reduced-motion`.

### Foco animado
Vocabulario que el paquete no traía: el foco no aparece, aterriza y luego respira, como el
cursor de un menú que se engancha a la opción y se queda en ella. Sin interpolar, con `steps`.

- **Aterrizaje** (`--dur-focus-snap`, .15s): tres fotogramas, 7px@10px → 5px@6px → 3px@2px, con
  la opacidad subiendo. La opacidad va en el color del contorno, no en `opacity`, que atenuaría
  el elemento entero en vez del recuadro.
- **Latido** (`--dur-focus-pulse`, 1.2s): vaivén 2 → 3 → 4 → 3 → 2.
- Con movimiento reducido se congela en el 3px con offset 2px de siempre.

## Accesibilidad
Foco visible 3px `--focus` · hit targets ≥ 44px · errores con `role="status"`/`aria-live` ·
`aria-invalid` en inputs con error · `lang` del documento.

### Deuda conocida: el contorno de los inputs
El contorno del `.input` da **1,51:1** contra su relleno, por debajo del 3:1 que pide
WCAG 1.4.11, y es el único límite visual del campo. `--border-strong` tampoco llega (2,08:1).
**Se decidió no tocarlo**: es deuda asumida, no un descuido pendiente de descubrir. No se
«arregla» por sorpresa; si se aborda, se aborda como cambio de paleta con su propia decisión.

## Migración v1 → v2 (global)
- `bg-gray-900 bg-linear-to-b from-gray-900 to-black` → `bg-page` con `ParticleField` + secciones `glass`.
- emerald-* → tokens `--accent*`; indigo-* → `--accent-2*`; `text-slate-*` → `text-secondary`/`text-muted`.
- `rounded-sm/md/lg` → eliminar (radius 0). `drop-shadow-xl`/`shadow-md` → biseles.
- `font-sans` → `font-mono-ui` (cuerpo) y `font-pixel` (labels).
- La escala v2 pisa `--color-white` y `--color-red-400` de Tailwind, así que `text-white` y
  `text-red-400` cambian de tono allí donde la UI v1 todavía los usa. Es explícito: son clases
  que estas entregas retiran, y aislarlas habría partido la paleta en dos.
