import { Header } from "genoma-games-website";

import { Viewport } from "./_shell";

// The site's fixed top bar: logo, "Games" link, X link and the language
// selector. It is `position: fixed`, so it needs a containing block (Viewport)
// to stay inside the card — in the app it pins to the window.
export const Default = () => (
  <Viewport className="h-40">
    <Header />
  </Viewport>
);

// How the layout actually composes it: the header floats over the page, and
// content starts below it (see the mt-16 on <main> in the locale layout).
export const OverPageContent = () => (
  <Viewport className="h-64">
    <Header />
    <main className="mx-auto mt-16 w-full px-5 pt-4 sm:max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Devlog</h1>
      <p className="text-slate-300">
        Page content scrolls underneath the bar, which keeps its shadow over it.
      </p>
    </main>
  </Viewport>
);
