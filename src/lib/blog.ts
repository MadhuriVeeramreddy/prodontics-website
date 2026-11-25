import data from "@/content/blog.json";

export type Post = {
  slug: string;
  title: string;
  heroImage: string | null;
  metaTitle: string;
  metaDescription: string;
  html: string;
  cardImage: string;
  cardTitle: string;
  excerpt: string;
};

/**
 * Blog posts. To add a post: append an entry to src/content/blog.json
 * (body is plain HTML: h2/h3/p/ul/ol/a/strong/img), put images in public/images, rebuild.
 */
export const POSTS = data as Post[];
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
