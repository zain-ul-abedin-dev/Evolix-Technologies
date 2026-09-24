"use strict";
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BrandsCarousel } from "./BrandsCarousel";

export const WhyChooseUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const features = [
    {
      id: 1,
      category: "Discovery",
      title: "Innovative Solutions",
      desc: "Completely scale out-of-the-box sources vis-a-vis premiers main relationships. Collaboratively network frictionless expertise into box sources high standards",
      icon: "/assets/images/choose/hm5-icon01.webp",
      image: "/assets/images/choose/hm5-img01.webp",
    },
    {
      id: 2,
      category: "Our Experts",
      title: "High Professional Team",
      desc: "Completely scale out-of-the-box sources vis-a-vis premiers main relationships. Collaboratively network frictionless expertise into box sources high standards",
      icon: "/assets/images/choose/hm5-icon02.webp",
      image: "/assets/images/choose/hm5-img02.webp",
    },
    {
      id: 3,
      category: "Supports",
      title: "24 Hrs Dedicated Support",
      desc: "Completely scale out-of-the-box sources vis-a-vis premiers main relationships. Collaboratively network frictionless expertise into box sources high standards",
      icon: "/assets/images/choose/hm5-icon03.webp",
      image: "/assets/images/choose/hm5-img03.webp",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#061153] text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src="/assets/images/choose/hm5-bg01.webp"
          alt="Choose Us Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="sub-title-badge dark-mode">
              <span className="w-2 h-2 rounded-full bg-[#73eb0d]" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="sec-title text-white mt-2">
              Proven track record of driving <br />
              digital transformation
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-white/70 leading-relaxed">
            Collaboratively network frictionless expertise into box sources high standards.
          </p>
        </div>

        {/* Interactive Feature Accordion & Dynamic Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left: Tab Accordion */}
          <div className="lg:col-span-6 space-y-4">
            {features.map((feature) => {
              const isActive = activeTab === feature.id;
              return (
                <div
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/10 border-[#73eb0d] shadow-xl shadow-[#73eb0d]/10"
                      : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-[#73eb0d] text-[#061153]" : "bg-white/10 text-white"
                      }`}
                    >
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={30}
                        height={30}
                        className={isActive ? "brightness-0" : ""}
                      />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-[#73eb0d]">
                        {feature.category}
                      </span>
                      <h4 className="text-xl font-bold text-white mt-1">{feature.title}</h4>
                      <p className="text-sm text-white/70 mt-2 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Image Preview */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-[#09155c]">
              {features.map((f) => (
                <div
                  key={f.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeTab === f.id ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#061153]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs uppercase font-bold text-[#73eb0d]">{f.category}</span>
                    <h5 className="text-lg font-bold text-white">{f.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brands Logo Carousel */}
        <div className="pt-12 border-t border-white/10">
          <p className="text-center text-xs uppercase font-bold tracking-widest text-white/50 mb-8">
            Trusted by Ambitious Brands & Organizations Worldwide
          </p>
          <BrandsCarousel />
        </div>
      </div>
    </section>
  );
};
