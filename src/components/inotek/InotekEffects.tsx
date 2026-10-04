"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * React port of the page-level behaviours in the template's main.js:
 *   - wowAnimation()     `.wow` elements stay hidden until they scroll into view, then play their CSS animation
 *   - titleAnimation()   `.sec-title` / `.title-anim` split into characters and animated with GSAP
 *   - counterOdometer()  `.count-number.odometer` rolls up to `data-count` when it appears
 *   - magnificPopup()    `[data-fancybox]` links open in a Fancybox lightbox
 *
 * Runs again on every client-side navigation so newly rendered sections are picked up.
 */

type Ctx = { cleanups: (() => void)[]; cancelled: boolean };

const isMobileUA = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function initWow(ctx: Ctx) {
  const boxes = Array.from(document.querySelectorAll<HTMLElement>(".inotek .wow:not([data-wow-done])"));
  if (!boxes.length) return;

  // Same as WOW({ mobile: false }): on phones the CSS animations simply play on load.
  if (isMobileUA()) return;

  const reveal = (box: HTMLElement) => {
    box.dataset.wowDone = "";
    const { wowDuration, wowDelay, wowIteration } = box.dataset;
    if (wowDuration) box.style.animationDuration = wowDuration;
    if (wowDelay) box.style.animationDelay = wowDelay;
    if (wowIteration) box.style.animationIterationCount = wowIteration;
    box.classList.add("animated");
    box.style.visibility = "visible";
    // WOW restores the animation name it cached at init; clearing the inline override lets the
    // element's own animation class apply again, which is the same thing but does not depend on
    // the stylesheet having loaded before init.
    box.style.animationName = "";
  };

  for (const box of boxes) {
    box.style.visibility = "hidden";
    box.style.animationName = "none";
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0 },
  );
  boxes.forEach((box) => observer.observe(box));
  ctx.cleanups.push(() => observer.disconnect());
}

async function initTitles(ctx: Ctx) {
  if (window.innerWidth < 767) return;
  const titles = Array.from(document.querySelectorAll<HTMLElement>(".inotek .sec-title:not([data-split]), .inotek .title-anim:not([data-split])"));
  if (!titles.length) return;

  const { default: SplitType } = await import("split-type");
  if (ctx.cancelled) return;

  // Splitting a title into per-character elements is heavy DOM work. The template does it the moment a
  // title scrolls into view, which stalls scrolling; here every title is split ahead of time while the
  // browser is idle. The result looks identical.
  const split = new Map<HTMLElement, HTMLElement[]>();
  const splitTitle = (el: HTMLElement) => {
    if (!split.has(el)) split.set(el, new SplitType(el, { types: "chars" }).chars ?? []);
    return split.get(el)!;
  };
  const idle = (cb: () => void) =>
    typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 50);
  const queue = [...titles];
  const splitNext = () => {
    if (ctx.cancelled) return;
    const el = queue.shift();
    if (!el) return;
    splitTitle(el);
    idle(splitNext);
  };
  idle(splitNext);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        el.dataset.split = "";
        const type = el.getAttribute("data-animation") || "slide-right";
        // Same motion as the template's GSAP tween (from x:20 / opacity:0, 0.8s, stagger 0.03s,
        // back.out(1.7) = cubic-bezier(.34,1.56,.64,1)), but as a CSS animation, so it needs no JS work and
        // no forced style reads while scrolling.
        // Keyframes: `inotek-char-*` in src/styles/inotek-overrides.css.
        // A finished animation with `fill-mode: both` stays active and keeps every character on its own
        // compositor layer for good (hundreds per page, re-composited on every scroll frame). The end
        // state is just the plain text, so the animation is removed once it has played.
        const done = (e: AnimationEvent) => {
          const char = e.target as HTMLElement;
          if (!char.classList.contains("char-anim")) return;
          char.classList.remove("char-anim", `char-anim-${type}`);
          char.style.animationDelay = "";
        };
        el.addEventListener("animationend", done);
        splitTitle(el).forEach((char, i) => {
          char.style.animationDelay = `${(i * 0.03).toFixed(2)}s`;
          char.classList.add("char-anim", `char-anim-${type}`);
        });
      }
    },
    { threshold: 0.2 },
  );
  titles.forEach((el) => observer.observe(el));
  ctx.cleanups.push(() => observer.disconnect());
}

type OdometerInstance = { update: (value: number) => void };
type OdometerElement = HTMLElement & { odometer?: OdometerInstance };

async function initCounters(ctx: Ctx) {
  const counters = Array.from(document.querySelectorAll<OdometerElement>(".inotek .count-number.odometer:not([data-counted])"));
  if (!counters.length) return;

  (window as unknown as { odometerOptions: object }).odometerOptions = { auto: false };
  const { default: Odometer } = await import("odometer");
  if (ctx.cancelled) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as OdometerElement;
      observer.unobserve(el);
      el.dataset.counted = "";
      el.odometer?.update(Number((el.dataset.count || "").replace(/,/g, "")) || 0);
    }
  });

  for (const el of counters) {
    el.odometer = new Odometer({ el, value: Number(el.textContent) || 0 });
    observer.observe(el);
  }
  ctx.cleanups.push(() => observer.disconnect());
}

/** progressLine() + countText(): skill bars grow to `data-width`% and `.count-text` counts up to `data-stop`. */
function initProgress(ctx: Ctx) {
  const bars = Array.from(document.querySelectorAll<HTMLElement>(".inotek .progress-line:not([data-shown])"));
  const counters = Array.from(document.querySelectorAll<HTMLElement>(".inotek .count-box .count-text:not([data-shown])"));
  // countText() marks every `.count-box` as `counted` once seen; some template styles depend on it.
  const boxes = Array.from(document.querySelectorAll<HTMLElement>(".inotek .count-box:not(.counted)"));
  if (!bars.length && !counters.length && !boxes.length) return;

  const countUp = (el: HTMLElement) => {
    const stop = Number(el.dataset.stop) || 0;
    const duration = Number(el.dataset.speed) || 2000;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.floor(stop * t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      observer.unobserve(el);
      el.dataset.shown = "";
      if (el.classList.contains("progress-line")) el.style.width = `${el.dataset.width}%`;
      else if (el.classList.contains("count-box")) el.classList.add("counted");
      else countUp(el);
    }
  });
  [...bars, ...counters, ...boxes].forEach((el) => observer.observe(el));
  ctx.cleanups.push(() => observer.disconnect());
}

async function initLightbox(ctx: Ctx) {
  if (!document.querySelector("[data-fancybox]")) return;
  const { Fancybox } = await import("@fancyapps/ui/dist/fancybox/fancybox.js");
  if (ctx.cancelled) return;
  Fancybox.bind("[data-fancybox]", {});
  ctx.cleanups.push(() => Fancybox.unbind("[data-fancybox]"));
}

export function InotekEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const ctx: Ctx = { cleanups: [], cancelled: false };
    initWow(ctx);
    initTitles(ctx);
    initCounters(ctx);
    initProgress(ctx);
    initLightbox(ctx);
    return () => {
      ctx.cancelled = true;
      ctx.cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
