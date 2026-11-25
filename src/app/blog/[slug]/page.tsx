import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlurText, Reveal } from "@/components/ui";
import { BookingSection } from "@/components/sections";
import { POSTS, getPost } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const img = p.heroImage ? [`/images/${p.heroImage}.webp`] : undefined;
  return {
    title: { absolute: p.metaTitle },
    description: p.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: p.metaTitle, description: p.metaDescription, url: `/blog/${slug}`, images: img },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    image: p.heroImage ? `${SITE.url}/images/${p.heroImage}.webp` : undefined,
    author: { "@type": "Person", name: "Dr. Surya Teja S" },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${slug}`,
  };
  return (
    <>
      <section className="flex w-full justify-center bg-surface px-5 pt-10 pb-10 tab:px-[165px] tab:pt-[60px] tab:pb-0 desk:pb-[30px]">
        <BlurText
          as="h1"
          text={p.title}
          className="w-full max-w-[700px] text-center font-lato text-[28px] leading-[1.36] tracking-[-0.56px] text-heading capitalize tab:text-[38px] tab:tracking-[-0.76px] desk:text-[48px] desk:leading-[1.16] desk:tracking-[-0.96px]"
        />
      </section>
      <section className="flex w-full justify-center bg-surface px-5 pt-[30px] pb-20 tab:px-[50px] desk:px-[165px]">
        <article className="flex w-full max-w-[924px] flex-col gap-6">
          {p.heroImage && (
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/${p.heroImage}.webp`} alt={p.title} className="aspect-[924/552] w-full rounded-[16px] object-cover" />
            </Reveal>
          )}
          <div className="post-body" dangerouslySetInnerHTML={{ __html: p.html }} />
        </article>
      </section>
      <BookingSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
