"use strict";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const CtaBanner: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-[#061153] text-white overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src="/assets/images/cta/hm5-bg02.webp"
          alt="CTA Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Empowering Your Businesses <br className="hidden sm:inline" />
              Innovative Solutions
            </h2>
          </div>

          <div className="shrink-0">
            <Link href="/projects" className="theme-btn style-2 br-30">
              <span className="link-effect">
                <span className="effect-1">Browse all Works</span>
                <span className="effect-1">Browse all Works</span>
              </span>
              <span className="arrow-all">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6H10M10 6L6 2M10 6L6 10"
                    stroke="#061153"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
