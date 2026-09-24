"use strict";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { siteConfig } from "@/config/site";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#f3f6fe] relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sticky Summary Box */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="sub-title-badge">
              <span className="w-2 h-2 rounded-full bg-[#73eb0d]" />
              <span>Testimonial</span>
            </div>
            <h2 className="sec-title text-[#061153]">
              Real Stories from Organic <br />
              Clients Worldwide
            </h2>
            <p className="text-sm sm:text-base text-[#616161] leading-relaxed">
              Inotek - is the reintermediate technically into chain references main extensive Dramatically faster main users next.
            </p>

            {/* Rating Summary Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#061153]/8 shadow-md flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#061153] text-[#73eb0d] flex items-center justify-center font-black text-2xl shrink-0">
                5.0
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#ff9d10] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#ff9d10" />
                  ))}
                </div>
                <h4 className="font-extrabold text-base text-[#061153]">Average Our Clients Ratings</h4>
                <span className="text-xs text-[#616161]">Based on verified customer reviews</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stacking Testimonial Cards */}
          <div className="lg:col-span-7 space-y-6">
            {siteConfig.testimonials.map((testi, index) => (
              <div
                key={testi.id}
                className="testi-card-five bg-white"
                style={{ top: `${100 + index * 20}px` }}
              >
                {/* Quote Header */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-[#061153] flex items-center gap-2">
                    <Image
                      src="/assets/images/testimonial/hm5-quote.webp"
                      alt="Quote"
                      width={28}
                      height={28}
                    />
                    {testi.quote}
                  </h4>
                  <div className="flex items-center gap-1 text-[#ff9d10]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#ff9d10" />
                    ))}
                    <span className="ml-1 font-bold text-xs text-[#061153]">{testi.rating}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#616161] leading-relaxed mb-6">
                  {testi.text}
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#061153]/8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-[#73eb0d]">
                    <Image
                      src={testi.avatar}
                      alt={testi.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-base text-[#061153]">{testi.author}</h5>
                    <p className="text-xs text-[#616161]">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
