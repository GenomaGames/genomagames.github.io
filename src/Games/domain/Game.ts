export interface Game {
  coverImage: {
    src: string;
  } | null;
  isInDevelopment: boolean;
  name: string;
  releasedAt: Date | null;
  slug: string;
  summary: string;
}
