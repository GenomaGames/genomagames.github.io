// Realistic post data for the preview cards, taken from the repo's own
// content under public/posts/. Cover images are inlined as data URIs: the
// preview cards are served standalone, so a /posts/... path would 404.
export interface PostFixture {
  content: string;
  coverImage: { src: string } | null;
  date: number;
  draft: boolean;
  summary: string;
  slug: string;
  title: string;
}

const cover = (from: string, to: string, label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="240" viewBox="0 0 640 240">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/>
      </linearGradient></defs>
      <rect width="640" height="240" fill="url(#g)"/>
      <text x="50%" y="52%" text-anchor="middle" font-family="sans-serif" font-size="34" fill="#ffffff" opacity="0.85">${label}</text>
    </svg>`,
  )}`;

export const content = `
<h2>Devlog #4 — shooting animations</h2>
<p>This week went into the <strong>weapon rig</strong>: the assault rifle now
blends between idle, aim and recoil without the hitch we had when the player
fired while strafing.</p>
<ul>
  <li>Recoil is driven by an additive layer, so it survives any locomotion state.</li>
  <li>Muzzle flash and shell ejection are timed off animation events.</li>
  <li>Aim-down-sights blends in over 120&nbsp;ms — short enough to feel snappy.</li>
</ul>
<blockquote><p>The rule we settled on: if the animation cannot survive being
interrupted on frame one, it does not ship.</p></blockquote>
<h3>What is next</h3>
<p>Reload variants, then the melee stub. Full notes on
<a href="https://genomagames.com">genomagames.com</a>.</p>
<pre><code>public void Fire() {
  animator.SetTrigger("Fire");
  recoil.Add(weapon.recoilCurve);
}</code></pre>
`;

export const post: PostFixture = {
  content,
  coverImage: { src: cover("#065f46", "#3730a3", "Assault rifle shooting") },
  date: Date.UTC(2022, 11, 8),
  draft: false,
  summary:
    "The weapon rig finally blends idle, aim and recoil without hitching when the player fires while strafing.",
  slug: "2022/12/assault-rifle-shooting-animation",
  title: "Assault rifle shooting animation",
};

export const postWithoutCover: PostFixture = {
  ...post,
  coverImage: null,
  slug: "2022/12/really-new-website",
  summary:
    "We have launched a new website! This time developed using Next.js, with the whole devlog archive migrated over.",
  title: "Really New Website",
};

export const draftPost: PostFixture = {
  ...post,
  coverImage: { src: cover("#7c2d12", "#4c1d95", "Rogue Archipelago") },
  draft: true,
  slug: "9999/12/unknown-tales-combat-pass",
  summary:
    "Work in progress: the second combat pass for Unknown Tales, still behind the draft flag.",
  title: "Unknown Tales — combat pass",
};

export const posts: PostFixture[] = [post, postWithoutCover, draftPost];
