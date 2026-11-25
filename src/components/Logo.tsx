import Link from "next/link";

/** Logo mark + wordmark. `compact` = phone sizing (25px / 14px) below 810px. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="Prodontics Dental Specialities — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/7wtBQW15FGtu0H128fPPlq9uMwU.webp" alt="" width={64} height={64} className="size-16 object-cover" />
      <span className={`flex flex-col items-center ${compact ? "gap-[3px] tab:gap-[5px]" : "gap-[5px]"}`}>
        <span
          className={`font-goodtimes leading-none text-brand uppercase ${
            compact ? "text-[25px] tracking-[1px] tab:text-[30px] tab:tracking-[1.2px]" : "text-[30px] tracking-[1.2px]"
          }`}
        >
          Prodontics
        </span>
        <span
          className={`font-canva text-brand uppercase ${
            compact
              ? "text-[14px] leading-[16.8px] tracking-[3.36px] tab:text-[18px] tab:leading-[21.6px] tab:tracking-[3.42px]"
              : "text-[18px] leading-[21.6px] tracking-[3.42px]"
          }`}
        >
          Dental Specialities
        </span>
      </span>
    </Link>
  );
}
