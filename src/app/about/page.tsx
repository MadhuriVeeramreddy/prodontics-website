import type { Metadata } from "next";
import { BlurText, Button, Pill, Reveal } from "@/components/ui";
import { BookingSection } from "@/components/sections";
import { IntroHero } from "@/components/IntroHero";
import { Rich } from "@/components/ServicePage";
import { Icon } from "@/components/icons";

const title = "About Prodontics | Best Dental Clinic in Kokapet, Hyderabad";
const description =
  "Meet Dr. Surya Teja S & our expert dental team. 15+ years experience, 10,000+ smiles transformed. Ethical, patient-first dental care in Kokapet, Hyderabad.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
};

const h2 =
  "font-lato text-[24px] leading-[1.2] tracking-[-0.24px] text-heading capitalize tab:text-[34px] tab:tracking-[-0.34px] desk:text-[42px] desk:tracking-[-0.42px]";
const img = (id: string) => `/images/${id}.webp`;

export default function AboutPage() {
  return (
    <>
      <IntroHero
        pill="About Us"
        title="A modern dental care home for families"
        heights={[295, 300, 400]}
        images={[
          { id: "I1pMMOsBHlj1xtUhTcS2efRKLy8", alt: "Prodontics clinic", className: "grayscale-[0.37]" },
          { id: "OJbHBRha1HHml3BVG8CQZQv2ZVo", alt: "Dental treatment at Prodontics" },
        ]}
      >
        <p className="w-full text-center font-satoshi text-[18px] leading-[28.8px] tracking-[-0.18px] text-muted">
          At Prodontics, we offer a full range of dental treatments in Kokapet, Hyderabad. From preventive care for your family to advanced cosmetic
          and restorative dentistry, our services are designed to keep your smile healthy and confident.
        </p>
      </IntroHero>

      {/* ---------- Mission + Vision ---------- */}
      <section className="flex w-full justify-center bg-surface px-7 pb-[60px] tab:px-16">
        <div className="flex w-full max-w-[1072px] flex-col items-center gap-[115px]">
          <div className="grid w-full grid-cols-1 gap-8 tab:grid-cols-2">
            <Reveal className="flex justify-center desk:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img("r6v4kMqVx1xeI39U8T1nSHrYdTE")} alt="Prodontics dentist with patient" className="h-[520px] w-[330px] rounded-[28px] object-cover tab:w-full desk:w-[475px]" />
            </Reveal>
            <div className="flex flex-col items-start justify-start gap-[34px]">
              <div className="flex w-full max-w-[500px] flex-col items-start gap-4">
                <Pill>Our Mission</Pill>
                <BlurText text="Transforming lives with medical solutions" className={`w-full ${h2} wide:hidden`} />
                <BlurText text="When Science meets Compassion, Lives transform" className={`hidden w-full ${h2} wide:block`} />
              </div>
              <div className="flex w-full flex-col gap-7">
                {[
                  ["heart", "Compassionate care", "Our mission is to provide personalized and empathetic healthcare for individual."],
                  ["award", "Excellence in service", "We strive to deliver high-quality, reliable, and innovative medical solutions."],
                ].map(([icon, t, d]) => (
                  <div key={t} className="flex items-start gap-7">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_14px_0_rgba(0,0,0,0.07)]">
                      <Icon name={icon as "heart"} className="size-6 text-brand" />
                    </div>
                    <div className="flex flex-col gap-[7px] pt-[5px]">
                      <p className="font-satoshi text-[22px] leading-[33px] font-medium tracking-[-0.66px] text-[#0d0d0d]">{t}</p>
                      <p className="max-w-[375px] font-satoshi text-[18px] leading-[27.9px] font-medium tracking-[-0.45px] text-[#5e5e5e]">{d}</p>
                    </div>
                  </div>
                ))}
                <Button href="/contact">Book Appointment</Button>
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 tab:grid-cols-2">
            <div className="flex flex-col items-start justify-center gap-[34px]">
              <div className="flex w-full max-w-[500px] flex-col items-start gap-4">
                <Pill>Our Vision</Pill>
                <BlurText text="Passionate about creating healthier, happier lives" className={`w-full ${h2}`} />
              </div>
              <ul className="flex w-full flex-col gap-4">
                {[
                  "Innovating for better healthcare futures",
                  "Leading with patient-focused care solutions",
                  "Building healthier and stronger communities",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-[14px]">
                    <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand">
                      <Icon name="tick" className="size-[10px] text-white" />
                    </span>
                    <p className="font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-navy">{t}</p>
                  </li>
                ))}
                <li className="flex items-center gap-[14px]">
                  <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand">
                    <Icon name="tick" className="size-[10px] text-white" />
                  </span>
                  <p className="font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-navy">
                    <span className="wide:hidden">Transforming lives through medical excellence</span>
                    <span className="hidden wide:inline">Transforming lives through dental excellence</span>
                  </p>
                </li>
              </ul>
              <Button href="/contact">Book Appointment</Button>
            </div>
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img("cu1QCIK0HUK0i54hnKZ4Ik0jTQ")} alt="Smiling Prodontics patient" className="h-[519px] w-full rounded-[28px] object-cover tab:h-[520px] desk:w-[500px] desk:justify-self-end" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Founders ---------- */}
      <section className="flex w-full justify-center bg-surface px-[25px] pt-[30px] pb-16 tab:pt-16">
        <div className="flex w-full max-w-[1150px] flex-col items-center gap-16">
          <div className="flex w-full max-w-[640px] flex-col items-center gap-4">
            <Pill>Founders’ Profile</Pill>
            <BlurText text="The Faces Behind Prodontics Dental Specialities" className={`w-full text-center ${h2} !text-brand-dark`} />
          </div>
          <div className="grid w-full grid-cols-1 desk:grid-cols-5 desk:gap-7">
            <Reveal className="overflow-hidden bg-[#f5faff] desk:col-span-2 desk:rounded-[32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img("TO1jKrGzs5tV33UyAt4oaNDrqh0")} alt="Dr. Surya Teja S and Dr. Ramya" className="h-[400px] w-full object-cover tab:h-[800px]" />
            </Reveal>
            <div className="flex flex-col items-start gap-7 pt-5 pl-5 tab:pt-8 desk:col-span-3 desk:justify-center desk:pt-0">
              <div className="flex w-full flex-col gap-[5px]">
                <h2 className={`${h2} max-desk:text-center`}>Dr. Surya Teja . S And Dr. Ramya</h2>
                <p className="font-satoshi text-[18px] leading-[27.9px] font-medium tracking-[-0.45px] text-[#5e5e5e]">Lead Dentists</p>
              </div>
              <div className="h-px w-full bg-[#0d0d0d]/10" />
              <div className="flex w-full flex-col gap-5">
              {[
                [false, "**Prodontics Dental Specialities** was founded by Dr. Surya Teja and Dr. Ramya, a husband-and-wife duo dedicated to delivering advanced, compassionate, and family-focused dental care in Hyderabad, Delhi, and Bangalore. Together, they bring over 30 years of combined experience in clinical dentistry and healthcare management."],
                [false, "**Dr. Surya Teja** is an accomplished Dental Surgeon and Implantologist with a Mastership in Oral Implantology and more than 15 years of clinical expertise. Trained under renowned celebrity dentist Dr. Komal Majumdar, he specializes in dental implants, full-mouth rehabilitation, implant-supported restorations, crowns, and bridges. Known for his calm approach, precision, and attention to detail, he has transformed countless smiles for patients from diverse professional backgrounds."],
                [false, "**Dr. Ramya holds** a BDS and MDHM (Apollo) with over 15 years of experience in dentistry and healthcare management. She is recognized for her patient-centered approach, with expertise in preventive care, cavity management, early orthodontic guidance, and oral health education. Her empathetic nature ensures patients of all ages feel comfortable, making every visit stress-free and reassuring."],
                [false, "Together, Dr. Surya and Dr. Ramya lead Prodontics with a shared vision—to combine world-class clinical expertise with compassionate care, creating healthier, more confident smiles while building lasting trust with families and communities."],
              ].map(([bold, t]) => (
                <p
                  key={String(t).slice(0, 20)}
                  className={`font-satoshi text-[20px] leading-[31px] tracking-[-0.5px] text-[#5e5e5e] ${bold ? "font-bold" : "font-medium"}`}
                >
                  <Rich text={String(t)} />
                </p>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingSection />
    </>
  );
}
