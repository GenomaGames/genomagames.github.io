import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="bg-gray-900 bg-gradient-to-b from-gray-900 to-black text-slate-200 font-sans text-base min-h-screen"
    >
      <Head />
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
