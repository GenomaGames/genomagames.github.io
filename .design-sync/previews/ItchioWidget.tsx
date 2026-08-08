import { ItchioWidget } from "genoma-games-website";

import { Main } from "./_shell";

// A thin wrapper over itch.io's embed iframe. The frame loads from itch.io at
// render time, so the card shows the real embed when the network allows and an
// empty box otherwise. One cell on purpose: a second frame to the same game
// trips itch.io's rate limit and renders "429 Too Many Requests".
//
// Colours are the ones the Genoma Invaders page passes
// (src/app/[locale]/(main)/games/genoma-invaders/page.tsx).
export const GenomaInvaders = () => (
  <Main>
    <ItchioWidget
      backgroundColor="1f2937"
      borderColor="111827"
      borderSize={5}
      buttonColor="1de9a5"
      className="mx-auto mb-4"
      gameId={726484}
      textColor="1de9a5"
    >
      <a href="https://genomagames.itch.io/genoma-invaders">Genoma Invaders by Genoma Games</a>
    </ItchioWidget>
  </Main>
);
