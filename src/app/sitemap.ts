import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { POSTS } from "@/lib/blog";

export const dynamic = "force-static";

const PAGES = [
  "", "root-canal", "dental-surgery", "community-outreach", "dental-tourism", "braces", "aligners", "kids-dentistry",
  "smile-design", "dental-implants", "wisdom-teeth-removal", "contact", "services", "blog", "about", "vision", "privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...PAGES.map((p) => `${SITE.url}/${p}`), ...POSTS.map((p) => `${SITE.url}/blog/${p.slug}`)].map((url) => ({ url }));
}
