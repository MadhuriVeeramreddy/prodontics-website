import { Icon } from "./icons";
import { BlurText, Button, Reveal, SectionHead } from "./ui";
import { ContactForm } from "./ContactForm";
import { SERVICES, SITE, TEAM, TEAM_LEADS, TESTIMONIALS } from "@/lib/site";

/* ============ Services grid (home) ============ */
// Framer shows the cards in a different order on tablet; mirror it.
const TABLET_ORDER: Record<string, string> = {
  "kids-dentistry": "tab:max-desk:order-1", "community-outreach": "tab:max-desk:order-2", "dental-tourism": "tab:max-desk:order-3",
  "root-canal": "tab:max-desk:order-4", aligners: "tab:max-desk:order-5", "smile-design": "tab:max-desk:order-6",
  "dental-surgery": "tab:max-desk:order-7", "dental-implants": "tab:max-desk:order-8", braces: "tab:max-desk:order-9",
};

export function ServiceCard({ s, tabletOrder = false }: { s: (typeof SERVICES)[number]; tabletOrder?: boolean }) {
  return (
    <Reveal className={`flex flex-col items-center gap-[18px] rounded-[25px] bg-white px-3 py-[18px] shadow-[0_2px_2px_0_#0d8dc4] ${tabletOrder ? (TABLET_ORDER[s.slug] ?? "") : ""}`}>
      <div className="flex w-full max-w-[291px] flex-col items-center gap-[10px]">
        <div className="flex size-12 items-center justify-center rounded-full bg-white p-3 shadow-[inset_0_0.36px_0.65px_-0.17px_rgba(212,212,212,0.04),inset_0_1.37px_2.47px_-0.33px_rgba(212,212,212,0.07),inset_0_6px_10.8px_-0.5px_rgba(212,212,212,0.23)]">
          <Icon name={s.icon === "braces" ? "tooth" : (s.icon as never)} className="size-6 text-brand" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-center font-inter text-[16px] leading-[19.2px] tracking-[-0.8px] text-navy desk:text-[22px] desk:leading-[26.4px] desk:tracking-[-1.1px]">
            {s.title}
          </h3>
          <p className="text-center font-satoshi text-[16px] leading-[24px] tracking-[-0.16px] text-muted">{s.blurb}</p>
        </div>
      </div>
      <Button href={`/${s.slug}`}>Know More</Button>
    </Reveal>
  );
}

export function ServicesGrid() {
  return (
    <section className="flex w-full justify-center bg-surface px-5 py-16 tab:px-10 tab:py-20 desk:px-20 desk:pt-16 desk:pb-32">
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-16 tab:gap-20 wide:max-w-[1240px]">
        <SectionHead
          pill="Dental Solutions Tailored to Your Needs"
          title="Expert {Dental Services} in Hyderabad"
          intro="At Prodontics, we offer a full spectrum of dental care—from preventive check-ups to advanced aesthetic and restorative treatments—all delivered with precision, comfort, and a human touch."
          introClass="!text-black"
        />
        <div className="grid w-full grid-cols-1 items-start gap-12 tab:grid-cols-2 desk:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} s={s} tabletOrder />
          ))}
        </div>
        <Button href="/services">Explore Services</Button>
      </div>
    </section>
  );
}

/* ============ Why choose (home) ============ */
const WHY = [
  "Healing Hands, Gentle Care – Experienced dental surgeons who combine skill with compassion.",
  "Technology with a Human Touch – Advanced tools that make your treatment precise yet comfortable.",
  "Care Beyond Surgery – From first consultation to complete recovery, we walk with you.",
  "Smiles Made Personal – Every treatment plan is tailored to your unique needs and goals.",
  "Close to Home – Serving Kokapet and nearby communities like Gachibowli and Narsingi.",
  "A Safe Place for Your Smile – Unwavering commitment to hygiene, safety, and your peace of mind.",
];

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-3 tab:max-desk:gap-2 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-4">
          <Icon name="check" className="size-6 text-brand" />
          <h3 className="flex-1 font-satoshi text-[16px] leading-[24px] tracking-[-0.16px] text-muted tab:text-[18px] tab:leading-[25.2px] tab:tracking-[-0.18px]">
            {t}
          </h3>
        </li>
      ))}
    </ul>
  );
}

