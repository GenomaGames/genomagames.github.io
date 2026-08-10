# Cards — v2

Reconciliada con lo que el PR 1 construyó: donde esta spec y el paquete original no coincidan, manda esta, y el porqué está en los mensajes de commit del [PR #42](https://github.com/GenomaGames/genomagames-web/pull/42).

Base común: `bg-raised .inset-ring-2`, padding 14px, gap 6–10px; hover → ring strong;
active → `bg-active` + `translateY(2px)`. Sin radius, sin sombra exterior.
`bg-active` **todavía no existe en el código**: el PR 1 emitió cinco de las seis superficies de
la familia y dejó fuera esta, aunque `--surface-active` sí está definido. Emitirla es parte de
esta entrega, antes de usarla.

## PostItem
Chip de categoría + tag de proyecto (`font-mono-ui` 9px `--info`) · título Pixelify 600 15px
`--text-primary` · meta 10px `--text-muted` («hace X · N min»).

```jsx
<a className="bg-raised inset-ring-2" href={url}>
  <span className="chip chip-devlog">DEVLOG</span>
  <span className="font-display text-primary">{title}</span>
  <span className="font-mono-ui text-muted">{meta}</span>
</a>
```

## FeaturedPostItem
Igual + `grid-column: 1 / -1`, thumbnail cuadrado 72–112px con `.inset-ring-2` a la izquierda,
título clamp(15px→18px).

## PostsList — Migración v1 → v2
- v1: lista vertical con divisores. v2: grid `repeat(auto-fit, minmax(300px, 1fr))` gap 8px; el primer post como FeaturedPostItem.
- Mantiene props (`posts`, `locale`); `coverImage: null` ya no muestra hueco: la featured usa placeholder pixel.

## ProjectCard
Marco `bg-raised .inset-ring-3` con **padding 3px** (la cápsula nunca tapa el borde).
Dentro: cápsula 920×430 → cuerpo (título Silkscreen 14px + chip de estado) → footer de
acción separado con `border-top 2px --border-default` (Steam/devlog con icono 16px).

## CapsulePlaceholder
Para proyectos sin cápsula de Steam (aspect 920×430, `bg-sunken`, contenido centrado):
título «CÁPSULA EN CONSTRUCCIÓN» Silkscreen `--text-muted` + LoadingBlocks + caption
mono 10px con cursor `.blink`. `role="img"` + `aria-label` con el nombre del juego.

## LoadingBlocks
10 bloques `flex: 1` en un raíl `.inset-ring-2` (h 16px, gap 2px, padding 3px); cada uno
`background: var(--accent)` + `.block-fade` con delay escalonado −0.15s → onda
transparente→opaco→transparente con ~4 bloques apagados. Reduced motion: estáticos.
