import React from "react";

/**
 * Living catalog of the DS v2 vocabulary. It is not scaffolding: it stays for
 * as long as the migration lasts and after it, as the place to check what a
 * token or a utility actually looks like. Nothing links to it — it is reached
 * by typing its URL, in production too — and its copy is deliberately outside
 * i18n, because it is a tool for whoever builds the site.
 */

interface ScaleEntry {
  name: string;
  roles: string[];
}

interface ScaleFamily {
  family: string;
  entries: ScaleEntry[];
}

const SCALE: ScaleFamily[] = [
  {
    family: "Navy — superficies y contornos",
    entries: [
      { name: "navy-950", roles: ["--surface-page"] },
      { name: "navy-900", roles: ["--surface-sunken", "--surface-lo"] },
      { name: "navy-850", roles: ["--surface-ground", "--text-on-accent"] },
      { name: "navy-800", roles: [] },
      { name: "navy-750", roles: ["--surface-raised"] },
      { name: "navy-700", roles: ["--surface-control"] },
      { name: "navy-650", roles: ["--surface-active"] },
      { name: "navy-500", roles: ["--border-default"] },
      { name: "navy-400", roles: ["--border-strong", "--surface-hi"] },
    ],
  },
  {
    family: "Verde — acción principal",
    entries: [
      { name: "green-300", roles: [] },
      { name: "green-400", roles: ["--accent-hi", "--accent-text"] },
      { name: "green-500", roles: ["--accent"] },
      { name: "green-700", roles: ["--accent-lo"] },
    ],
  },
  {
    family: "Lima — enlaces",
    entries: [
      { name: "lime-300", roles: ["--link-hover"] },
      { name: "lime-400", roles: ["--link"] },
    ],
  },
  {
    family: "Morado — suscripción y alternativa",
    entries: [
      { name: "purple-300", roles: [] },
      { name: "purple-400", roles: ["--accent-2-hi"] },
      { name: "purple-600", roles: ["--accent-2"] },
      { name: "purple-800", roles: ["--accent-2-lo"] },
    ],
  },
  {
    family: "Cyan — texto frío, info y foco",
    entries: [
      { name: "cyan-100", roles: ["--text-secondary"] },
      { name: "cyan-200", roles: ["--info"] },
      { name: "cyan-400", roles: ["--focus"] },
      { name: "cyan-700", roles: [] },
    ],
  },
  {
    family: "Ámbar — aviso",
    entries: [
      { name: "amber-300", roles: [] },
      { name: "amber-400", roles: ["--warning"] },
      { name: "amber-700", roles: [] },
    ],
  },
  {
    family: "Rojo — daño y error",
    entries: [
      { name: "red-300", roles: ["--danger-hi"] },
      { name: "red-400", roles: ["--danger"] },
      { name: "red-600", roles: [] },
      { name: "red-800", roles: ["--danger-lo"] },
    ],
  },
  {
    family: "Neutros",
    entries: [
      { name: "white", roles: ["--text-primary"] },
      { name: "muted-400", roles: ["--text-muted"] },
    ],
  },
];

interface ButtonVariant {
  className: string;
  label: string;
}

const BUTTON_VARIANTS: ButtonVariant[] = [
  { className: "btn bevel-accent", label: "bevel-accent" },
  { className: "btn bevel-accent-2", label: "bevel-accent-2" },
  { className: "btn bevel-danger", label: "bevel-danger" },
  { className: "btn text-accent inset-ring-3", label: "contorno" },
];

// `:hover` and `:active` only exist while the pointer is on the control, so the
// catalog reproduces their declared effect inline to show all four states at
// once. The interactive button of each row is the one labelled «reposo».
const HOVER_STYLE: React.CSSProperties = { filter: "brightness(1.12)" };
const ACTIVE_STYLE: React.CSSProperties = {
  filter: "brightness(0.85)",
  transform: "translateY(2px)",
};

interface SectionProps extends React.PropsWithChildren {
  index: number;
  note?: string;
  title: string;
}

