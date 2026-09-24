"use strict";
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export const VideoStatsBanner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative bg-[#061153] text-white py-20 lg:py-28 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/video/hm5-bg01.webp"
            alt="Background Pattern"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Video CTA Play Area */}
            <div className="lg:col-span-6 flex items-center gap-6">
              <button
                onClick={() => setModalOpen(true)}
                className="w-20 h-20 rounded-full bg-[#73eb0d] text-[#061153] flex items-center justify-center shrink-0 hover:scale-110 transition-transform shadow-2xl cursor-pointer"
                aria-label="Play company video"
              >
                <Play size={28} fill="#061153" className="ml-1 text-[#061153]" />
              </button>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-tight">
                  We make the creative <br />
                  solution for business?
                </h3>
              </div>
            </div>

            {/* Right: Live Stat Counters */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Stat 1 */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-5 hover:border-[#73eb0d] transition-all">
                <div className="w-16 h-16 rounded-2xl bg-[#73eb0d]/15 flex items-center justify-center shrink-0">
                  <Image
                    src="/assets/images/video/hm5-icon01.webp"
                    alt="Completed Works Icon"
                    width={36}
                    height={36}
                  />
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-black text-white flex items-baseline">
                    <span>{siteConfig.stats.completedProjects}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 font-medium">Completed Works</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-5 hover:border-[#73eb0d] transition-all">
                <div className="w-16 h-16 rounded-2xl bg-[#73eb0d]/15 flex items-center justify-center shrink-0">
                  <Image
                    src="/assets/images/video/hm5-icon02.webp"
                    alt="Satisfaction Icon"
                    width={36}
                    height={36}
                  />
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-black text-white flex items-baseline">
                    <span>{siteConfig.stats.satisfactionRate}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 mt-1 font-medium">Satisfaction Rates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-[#73eb0d] hover:text-[#061153] transition-colors"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/SMKPKGW083c?autoplay=1"
                title="Evolix Technologies Video"
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
