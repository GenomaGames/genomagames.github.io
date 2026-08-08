# Buttons & Chips — v2

## Button
Uso: una acción principal por vista. Verde = acción, morado = suscripción, rojo = solo estado de daño.

Props: `variant: "accent" | "accent2" | "outline"` · `damaged?: boolean` · `busy?: boolean`.

| Estado | Receta |
| --- | --- |
| default | `.btn .bevel-accent` (o `.bevel-accent-2`) |
| outline | `.btn bg-transparent .inset-ring-3 text-secondary`; hover: ring strong; active: `bg-raised` +2px |
| hover | `filter: brightness(1.12)` |
| active | bisel invertido + `translateY(2px)` + `brightness(.85)` |
| busy | `opacity .75; cursor: wait` + label «…» |
| damaged | `.bevel-danger .shake` durante 300 ms (ver forms-feedback) |

```jsx
<button className="btn bevel-accent focus-ring" onClick={send}>ENVIAR</button>
<a className="btn bg-transparent inset-ring-3 text-secondary focus-ring" href="/posts">TODAS LAS PUBLICACIONES</a>
```

## Chip
Categorías de contenido y estados de proyecto. `variant: "devlog" | "postmortem" | "tutorial" | "experience"` o `status` con color libre del set.

```jsx
<span className="chip chip-devlog">DEVLOG</span>
<span className="chip chip-status" style={{ color: "var(--warning)", boxShadow: "inset 0 0 0 2px var(--warning)" }}>EN DESARROLLO</span>
```

## LinkAction
Enlace de acción en línea: flecha pixel (triángulo CSS o icono pixelarticons 16px) + IBM Plex Mono 11–12px en `--accent-text`; hover aclara, active baja opacidad. Padding vertical ≥ 12px.

## DraftLabel — Migración v1 → v2
- v1: etiqueta absoluta amarilla con `rounded`. v2: `.chip chip-status` en `--warning`, radius 0, mismo posicionamiento absoluto (contenedor `relative`).
- Texto sigue viniendo de i18n; solo cambia la piel.
