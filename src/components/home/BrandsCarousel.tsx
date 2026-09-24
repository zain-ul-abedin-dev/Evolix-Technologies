"use strict";
import React from "react";
import Image from "next/image";

export const BrandsCarousel: React.FC = () => {
  const brands = [
    { name: "Brand 1", img: "/assets/images/brands/hm4-img01.webp" },
    { name: "Brand 2", img: "/assets/images/brands/hm4-img02.webp" },
    { name: "Brand 3", img: "/assets/images/brands/hm4-img03.webp" },
    { name: "Brand 4", img: "/assets/images/brands/hm4-img04.webp" },
    { name: "Brand 5", img: "/assets/images/brands/hm4-img05.webp" },
  ];

  return (
    <div className="overflow-hidden relative py-4">
      <div className="flex items-center justify-between gap-8 flex-wrap sm:flex-nowrap">
        {brands.map((b, i) => (
          <div
            key={i}
            className="w-1/2 sm:w-auto flex-1 flex items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-[#73eb0d]/40 group"
          >
            <div className="relative h-12 w-28 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
              <Image
                src={b.img}
                alt={b.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
