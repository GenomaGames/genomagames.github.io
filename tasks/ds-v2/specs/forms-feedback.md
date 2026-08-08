# Forms & Feedback — v2

## FieldLabel + TextInput / TextArea
Label `.field-label` sobre `.input` (48px, `bg-sunken`, ring 2px). Error → `aria-invalid`
cambia el ring a `--danger`. Textarea: padding 12px, `resize: none`.
`autocomplete` (`name`/`email`) y `name` siempre.

## FieldError
Línea reservada bajo el input (min-height 16px, no salta el layout): mono 11px `--danger`,
`role="status" aria-live="polite"`. Copy en tono de juego («Falta el nombre — con el de
andar por casa vale.»).

## Efecto daño (validación fallida)
Al enviar con errores: inputs con error y botón reciben `.shake` (~.25s, ×2 si repite) y el
botón pasa a `.bevel-danger` con texto `--text-on-accent` durante 300 ms. Patrón React:
contador de golpe en estado para reiniciar la animación (alternar duración .25/.26s).

## SegmentedControl
2 opciones `flex: 1` (48px). Activa: `.bevel-accent` (o `.bevel-accent-2`); inactiva:
`bg-control .inset-ring-2 text-muted`. `aria-pressed`, hover `brightness(1.18)`.

## SuccessPanel
`bg-raised` + ring 3px del acento del flujo; título Silkscreen 13px («✓ MENSAJE ENVIADO»),
cuerpo mono 12px `--text-muted`, acción secundaria como enlace subrayado (≥44px).

## AlphaSignUpForm — Migración v1 → v2
- v1: input + botón emerald `rounded-md`, mensajes rojos `text-red-400`. v2: FieldLabel + `.input` + Button `bevel-accent-2` (morado, flujo suscripción), FieldError con `aria-live` y efecto daño.
- Mantiene i18n interno y su lógica de submit; éxito → SuccessPanel morado con «✓ APUNTADO».
- Microcopy fijo: «Sin spam. Te vas cuando quieras.»
