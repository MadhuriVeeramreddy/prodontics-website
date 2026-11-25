"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "./icons";
import { SectionHead } from "./ui";

export type QA = { q: string; a: string };

function linkify(text: string) {
  const parts = text.split(/(https?:\/\/\S+)/g);
  return parts.map((p, i) =>
    /^https?:\/\//.test(p) ? (
      <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="break-all text-brand underline">
        {p}
      </a>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export function FAQItem({ q, a }: QA) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full flex-col rounded-[12px] bg-surface p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.15),inset_0_0.36px_0.65px_-0.17px_rgba(212,212,212,0.04),inset_0_1.37px_2.47px_-0.33px_rgba(212,212,212,0.07),inset_0_6px_10.8px_-0.5px_rgba(212,212,212,0.23)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-[11px] pl-[5px] text-left"
      >
        <Icon name="plus" className={`mt-[3px] size-5 text-brand transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
        <span className="flex-1 font-satoshi text-[18px] leading-[27px] font-medium tracking-[-0.18px] text-brand">{q}</span>
      </button>
      {!open && <div className="h-[10px]" aria-hidden />}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-2 pr-[10px] pb-[5px] pl-[5px] font-inter text-[16px] leading-[25.6px] tracking-[-0.32px] text-navy-2">
              {linkify(a)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Wisdom-teeth page accordion: white rows, grey plus, answer slides out below. */
export function SimpleFAQItem({ q, a }: QA) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-[10px] bg-[#eee]">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="relative flex min-h-[60px] w-full items-center bg-white py-[18px] pr-5 pl-[60px] text-left">
        <span className="absolute top-1/2 left-[23px] size-[14px] -translate-y-1/2" aria-hidden>
          <span className="absolute top-[6px] left-0 h-[2px] w-[14px] rounded-[1px] bg-[#999]" />
          <span className={`absolute top-0 left-[6px] h-[14px] w-[2px] rounded-[10px] bg-[#999] transition-transform duration-300 ${open ? "scale-y-0" : ""}`} />
        </span>
        <span className="font-satoshi text-[16px] leading-[24px] font-medium tracking-[0.32px] text-brand-dark">{q}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="bg-white/75 py-[10px] pr-5 pl-10 font-satoshi text-[15px] leading-[22.5px] tracking-[-0.15px] text-black">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({
  items,
  pill = "Your dental doubts, cleared.",
  title = "Your {Dental} Questions",
  intro = "Find answers to common dental questions about treatments, appointments, pricing, and oral care — trusted by patients across Hyderabad",
  stackOnTablet = false,
  listClass,
  nested = false,
  headClass = "",
  sectionClass = "",
  simple = false,
}: {
  items: QA[];
  pill?: string;
  title?: string;
  intro?: string;
  /** Treatment pages keep the phone (stacked) layout up to 1199px. */
  stackOnTablet?: boolean;
  /** Overrides the list's max-width classes (widths vary per page in the original). */
  listClass?: string;
  /** Services page: FAQ sits inside the 1120px content column (960px inner). */
  nested?: boolean;
  headClass?: string;
  sectionClass?: string;
  /** use the Wisdom Teeth page's accordion style */
  simple?: boolean;
}) {
  const row = stackOnTablet ? "desk" : "tab";
  const Wrap = nested ? "div" : "section";
  return (
    <Wrap
      className={
        nested
          ? "flex w-full justify-center px-10 py-[60px] tab:px-0 tab:py-32 desk:px-20"
          : `flex w-full justify-center bg-surface px-5 py-16 desk:px-20 desk:py-32 ${stackOnTablet ? "" : "tab:px-10 tab:py-20"} ${sectionClass}`
      }
    >
      <div
        className={`flex w-full flex-col items-center gap-8 ${nested ? "" : "max-w-[1120px] wide:max-w-[1240px]"} ${
          stackOnTablet ? "desk:flex-row desk:gap-8" : "tab:flex-row tab:items-center tab:gap-6 desk:gap-8"
        }`}
      >
        <SectionHead
          align="left"
          pill={pill}
          title={title}
          intro={intro}
          className={`${
            row === "tab"
              ? "max-tab:items-center max-tab:text-center tab:max-w-[482px] tab:flex-1 desk:max-w-[500px]"
              : "max-desk:max-w-none max-desk:items-center max-desk:text-center desk:max-w-[500px] desk:flex-1"
          }${nested ? " desk:shrink-0 desk:basis-[500px] tab:max-desk:max-w-[420px]" : ""} ${headClass}`}
        />
        <div
          className={`flex w-full flex-col gap-4 ${
            listClass ??
            (row === "tab"
              ? `tab:max-w-[438px] tab:flex-1 desk:max-w-[588px] ${nested ? "tab:max-desk:max-w-[420px]" : ""}`
              : "tab:max-desk:max-w-[488px] desk:max-w-[588px]")
          } ${row === "tab" ? "" : "desk:flex-1"
          }`}
        >
          {simple ? (
            <div className="flex w-full flex-col items-center gap-4 p-5">
              {items.map((it) => (
                <SimpleFAQItem key={it.q} {...it} />
              ))}
            </div>
          ) : (
            items.map((it) => <FAQItem key={it.q} {...it} />)
          )}
        </div>
      </div>
    </Wrap>
  );
}
