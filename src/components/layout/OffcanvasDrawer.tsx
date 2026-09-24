"use strict";
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Mail, Phone, Clock, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/config/site";

interface OffcanvasDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OffcanvasDrawer: React.FC<OffcanvasDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative z-50 w-full max-w-md bg-[#1a1817] text-white p-8 overflow-y-auto shadow-2xl flex flex-col justify-between border-l border-white/10 h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#73eb0d] flex items-center justify-center font-bold text-black text-xl">
                E
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Evolix <span className="text-[#73eb0d]">Tech</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#73eb0d] hover:text-black transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* About Quick */}
          <div className="mt-8">
            <span className="text-xs uppercase font-bold tracking-wider text-[#73eb0d]">
              Islamabad, Pakistan
            </span>
            <h3 className="text-2xl font-bold mt-2 text-white">
              Pioneering Next-Gen IT & Software Solutions
            </h3>
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              We empower startups and global enterprises with high-performance web systems, custom software, mobile apps, and scalable digital transformation.
            </p>
          </div>

          {/* Quick Instagram / Gallery Showcase */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold text-white/90 mb-3">Portfolio Highlights</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                "/assets/images/project/hm1-img01.webp",
                "/assets/images/project/hm1-img02.webp",
                "/assets/images/project/hm1-img03.webp",
                "/assets/images/project/hm1-img04.webp",
                "/assets/images/blog/blog-grid02.webp",
                "/assets/images/blog/blog-grid03.webp",
              ].map((img, index) => (
                <div key={index} className="aspect-square relative rounded-lg overflow-hidden group bg-white/5">
                  <Image
                    src={img}
                    alt={`Showcase ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#73eb0d]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="mt-8 space-y-4 text-sm text-white/80">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#73eb0d] shrink-0 mt-1" />
              <span>{siteConfig.contact.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#73eb0d] shrink-0" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#73eb0d]">
                {siteConfig.contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#73eb0d] shrink-0" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#73eb0d]">
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-[#73eb0d] shrink-0" />
              <span>{siteConfig.contact.hours}</span>
            </div>
          </div>
        </div>

        {/* Quick Newsletter in Drawer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-white/60 mb-2">Subscribe for tech insights & updates</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
            className="flex items-center gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-hidden focus:border-[#73eb0d]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#73eb0d] text-black hover:bg-[#62cb08] transition-colors"
              aria-label="Subscribe"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
