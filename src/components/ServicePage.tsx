import Link from "next/link";
import { BlurText, Button, Reveal, SectionHead } from "./ui";
import { CheckList, BookingSection } from "./sections";
import { FAQSection, type QA } from "./FAQ";

export type ServiceContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  heroText: string;
  heroBold?: boolean;
  heroPad?: number[];
  heroImage: string | null;
  what: { title: string; paragraphs: string[]; joined?: boolean };
  why: { title: string; items: string[]; paragraphs: string[] };
  steps: { title: string; intro: string; items: { title: string; text: string; h?: number }[]; image: string | null };
  recovery: { title: string; intro: string; items: string[]; outro: string };
  faq: QA[];
  /** Per-breakpoint sizes from the original: [phone, tablet, desktop, wide]. */
  layout?: { heroImg: (number[] | null)[]; card: number[]; stepsImg: (number[] | null)[]; faq: number[] };
};

type L = NonNullable<ServiceContent["layout"]>;
const ar = (v: number[] | null | undefined, fb: string) => (v ? `${v[0]} / ${v[1]}` : fb);
/** CSS variables consumed by the template's arbitrary-value classes. */
function layoutVars(l?: L): React.CSSProperties {
  if (!l) return {};
  const v: Record<string, string> = {};
  l.heroImg.forEach((x, i) => (v[`--hi${i}`] = ar(x, "3 / 2")));
  l.stepsImg.forEach((x, i) => (v[`--si${i}`] = ar(x, "3 / 2")));
  v["--card1"] = `${l.card[1] || 550}px`;
  v["--card3"] = `${l.card[3] || 550}px`;
  v["--faq1"] = `${l.faq[1] || 488}px`;
  v["--faq2"] = `${l.faq[2] || 588}px`;
  v["--faq3"] = `${l.faq[3] || l.faq[2] || 588}px`;
  return v as React.CSSProperties;
}

const img = (id: string | null) => (id ? `/images/${id}.webp` : "");

