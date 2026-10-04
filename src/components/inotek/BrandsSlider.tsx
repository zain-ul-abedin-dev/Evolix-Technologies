"use client";

import { useEffect, useRef } from "react";
import { Img } from "@/components/inotek/Img";

type Brand = { src: string; alt: string };

/**
 * `.brands-slider-three` from main.js: continuous linear Swiper ticker
 * (autoplay delay 0, speed 5000, free mode), restarted if anything stops it.
 */
export function BrandsSlider({ brands }: { brands: Brand[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let destroyed = false;
    let cleanup = () => {};

    Promise.all([import("swiper"), import("swiper/modules")]).then(([{ default: Swiper }, { Autoplay, FreeMode }]) => {
      if (destroyed) return;
      const swiper = new Swiper(el, {
        modules: [Autoplay, FreeMode],
        slidesPerView: "auto",
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        speed: 5000,
        allowTouchMove: true,
        freeMode: { enabled: true, momentum: false },
        autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false },
        breakpoints: {
          1199: { slidesPerView: 6 },
          854: { slidesPerView: 4 },
          767: { slidesPerView: 3 },
          540: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        },
        on: {
          init(s) {
            s.wrapperEl.style.transitionTimingFunction = "linear";
          },
        },
      });

      const restart = () => {
        window.setTimeout(() => {
          if (!swiper.destroyed && !swiper.autoplay.running) swiper.autoplay.start();
        }, 100);
      };
      const events = ["mousedown", "mouseup", "touchstart", "touchend", "click"] as const;
      events.forEach((evt) => el.addEventListener(evt, restart));
      const failsafe = window.setInterval(() => {
        if (!swiper.destroyed && !swiper.autoplay.running) swiper.autoplay.start();
      }, 3000);

      cleanup = () => {
        events.forEach((evt) => el.removeEventListener(evt, restart));
        window.clearInterval(failsafe);
        swiper.destroy(true, true);
      };
    });

    return () => {
      destroyed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={ref} className="brands-slider-three swiper">
      <div className="swiper-wrapper">
        {brands.map((brand, i) => (
          <div className="swiper-slide" key={i}>
            <div className="brand-item">
              <span className="image">
                <Img src={brand.src} alt={brand.alt} loading="lazy" />
                <Img src={brand.src} alt="" aria-hidden="true" loading="lazy" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
