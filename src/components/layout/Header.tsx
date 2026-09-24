"use strict";
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { OffcanvasDrawer } from "./OffcanvasDrawer";

export const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="w-full relative z-40">
        {/* =========================================
            1. TOPBAR - Direct 1-to-1 matching Inotek Template
            ========================================= */}
        <div className="hidden lg:block bg-[#73eb0d] text-white text-[14px] font-normal py-[11px] px-6 xl:px-[60px] relative z-10">
          <div className="flex items-center justify-between w-full">
            {/* Left Top Info (Template list-style-1) */}
            <div className="flex items-center gap-[35px]">
              {/* House / Address */}
              <div className="flex items-center text-white text-[16px] leading-none">
                <svg className="w-[14px] h-[14px] text-white mr-[10px] shrink-0" fill="currentColor" viewBox="0 0 576 512">
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 17-14 32.2-32 32.2h-64c-17 0-32-15-32-32V352h-96v96c0 17-15 32-32 32h-64c-18 0-32-15-32-32.2l.7-160.2h-32c-17 0-32-14.1-32-32.1 0-9 4-17 10-24L267.7 22.8c11.6-11.6 30.5-11.6 42.1 0l256 208.7c6 7 10 15 10 24z" />
                </svg>
                <span>{siteConfig.contact.address}</span>
              </div>

              {/* Envelope / Email */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center text-white text-[16px] leading-none hover:text-white transition-colors"
              >
                <svg className="w-[14px] h-[14px] text-white mr-[10px] shrink-0" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L288 338.7c-19 14.2-45 14.2-64 0L0 176z" />
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
            2. MAIN NAVBAR - Glassy / Translucent Floating
            ========================================= */}
        <div
          className={`transition-all duration-300 px-6 lg:px-16 py-4 ${isSticky
            ? "fixed top-0 left-0 right-0 bg-[#f6f4f3]/90 backdrop-blur-md shadow-lg border-b border-black/10 z-50 animate-in slide-in-from-top-2"
            : "bg-[#f6f4f3]/80 backdrop-blur-xs border-b border-black/5"
            }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo - Inotek & Evolix Clean Branding */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-[#1a1817] flex items-center justify-center font-black text-[#73eb0d] text-2xl shadow-md group-hover:scale-105 transition-transform border border-black/10">
                E
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl lg:text-2xl tracking-tight text-[#1a1817] leading-none">
                  Evolix <span className="text-[#73eb0d]">Tech</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#5a5856] mt-1">
                  Technologies
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {siteConfig.navLinks.map((link) => {
                if (link.submenu) {
                  return (
                    <div
                      key={link.name}
                      className="relative group py-2"
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1.5 font-bold text-sm transition-colors ${pathname.startsWith("/services")
                          ? "text-[#62cb08]"
                          : "text-[#1a1817] hover:text-[#62cb08]"
                          }`}
                      >
                        {link.name}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                      </Link>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-64 bg-white border border-black/10 rounded-2xl shadow-2xl p-3 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-[#5a5856] hover:text-[#1a1817] hover:bg-[#73eb0d]/20 transition-all"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-bold text-sm transition-colors relative py-1 ${isActive
                      ? "text-[#62cb08]"
                      : "text-[#1a1817] hover:text-[#62cb08]"
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#73eb0d] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Items */}
            <div className="flex items-center gap-4">
              {/* Drawer Toggle Icon */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="hidden sm:flex w-10 h-10 rounded-full bg-black/5 hover:bg-[#73eb0d] hover:text-[#1a1817] items-center justify-center text-[#1a1817] transition-all cursor-pointer border border-black/5"
                aria-label="Open quick sidebar"
              >
                <LayoutGrid size={18} />
              </button>

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

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-black/5 text-[#1a1817] flex items-center justify-center hover:bg-[#73eb0d] transition-colors"
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
            {siteConfig.navLinks.map((link) => (
              <div key={link.name} className="border-b border-black/5 pb-2">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-[#1a1817] hover:text-[#62cb08]"
                >
                  {link.name}
                </Link>
                {link.submenu && (
                  <div className="pl-4 mt-2 space-y-2">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm text-[#5a5856] hover:text-[#62cb08]"
                      >
                        • {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
