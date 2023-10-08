import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="min-h-screen bg-gray-900 bg-gradient-to-b from-gray-900 to-black font-sans text-base text-slate-200"
    >
      <Head />
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
