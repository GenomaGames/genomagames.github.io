import "@/src/styles/globals.css";

import { Metadata, Viewport } from "next";

type Props = React.PropsWithChildren;

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#02080b",
};

export const metadata: Metadata = {
  description:
    "Catálogo del vocabulario visual del sistema de diseño v2 de Genoma Games.",
  // Herramienta interna: se llega escribiendo la URL, no desde un buscador.
  robots: { follow: false, index: false },
  title: "Catálogo del sistema de diseño v2",
};

/**
 * The catalog lives outside `[locale]`: it is an internal reference, it carries
 * no translations and it must not inherit the v1 shell it documents replacing.
 */
const CatalogLayout: React.JSXElementConstructor<Props> = ({
  children,
}: Props) => (
  <html lang="es" data-scroll-behavior="smooth" className="bg-page">
    <body className="bg-page font-mono-ui text-secondary min-h-screen">
      {children}
    </body>
  </html>
);

export default CatalogLayout;
