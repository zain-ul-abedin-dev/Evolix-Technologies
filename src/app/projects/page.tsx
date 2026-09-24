import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata = {
  title: "Case Studies & Portfolio - Proven Digital Systems",
  description: "Browse enterprise software engineering, web applications, and UI/UX case studies delivered by Evolix Technologies.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-24 bg-[#1a1817] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/cta/hm5-bg02.webp"
            alt="Projects Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="sub-title-badge dark-mode mx-auto">
            <CheckCircle2 size={16} className="text-[#73eb0d]" />
            <span>Our Work</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4">
            Case Studies & Portfolio
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mt-4 leading-relaxed">
            Real products built for real businesses. Explore our track record in delivering high-throughput web and mobile platforms.
          </p>
        </div>
      </section>

      {/* Projects Filterable Grid */}
      <ProjectsSection />

      {/* CTA */}
      <CtaBanner />

      {/* Newsletter */}
      <NewsletterBox />
    </>
  );
}
