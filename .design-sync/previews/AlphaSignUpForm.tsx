import { AlphaSignUpForm } from "genoma-games-website";

import { Main } from "./_shell";

// The Blood & Bytes: Kagura alpha questionnaire — the site's one long form, and
// the reference for how form controls look in this design system: fieldset
// blocks on gray-800, bold labels, dark selects and inputs, emerald submit.
//
// It is a client component with its own state; the card shows the initial,
// empty state. The submitted and error states only exist after interaction.
export const Default = () => (
  <Main>
    <AlphaSignUpForm />
  </Main>
);
