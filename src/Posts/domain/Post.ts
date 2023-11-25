export interface Post {
  content: string;
  coverImage: {
    src: string;
  } | null;
  date: number;
  draft: boolean;
  summary: string;
  slug: string;
  title: string;
}
