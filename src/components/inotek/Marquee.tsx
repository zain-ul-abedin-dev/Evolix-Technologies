"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Pixels per second (jQuery.Marquee `speed`). */
  speed?: number;
};

/**
 * Port of the template's `$('.marquee_mode').marquee({ speed: 40, duplicated: true, pauseOnHover: true })`.
 * Renders the same DOM the jQuery plugin builds (.js-marquee-wrapper > .js-marquee x2).
 */
export function Marquee({ children, className = "", speed = 40 }: MarqueeProps) {
  const firstRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = firstRef.current;
    if (!el) return;
    const measure = () => setDuration(el.offsetWidth / speed);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [speed]);

  return (
    <div
      // No overflow clipping here (same as the template): the 30px text overflows its 26px line box,
      // and clipping would cut the descenders. The parent `.container-fluid.overflow-hidden` clips sideways.
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="js-marquee-wrapper"
        style={{
          display: "flex",
          width: "max-content",
          animationName: duration ? "inotek-marquee" : undefined,
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div ref={firstRef} className="js-marquee" style={{ marginRight: 0, float: "left" }}>
          {children}
        </div>
        <div className="js-marquee" style={{ marginRight: 0, float: "left" }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
