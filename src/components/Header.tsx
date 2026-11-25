"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "./icons";
import { Logo } from "./Logo";
import { Button } from "./ui";

// Order used by the original dropdown + mobile list.
const DROPDOWN = [
  { href: "/dental-surgery", label: "Dental Surgery" },
  { href: "/root-canal", label: "Root Canal Therapy" },
  { href: "/dental-implants", label: "Dental Implants" },
  { href: "/smile-design", label: "Smile Design" },
  { href: "/aligners", label: "Aligners" },
  { href: "/braces", label: "Braces" },
  { href: "/kids-dentistry", label: "Kids Dentistry" },
  { href: "/dental-tourism", label: "Dental Tourism" },
  { href: "/community-outreach", label: "Community Outreach" },
];

const navLink =
  "flex items-center gap-[3px] rounded-[8px] px-3 py-[10px] font-inter text-[14px] leading-[20px] font-medium text-ink transition-colors duration-200 hover:bg-white/20";

function DropdownPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex w-[288px] flex-col gap-[29px] rounded-[12px] bg-white p-6 shadow-[0_0.6px_3px_-0.8px_rgba(0,0,0,0.15),0_2.3px_11.4px_-1.7px_rgba(0,0,0,0.15),0_10px_50px_-2.5px_rgba(0,0,0,0.15)] max-tab:w-full max-tab:shadow-none tab:max-desk:w-full tab:max-desk:shadow-none">
      {DROPDOWN.map((d) => (
        <Link
          key={d.href}
          href={d.href}
          onClick={onNavigate}
          className="font-inter text-[16px] leading-[24px] font-medium tracking-[-0.1px] text-ink transition-colors hover:text-brand"
        >
          {d.label}
        </Link>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false); // mobile menu
  const [svcOpen, setSvcOpen] = useState(false); // mobile services list
  const [hover, setHover] = useState(false); // desktop dropdown
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
    setHover(false);
  }, [pathname]);

  const enter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHover(true);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setHover(false), 120);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ---------- Desktop (≥1200) ---------- */}
      <nav className="hidden h-[88px] items-center justify-center border-b border-black/5 bg-surface px-20 py-3 desk:flex">
        <div className="flex w-full items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
            <Link href="/about" className={navLink}>About</Link>
            <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
              <Link href="/services" className={`${navLink} ${hover ? "bg-white/20" : ""}`}>
                Services
                <Icon name="chevron" className={`size-[18px] transition-transform duration-200 ${hover ? "rotate-180" : ""}`} />
              </Link>
              <AnimatePresence>
                {hover && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-[50px] left-[-92px] z-50"
                  >
                    <DropdownPanel />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/blog" className={navLink}>Blog</Link>
            <Link href="/vision" className={navLink}>Vision</Link>
            <Link href="/contact" className={navLink}>Contact</Link>
            <Button href="/contact">Book Appointment</Button>
          </div>
        </div>
      </nav>

      {/* ---------- Tablet + phone (<1200) ---------- */}
      <nav
        className={`flex flex-col items-center bg-surface px-5 py-4 transition-shadow duration-300 desk:hidden tab:px-[35px] ${
          open ? "shadow-[0_0.6px_3px_-0.8px_rgba(0,0,0,0.15),0_2.3px_11.4px_-1.7px_rgba(0,0,0,0.15),0_10px_50px_-2.5px_rgba(0,0,0,0.15)]" : ""
        }`}
      >
        <div className="flex w-full max-w-[740px] items-center justify-between">
          <Logo compact />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-8 flex-col items-center justify-center gap-[6px]"
          >
            <span className={`block h-[2px] w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mm"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
              className="w-full max-w-[740px] overflow-hidden"
            >
              <div className="flex flex-col items-start gap-8 pt-8">
                <Link href="/vision" className={navLink}>Vision</Link>
                <div className="flex w-full flex-col gap-[10px]">
                  <button
                    type="button"
                    onClick={() => setSvcOpen((v) => !v)}
                    className="flex h-14 items-center gap-[10px] px-3"
                    aria-expanded={svcOpen}
                  >
                    <span className={`font-inter text-[18px] leading-[28px] font-medium tracking-[-0.1px] ${svcOpen ? "text-brand" : "text-ink"}`}>
                      Services
                    </span>
                    <Icon name="chevron" className={`size-[18px] text-black transition-transform duration-200 ${svcOpen ? "" : "rotate-180"}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {svcOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <DropdownPanel />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link href="/blog" className={navLink}>Blog</Link>
                <Link href="/about" className={navLink}>About</Link>
                <Link href="/contact" className={navLink}>Contact</Link>
                <Button href="/contact">Book Appointment</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
