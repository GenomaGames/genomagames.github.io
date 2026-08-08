import { LanguageSelector } from "genoma-games-website";
import { useEffect, useRef } from "react";

import { Viewport } from "./_shell";

// The drawer's open state lives inside the component and only flips on click,
// so the closed trigger is all a static render ever shows — and the trigger is
// a single glyph. `Opened` clicks the trigger once after mount so the card
// actually shows the drawer: the flags, the two locales, and the dimming
// overlay. That is a real click on the real component, not a faked state.
const OpenOnMount = ({ children }: { children: React.ReactNode }) => {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    host.current?.querySelector("button")?.click();
  }, []);

  return (
    <div ref={host} className="contents">
      {children}
    </div>
  );
};

export const Opened = () => (
  <Viewport className="h-96">
    <div className="h-12 w-full bg-linear-to-br from-slate-800 to-gray-900 shadow-md shadow-black">
      <div className="container mx-auto flex h-full max-w-5xl items-center justify-end px-4">
        <OpenOnMount>
          <LanguageSelector />
        </OpenOnMount>
      </div>
    </div>
  </Viewport>
);

export const ClosedInTheHeaderBar = () => (
  <Viewport className="h-96">
    <div className="h-12 w-full bg-linear-to-br from-slate-800 to-gray-900 shadow-md shadow-black">
      <div className="container mx-auto flex h-full max-w-5xl items-center justify-end px-4">
        <LanguageSelector />
      </div>
    </div>
    <div className="px-6 py-4">
      <p className="text-sm text-slate-400">
        Closed state: the trigger is the translate glyph at the right of the bar. The drawer
        slides in from the right edge when it is clicked.
      </p>
    </div>
  </Viewport>
);
