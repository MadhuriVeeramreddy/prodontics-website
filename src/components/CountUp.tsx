"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `to` when scrolled into view (Framer "Counter" component). */
export function CountUp({ to, suffix = "", duration = 2.2, className = "" }: { to: number; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setV(to);
      return;
    }
    const c = animate(0, to, { duration, ease: [0.25, 0.1, 0.25, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${to}${suffix}`}>
      <span aria-hidden>
        {v}
        {suffix}
      </span>
    </span>
  );
}
