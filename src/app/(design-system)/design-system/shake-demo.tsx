"use client";

import { useState } from "react";

type Props = object;

/**
 * `shake` fires once per hit, so a static example only ever plays on load and
 * nobody gets to see it. Remounting the button on every press is what replays
 * it: the count is a key, not state anybody reads.
 */
const ShakeDemo: React.JSXElementConstructor<Props> = (_props: Props) => {
  const [hits, setHits] = useState(0);

  return (
    <button
      key={hits}
      type="button"
      className="bevel-danger shake flex h-16 w-40 items-center justify-center text-[12px]"
      onClick={() => setHits((count) => count + 1)}
    >
      ¡Golpe!
    </button>
  );
};

export default ShakeDemo;
