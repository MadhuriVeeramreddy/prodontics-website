import type { Metadata } from "next";
import { Rich, ServiceHero, layoutVars } from "@/components/ServicePage";
import { CheckList, BookingSection } from "@/components/sections";
import { FAQSection } from "@/components/FAQ";
import { Button, Reveal, SectionHead } from "@/components/ui";

const title = "Community Outreach & Dental Awareness Programs | Prodontics";
const description =
  "Prodontics Dental Specialities actively participates in community outreach programs promoting oral health awareness, preventive care, and free dental check-ups in Hyderabad.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/community-outreach" },
  openGraph: { title, description, url: "/community-outreach" },
};

const LAYOUT = { heroImg: [[350, 233], [864, 650], [1120, 746], [1240, 680]], card: [350, 864, 536, 550], stepsImg: [null, null, null, null], faq: [350, 488, 488, 708] };
const card = "flex w-full flex-col items-start gap-4 rounded-[24px] bg-[rgba(224,222,222,0.2)] p-6 shadow-[0_2px_2px_0_#0d8dc4] tab:max-desk:max-w-[864px]";
const cardTitle = "w-full font-inter text-[22px] leading-[26.4px] tracking-[-1.1px] text-heading";
const body = "w-full font-satoshi text-[18px] leading-[27px] tracking-[-0.18px] text-muted";

export default function CommunityOutreachPage() {
  return (
    <div className="contents" style={layoutVars(LAYOUT)}>
      <ServiceHero
        pad={[0, 64, 128]}
        title="Community Outreach at Prodontics, Kokapet, Hyderabad"
        text="At Prodontics, we believe that oral health is a universal right, not a privilege. Through our **community outreach programs in Kokapet, Gachibowli, Narsingi, Nanakramguda, and across Hyderabad**, we extend quality dental care, awareness, and preventive education to schools, local organizations, and underserved groups. Our mission is to build healthier smiles within our community."
        image="AcWjZ67ahiwfNHY2SWWKoZqDs"
        imageAlt="Prodontics community dental camp"
      />
      <section className="flex w-full justify-center bg-surface px-5 pt-16 tab:px-20 tab:pt-20 desk:pt-16 desk:pb-20">
        <div className="flex w-full max-w-[1120px] flex-col items-center gap-16 tab:gap-20 wide:max-w-[1240px]">
          <SectionHead
            pill="Healthy Smiles for All Ages"
            title="Comprehensive {Family Dentistry} in Hyderabad"
            intro="At Prodontics, Hyderabad, our family dental care covers everything from routine check-ups and cleanings to advanced treatments."
          />
          <div className="grid w-full grid-cols-1 items-center justify-items-center gap-12 desk:grid-cols-2">
            <Reveal className={card}>
              <h2 className={cardTitle}>What is Community Outreach?</h2>
              <div className="w-full">
                <p className={body}>
                  Community outreach in dentistry focuses on delivering preventive care, education, and accessible treatments outside the clinic
                  walls.{" "}
                  <strong className="font-bold">
                    At Prodontics, our outreach initiatives include dental camps, oral hygiene workshops, and awareness programs designed for
                    schools, workplaces, and communities.
                  </strong>
                </p>
                <p className={body}>
                  It is important because it bridges the gap in oral healthcare access by raising awareness, preventing dental issues at early
                  stages, and ensuring every individual has the opportunity for better oral health and overall well-being.
                </p>
              </div>
            </Reveal>
            <Reveal className={card} delay={0.1}>
              <h2 className={cardTitle}>Community Outreach at Prodontics</h2>
              <CheckList
                className="w-full gap-4 tab:max-desk:gap-4"
                items={[
                  "Free or low-cost dental screenings for early detection",
                  "Oral health education and preventive care tips for families and children",
                  "Access to professional dentists within the local community",
                  "Distribution of oral hygiene kits and learning materials",
                  "Reducing long-term dental problems by encouraging preventive care",
                ]}
              />
            </Reveal>
            <Reveal className={card}>
              <h2 className={cardTitle}>Patient-Centered Care</h2>
              <p className={body}>
                <Rich text="Our outreach is not just about treatment—it’s about making lasting community impact. We believe in:" />
              </p>
              <CheckList
                className="w-full gap-4 tab:max-desk:gap-4"
                items={[
                  "Compassionate care for children, adults, and senior citizens",
                  "Multilingual communication for better understanding",
                  "Prioritized appointments for outreach participants",
                  "Affordable treatment options for low-income families",
                ]}
              />
            </Reveal>
          </div>
          <Button href="/contact">Book Appointment Now</Button>
        </div>
      </section>
      <FAQSection
        stackOnTablet
        listClass="tab:max-desk:max-w-[var(--faq1)] desk:max-w-[var(--faq2)] wide:max-w-[var(--faq3)]"
        items={[
          {
            q: "What type of community programs does Prodontics conduct?",
            a: "We organize free dental check-ups, oral health awareness workshops, school dental camps, and preventive care programs.",
          },
          {
            q: "Who can participate in community outreach programs?",
            a: "Our programs are open to schools, NGOs, residential societies, and local communities across Hyderabad.",
          },
          {
            q: "How often do you conduct these programs?",
            a: "We plan regular outreach camps across Kokapet, Gachibowli, Narsingi, and Nanakramguda based on local demand.",
          },
          {
            q: "Can my organization partner with Prodontics for dental awareness sessions?",
            a: "Yes, we welcome partnerships with schools, businesses, and social groups to promote oral health education.",
          },
        ]}
      />
      <BookingSection />
    </div>
  );
}
