import type { Metadata } from "next";
import Link from "next/link";
import { BlurText, Reveal } from "@/components/ui";
import { BookingSection } from "@/components/sections";
import { FAQSection } from "@/components/FAQ";
import { HOME_FAQ } from "@/lib/site";
import { POSTS } from "@/lib/blog";

const title = "Dental Blog | Expert Oral Health Insights & Treatment Guides – Prodontics";
const description =
  "Read expert dental blogs from Prodontics covering dental implants, treatment costs, oral health tips, and patient education backed by clinical experience.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title, description, url: "/blog", images: ["/images/9FZr9jIrQVUZKUhAqWvEsI4m8.webp"] },
};

export default function BlogPage() {
  return (
    <>
      <section className="flex w-full justify-center bg-surface px-10 pb-[30px] tab:px-20 tab:pb-[60px]">
        <div className="flex w-full max-w-[700px] flex-col items-center gap-5 pt-[50px]">
          <BlurText
            as="h1"
            text="Expert Dental Care Blogs – Tips, Treatments & Costs in Hyderabad"
            className="w-full text-center font-lato text-[28px] leading-[1.36] tracking-[-0.56px] text-heading capitalize tab:text-[38px] tab:tracking-[-0.76px] desk:text-[48px] desk:leading-[1.16] desk:tracking-[-0.96px]"
          />
          <p className="w-full text-center font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-navy-2">
            Stay informed with our dental care blog, covering everything from wisdom teeth removal costs to kids’ dentistry, smile makeovers, braces,
            implants, and preventive care.
          </p>
        </div>
      </section>
      <section className="flex w-full justify-center bg-surface px-[18px] py-[30px] tab:pr-10 tab:pb-0 tab:pl-[30px] desk:px-20">
        <div className="grid w-full max-w-[1120px] auto-rows-fr grid-cols-1 gap-5 tab:grid-cols-2 wide:max-w-[1240px]">
          {POSTS.map((p) => (
            <Reveal key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex flex-col">
                <div className="overflow-hidden rounded-[16px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/${p.cardImage}.webp`}
                    alt={p.cardTitle}
                    className="aspect-[550/309] w-full rounded-[16px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-4 px-2 py-8 tab:px-4">
                  <h3 className="font-inter text-[16px] leading-[1.2] tracking-[-0.8px] text-navy desk:text-[22px] desk:tracking-[-1.1px]">{p.cardTitle}</h3>
                  <p className="font-inter text-[16px] leading-[24px] tracking-[-0.1px] text-[rgba(10,10,10,0.7)]">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <FAQSection items={HOME_FAQ} sectionClass="max-tab:px-10 max-tab:py-[60px] tab:max-desk:py-32" headClass="tab:max-desk:max-w-[460px]" listClass="tab:max-w-[460px] tab:flex-1 desk:max-w-[588px]" />
      <BookingSection />
    </>
  );
}
