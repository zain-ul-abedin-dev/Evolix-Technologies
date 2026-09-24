"use strict";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const ServicesGrid: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#f3f6fe] relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="sub-title-badge">
              <span className="w-2 h-2 rounded-full bg-[#73eb0d]" />
              <span>Services</span>
            </div>
            <h2 className="sec-title mt-2">
              Comprehensive, scalable it services <br />
              empower growing businesses
            </h2>
          </div>
          <Link href="/services" className="theme-btn br-30">
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
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.services.map((service) => (
            <div
              key={service.id}
              className="service-card-five group hover:border-[#73eb0d] transition-all bg-white"
            >
              <div>
                {/* Number Badge & Logo */}
                <div className="flex items-center justify-between mb-6">
                  <span className="service-number">{service.id}</span>
                  <div className="w-14 h-14 rounded-2xl bg-[#f4f7ff] flex items-center justify-center group-hover:bg-[#73eb0d]/20 transition-colors">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={34}
                      height={34}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-xl font-bold text-[#061153] group-hover:text-[#5ebf0a] transition-colors mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-[#616161] leading-relaxed mb-6">
                  Explore how we transform idea into main extraordinary paid digital assets.
                </p>
              </div>

              {/* Bottom Action Link with diagonal arrow */}
              <div className="pt-4 border-t border-[#061153]/8 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-extrabold uppercase tracking-wider text-[#061153] group-hover:text-[#5ebf0a] flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore More</span>
                  <svg className="w-3.5 h-3.5 stroke-current group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 12 13" fill="none">
                    <path d="M10.0035 3.90804L1.41153 12.5L0 11.0885L8.59097 2.49651H1.01922V0.5H12V11.4808H10.0035V3.90804Z" fill="currentColor"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
