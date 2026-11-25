import { BlurText, Button, Pill, Reveal } from "./ui";
import { CountUp } from "./CountUp";

type Img = { id: string; alt: string; className?: string };

function Stat({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-satoshi text-[64px] leading-[86px] font-medium text-brand">{children}</div>
      <p className="font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] whitespace-nowrap text-navy-2">{label}</p>
    </div>
  );
}

/** Shared by About + Vision: centred intro, two images, animated stats row. */
export function IntroHero({
  pill,
  title,
  children,
  images,
  heights,
}: {
  pill: string;
  title: string;
  children: React.ReactNode;
  images: [Img, Img];
  /** image heights: [phone, tablet, desktop] */
  heights: [number, number, number];
}) {
  const style = { "--h0": `${heights[0]}px`, "--h1": `${heights[1]}px`, "--h2": `${heights[2]}px` } as React.CSSProperties;
  return (
    <section className="flex w-full justify-center bg-surface px-7 pt-[60px] pb-[120px] tab:px-16" style={style}>
      <div className="flex w-full max-w-[1072px] flex-col items-center gap-16">
        <div className="flex w-full max-w-[720px] flex-col items-center gap-[26px]">
          <div className="flex w-full flex-col items-center gap-4">
            <Pill>{pill}</Pill>
            <BlurText
              as="h1"
              text={title}
              className="w-full text-center font-lato text-[28px] leading-[1.36] tracking-[-0.56px] text-heading capitalize tab:text-[38px] tab:tracking-[-0.76px] desk:text-[48px] desk:leading-[1.16] desk:tracking-[-0.96px]"
            />
            {children}
          </div>
          <Button href="/contact">Book Appointment</Button>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 tab:grid-cols-2">
          {images.map((im, i) => (
            <Reveal key={im.id} delay={i * 0.1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/${im.id}.webp`}
                alt={im.alt}
                className={`h-[var(--h0)] w-full rounded-[24px] object-cover tab:h-[var(--h1)] desk:h-[var(--h2)] ${im.className ?? ""}`}
              />
            </Reveal>
          ))}
        </div>
        <div className="grid w-full grid-cols-[140px_140px] justify-center gap-[54px] tab:flex tab:items-center tab:justify-around tab:gap-0">
          <Stat label="Satisfaction rate">
            <CountUp to={100} suffix="%" />
          </Stat>
          <Stat label="Years of experience">
            <CountUp to={15} suffix="+" />
          </Stat>
          <Stat label="Patients Treated">
            <CountUp to={10000} />
          </Stat>
          <div className="flex flex-col items-start gap-[10px]">
            <h2 className="font-lato text-[62px] leading-[74.4px] tracking-[-0.62px] text-brand">5/5</h2>
            <p className="font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-ink-2">Google Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
