import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/globals.css";

import { ParsedUrlQuery } from "node:querystring";

import { config } from "@fortawesome/fontawesome-svg-core";
import { Metadata, Viewport } from "next";
import Script from "next/script";
import { unstable_setRequestLocale } from "next-intl/server";

import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import { locales } from "@/src/i18n";

config.autoAddCss = false;

interface Params extends ParsedUrlQuery {
  locale: string;
}

interface Props extends React.PropsWithChildren {
  params: Promise<Params>;
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#603cba",
};

if (process.env.NEXT_PUBLIC_BASE_URL === undefined) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": `${baseUrl}/feed.xml`,
    },
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  metadataBase: new URL(baseUrl),
  openGraph: {
    images: "/icon.png",
  },
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    default: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
  },
  twitter: {
    card: "summary",
    creator: `@${process.env.NEXT_PUBLIC_X_USERNAME}`,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    title: process.env.NEXT_PUBLIC_SITE_NAME,
    images: [`${baseUrl}/icon.png`],
  },
};

export const generateStaticParams = async (): Promise<Params[]> => {
  const staticParams: Params[] = locales.map((locale) => ({ locale }));

  return staticParams;
};

const LocaleLayout: React.JSXElementConstructor<Props> = async (props: Props) => {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  unstable_setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className="min-h-screen bg-gray-900 bg-gradient-to-b from-gray-900 to-black font-sans text-base text-slate-200"
    >
      <body className="min-h-screen">
        <div id="top"></div>
        <Header />
        <div className="flex min-h-screen flex-col">
          <main className="mx-auto mt-16 w-full px-5 pt-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
            {children}
          </main>
          <Footer />
        </div>
      </body>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `}
      </Script>
    </html>
  );
};

export default LocaleLayout;