export function WhyChooseHome() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-slate px-5 py-16 tab:px-10 tab:py-20 desk:px-20 desk:py-16">
      <div className="absolute inset-0 opacity-[0.11]" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/dDJpaNlbeHEaS8fUSsOcFb44yxc.webp" alt="" className="h-full w-full object-cover" />
      </div>
      <Reveal className="relative flex w-full max-w-[1120px] flex-col items-center gap-8 rounded-[24px] bg-white px-4 py-8 shadow-[inset_1px_1px_2px_0_#262626] tab:px-0 wide:max-w-[1240px]">
        <SectionHead
          pill="Expert Care. Real Results."
          title="Why {Choose Prodontics} – Best Dental Clinic in Hyderabad"
          className="tab:max-w-[650px]"
          introClass="max-tab:text-justify"
          intro={
            <p>
              At <strong>Prodontics</strong>, we blend <em>advanced dental technology</em> with a <em>patient-centric approach</em> to deliver painless,
              effective, and long-lasting dental results. Located in a prime area of Hyderabad, we are trusted for <strong>cosmetic dentistry</strong>,{" "}
              <strong>orthodontics</strong>, and complete smile transformations—always with transparent, <strong>affordable pricing</strong>.
            </p>
          }
        />
        <div className="flex w-full justify-center px-[10px] tab:px-16">
          <CheckList items={WHY} className="w-full max-w-[300px] tab:max-w-[600px] desk:max-w-[864px] desk:pl-16" />
        </div>
      </Reveal>
    </section>
  );
}

/* ============ Team ============ */
export function TeamSection() {
  return (
    <section className="flex w-full justify-center bg-surface px-5 py-16 tab:px-10 tab:py-20 desk:px-20 desk:py-16">
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-8 tab:gap-[30px] wide:max-w-[1240px]">
        <SectionHead
          pill="The Smiles Behind Your Smile"
          title="{Meet} Our Dental Experts"
          intro="Our team of experienced dentists and caring staff are dedicated to providing gentle, personalized dental care in a warm and welcoming environment."
        />
        <div className="grid w-full grid-cols-1 gap-8 pb-6 tab:grid-cols-2 tab:gap-x-[72px] tab:gap-y-16">
          {TEAM_LEADS.map((d) => (
            <Reveal key={d.name} className="flex flex-col items-center gap-[10px] tab:min-h-[500px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.img} alt={d.name} className="h-[400px] w-full object-cover" loading="lazy" />
              <h5 className="text-center font-goodtimes text-[14px] leading-[1.2] tracking-[-0.14px] text-brand uppercase tab:text-[19px] tab:tracking-[-0.19px] desk:text-[26px] desk:tracking-[-0.26px]">
                {d.name}
              </h5>
              <p className="w-full text-center font-satoshi text-[16px] leading-[19.2px] tracking-[-0.32px] text-navy-2">{d.role}</p>
            </Reveal>
          ))}
        </div>
        <div className="grid w-full grid-cols-2 gap-[10px] tab:grid-cols-3">
          {TEAM.map((d) => (
            <Reveal key={d.name} className="flex flex-col items-center gap-[10px]">
              <div className="aspect-[367/458] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.img} alt={d.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <h5 className="text-center font-satoshi text-[17px] leading-[1.2] tracking-[-0.17px] text-ink-2 tab:text-[19px] tab:tracking-[-0.19px] desk:text-[26px] desk:tracking-[-0.26px]">
                {d.name}
              </h5>
              <p className="text-center font-satoshi text-[14px] leading-[16.8px] tracking-[-0.28px] text-navy-2 tab:text-[16px] tab:leading-[19.2px] tab:tracking-[-0.32px]">
                {d.role}
              </p>
            </Reveal>
          ))}
        </div>
        <Button href="/about">Know More</Button>
      </div>
    </section>
  );
}

/* ============ Stats ============ */
const STATS = [
  ["15+", "Years Expertise"],
  ["10000+", "Smiles Transformed"],
  ["5/5", "Google Rating"],
  ["100%", "Protocols Followed"],
];

