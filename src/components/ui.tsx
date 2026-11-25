"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, ElementType, CSSProperties } from "react";

/* ---------------- Button ---------------- */
export function Button({
  href,
  children,
  className = "",
  type,
  onClick,
  external,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  external?: boolean;
}) {
  const cls = `inline-flex shrink-0 items-center justify-center gap-[10px] rounded-[10px] bg-brand px-6 py-3 font-satoshi text-[18px] leading-[21.6px] font-medium tracking-[-0.18px] text-white transition-[background-color,transform] duration-200 hover:bg-brand-dark active:scale-[0.98] ${className}`;
  if (href)
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ---------------- Pill badge ("TRUSTED BY 10000+ PEOPLE") ---------------- */
export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[32px] px-6 py-2 backdrop-blur-[7px] ${className}`}>
      <span className="absolute inset-0 bg-pill opacity-40" aria-hidden />
      <span className="relative font-satoshi text-[13px] leading-[18.2px] font-bold tracking-[0.52px] whitespace-nowrap text-black uppercase">{children}</span>
    </div>
  );
}

/* ---------------- Accent text parsing ----------------
   "Expert {Dental Services} in Hyderabad" → accent words in brand blue. */
type Word = { text: string; accent: boolean };
export function parseAccent(src: string): Word[] {
  const words: Word[] = [];
  const re = /\{([^}]*)\}|([^{}]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const accent = m[1] !== undefined;
    for (const w of (m[1] ?? m[2]).split(/\s+/).filter(Boolean)) words.push({ text: w, accent });
  }
  return words;
}

/* ---------------- Blur-in heading (Framer "appear" text effect) ---------------- */
export function BlurText({
  text,
  as: Tag = "h2",
  className = "",
  accentClass = "text-brand",
  style,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  accentClass?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = parseAccent(text);
  return (
    <Tag className={className} style={style}>
      {words.map((w, i) => (
        <span key={i}>
          <motion.span
            className={`inline-block ${w.accent ? accentClass : ""}`}
            initial={reduce ? false : { opacity: 0.001, filter: "blur(10px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: delay + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {w.text}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/* ---------------- Reveal (fade + rise on scroll) ---------------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 30,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li";
}) {
  const reduce = useReducedMotion();
  const C = motion[as];
  return (
    <C
      className={className}
      initial={reduce ? false : { opacity: 0.001, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </C>
  );
}

/* ---------------- Section heading block (pill + heading + intro) ---------------- */
export function SectionHead({
  pill,
  title,
  intro,
  align = "center",
  className = "",
  titleClass = "",
  introClass = "",
  as = "h2",
}: {
  pill?: string;
  title: string;
  intro?: ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClass?: string;
  introClass?: string;
  as?: ElementType;
}) {
  const center = align === "center";
  return (
    <div className={`flex w-full max-w-[550px] flex-col gap-4 ${center ? "items-center text-center" : "items-start text-left"} ${className}`}>
      {pill && <Pill>{pill}</Pill>}
      <BlurText
        as={as}
        text={title}
        className={`w-full font-lato text-[24px] leading-[1.2] tracking-[-0.24px] text-heading capitalize tab:text-[34px] tab:tracking-[-0.34px] desk:text-[42px] desk:tracking-[-0.42px] ${titleClass}`}
      />
      {intro && (
        <div className={`w-full font-satoshi text-[18px] leading-[1.5] tracking-[-0.18px] text-muted ${introClass}`}>
          {intro}
        </div>
      )}
    </div>
  );
}
