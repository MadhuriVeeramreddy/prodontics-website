import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./ui";
import { Icon } from "./icons";
import { SERVICES, SITE } from "@/lib/site";

const head = "font-satoshi text-[18px] leading-[27.9px] font-medium tracking-[-0.45px] text-[#0d0d0d]";
const item =
  "font-satoshi text-[16px] leading-[24px] font-medium tracking-[-0.3px] text-[#404040] opacity-75 transition-opacity hover:opacity-100";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[22px]">
      <p className={head}>{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="flex w-full justify-center border border-brand bg-surface px-5 pt-8 pb-7 desk:px-[25px] desk:py-11">
      <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 desk:max-w-[1200px] desk:grid-cols-5 wide:max-w-none">
        {/* Brand */}
        <div className="flex flex-col items-start gap-[26px] pr-[18px] desk:col-span-2">
          <Logo />
          <Button href="/contact">Book Appointment</Button>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 pt-7 tab:grid-cols-2 desk:col-span-3 desk:grid-cols-4 desk:pt-3">
          <Col title="Quick Links">
            <Link className={item} href="/">Home</Link>
            <Link className={item} href="/about">About</Link>
            <Link className={item} href="/contact">Contact</Link>
            <Link className={item} href="/services">Services</Link>
            <Link className={item} href="/privacy-policy">Privacy Policy</Link>
          </Col>
          <Col title="Services">
            {SERVICES.map((s) => (
              <Link key={s.slug} className={item} href={`/${s.slug}`}>
                {s.footer}
              </Link>
            ))}
          </Col>
          <Col title="Follow us">
            <a className={item} href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            {SITE.facebook ? (
              <a className={item} href={SITE.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            ) : (
              <span className={item}>Facebook</span>
            )}
          </Col>
          <Col title="Contact Us">
            <a href={SITE.mapsShort} target="_blank" rel="noopener noreferrer" className="flex items-start gap-[10px]">
              <Icon name="pin" className="mt-[6px] size-3 text-black" />
              <span className="font-satoshi text-[16px] leading-[24px] font-medium tracking-[-0.16px] text-[#404040]">
                Kokapet,
                <br className="hidden desk:inline" /> Hyderabad
              </span>
            </a>
            <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-[5px]">
              <Icon name="phone" className="size-4 text-black" />
              <span className="font-satoshi text-[16px] leading-[24px] font-medium tracking-[-0.16px] text-[#404040]">
                {SITE.phoneDisplay}
              </span>
            </a>
          </Col>
        </div>
      </div>
    </footer>
  );
}
