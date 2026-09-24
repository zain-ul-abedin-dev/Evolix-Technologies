"use strict";
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Phone, Mail, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export const AboutSection: React.FC = () => {
  const [activeTag, setActiveTag] = useState("AUTOMATION");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const tags = ["DESIGN", "AUTOMATION", "MARKETING", "DEVELOPMENT", "BUSINESS STRATEGY"];

  return (
    <>
      <section className="py-20 lg:py-28 bg-[#f4f7ff] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#061153]/10">
            <div>
              <div className="sub-title-badge">
                <span className="w-2 h-2 rounded-full bg-[#73eb0d]" />
                <span>About Company</span>
              </div>
              <h2 className="sec-title mt-2">
                Proven track record of driving <br />
                digital transformation speed <br />
                and clarity solutions
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-[#616161] leading-relaxed">
              Explore how we transform ideas into extraordinary digital experiences through robust software architecture.
            </p>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Col 1: Left Stats Box */}
            <div className="lg:col-span-3 flex flex-col justify-between p-8 rounded-3xl bg-white border border-[#061153]/8 shadow-lg hover:border-[#73eb0d] transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#73eb0d]/20 flex items-center justify-center">
                    <Image
                      src="/assets/images/about/hm5-icon1.webp"
                      alt="Stats Icon"
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className="text-4xl font-black text-[#061153]">
                    {siteConfig.stats.experienceYears}+
                  </span>
                </div>
                <h4 className="text-xl font-bold text-[#061153] mt-6">Years of Experiences</h4>
                <div className="h-0.5 w-12 bg-[#73eb0d] my-4" />
                <p className="text-sm text-[#616161] leading-relaxed">
                  Explore how we transform idea into extraordinary best digital experiences.
                </p>
              </div>

              <div className="pt-8 border-t border-[#061153]/8 mt-6">
                <div className="flex -space-x-3 mb-3">
                  {[
                    "/assets/images/social/social-img01.webp",
                    "/assets/images/social/social-img02.webp",
                    "/assets/images/social/social-img03.webp",
                    "/assets/images/social/social-img04.webp",
                  ].map((img, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden relative shadow-xs">
                      <Image src={img} alt={`User ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <h6 className="font-extrabold text-sm text-[#061153]">
                  {siteConfig.stats.happyClients} Happy customers
                </h6>
              </div>
            </div>

            {/* Col 2: Middle Video Feature Card */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[380px] shadow-xl group border border-[#061153]/10">
              <Image
                src="/assets/images/about/hm5-img01.webp"
                alt="Evolix Leadership"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#061153]/90 via-[#061153]/30 to-transparent" />

              {/* Play Button with pulsating glow */}
              <button
                onClick={() => setVideoModalOpen(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#73eb0d] text-[#061153] flex items-center justify-center hover:scale-110 transition-transform shadow-2xl z-20 cursor-pointer"
                aria-label="Play introduction video"
              >
                <Play size={24} fill="#061153" className="ml-1 text-[#061153]" />
              </button>

              {/* Card Quote Info */}
              <div className="absolute bottom-8 left-8 right-8 z-10 text-white">
                <h4 className="text-xl sm:text-2xl font-bold leading-snug">
                  “Innovation IT Solutions for your next gen <br className="hidden sm:inline" />Business and growing customers”
                </h4>
                <p className="text-xs uppercase font-extrabold text-[#73eb0d] mt-2">
                  Anstacia Shorna <span className="text-white/70">/ Vice President</span>
                </p>
              </div>
            </div>

            {/* Col 3: Right Solutions & Reach Out */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-6">
              {/* Solution Tags */}
              <div className="p-6 rounded-3xl bg-white border border-[#061153]/8 shadow-md">
                <h4 className="text-lg font-bold text-[#061153] mb-4">Our Solutions</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                        activeTag === tag
                          ? "bg-[#73eb0d] text-[#061153] shadow-sm font-black"
                          : "bg-[#f4f7ff] text-[#616161] hover:bg-[#e8edfa]"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reach Out Card */}
              <div className="p-6 rounded-3xl bg-[#061153] text-white border border-white/10 shadow-lg flex-1 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs uppercase font-bold text-[#73eb0d] tracking-wider">
                    Direct Reach
                  </span>
                  <h4 className="text-xl font-bold mt-1 text-white">Reach out Us</h4>
                  <div className="space-y-3 mt-4 text-sm text-white/80">
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="flex items-center gap-2 hover:text-[#73eb0d] transition-colors"
                    >
                      <Phone size={16} className="text-[#73eb0d]" />
                      <span>{siteConfig.contact.phone}</span>
                    </a>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="flex items-center gap-2 hover:text-[#73eb0d] transition-colors"
                    >
                      <Mail size={16} className="text-[#73eb0d]" />
                      <span>{siteConfig.contact.email}</span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4 text-xs text-white/60 relative z-10">
                  📍 {siteConfig.contact.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-[#73eb0d] hover:text-[#061153] transition-colors"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/SMKPKGW083c?autoplay=1"
                title="Evolix Technologies Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
