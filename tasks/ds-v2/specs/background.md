# Background — v2 · ParticleField

Reconciliada con lo que el PR 1 construyó: donde esta spec y el paquete original no coincidan, manda esta, y el porqué está en los mensajes de commit del [PR #42](https://github.com/GenomaGames/genomagames-web/pull/42).

Canvas de células y partículas pixel que vive detrás de todas las secciones `glass`.

## Props
| Prop | Tipo | Default | Nota |
| --- | --- | --- | --- |
| `density` | number | 1 | multiplica células (~10) y motas (~22) por 420×760 de viewport interno |
| `parallax` | boolean | true | desplaza cada partícula por su `z` con el scroll (wrap vertical) |
| `colors` | string[] | `[--color-green-400, --color-green-500, --color-cyan-200]` | célula borde/núcleo + motas |
| `fadeToFooter` | boolean | true | gradiente inferior a `--surface-sunken` que oculta partículas |

## Comportamiento
- Dibujo cuantizado a rejilla de 2px y ~11 fps (`steps` retro); resolución interna = CSS/2 con `ctx.setTransform(2,…)` — nunca reescalar el bitmap (deforma en pantallas anchas).
- `ResizeObserver` reconstruye densidad y tamaño; partículas con `z` por capas (0 = lejana) para profundidad al hacer scroll.
- Células: cuadrado hueco 4–10px con núcleo; motas 2–3px verde/cyan, alpha .12–.34.
- `prefers-reduced-motion`: un frame estático (sin loop).
- Capas: canvas z1 · scanlines z3 (`repeating-linear-gradient` 1px/3px negro .24) · gradiente foot z3 · secciones `glass` z4.

## Uso
```jsx
<div className="relative bg-ground" style={{ overflow: "hidden" }}>
  <ParticleField parallax fadeToFooter />
  <Hero />            {/* z-4 */}
  <SectionShell …/>   {/* glass, z-4 */}
</div>
```
Migración v1 → v2: sustituye el degradado estático `bg-linear-to-b from-gray-900 to-black` del shell.
