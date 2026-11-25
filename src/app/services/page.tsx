import type { Metadata } from "next";
import { BlurText, Button, Pill } from "@/components/ui";
import { BookingSection, ServiceCard } from "@/components/sections";
import { FAQSection } from "@/components/FAQ";
import { HOME_FAQ, SERVICES } from "@/lib/site";

const title = "Comprehensive Dental Services in Kokapet Hyderabad | Prodontics Dental Clinic";
const description =
  "Prodontics Kokapet Hyderabad offers expert dental surgery, root canal therapy, implants, smile design, aligners, braces, kids dentistry, community outreach and dental tourism.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="flex w-full justify-center bg-surface px-5 pt-8 pb-16 tab:px-20 tab:pt-16">
        <div className="flex w-full max-w-[1120px] flex-col items-center gap-12 wide:max-w-[1240px]">
          <div className="flex w-full max-w-[700px] flex-col items-center gap-8">
            <div className="flex w-full flex-col items-center gap-4">
              <Pill>Trusted by 8000+ people</Pill>
              <BlurText
                as="h1"
                text="Comprehensive {Dental Services in Hyderabad} – From Family Care to Smile Makeovers"
                className="w-full text-center font-lato text-[28px] leading-[1.36] tracking-[-0.56px] text-heading capitalize tab:text-[38px] tab:tracking-[-0.76px] desk:text-[48px] desk:leading-[1.16] desk:tracking-[-0.96px]"
              />
              <p className="w-full text-center font-satoshi text-[18px] leading-[28.8px] tracking-[-0.18px] text-muted">
                At Prodontics, we offer a full range of dental treatments in Kokapet, Hyderabad. From preventive care for your family to advanced
                cosmetic and restorative dentistry, our services are designed to keep your smile healthy and confident.
              </p>
            </div>
            <Button href="/contact">Book Appointment</Button>
          </div>
          <div className="grid w-full grid-cols-1 items-start gap-12 tab:grid-cols-2 desk:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
          <FAQSection items={HOME_FAQ} nested />
        </div>
      </section>
      <BookingSection />
    </>
  );
}
