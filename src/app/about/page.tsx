import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Zap, Users, Trophy } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TeamSection } from "@/components/home/TeamSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata = {
  title: "About Us - Engineering Excellence & Vision",
  description: "Learn about Evolix Technologies, our Islamabad engineering lab, leadership vision, and proven track record in global digital innovation.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-24 bg-[#1a1817] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/cta/hm5-bg02.webp"
            alt="About Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="sub-title-badge dark-mode mx-auto">
            <CheckCircle2 size={16} className="text-[#73eb0d]" />
            <span>Who We Are</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4">
            About Evolix Technologies
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mt-4 leading-relaxed">
            We are a forward-thinking software engineering and digital transformation studio based in Islamabad, partnering with visionary companies globally.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 lg:py-28 bg-[#f6f4f3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-black/10">
                <Image
                  src="/assets/images/about/hm5-img01.webp"
                  alt="Evolix Technologies Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-[#1a1817] text-white shadow-2xl border border-white/10 hidden sm:block">
                <div className="text-3xl font-black text-[#73eb0d]">98%</div>
                <div className="text-xs uppercase font-extrabold text-white/80">
                  Client Satisfaction
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="sub-title-badge">
                <CheckCircle2 size={16} className="text-[#1a1817]" />
                <span>Our Mission & Core Values</span>
              </div>
              <h2 className="sec-title">
                Building High-Impact Software <br />
                That Transforms Industries
              </h2>
              <p className="text-[#5a5856] text-base leading-relaxed">
                At Evolix Technologies, we believe that software should be beautiful, scalable, and engineered to drive measurable business growth. From cloud microservices to mobile applications, we eliminate technical debt and accelerate time to market.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-white border border-black/5 shadow-xs">
                  <Zap size={24} className="text-[#73eb0d] mb-2" />
                  <h4 className="font-bold text-[#1a1817]">Speed & Precision</h4>
                  <p className="text-xs text-[#5a5856] mt-1">
                    Rapid agile sprints with strict quality assurance and zero regressions.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-black/5 shadow-xs">
                  <ShieldCheck size={24} className="text-[#73eb0d] mb-2" />
                  <h4 className="font-bold text-[#1a1817]">Enterprise Security</h4>
                  <p className="text-xs text-[#5a5856] mt-1">
                    Military-grade encryption, role-based access, and compliance standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <TeamSection />

      {/* Client Reviews */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterBox />
    </>
  );
}
