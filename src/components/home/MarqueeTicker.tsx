"use strict";
import React from "react";
import Image from "next/image";

export const MarqueeTicker: React.FC = () => {
  const items = [
    "Digital Marketing",
    "Branding Solutions",
    "Custom Website",
    "Innovation Design",
    "Cyber Security",
    "Cloud Solutions",
  ];

  return (
    <div className="bg-[#f4f7ff] text-[#061153] py-5 border-y border-[#061153]/10 overflow-hidden relative z-20">
      <div className="marquee-container">
        <div className="marquee-track flex items-center gap-12 text-sm lg:text-base font-extrabold uppercase tracking-widest text-[#061153]">
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center gap-6 shrink-0">
              <span className="flex items-center gap-3">
                <Image
                  src="/assets/images/icons/marquee-icon.png"
                  alt="Icon"
                  width={18}
                  height={18}
                  className="object-contain"
                />
                <span className="hover:text-[#5ebf0a] transition-colors">{item}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
