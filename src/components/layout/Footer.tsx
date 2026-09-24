"use strict";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const Footer: React.FC = () => {
  return (
    <footer className="footer-section z-1 br-30 pt-75 bg-[#061153] text-white position-relative mx-30 mb-30 overflow-hidden mt-20">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src="/assets/images/footer/hm1-bg01.webp"
          alt="Footer Pattern"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-20 pb-12">
        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Contact */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#73eb0d] flex items-center justify-center font-black text-[#061153] text-2xl">
                E
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Evolix <span className="text-[#73eb0d]">Tech</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Evolix Technologies provides cutting-edge IT solutions, custom web development, and digital transformation services.
            </p>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#73eb0d] shrink-0 mt-1" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#73eb0d] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#73eb0d] transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#73eb0d] shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#73eb0d] transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Information */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#73eb0d]" /> Information
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-[#73eb0d] inline-flex items-center gap-1.5 transition-colors">
                  <ArrowRight size={12} className="text-[#73eb0d]" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#73eb0d] inline-flex items-center gap-1.5 transition-colors">
                  <ArrowRight size={12} className="text-[#73eb0d]" /> Our Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#73eb0d] inline-flex items-center gap-1.5 transition-colors">
                  <ArrowRight size={12} className="text-[#73eb0d]" /> Latest Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#73eb0d] inline-flex items-center gap-1.5 transition-colors">
                  <ArrowRight size={12} className="text-[#73eb0d]" /> Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#73eb0d] inline-flex items-center gap-1.5 transition-colors">
                  <ArrowRight size={12} className="text-[#73eb0d]" /> Career & Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#73eb0d]" /> Services
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {siteConfig.services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-[#73eb0d] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <ArrowRight size={12} className="text-[#73eb0d]" /> {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Recent Blog Posts matching template gallery images */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#73eb0d]" /> Latest Blog
            </h4>
            <div className="space-y-4">
              <Link
                href="/blog/top-seo-marketing-strategies-2026"
                className="flex items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 bg-white/10">
                  <Image
                    src="/assets/images/footer/gallery-1.webp"
                    alt="Gallery 1"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white group-hover:text-[#73eb0d] transition-colors line-clamp-2">
                    Top 10 Most Popular Tools For Marketing
                  </h5>
                  <span className="text-[10px] text-[#73eb0d] font-bold mt-1 block">10 AUG, 2026</span>
                </div>
              </Link>

              <Link
                href="/blog/building-scalable-saas-nextjs"
                className="flex items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 bg-white/10">
                  <Image
                    src="/assets/images/footer/gallery-2.webp"
                    alt="Gallery 2"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white group-hover:text-[#73eb0d] transition-colors line-clamp-2">
                    Business Growing Tips for Sales Globally
                  </h5>
                  <span className="text-[10px] text-[#73eb0d] font-bold mt-1 block">10 AUG, 2026</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Evolix Technologies. All Rights Reserved. Islamabad, Pakistan.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Return & Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
