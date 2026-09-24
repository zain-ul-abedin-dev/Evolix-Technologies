"use strict";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const TeamSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#f4f7ff] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Sticky Intro Box */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="sub-title-badge">
              <span className="w-2 h-2 rounded-full bg-[#73eb0d]" />
              <span>Our Team</span>
            </div>
            <h2 className="sec-title">
              Meet the expert team <br />
              powering our goals and <br />
              ambitions
            </h2>
            <p className="text-sm sm:text-base text-[#616161] leading-relaxed">
              Inotek - is the reintermediate technically into chain references main extensive Dramatically faster main users rather next-generations.
            </p>

            <div>
              <Link href="/about" className="theme-btn br-30">
                <span className="link-effect">
                  <span className="effect-1">All Member</span>
                  <span className="effect-1">All Member</span>
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

            {/* Team Showcase Banner */}
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden border border-[#061153]/10 shadow-xl mt-8">
              <Image
                src="/assets/images/team/hm5-img05.webp"
                alt="Evolix Team Lab"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right: Team Member Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {siteConfig.team.map((member) => (
              <div key={member.id} className="team-card-four">
                {/* Image Container with Slide-Up Overlay */}
                <div className="team-img-box aspect-4/5 relative bg-[#061153]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  {/* Hover Overlay with Social Icons */}
                  <div className="team-overlay">
                    <div className="flex items-center gap-2.5">
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-white text-[#061153] flex items-center justify-center hover:bg-[#73eb0d] transition-colors shadow-lg font-bold text-xs"
                        aria-label="LinkedIn"
                      >
                        in
                      </a>
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-white text-[#061153] flex items-center justify-center hover:bg-[#73eb0d] transition-colors shadow-lg font-bold text-xs"
                        aria-label="Twitter"
                      >
                        𝕏
                      </a>
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-white text-[#061153] flex items-center justify-center hover:bg-[#73eb0d] transition-colors shadow-lg font-bold text-xs"
                        aria-label="GitHub"
                      >
                        GH
                      </a>
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="mt-5 space-y-2">
                  <h4 className="text-xl font-bold text-[#061153]">{member.name}</h4>
                  <div>
                    <span className="team-role-badge">{member.role}</span>
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
