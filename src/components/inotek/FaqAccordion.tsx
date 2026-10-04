"use client";

import { useState } from "react";

export type FaqItem = { question: string; answer: string };

/** Template `.accordion-box` (accordionBox() in main.js): one panel open at a time. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <ul className="accordion-box">
      {items.map((item, i) => {
        const active = open === i;
        return (
          <li key={item.question} className={`accordion${active ? " active-block" : ""}`}>
            <div
              role="button"
              tabIndex={0}
              className={`acc-btn bg-white${active ? " active" : ""}`}
              aria-expanded={active}
              onClick={() => setOpen(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(i)}
            >
              {item.question}
              <div className={`icon${active ? "" : " fa fa-angle-right"}`} />
            </div>
            <div className={`acc-content${active ? " active" : ""}`} style={{ display: active ? "block" : "none" }}>
              <div className="content bg-white">
                <div className="text">{item.answer}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
