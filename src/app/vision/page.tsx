import type { Metadata } from "next";
import { IntroHero } from "@/components/IntroHero";
import { BookingSection } from "@/components/sections";

const title = "Our Vision | Ethical, Advanced & Patient-Centric Dentistry – Prodontics";
const description =
  "Discover the vision of Prodontics—delivering ethical, advanced, and patient-centric dental care in Kokapet, Hyderabad with a focus on long-term oral health.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/vision" },
  openGraph: { title, description, url: "/vision" },
};

const p = "w-full text-justify font-satoshi text-[18px] leading-[28.8px] tracking-[-0.18px] text-muted";

export default function VisionPage() {
  return (
    <>
      <IntroHero
        pill="Vision"
        title="Vision - Dr. Surya teja S"
        heights={[295, 520, 520]}
        images={[
          { id: "Zv4Mb1B8YzNi29cxbyXesDH0Fb8", alt: "Dr. Surya Teja S", className: "contrast-[1.15]" },
          { id: "tfibbN8EZs15vuMsWNONlLNucpU", alt: "Prodontics Dental Specialities clinic" },
        ]}
      >
        <div className="flex w-full flex-col">
          <p className={p}>
            The greatest legacy I shall leave is my everlasting signature in your smile – a timeless mark of{" "}
            <strong className="font-bold">trust, quality, love, craftsmanship &amp; surgical expertise</strong>.
          </p>
          <p className={p}>To honour this commitment, our clinic embraces the finest treatment modalities in dentistry, collaborating with highly experienced specialists, globally renowned dental laboratories and advanced technologies to deliver outcomes that last for years.</p>
          <p className={p}>I thrive on word of mouth, where every patient experience speaks volumes. In fact, those stories are the moments I cherish as the accomplishment of my pursuit in dentistry past 15 years and many more to come.</p>
        </div>
      </IntroHero>
      <BookingSection />
    </>
  );
}
