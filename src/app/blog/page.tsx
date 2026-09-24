import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { BlogSection } from "@/components/home/BlogSection";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata = {
  title: "Insights & Tech Blog - Engineering, SEO & Web Strategy",
  description: "Stay ahead with deep dives into modern web engineering, technical SEO, UI/UX interaction design, and cloud architectures from Evolix Technologies.",
};

export default function BlogPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-24 bg-[#1a1817] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/cta/hm5-bg02.webp"
            alt="Blog Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="sub-title-badge dark-mode mx-auto">
            <CheckCircle2 size={16} className="text-[#73eb0d]" />
            <span>Tech Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4">
            Insights & Engineering Blog
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mt-4 leading-relaxed">
            Practical guides and architecture breakdowns from our software engineers and SEO strategists in Islamabad.
          </p>
        </div>
      </section>

      {/* Blog Articles */}
      <BlogSection />

      {/* Newsletter */}
      <NewsletterBox />
    </>
  );
}