export function StatsSection() {
  return (
    <section className="flex w-full justify-center bg-surface px-5 py-16 tab:px-10 tab:py-20 desk:px-20 desk:py-16">
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-8 tab:flex-row tab:gap-16 wide:max-w-[1040px]">
        <SectionHead
          align="left"
          pill="Trusted by Many"
          title="Where {Numbers} Speak for Trust"
          intro={
            <>
              <p>Trusted by thousands in Hyderabad for expert care, lasting results, and healthy smiles.</p>
              <p className="h-[27px]" aria-hidden />
            </>
          }
          className="max-tab:items-center max-tab:text-center tab:max-w-[440px] desk:max-w-[550px]"
        />
        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-16 tab:max-w-[440px] desk:max-w-[506px]">
          {STATS.map(([n, l]) => (
            <Reveal key={l} className="flex flex-col items-start gap-[10px]">
              <h2 className="font-lato text-[24px] leading-[1.2] tracking-[-0.24px] text-heading tab:text-[34px] tab:tracking-[-0.34px] desk:text-[42px] desk:tracking-[-0.42px]">
                {n}
              </h2>
              <p className="font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-navy">{l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Testimonials (ticker) ============ */
export function Testimonials({ contained = false }: { contained?: boolean }) {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  const inner = (
      <div className={`flex w-full min-w-0 flex-col items-center gap-12 ${contained ? "" : "max-w-[1120px] wide:max-w-[1240px]"}`}>
        <SectionHead
          pill="Real Stories. Genuine Smiles."
          title="What Our {Patients} Say"
          intro="Hear from patients who’ve experienced exceptional dental care, from painless treatments to life-changing smile makeovers."
        />
        <div className="group w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <ul className="flex h-[356px] w-max animate-[ticker_40s_linear_infinite] items-start gap-[14px] group-hover:[animation-play-state:paused]">
            {loop.map((t, k) => (
              <li key={k} className="w-[350px] shrink-0" aria-hidden={k >= TESTIMONIALS.length}>
                <div className="flex flex-col items-center gap-[10px] rounded-[18px] bg-quote-bg p-6 shadow-[inset_0_0_0_1px_#262626]">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Icon key={s} name="star" className="size-3 text-brand" />
                    ))}
                  </div>
                  <p className="text-center font-satoshi text-[18px] leading-[27px] text-quote">{t}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <a href={SITE.mapsPlace} target="_blank" rel="noopener noreferrer" className="shrink-0 font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] whitespace-nowrap text-[#0099ff] underline">
          Explore our full collection of reviews
        </a>
      </div>
  );
  if (contained)
    return (
      <section className="flex w-full justify-center bg-white px-0 desk:px-10">
        <div className="flex h-[776px] w-full max-w-[1200px] tab:max-desk:h-[766px] justify-center overflow-hidden bg-surface px-20 pt-16">{inner}</div>
      </section>
    );
  return <section className="flex h-[754px] w-full justify-center overflow-hidden bg-surface px-20 pt-16">{inner}</section>;
}

/* ============ Booking + map (on every page) ============ */
function ContactLine({ icon, children, href }: { icon: "phone" | "mail" | "pin"; children: React.ReactNode; href?: string }) {
  const inner = (
    <>
      <Icon name={icon} className="size-6 text-white" />
      <span className="font-satoshi text-[18px] leading-[27px] font-medium tracking-[-0.18px] text-white">{children}</span>
    </>
  );
  return href ? (
    <a href={href} className="flex w-full items-center gap-[10px]" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <div className="flex w-full items-center gap-[10px]">{inner}</div>
  );
}

export function BookingSection({ map = true }: { map?: boolean }) {
  return (
    <section id={map ? "book" : undefined} className="flex w-full justify-center bg-surface px-5 py-16 tab:px-20">
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-12 wide:max-w-[1240px]">
        <SectionHead
          pill="Quick. Easy. Hassle-Free Scheduling"
          title="Book Your {Dental Appointment} Online"
          intro="Schedule your visit with our expert dentists in Hyderabad in just a few clicks."
        />
        <div className="flex w-full flex-col items-center justify-center gap-5 desk:flex-row desk:items-start">
          <Reveal className="flex w-full flex-col items-center gap-4 bg-brand-dark p-7 tab:items-start desk:h-[487px] desk:max-w-[550px]">
            <BlurText
              as="h4"
              text="Get In Touch"
              className="w-full font-satoshi text-[32px] leading-[38.4px] tracking-[-1.6px] text-surface"
            />
            <p className="w-full font-satoshi text-[18px] leading-[27px] tracking-[-0.18px] text-surface">
              Looking for the Best Dentist in Kokapet, Hyderabad? Book Your Appointment Today!
            </p>
            <div className="flex w-full flex-col gap-4">
              <ContactLine icon="phone" href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</ContactLine>
              <ContactLine icon="mail" href={`mailto:${SITE.email}`}>{SITE.email}</ContactLine>
              <ContactLine icon="pin" href={SITE.mapsShort}>{SITE.address}</ContactLine>
            </div>
            <div className="flex items-center justify-center gap-8 rounded-[12px] bg-white p-3">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="size-8">
                <Icon name="instagram" className="size-8 text-brand" />
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="size-8">
                <Icon name="whatsapp" className="size-8 text-brand" />
              </a>
              {SITE.facebook ? (
                <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="size-8">
                  <Icon name="facebook" className="size-8 text-brand" />
                </a>
              ) : (
                <Icon name="facebook" className="size-8 text-brand" />
              )}
            </div>
          </Reveal>
          <div className="w-full desk:max-w-[550px]">
            <ContactForm />
          </div>
        </div>
        {map && (
        <div className="flex w-full max-w-[1040px] flex-col items-center gap-[10px] desk:flex-row desk:justify-center">
          <BlurText
            text="Find Us Easily in {Kokapet, Hyderabad}"
            className="w-full max-w-[650px] text-center font-lato text-[24px] leading-[1.2] tracking-[-0.24px] text-heading capitalize tab:text-[34px] tab:tracking-[-0.34px] desk:text-left desk:text-[42px] desk:tracking-[-0.42px]"
          />
          <div className="flex h-[316px] w-[300px] shrink-0 items-center justify-center tab:h-[400px] tab:w-[600px] desk:w-[380px]">
            <iframe
              src={SITE.mapEmbed}
              title="Prodontics Dental Specialities on Google Maps"
              className="h-full w-[600px] max-w-none shrink-0 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
