"use strict";
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutGrid,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { OffcanvasDrawer } from "./OffcanvasDrawer";

export const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const stickySentinel = useRef<HTMLDivElement>(null);

  // Sticky once the page is scrolled more than 80px. Watched with an IntersectionObserver on a 1px
  // marker instead of reading window.scrollY on every scroll event: that read forced the browser to
  // recalculate style and layout on every frame of smooth scrolling and made scrolling lag.
  useEffect(() => {
    const marker = stickySentinel.current;
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="w-full absolute top-0 left-0 z-50">
        {/* Marker at 80px from the top of the page (see the sticky effect above). */}
        <div ref={stickySentinel} aria-hidden="true" className="absolute top-[80px] left-0 w-px h-px pointer-events-none" />
        {/* =========================================
            1. TOPBAR - Direct 1-to-1 matching Inotek Template
            ========================================= */}
        <div className="hidden lg:block bg-[#73eb0d] text-white text-[14px] font-normal py-[11px] px-6 xl:px-[60px] relative z-10">
          <div className="flex items-center justify-between w-full">
            {/* Left Top Info (Template list-style-1) */}
            <div className="flex items-center gap-[35px]">
              {/* House / Address */}
              <div className="flex items-center text-white text-[16px] leading-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-[18px] text-white mr-[10px] shrink-0"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                <span>{siteConfig.contact.address}</span>
              </div>

              {/* Envelope / Email */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center text-white text-[16px] leading-none hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-[18px] text-white mr-[10px] shrink-0"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>

            {/* Right Social Icons (Template outer-box & social-icon-one) */}
            <div className="flex items-center min-w-[315px] justify-end">
              <span className="text-[16px] font-medium text-white">
                Follow Us On :
              </span>
              <div className="flex items-center">
                {/* Facebook */}
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-[32px] h-[32px] rounded-full bg-white/15 hover:bg-[#061153] text-white flex items-center justify-center ml-[15px] transition-all duration-400"
                  aria-label="Facebook"
                >
                  <svg className="w-[14px] h-[14px] fill-current text-white" viewBox="0 0 320 512">
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V137.9c0-27.7 9.2-46.5 49-46.5l52.2-.1V4.2C288.2 3 257.6 0 221.8 0 147.2 0 96 45.6 96 128.7V201.5H10.5v97.8H80z" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-[32px] h-[32px] rounded-full bg-white/15 hover:bg-[#061153] text-white flex items-center justify-center ml-[15px] transition-all duration-400"
                  aria-label="X Twitter"
                >
                  <svg className="w-[14px] h-[14px] fill-current text-white" viewBox="0 0 512 512">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-[32px] h-[32px] rounded-full bg-white/15 hover:bg-[#061153] text-white flex items-center justify-center ml-[15px] transition-all duration-400"
                  aria-label="LinkedIn"
                >
                  <svg className="w-[14px] h-[14px] fill-current text-white" viewBox="0 0 448 512">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            2. MAIN NAVBAR - Glassy on Scroll & Clean Minimal Sticky
            ========================================= */}
        <div
          className={`transition-all duration-300 px-6 xl:px-[60px] ${isSticky
            ? "fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-xl shadow-xs border-b border-black/5 z-50 py-3.5 animate-in slide-in-from-top-2"
            : "bg-transparent border-b border-[#061153]/10 py-4"
            }`}
        >
          <div className="flex items-center justify-between w-full">
            {/* Logo - Evolix Official Vector SVG */}
            <Link href="/" className="flex items-center group shrink-0 py-1">
              <Image
                src="/Evolix LOGO SVG -01.svg"
                alt="Evolix Technologies Logo"
                width={170}
                height={62}
                className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {siteConfig.navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-bold text-[17px] xl:text-[18px] !text-[#4a4542] hover:!text-[#73eb0d] transition-colors relative py-1"
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#73eb0d] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Items (Shown when at top) */}
            {!isSticky && (
              <div className="hidden lg:flex items-center gap-4">


                {/* "Get Free Quote" Button with Template Style Dual Layer Hover */}
                <Link href="/contact" className="theme-btn">
                  <span className="link-effect">
                    <span className="effect-1">Get Free Quote</span>
                    <span className="effect-1">Get Free Quote</span>
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
            )}

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-black/5 text-[#061153] flex items-center justify-center hover:bg-[#73eb0d] transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-black/10 px-6 py-6 space-y-4 shadow-xl">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <div key={link.name} className="border-b border-black/5 pb-2">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-block text-[17px] font-bold text-black hover:text-[#73eb0d] transition-colors relative py-1"
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="block h-0.5 w-full bg-[#73eb0d] rounded-full mt-0.5" />
                    )}
                  </Link>
                </div>
              );
            })}
            <div className="pt-2 text-xs text-[#5a5856] space-y-2">
              <p>📍 {siteConfig.contact.address}</p>
              <p>📞 {siteConfig.contact.phone}</p>
              <p>✉️ {siteConfig.contact.email}</p>
            </div>
          </div>
        )}
      </header>

      {/* Offcanvas Drawer */}
      <OffcanvasDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
