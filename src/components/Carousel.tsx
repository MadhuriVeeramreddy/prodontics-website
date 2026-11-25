"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/** Framer-style slideshow: autoplay, arrows, dots. Images fill the frame (object-cover). */
export function Carousel({
  images,
  alt = "",
  interval = 3500,
  className = "",
  rounded = "rounded-[24px]",
}: {
  images: string[];
  alt?: string;
  interval?: number;
  className?: string;
  rounded?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = images.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || n < 2) return;
    timer.current = setInterval(() => go(1), interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, go, interval, n]);

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <motion.ul
        className="flex h-full w-full"
        animate={{ x: `-${i * 100}%` }}
        transition={{ type: "spring", stiffness: 220, damping: 32 }}
      >
        {images.map((src, k) => (
          <li key={src + k} className="h-full w-full shrink-0" aria-hidden={k !== i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className={`h-full w-full object-cover ${rounded}`}
              loading={k === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </li>
        ))}
      </motion.ul>

      {n > 1 && (
        <>
          <div className="pointer-events-none absolute inset-5 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-black/20 transition-colors hover:bg-black/35"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg" alt="" className="size-10" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-black/20 transition-colors hover:bg-black/35"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg" alt="" className="size-10" />
            </button>
          </div>
          <div className="absolute bottom-5 left-1/2 flex h-[30px] -translate-x-1/2 items-center rounded-[50px] bg-black/20">
            {images.map((_, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Go to slide ${k + 1}`}
                onClick={() => setI(k)}
                className={`flex h-[30px] items-center justify-center py-[10px] ${k === 0 ? "pr-[5px] pl-[10px]" : k === n - 1 ? "pr-[10px] pl-[5px]" : "px-[5px]"}`}
              >
                <span className={`block size-[10px] rounded-full bg-white transition-opacity ${k === i ? "opacity-100" : "opacity-50"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
