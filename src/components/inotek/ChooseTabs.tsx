"use client";

import { useState } from "react";
import { Img } from "@/components/inotek/Img";

export type ChooseItem = { icon: string; label: string; title: string; text: string; image: string; noBorder?: boolean };

/** Why-choose-us list: hovering a `.title-box` swaps the image on the right (main.js "choose section ... home5"). */
export function ChooseTabs({ items }: { items: ChooseItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="row gy-30">
      <div className="col-lg-6">
        <div className="choose-left">
          {items.map((item, i) => (
            <div key={item.title} className={`title-box${active === i ? " active" : ""}`} onMouseEnter={() => setActive(i)}>
              <div className={`icon${item.noBorder ? " border-none" : ""}`}>
                <Img src={item.icon} alt="" />
              </div>
              <div className="content">
                <span>{item.label}</span>
                <h4 className="title">{item.title}</h4>
                <p className="description">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-lg-6">
        <div className="choose-right">
          {items.map((item, i) => (
            <Img
              key={item.image}
              src={item.image}
              alt={item.title}
              className={active === i ? "active" : undefined}
              style={{ opacity: active === i ? 1 : 0 }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
