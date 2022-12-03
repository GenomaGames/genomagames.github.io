export default interface PostType {
  content: string;
  coverImage: {
    src: string;
  } | null;
  date: number;
  draft: boolean;
  excerpt: string;
  slug: string;
  title: string;
}
