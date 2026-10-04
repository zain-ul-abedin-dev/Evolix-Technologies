"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The site header floats over the page (absolute). On the home page it sits on the light hero;
 * inner pages start with the dark breadcrumb banner, so that banner is pushed below the header
 * (as in the template's inner pages). This keeps `--header-height` equal to the real header height.
 */
export function HeaderOffset() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const update = () => {
      // Once scrolled the navbar turns fixed and the header box shrinks; keep the resting height.
      if (window.scrollY > 80) return;
      document.documentElement.style.setProperty("--header-height", `${Math.round(header.getBoundingClientRect().height)}px`);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pathname]);

  return null;
}
