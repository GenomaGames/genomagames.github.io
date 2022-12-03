export default interface PostItemType {
  slug: string;
  title: string;
  date: string;
  coverImage: {
    src: string;
  };
  excerpt: string;
}
