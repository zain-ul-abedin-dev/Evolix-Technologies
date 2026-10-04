"use client";

import { useEffect, useRef } from "react";

const GROW_TARGETS = "a, button, .theme-button, .scroll-top, .acc-btn";

/** Template "magic cursor": a green dot that follows the pointer and grows over links and buttons. */
export function MagicCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 15}px,${e.clientY - 15}px)`;
      cursor.style.visibility = "inherit";
    };
    const over = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(GROW_TARGETS)) cursor.classList.add("cursor-grow");
    };
    const out = (e: MouseEvent) => {
      const from = (e.target as Element).closest?.(GROW_TARGETS);
      const to = (e.relatedTarget as Element | null)?.closest?.(GROW_TARGETS);
      if (from && from !== to) cursor.classList.remove("cursor-grow");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return <div ref={ref} className="magic-cursor" aria-hidden="true" />;
}