/** Section titles alternate green and purple, following the DNA helix. */
const Section: React.JSXElementConstructor<SectionProps> = ({
  children,
  index,
  note,
  title,
}: SectionProps) => (
  <section className="flex flex-col gap-4">
    <h2
      className="font-pixel text-[clamp(18px,3vw,24px)] uppercase"
      style={{
        color: index % 2 === 0 ? "var(--accent-text)" : "var(--accent-2-hi)",
      }}
    >
      {title}
    </h2>
    {note !== undefined && (
      <p className="text-muted max-w-prose text-[12px] leading-[1.75]">
        {note}
      </p>
    )}
    {children}
  </section>
);

interface FigureProps extends React.PropsWithChildren {
  caption: string;
}

const Figure: React.JSXElementConstructor<FigureProps> = ({
  caption,
  children,
}: FigureProps) => (
  <figure className="flex flex-col gap-2">
    <div className="bg-ground flex flex-wrap items-center gap-4 p-4">
      {children}
    </div>
    <figcaption className="field-label">{caption}</figcaption>
  </figure>
);

const ColorSwatch: React.JSXElementConstructor<{ entry: ScaleEntry }> = ({
  entry,
}: {
  entry: ScaleEntry;
}) => (
  <li className="bg-ground flex items-center gap-4 p-3 inset-ring-2">
    <span
      aria-hidden
      className="inset-ring-strong h-12 w-12 shrink-0"
      style={{ background: `var(--color-${entry.name})` }}
    />
    <span className="flex min-w-0 flex-col gap-1">
      <code className="text-primary text-[12px]">--color-{entry.name}</code>
      <span className="text-muted text-[11px]">
        {entry.roles.length === 0
          ? "sin rol semántico"
          : entry.roles.join(" · ")}
      </span>
    </span>
  </li>
);

type Props = object;

