import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";
import { BookingSection, ServicesGrid, StatsSection, TeamSection, Testimonials, WhyChooseHome } from "@/components/sections";
import { FAQSection } from "@/components/FAQ";
import { HOME_FAQ } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Best Dental Clinic in Kokapet Hyderabad | Prodontics Dental Clinic" },
  description:
    "Award-winning dental clinic in Kokapet, Hyderabad. Expert in dental implants, cosmetic dentistry, root canal & smile makeovers. 15+ years experience. Book now!",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Best Dental Clinic in Kokapet Hyderabad | Prodontics Dental Clinic",
    description:
      "Award-winning dental clinic in Kokapet, Hyderabad. Expert in dental implants, cosmetic dentistry, root canal & smile makeovers. 15+ years experience. Book now!",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <ServicesGrid />
      <WhyChooseHome />
      <TeamSection />
      <StatsSection />
      <Testimonials />
      <FAQSection items={HOME_FAQ} />
      <BookingSection />
    </>
  );
}
