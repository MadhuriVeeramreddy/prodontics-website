import type { Metadata } from "next";
import { InfoCards, Recovery, ServiceHero, Steps, layoutVars } from "@/components/ServicePage";
import { PhoneNotch } from "@/components/HomeHero";
import { FAQSection } from "@/components/FAQ";
import { BookingSection } from "@/components/sections";

const title = "Prodontics Dental Clinic Kokapet Hyderabad | Expert Family Dentistry & Implants";
const description =
  "Experience high-quality, ethical dental care at Prodontics, Kokapet, Hyderabad. Visit our top-rated clinic for implants, family dentistry, smile design, aligners and advanced treatments.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/wisdom-teeth-removal" },
  openGraph: { title, description, url: "/wisdom-teeth-removal" },
};

const AVATARS = ["kIBiy2xM79Ac692vRBBeMc3YFw8", "oUkBi1c8nERocfQrJWNLxZ9Fipw", "iABb6ejla3A5ZzE4zgxiPqBaYHI", "d4SpmpLmhUfMZkWsTOukrdAmhg", "iABb6ejla3A5ZzE4zgxiPqBaYHI"];

/** "+456 Happy Patients" tab cut into the image's bottom-left corner. */
function PatientsNotch() {
  const corner = "radial-gradient(circle at 100% 0, transparent 23.5px, var(--color-surface) 24px)";
  return (
    <div className="absolute bottom-0 left-0 z-10 h-14 w-[163px] rounded-tr-[24px] bg-surface">
      <span className="absolute -top-6 left-0 size-6" style={{ background: corner }} aria-hidden />
      <span className="absolute bottom-0 -right-6 size-6" style={{ background: corner }} aria-hidden />
      <div className="absolute top-3 left-0 flex flex-col items-center gap-1">
        <div className="flex">
          {AVATARS.map((id, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={`/images/${id}.webp`} alt="" className={`size-10 rounded-[32px] object-cover ${i ? "-ml-3" : ""}`} />
          ))}
        </div>
        <p className="font-satoshi text-[14px] leading-[21px] tracking-[-0.07px] whitespace-nowrap text-ink-2">+456 Happy Patients</p>
      </div>
    </div>
  );
}

const LAYOUT = { heroImg: [[350, 500], [864, 650], [1120, 500], [1240, 680]], card: [350, 740, 536, 550], stepsImg: [[354, 260], [864, 360], [538, 931], [618, 931]], faq: [350, 488, 588, 708] };

export default function WisdomTeethPage() {
  return (
    <div className="contents" style={layoutVars(LAYOUT)}>
      <ServiceHero
        inverse
        title="Wisdom Teeth Removal {in Hyderabad}"
        text="At **Prodontics, Hyderabad**, we specialize in **painless wisdom teeth removal** using advanced techniques for a stress-free experience. Whether you’re suffering from **wisdom teeth pain**, swelling, or recurring infections, our experienced dentists provide safe and affordable extractions with faster recovery."
        image="j0Hu5ZGl2NWSuFXC5G8JjBgPtI"
        imageAlt="Wisdom teeth removal at Prodontics"
        pad={[64, 64, 128]}
        overlay={
          <>
            <PhoneNotch />
            <PatientsNotch />
          </>
        }
      />
      <InfoCards
        pill="Expert Care You Can Trust"
        title="Safe & Comfortable Wisdom Teeth Removal in Hyderabad"
        intro="At Prodontics, Hyderabad, our oral surgeons provide safe and effective wisdom teeth removal to prevent pain, crowding, and future dental issues. With modern techniques and a gentle approach, we ensure a stress-free recovery and long-term comfort for your oral health."
        cta={{ label: "Explore Services", href: "/services" }}
        variant="wisdom"
        what={{
          title: "What is Wisdom Teeth Removal?",
          paragraphs: [
            "Wisdom teeth are the last set of molars that usually erupt between ages 17–25. For many, they grow incorrectly—causing pain, swelling, or infection. **Wisdom teeth removal** is a minor surgical procedure to extract impacted or problematic wisdom teeth and protect your overall oral health.",
          ],
        }}
        why={{
          title: "Why is Wisdom Teeth Removal Needed?",
          intro: "Not all wisdom teeth need removal, but extraction becomes necessary when they cause:",
          items: [
            "Severe wisdom teeth pain",
            "Swelling or gum infections",
            "Difficulty chewing or jaw stiffness",
            "Impacted teeth (growing sideways or trapped under the gums)",
            "Headaches, ear pain, or sinus discomfort linked to wisdom teeth",
          ],
          paragraphs: ["Leaving them untreated may lead to cavities, gum disease, or misalignment of nearby teeth."],
        }}
      />
      <Steps
        introBold
        imageClass="grayscale-[0.72]"
        imageAlt="Wisdom tooth extraction procedure"
        steps={{
          title: "What to Expect",
          intro: "At **Prodontics Dental Clinic, Kokapet, Hyderabad**, our oral surgeons use local anesthesia to ensure a **painless extraction**.",
          image: "DiW8wXJZ1hIqFdLcU04CCgg5aE",
          items: [
            { title: "Examination", text: "Digital X-rays to check tooth position." },
            { title: "Anesthesia", text: "Local numbing for a comfortable, pain-free experience." },
            { title: "Extraction", text: "Gentle removal using advanced surgical tools." },
            { title: "Stitches (if required)", text: "Dissolvable stitches for faster healing." },
          ],
        }}
      />
      <Recovery
        recovery={{
          title: "Recovery And Aftercare {Tips}",
          intro: "Healing after wisdom tooth removal is simple with the right care. Patients often ask: **“What to eat after teeth removal?”. Here’s what we recommend:**",
          items: [
            "Best foods to eat after wisdom teeth removal: yogurt, smoothies, mashed potatoes, soup, eggs.",
            "Cold foods after wisdom teeth removal: ice cream, cold smoothies help reduce swelling.",
            "Avoid hard, spicy, or chewy foods for a week.",
          ],
          outro: "Most people recover in 3–7 days, but complete healing may take 2 weeks. Want to heal faster? Follow your dentist’s advice and maintain oral hygiene.",
        }}
      />
      <FAQSection
        simple
        stackOnTablet
        listClass="tab:max-desk:max-w-[var(--faq1)] desk:max-w-[var(--faq2)] wide:max-w-[var(--faq3)]"
        items={[
          { q: "Can wisdom teeth cause headaches or ear pain?", a: "Yes, impacted wisdom teeth may trigger headaches, earaches, or jaw pain." },
          {
            q: "How much does wisdom tooth extraction cost in Hyderabad?",
            a: "The cost depends on the complexity of the extraction, but at Prodontics we ensure affordable pricing without compromising quality.",
          },
          { q: "Is wisdom teeth removal painful?", a: "No. With anesthesia and modern techniques, the procedure is painless." },
          { q: "What can I eat after teeth removal?", a: "Stick to soft foods like yogurt, mashed potatoes, and soups. Avoid crunchy or spicy foods." },
        ]}
      />
      <BookingSection />
    </div>
  );
}