const DesignSystemPage: React.JSXElementConstructor<Props> = (
  _props: Props,
) => (
  <main className="mx-auto flex max-w-4xl flex-col gap-12 px-5 py-12">
    <header className="flex flex-col gap-3">
      <h1 className="font-display text-[clamp(24px,5vw,34px)] leading-tight">
        Catálogo del sistema de diseño v2
      </h1>
      <p className="text-muted max-w-prose text-[12px] leading-[1.75]">
        Referencia viva del vocabulario: tokens, tipografías y utilidades tal
        como quedan en <code>src/styles/tokens.css</code> y{" "}
        <code>src/styles/utilities.css</code>. Herramienta interna, sin
        traducir, a la que no enlaza nada.
      </p>
    </header>

    <Section
      index={0}
      title="Tipografías"
      note="Silkscreen 700 siempre en MAYÚSCULAS para labels, títulos, chips y botones; Pixelify Sans 600 para titulares editoriales; IBM Plex Mono 400 y 500 para cuerpo, metadatos e inputs."
    >
      <Figure caption="font-pixel — Silkscreen 700">
        <span className="font-pixel text-primary text-[24px] uppercase">
          Genoma Games 0123
        </span>
      </Figure>
      <Figure caption="font-display — Pixelify Sans 600">
        <span className="font-display text-primary text-[34px]">
          Blood &amp; Bytes: Kagura
        </span>
      </Figure>
      <Figure caption="font-mono-ui — IBM Plex Mono 400 y 500">
        <span className="font-mono-ui text-primary text-[14px] font-normal">
          Cuerpo en peso 400 — the quick brown fox 0123
        </span>
        <span className="font-mono-ui text-primary text-[14px] font-medium">
          Énfasis en peso 500 — the quick brown fox 0123
        </span>
      </Figure>
      <Figure caption="Escala de tamaños">
        <span className="flex flex-col items-start gap-2">
          <span className="font-pixel text-primary text-[14px] uppercase">
            Botón 14px
          </span>
          <span className="font-pixel text-primary text-[clamp(18px,3vw,24px)] uppercase">
            H2 de sección clamp(18→24px)
          </span>
          <span className="font-mono-ui text-primary text-[14px]">
            Cuerpo 12px (14px en desktop)
          </span>
          <span className="font-mono-ui text-muted text-[11px]">
            Meta 10–11px
          </span>
          <span className="chip chip-devlog">Chip 9px</span>
          <span className="field-label">Field label 10px</span>
        </span>
      </Figure>
    </Section>

    <Section
      index={1}
      title="Escala de color"
      note="Cada valor con el rol semántico que apunta a él. Los valores sin rol quedan disponibles para composiciones puntuales; la regla es superficie navy, texto frío y un acento por bloque."
    >
      {SCALE.map((family) => (
        <div key={family.family} className="flex flex-col gap-3">
          <h3 className="field-label">{family.family}</h3>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-2">
            {family.entries.map((entry) => (
              <ColorSwatch key={entry.name} entry={entry} />
            ))}
          </ul>
        </div>
      ))}
    </Section>

    <Section
      index={2}
      title="Biseles y contornos"
      note="Radius 0 en todo. La profundidad es siempre un bisel inset de 2px —luz arriba-izquierda, sombra abajo-derecha— y los contornos son box-shadow interior, nunca border: así no mueven el layout."
    >
      <Figure caption="bevel-raised · bevel-sunken">
        <span className="bevel-raised bg-control text-primary flex h-16 w-40 items-center justify-center text-[12px]">
          bevel-raised
        </span>
        <span className="bevel-sunken bg-control text-primary flex h-16 w-40 items-center justify-center text-[12px]">
          bevel-sunken
        </span>
      </Figure>
      <Figure caption="bevel-accent · bevel-accent-2 · bevel-danger">
        <span className="bevel-accent flex h-16 w-40 items-center justify-center text-[12px]">
          bevel-accent
        </span>
        <span className="bevel-accent-2 flex h-16 w-40 items-center justify-center text-[12px]">
          bevel-accent-2
        </span>
        <span className="bevel-danger flex h-16 w-40 items-center justify-center text-[12px]">
          bevel-danger
        </span>
      </Figure>
      <Figure caption="inset-ring-2 · inset-ring-3 · inset-ring-strong">
        <span className="bg-sunken text-primary flex h-16 w-40 items-center justify-center text-[12px] inset-ring-2">
          inset-ring-2
        </span>
        <span className="bg-sunken text-primary flex h-16 w-40 items-center justify-center text-[12px] inset-ring-3">
          inset-ring-3
        </span>
        <span className="inset-ring-strong bg-sunken text-primary flex h-16 w-40 items-center justify-center text-[12px]">
          inset-ring-strong
        </span>
      </Figure>
      <Figure caption="Superficies: bg-page · bg-ground · bg-sunken · bg-raised · bg-control">
        <span className="bg-page text-primary flex h-16 w-32 items-center justify-center text-[11px] inset-ring-2">
          page
        </span>
        <span className="bg-ground text-primary flex h-16 w-32 items-center justify-center text-[11px] inset-ring-2">
          ground
        </span>
        <span className="bg-sunken text-primary flex h-16 w-32 items-center justify-center text-[11px] inset-ring-2">
          sunken
        </span>
        <span className="bg-raised text-primary flex h-16 w-32 items-center justify-center text-[11px] inset-ring-2">
          raised
        </span>
        <span className="bg-control text-primary flex h-16 w-32 items-center justify-center text-[11px] inset-ring-2">
          control
        </span>
      </Figure>
    </Section>

    <Section
      index={3}
      title="Chips"
      note="Silkscreen 700 a 9px, contorno interior del color de la familia. chip-status añade aire y tracking para los estados de una pieza."
    >
      <Figure caption="chip-devlog · chip-postmortem · chip-tutorial · chip-experience">
        <span className="chip chip-devlog">Devlog</span>
        <span className="chip chip-postmortem">Postmortem</span>
        <span className="chip chip-tutorial">Tutorial</span>
        <span className="chip chip-experience">Experiencia</span>
      </Figure>
      <Figure caption="chip chip-status — estado de una pieza">
        <span
          className="chip chip-status"
          style={{
            boxShadow: "inset 0 0 0 2px var(--warning)",
            color: "var(--warning)",
          }}
        >
          Borrador
        </span>
      </Figure>
    </Section>

    <Section
      index={4}
      title="Botones"
      note="Altura mínima 48px, texto Silkscreen 14px en mayúsculas. El hover aclara un 12%, el pulsado oscurece un 15% y baja 2px, y el deshabilitado baja la opacidad y pone el cursor en espera."
    >
      {BUTTON_VARIANTS.map((variant) => (
        <Figure key={variant.label} caption={variant.label}>
          <span className="flex flex-col items-center gap-2">
            <button type="button" className={variant.className}>
              Reposo
            </button>
            <span className="field-label">reposo</span>
          </span>
          <span className="flex flex-col items-center gap-2">
            <button
              type="button"
              className={variant.className}
              style={HOVER_STYLE}
            >
              Hover
            </button>
            <span className="field-label">hover</span>
          </span>
          <span className="flex flex-col items-center gap-2">
            <button
              type="button"
              className={variant.className}
              style={ACTIVE_STYLE}
            >
              Pulsado
            </button>
            <span className="field-label">pulsado</span>
          </span>
          <span className="flex flex-col items-center gap-2">
            <button type="button" className={variant.className} disabled>
              Deshabilitado
            </button>
            <span className="field-label">deshabilitado</span>
          </span>
        </Figure>
      ))}
    </Section>

    <Section
      index={5}
      title="Inputs"
      note="48px de alto sobre bg-sunken con contorno interior de 2px. El error se declara con aria-invalid, que es lo que cambia el contorno a rojo, y se acompaña de un mensaje con role=status."
    >
      <Figure caption="input — en reposo">
        <span className="flex flex-col gap-2">
          <label className="field-label" htmlFor="catalog-input">
            Nombre en pantalla
          </label>
          <input
            className="input w-72"
            defaultValue="ZAGATO"
            id="catalog-input"
            readOnly
          />
        </span>
      </Figure>
      <Figure caption='input[aria-invalid="true"] — con error'>
        <span className="flex flex-col gap-2">
          <label className="field-label" htmlFor="catalog-input-error">
            Correo
          </label>
          <input
            aria-invalid="true"
            className="input w-72"
            defaultValue="no-es-un-correo"
            id="catalog-input-error"
            readOnly
          />
          <span className="text-danger text-[11px]" role="status">
            Ese correo no tiene forma de correo.
          </span>
        </span>
      </Figure>
    </Section>

    <Section
      index={6}
      title="Cristal y ranura"
      note="El cristal es un velo translúcido con desenfoque de 3px; glass-bezel le añade el filo de luz superior. La ranura es el separador de 8px hundido en la superficie."
    >
      <div
        className="p-6"
        style={{
          background:
            "repeating-linear-gradient(45deg, var(--color-navy-800) 0 12px, var(--color-navy-700) 12px 24px)",
        }}
      >
        <div className="glass glass-bezel text-primary p-6 text-[12px]">
          glass + glass-bezel sobre un fondo con textura
        </div>
      </div>
      <Figure caption="groove — separador de 8px">
        <span className="groove w-full" />
      </Figure>
    </Section>

    <Section
      index={7}
      title="Animaciones"
      note="Las tres animaciones del sistema. Con la reducción de movimiento activada en el sistema operativo, las tres se detienen y esta sección queda quieta."
    >
      <Figure caption="blink — cursor y llamadas a la acción">
        <span className="font-pixel text-accent blink text-[24px] uppercase">
          Pulsa start ▮
        </span>
      </Figure>
      <Figure caption="shake — daño (se dispara una vez, .25s)">
        <span className="bevel-danger shake flex h-16 w-40 items-center justify-center text-[12px]">
          ¡Golpe!
        </span>
      </Figure>
      <Figure caption="block-fade — bloques de carga">
        <span className="flex gap-2">
          <span className="bg-raised block-fade h-8 w-8 inset-ring-2" />
          <span
            className="bg-raised block-fade h-8 w-8 inset-ring-2"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="bg-raised block-fade h-8 w-8 inset-ring-2"
            style={{ animationDelay: "0.4s" }}
          />
        </span>
      </Figure>
    </Section>

    <Section
      index={8}
      title="Foco"
      note="El foco visible es global: contorno cyan de 3px separado 2px del elemento, en cualquier página y sobre cualquier control. Recórrelo con el tabulador."
    >
      <Figure caption=":focus-visible — global, sin clase que lo active">
        <button type="button" className="btn bevel-accent">
          Enfócame
        </button>
        <input className="input w-56" defaultValue="Y a mí" readOnly />
        <a className="text-accent text-[12px] underline" href="#">
          Y a mí también
        </a>
      </Figure>
    </Section>
  </main>
);

export default DesignSystemPage;
