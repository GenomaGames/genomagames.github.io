import { DraftLabel } from "genoma-games-website";

import { Shell } from "./_shell";

// DraftLabel is absolutely positioned against the card it sits on (see how
// PostItem and PostArticle mount it), so every cell gives it that relative box.
const Card = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <Shell className="p-5">
    <div className="relative mx-auto max-w-sm rounded-md bg-gray-800 p-4 drop-shadow-xl">
      {children}
      <h2 className="text-lg font-bold text-emerald-500">{title}</h2>
      <p className="text-sm text-slate-400">
        The badge pins to the top-right corner of its container.
      </p>
    </div>
  </Shell>
);

export const OnADraft = () => (
  <Card title="Unknown Tales — combat pass">
    <DraftLabel isDraft />
  </Card>
);

export const OnAPublishedPost = () => (
  <Card title="Really New Website">
    <DraftLabel isDraft={false} />
  </Card>
);
