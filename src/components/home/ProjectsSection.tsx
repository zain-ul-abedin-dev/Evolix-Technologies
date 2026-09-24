"use strict";
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterOptions = [
    { label: "All Works", value: "all" },
    { label: "Designing", value: "design" },
    { label: "Development", value: "development" },
    { label: "Business", value: "business" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.filterCategory === activeFilter);

  return (
    <section className="py-20 lg:py-28 bg-[#f4f7ff] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="sub-title-badge">
            <span className="w-2 h-2 rounded-full bg-[#73eb0d]" />
            <span>Projects</span>
          </div>
          <h2 className="sec-title mt-2">
            We’ve successfully completed <br />
            the creative projects
          </h2>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === opt.value
                  ? "bg-[#061153] text-[#73eb0d] shadow-md scale-105"
                  : "bg-white text-[#616161] border border-[#061153]/8 hover:border-[#061153]/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#061153]/8 shadow-lg hover:border-[#73eb0d] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#061153]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#061153]/90 text-[#73eb0d] px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#061153] group-hover:text-[#5ebf0a] transition-colors mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <div className="h-px w-full bg-[#061153]/8 my-3" />
                  <p className="text-xs text-[#616161] leading-relaxed line-clamp-2">
                    Professionally into reintermediate business whereas discovery main
                  </p>
                </div>
              </div>

              {/* Action Bottom */}
              <div className="px-6 pb-6 pt-2 border-t border-[#061153]/8 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-extrabold text-[#061153] group-hover:text-[#5ebf0a] flex items-center gap-1.5 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <div className="w-8 h-8 rounded-full bg-[#f4f7ff] group-hover:bg-[#73eb0d] group-hover:text-[#061153] flex items-center justify-center transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
