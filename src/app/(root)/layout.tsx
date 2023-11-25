import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import { Metadata, Viewport } from "next";
import Script from "next/script";
import React from "react";

config.autoAddCss = false;

interface Props extends React.PropsWithChildren {}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#603cba",
};

export const metadata: Metadata = {
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_BASE_URL}/feed.xml`,
    },
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  openGraph: {
    images: "/icon.png",
  },
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    default: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
  },
  twitter: {
    card: "summary",
    creator: `@${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    title: process.env.NEXT_PUBLIC_SITE_NAME,
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/icon.png`],
  },
};

const RootLayout: React.JSXElementConstructor<Props> = ({
  children,
}: Props) => {
  return (
    <html
      lang="en"
      className="min-h-screen bg-gray-900 bg-gradient-to-b from-gray-900 to-black font-sans text-base text-slate-200"
    >
      <body className="min-h-screen">
        <div id="top"></div>
        <div className="flex min-h-screen flex-col">
          <main className="mx-auto mt-16 w-full px-5 pt-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
            {children}
          </main>
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

export default RootLayout;
