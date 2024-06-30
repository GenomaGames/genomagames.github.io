export interface Game {
  coverImage: {
    src: string;
  } | null;
  isInDevelopment: boolean;
  name: string;
  releasedAt: Date;
  slug: string;
  summary: string;
}
