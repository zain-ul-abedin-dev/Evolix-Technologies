"use strict";
"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(currentProgress, 100));
        setIsVisible(window.scrollY > 250);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#1a1817] text-white border-2 border-[#73eb0d] shadow-2xl flex items-center justify-center overflow-hidden group hover:scale-110 transition-all duration-300 cursor-pointer"
      aria-label="Scroll to top"
    >
      {/* Liquid Wave Fill Progress */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#73eb0d] transition-all duration-150 pointer-events-none opacity-80"
        style={{ height: `${scrollProgress}%` }}
      />

      {/* Arrow Icon */}
      <ArrowUp
        size={20}
        className="relative z-10 text-white group-hover:text-black transition-colors"
      />
    </button>
  );
};
