import type { Metadata } from "next";
import { BlurText, Pill } from "@/components/ui";
import { BookingSection } from "@/components/sections";
import { SITE } from "@/lib/site";

const title = "Privacy Policy | Prodontics Dental Specialities, Kokapet";
const description = "How Prodontics Dental Specialities collects, uses and protects the information you share through prodontics.in.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title, description, url: "/privacy-policy" },
};

// DRAFT — the Framer page was an empty draft. Review with the clinic before relying on it.
const UPDATED = "25 November 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="flex w-full justify-center bg-surface px-5 pt-[60px] pb-10 tab:px-20">
        <div className="flex w-full max-w-[720px] flex-col items-center gap-4">
          <Pill>Privacy Policy</Pill>
          <BlurText
            as="h1"
            text="Your {privacy} matters to us"
            className="w-full text-center font-lato text-[28px] leading-[1.36] tracking-[-0.56px] text-heading capitalize tab:text-[38px] tab:tracking-[-0.76px] desk:text-[48px] desk:leading-[1.16] desk:tracking-[-0.96px]"
          />
          <p className="font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-navy-2">Last updated: {UPDATED}</p>
        </div>
      </section>
      <section className="flex w-full justify-center bg-surface px-5 pb-20 tab:px-20">
        <article className="post-body max-w-[924px]">
          <p>
            This policy explains how {SITE.name} (“Prodontics”, “we”, “us”), Kokapet, Hyderabad, handles information you share with us through
            this website, prodontics.in.
          </p>
          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Details you send us</strong> – your name, email address and message when you use the appointment form, and any details you
              share when you call, email or message us on WhatsApp.
            </li>
            <li>
              <strong>Usage data</strong> – anonymous information about how the site is used (pages visited, device and browser type, approximate
              location) collected by Google Analytics.
            </li>
          </ul>
          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiry and schedule or manage your appointment.</li>
            <li>To improve this website and understand which information patients find useful.</li>
          </ul>
          <p>We do not sell or rent your personal information, and we do not use it for unrelated marketing.</p>
          <h2>Services we use</h2>
          <ul>
            <li>Web3Forms – delivers appointment-form messages to our clinic email.</li>
            <li>Google Analytics – measures website traffic using cookies.</li>
            <li>Google Maps – shows our location; Google may collect data when the map loads.</li>
            <li>WhatsApp – if you choose to message us, WhatsApp’s own privacy policy applies.</li>
          </ul>
          <h2>Medical information</h2>
          <p>
            Please do not send detailed medical history through the website form. Clinical records created during your treatment are kept
            confidentially at the clinic in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct or delete the personal information you have shared with us, and you can block or delete cookies in
            your browser settings at any time.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>.
          </p>
        </article>
      </section>
      <BookingSection />
    </>
  );
}
