"use strict";
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#f4f7ff] pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Background Graphic Pattern from Inotek */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Image
          src="/assets/images/hero/hm5-bg01.webp"
          alt="Hero Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Subtle Glow Ambient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#73eb0d]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#061153]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Subtitle Badge matching template */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#061153] text-xs font-extrabold uppercase tracking-wider border border-[#73eb0d]/40 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#73eb0d]" />
              <span>INNOVATIVE SOLUTIONS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#061153] leading-[1.15] tracking-tight">
              We helping <span className="text-[#73eb0d]">1M+</span> <br />
              Digital Business Innovation
            </h1>

            {/* Star Icon & Subtitle Text matching template */}
            <div className="flex items-start gap-4 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#73eb0d] flex items-center justify-center text-[#061153] shrink-0 animate-spin-slow shadow-md shadow-[#73eb0d]/30">
                <Image
                  src="/assets/images/icons/star.png"
                  alt="Star"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <p className="text-base sm:text-lg text-[#616161] leading-relaxed">
                Competently empower high standards in materials through transparent models create cross-platform digital growth.
              </p>
            </div>

            {/* Action Buttons & Social Proof */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Discover More CTA with template styling */}
              <Link href="/about" className="theme-btn br-30">
                <span className="link-effect">
                  <span className="effect-1">Discover More</span>
                  <span className="effect-1">Discover More</span>
                </span>
                <span className="arrow-all">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6H10M10 6L6 2M10 6L6 10"
                      stroke="#73eb0d"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>

              {/* Social Proof Avatars & Counter */}
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-3xl border border-black/5 shadow-md">
                <div className="flex -space-x-3">
                  {[
                    "/assets/images/social/social-img01.webp",
                    "/assets/images/social/social-img02.webp",
                    "/assets/images/social/social-img03.webp",
                  ].map((img, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-xs">
                      <Image src={img} alt={`Client ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-extrabold text-base text-[#061153] leading-none">
                    {siteConfig.stats.activeCustomers}
                  </div>
                  <span className="text-xs text-[#616161] font-medium">active customers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic Compositing */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Rounded Box */}
              <div className="relative z-10 rounded-3xl overflow-hidden bg-white p-3 border border-black/10 shadow-2xl">
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#061153]">
                  <Image
                    src="/assets/images/hero/hm5-img01.webp"
                    alt="Evolix Technologies Team"
                    fill
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#061153]/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Experience Badge Card */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-[#061153] text-white p-5 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform">
                <div className="text-4xl font-black text-[#73eb0d]">
                  {siteConfig.stats.experienceYears}
                </div>
                <div className="text-xs uppercase font-extrabold tracking-wider leading-tight text-white/90">
                  YEARS OF <br />
                  <span className="text-[#73eb0d]">EXPERIENCE</span>
                </div>
              </div>

              {/* Floating Mini Highlight Image */}
              <div className="hidden sm:block absolute -top-6 -right-6 z-20 w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/assets/images/hero/hm5-img02.webp"
                  alt="Tech Innovation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