/** "**bold**" → <strong>; otherwise plain text. */
export function Rich({ text }: { text: string }) {
  if (/^\*\*[^*]+\*\*$/.test(text)) return <strong className="font-bold">{text.slice(2, -2)}</strong>;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <strong key={i} className="font-bold">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

/* ---------- Hero: title + intro, then a large rounded image ---------- */
export function ServiceHero({
  title,
  text,
  image,
  imageAlt,
  bold = false,
  pad = [64, 64, 128],
  inverse = false,
  overlay,
}: {
  title: string;
  text: string;
  image: string | null;
  imageAlt: string;
  bold?: boolean;
  /** title in brand blue with {accent} words dark (Wisdom Teeth page) */
  inverse?: boolean;
  /** extra elements positioned over the hero image */
  overlay?: React.ReactNode;
  /** bottom padding at phone / tablet / desktop (varies per page in the original) */
  pad?: number[];
}) {
  return (
    <section
      className="flex w-full justify-center bg-surface px-5 pt-8 pb-[var(--pb0)] tab:px-20 tab:pt-16 tab:pb-[var(--pb1)] desk:pb-[var(--pb2)]"
      style={{ "--pb0": `${pad[0]}px`, "--pb1": `${pad[1]}px`, "--pb2": `${pad[2]}px` } as React.CSSProperties}
    >
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-12 wide:max-w-[1240px]">
        <div className="flex w-full flex-col items-center gap-6 tab:gap-7 desk:flex-row desk:items-center desk:gap-6">
          <BlurText
            as="h1"
            text={title}
            accentClass={inverse ? "text-heading" : "text-brand"}
            className={`w-full text-center font-lato text-[28px] leading-[1.36] tracking-[-0.56px] ${inverse ? "text-brand" : "text-heading"} capitalize tab:text-[38px] tab:tracking-[-0.76px] desk:flex-1 desk:text-left desk:text-[48px] desk:leading-[1.16] desk:tracking-[-0.96px]`}
          />
          <div className="flex w-full flex-col items-center gap-6 desk:flex-1 desk:items-start">
            <p className={`w-full text-justify font-satoshi text-[18px] leading-[27px] tracking-[-0.18px] text-muted ${bold ? "font-bold" : ""}`}>
              <Rich text={text} />
            </p>
            <Button href="/contact">Book Appointment</Button>
          </div>
        </div>
        {image && (
          <Reveal className="relative w-full">
            {overlay}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(image)}
              alt={imageAlt}
              className="aspect-[var(--hi0,3/2)] w-full rounded-[24px] object-cover tab:aspect-[var(--hi1,3/2)] desk:aspect-[var(--hi2,3/2)] wide:aspect-[var(--hi3,3/2)]"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------- "Comprehensive Family Dentistry" + What / Why cards ---------- */
const infoCard =
  "flex w-full flex-col items-start gap-4 rounded-[24px] bg-[rgba(224,222,222,0.2)] p-6 shadow-[0_2px_2px_0_#0d8dc4]";
const cardTitle = "w-full font-inter text-[22px] leading-[26.4px] tracking-[-1.1px] text-heading";
const body = "w-full font-satoshi text-[18px] leading-[27px] tracking-[-0.18px] text-muted";

export function InfoCards({
  what,
  why,
  pill = "Healthy Smiles for All Ages",
  title = "Comprehensive {Family Dentistry} in Hyderabad",
  intro = "At Prodontics, Hyderabad, our family dental care covers everything from routine check-ups and cleanings to advanced treatments.",
  cta = { label: "Book Appointment Now", href: "/contact" },
  variant = "default",
}: {
  what: ServiceContent["what"];
  why: ServiceContent["why"] & { intro?: string };
  pill?: string;
  title?: string;
  intro?: string;
  cta?: { label: string; href: string };
  /** "wisdom": bottom padding + smaller card titles below desktop */
  variant?: "default" | "wisdom";
}) {
  const w = variant === "wisdom";
  const ct = w ? "w-full font-inter text-[16px] leading-[19.2px] tracking-[-0.8px] text-heading desk:text-[22px] desk:leading-[26.4px] desk:tracking-[-1.1px]" : cardTitle;
  return (
    <section
      className={`flex w-full justify-center px-5 pt-16 tab:px-20 tab:pt-20 desk:pt-16 ${
        w ? "border-2 border-pill bg-white pb-16 tab:pb-20 desk:pb-16" : "bg-surface"
      }`}
    >
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-16 tab:gap-20 wide:max-w-[1240px]">
        <SectionHead pill={pill} title={title} intro={intro} />
        <div className={`flex w-full flex-col items-center gap-12 desk:flex-row desk:justify-center ${w ? "desk:items-stretch" : "desk:items-start"}`}>
          <Reveal className={`${infoCard} tab:max-w-[var(--card1)] desk:max-w-none desk:flex-1 wide:max-w-[var(--card3)]`}>
            <h2 className={ct}>{what.title}</h2>
            {what.joined ? (
              <div className="w-full">
                {what.paragraphs.map((p, i) => (
                  <p key={i} className={body}>
                    <Rich text={p} />
                  </p>
                ))}
              </div>
            ) : (
              what.paragraphs.map((p, i) => (
                <p key={i} className={body}>
                  <Rich text={p} />
                </p>
              ))
            )}
          </Reveal>
          <Reveal className={`${infoCard} tab:max-w-[var(--card1)] desk:max-w-none desk:flex-1 wide:max-w-[var(--card3)]`} delay={0.1}>
            <h2 className={ct}>{why.title}</h2>
            {why.intro && (
              <p className={body}>
                <Rich text={why.intro} />
              </p>
            )}
            <CheckList items={why.items} className="w-full gap-4 tab:max-desk:gap-4" />
            {why.paragraphs.map((p, i) => (
              <p key={i} className={body}>
                <Rich text={p} />
              </p>
            ))}
          </Reveal>
        </div>
        <Button href={cta.href}>{cta.label}</Button>
      </div>
    </section>
  );
}

/* ---------- Procedure steps ---------- */
export function Steps({ steps, imageAlt, introBold = false, imageClass = "grayscale-[0.33]" }: { steps: ServiceContent["steps"]; imageAlt: string; introBold?: boolean; imageClass?: string }) {
  return (
    <section className="flex w-full justify-center px-[18px] py-20 tab:px-20 tab:py-[100px]">
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-[44px] desk:flex-row wide:max-w-[1280px]">
        {steps.image && (
          <Reveal className="w-full desk:flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(steps.image)}
              alt={imageAlt}
              className={`aspect-[var(--si0,354/260)] w-full rounded-[17px] object-cover ${imageClass} tab:aspect-[var(--si1,3/2)] desk:aspect-[var(--si2,3/2)] wide:aspect-[var(--si3,3/2)]`}
              loading="lazy"
            />
          </Reveal>
        )}
        <div className="flex w-full flex-col items-start gap-6 desk:flex-1">
          <BlurText
            text={steps.title}
            className="w-full font-lato text-[24px] leading-[1.2] tracking-[-0.24px] text-heading capitalize tab:text-[34px] tab:tracking-[-0.34px] desk:text-[42px] desk:tracking-[-0.42px]"
          />
          <p className={`font-inter-display w-full font-inter text-[18px] tracking-[-0.18px] text-muted opacity-90 tab:max-desk:max-w-[640px] ${introBold ? "leading-[27px]" : "leading-[21.6px]"}`}>
            <Rich text={steps.intro} />
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-[10px] px-6 py-3 font-satoshi text-[18px] leading-[21.6px] font-medium tracking-[-0.18px] text-brand shadow-[inset_0_0_0_1px_#0d8dc4] transition-colors hover:bg-brand hover:text-white"
          >
            Explore Services
          </Link>
          <div className="h-px w-full bg-white/10" />
          <ol className="flex w-full flex-col gap-6">
            {steps.items.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.05}
                className="relative flex flex-col items-start gap-[18px] rounded-[30px] bg-brand p-[30px] shadow-[6px_2px_15px_8px_#9ed1e7] tab:gap-3 tab:px-8 tab:pt-11 tab:pb-8 tab:shadow-[9px_3px_15px_8px_#9ed1e7]"
              >
                <h3 className="w-full font-inter text-[16px] leading-[19.2px] tracking-[-0.8px] text-white desk:text-[22px] desk:leading-[26.4px] desk:tracking-[-1.1px]">{s.title}</h3>
                <div className="h-px w-full bg-white/10" />
                <p
                  className="w-full font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-white desk:max-wide:min-h-[var(--h)]"
                  style={{ "--h": `${s.h ?? 0}px` } as React.CSSProperties}
                >
                  {s.text}
                </p>
                <span className="absolute top-[10px] right-[13px] flex size-[34px] items-center justify-center rounded-full bg-white font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-navy-2 shadow-[inset_0_2px_0_0_rgba(184,180,180,0.14)]">
                  {i + 1}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Recovery & aftercare ---------- */
export function Recovery({ recovery, cta = "Book Now", introBold = false }: { recovery: ServiceContent["recovery"]; cta?: string; introBold?: boolean }) {
  return (
    <section className="flex w-full justify-center bg-surface px-5 pb-16 tab:px-20 tab:pt-8">
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-3 tab:gap-[27px] desk:flex-row desk:gap-3 wide:max-w-[1240px]">
        <BlurText
          text={recovery.title}
          accentClass="text-heading"
          className="w-full text-center font-lato text-[24px] leading-[1.2] tracking-[-0.24px] text-brand capitalize tab:text-[34px] tab:tracking-[-0.34px] desk:w-[492px] desk:shrink-0 desk:text-left wide:w-[546px] desk:text-[42px] desk:tracking-[-0.42px]"
        />
        <div className="flex w-full flex-col items-center gap-6 desk:items-start">
          <p className={`${body} max-desk:text-center ${introBold ? "font-bold" : ""}`}>
            <Rich text={recovery.intro} />
          </p>
          <CheckList items={recovery.items} className="w-full gap-[22px] pl-[18px] tab:max-desk:gap-[22px]" />
          {recovery.outro && <p className={`${body} max-desk:text-center`}>{recovery.outro}</p>}
          <Button href="/contact">{cta}</Button>
        </div>
      </div>
    </section>
  );
}

export { layoutVars };

export function ServicePage({ c }: { c: ServiceContent }) {
  const name = c.title.replace(/[{}]/g, "");
  return (
    <div className="contents" style={layoutVars(c.layout)}>
      <ServiceHero title={c.title} text={c.heroText} image={c.heroImage} imageAlt={name} bold={c.heroBold} pad={c.heroPad} />
      <InfoCards what={c.what} why={c.why} />
      <Steps steps={c.steps} imageAlt={`${name} procedure`} />
      <Recovery recovery={c.recovery} />
      <FAQSection items={c.faq} stackOnTablet listClass="tab:max-desk:max-w-[var(--faq1)] desk:max-w-[var(--faq2)] wide:max-w-[var(--faq3)]" />
      <BookingSection />
    </div>
  );
}
