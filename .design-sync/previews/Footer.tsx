import { Footer } from "genoma-games-website";

import { Shell } from "./_shell";

// The site footer: copyright on the left, back-to-top button on the right.
export const Default = () => (
  <Shell>
    <Footer />
  </Shell>
);

// `mt-auto` is what pins it to the bottom of the page column — the layout wraps
// it in `flex min-h-screen flex-col` alongside <main>.
export const PinnedToTheBottomOfAPage = () => (
  <Shell>
    <div className="flex h-64 flex-col">
      <main className="mx-auto w-full px-5 pt-4 sm:max-w-2xl">
        <p className="text-slate-300">Short page — the footer still sits at the bottom.</p>
      </main>
      <Footer />
    </div>
  </Shell>
);
