import type { Metadata } from "next";
import { BookingSection, Testimonials } from "@/components/sections";
import { FAQSection } from "@/components/FAQ";
import { HOME_FAQ } from "@/lib/site";

const title = "Contact Prodontics Dental Clinic | Book Appointment in Kokapet";
const description =
  "Meet Dr. Surya Teja S & our expert dental team. 15+ years experience, 10,000+ smiles transformed. Ethical, patient-first dental care in Kokapet, Hyderabad.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BookingSection map={false} />
      <Testimonials contained />
      <FAQSection
        items={HOME_FAQ}
        stackOnTablet
        sectionClass="tab:max-desk:px-10 tab:max-desk:py-32"
        headClass="tab:max-desk:max-w-[550px]"
        listClass="desk:max-w-[588px]"
      />
      <BookingSection />
    </>
  );
}
