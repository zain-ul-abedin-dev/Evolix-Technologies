"use client";

import { useEffect, useState } from "react";

/** Template preloader: covers the page until `window.load`, then fades out (jQuery fadeOut(500)). */
export function Preloader() {
  const [state, setState] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    const hide = () => setState((s) => (s === "visible" ? "fading" : s));
    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });
    return () => window.removeEventListener("load", hide);
  }, []);

  useEffect(() => {
    if (state !== "fading") return;
    const t = window.setTimeout(() => setState("gone"), 500);
    return () => window.clearTimeout(t);
  }, [state]);

  if (state === "gone") return null;

  return (
    <div
      className="loading-screen"
      id="loading-screen"
      style={{ opacity: state === "fading" ? 0 : 1, transition: "opacity 500ms linear" }}
    >
      <div className="preloader-close" role="button" tabIndex={0} aria-label="Close preloader" onClick={() => setState("fading")}>
        x
      </div>
      <span className="loader" />
      <noscript>
        <style>{".loading-screen{display:none!important}"}</style>
      </noscript>
    </div>
  );
}
