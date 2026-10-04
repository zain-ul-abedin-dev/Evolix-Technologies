"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { SwiperOptions } from "swiper/types";

/** Slider settings copied from the template's allSlider() in main.js. */
const PRESETS: Record<string, SwiperOptions> = {
  // `.tv-team-slider` (about page)
  team: {
    spaceBetween: 24,
    speed: 1500,
    loop: true,
    breakpoints: { 1024: { slidesPerView: 2 }, 768: { slidesPerView: 1 }, 576: { slidesPerView: 2 }, 0: { slidesPerView: 1 } },
  },
  // `.brands-slider-two` (about page)
  brandsTwo: {
    spaceBetween: 30,
    speed: 1500,
    loop: true,
    autoplay: { delay: 7000, disableOnInteraction: false },
    breakpoints: { 1200: { slidesPerView: 5 }, 992: { slidesPerView: 5 }, 767: { slidesPerView: 4 }, 575: { slidesPerView: 3 }, 0: { slidesPerView: 2 } },
  },
};

type SwiperBoxProps = {
  preset: keyof typeof PRESETS;
  className: string;
  children: ReactNode;
  /** Scope in which `.array-prev` / `.array-next` buttons are looked up (template uses global classes). */
  navScope?: string;
};

/** Swiper container; slides are rendered on the server and passed in as children. */
export function SwiperBox({ preset, className, children, navScope }: SwiperBoxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let destroyed = false;
    let cleanup = () => {};

    Promise.all([import("swiper"), import("swiper/modules")]).then(([{ default: Swiper }, { Autoplay, Navigation }]) => {
      if (destroyed) return;
      const scope = (navScope && el.closest(navScope)) || document;
      const swiper = new Swiper(el, {
        modules: [Autoplay, Navigation],
        ...PRESETS[preset],
        navigation: {
          prevEl: scope.querySelector<HTMLElement>(".array-prev"),
          nextEl: scope.querySelector<HTMLElement>(".array-next"),
        },
      });
      cleanup = () => swiper.destroy(true, true);
    });

    return () => {
      destroyed = true;
      cleanup();
    };
  }, [preset, navScope]);

  return (
    <div ref={ref} className={`${className} swiper`}>
      <div className="swiper-wrapper">{children}</div>
    </div>
  );
}
