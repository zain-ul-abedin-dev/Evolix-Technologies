import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CtaBanner } from "@/components/home/CtaBanner";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata = {
  title: "IT Services & Solutions - Web, Mobile, Cloud & SEO",
  description: "Explore enterprise IT services provided by Evolix Technologies: custom web development, mobile apps, UI/UX design, cloud solutions, and technical SEO.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-24 bg-[#1a1817] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/cta/hm5-bg02.webp"
            alt="Services Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="sub-title-badge dark-mode mx-auto">
            <CheckCircle2 size={16} className="text-[#73eb0d]" />
            <span>What We Offer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4">
            Our Core IT Services
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mt-4 leading-relaxed">
            End-to-end technology solutions designed to solve complex operational challenges and scale digital revenue.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-[#f6f4f3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.services.map((service) => (
              <div
                key={service.id}
                className="service-card-five group hover:border-[#73eb0d] transition-all bg-white"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="service-number">{service.id}</span>
                    <div className="w-14 h-14 rounded-2xl bg-[#f6f4f3] flex items-center justify-center group-hover:bg-[#73eb0d]/20 transition-colors">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        width={34}
                        height={34}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1a1817] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#5a5856] leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-[#5a5856]">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#73eb0d]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-extrabold uppercase tracking-wider text-[#1a1817] group-hover:text-[#62cb08] flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Service Details</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner />

      {/* Newsletter */}
      <NewsletterBox />
    </>
  );
}
