"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

/**
 * Lenis smooth scrolling (template: smoothScrolling()) plus the "water" scroll-to-top
 * button that fills up with green as the page is scrolled (template: scrollTop()).
 */
export function SmoothScroll() {
  const boxRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    Promise.all([import("lenis"), import("gsap")]).then(([{ default: LenisCtor }, { gsap }]) => {
      if (cancelled) return;
      // `anchors`: in-page links such as #contact glide with Lenis too.
      const lenis = new LenisCtor({ lerp: 0.1, smoothWheel: true, anchors: true });
      lenisRef.current = lenis;

      // Page height is cached (reading scrollHeight inside the scroll handler forces a synchronous
      // layout every frame while animations are changing the DOM).
      let maxScroll = 1;
      const measure = () => {
        maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      };
      measure();
      const resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(document.body);

      let visible: boolean | null = null;
      lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        const box = boxRef.current;
        const water = waterRef.current;
        if (!box || !water) return;
        const percent = Math.min((scroll / maxScroll) * 100, 100);
        water.style.transform = `translateY(${100 - percent}%)`;
        const show = scroll >= 200;
        if (show !== visible) {
          visible = show;
          box.style.display = show ? "block" : "none";
        }
      });

      // One animation loop for Lenis and GSAP (the title / hover animations) instead of two.
      // Lenis runs FIRST in each frame (`prioritize`): it scrolls while layout is still clean, before
      // GSAP writes new styles. Scrolling after those writes forced a synchronous style + layout
      // recalculation every frame (scrollTo and the header's scrollY read), which made scrolling lag.
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick, false, true);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        resizeObserver.disconnect();
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
      lenisRef.current = null;
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.5, easing: (t: number) => 1 - Math.pow(2, -10 * t) });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={boxRef}
      className="scrollToTop"
      role="button"
      tabIndex={0}
      aria-label="Scroll to top"
      onClick={scrollToTop}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && scrollToTop()}
    >
      <div className="arrowUp">
        <i className="fa-light fa-arrow-up" />
      </div>
      <div ref={waterRef} className="water" style={{ transform: "translate(0px, 40%)" }}>
        <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
          <use href="#wave" />
        </svg>
        <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
          <use href="#wave" />
        </svg>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 20" style={{ display: "none" }}>
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z" />
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z" />
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z" />
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z" />
          </symbol>
        </svg>
      </div>
    </div>
  );
}
