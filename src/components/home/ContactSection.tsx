"use strict";
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, Check, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "web-development",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          msg: data.message || "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", service: "web-development", message: "" });
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#73eb0d", "#061153", "#ffffff"],
          });
        } catch {
          // ignore
        }
      } else {
        setStatus({
          type: "error",
          msg: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        msg: "Failed to connect to server. Please email info@evolixtechnologies.com directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#061153] text-white relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <Image
          src="/assets/images/contact/hm5-bg01.webp"
          alt="Contact Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Form & Request Callback */}
          <div className="lg:col-span-7">
            <div className="sub-title-badge dark-mode">
              <span className="w-2 h-2 rounded-full bg-[#73eb0d]" />
              <span>Get in Touch</span>
            </div>
            <h2 className="sec-title text-white mt-2 mb-8">
              Need help? We&apos;re Here...
            </h2>

            {/* Form Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#09155c] border border-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6">
                Request for a call back
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase font-extrabold tracking-wider text-white/70 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-hidden focus:border-[#73eb0d] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-extrabold tracking-wider text-white/70 mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="E-Mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-hidden focus:border-[#73eb0d] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-extrabold tracking-wider text-white/70 mb-2">
                    Select Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl bg-[#061153] border border-white/15 text-white text-sm focus:outline-hidden focus:border-[#73eb0d] transition-colors"
                  >
                    <option value="web-development">Website Development</option>
                    <option value="social-marketing">Social Media Marketing</option>
                    <option value="ui-ux-design">UI/UX Designing</option>
                    <option value="seo-marketing">Search Engine Optimization (SEO)</option>
                    <option value="domain-hosting">Domain & Hosting Solutions</option>
                    <option value="3d-graphics">3D Vector Graphic Designing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-extrabold tracking-wider text-white/70 mb-2">
                    Write Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-hidden focus:border-[#73eb0d] transition-colors"
                  />
                </div>

                {/* Status Alert */}
                {status.type && (
                  <div
                    className={`p-4 rounded-2xl text-sm flex items-center gap-3 ${
                      status.type === "success"
                        ? "bg-[#73eb0d]/20 text-[#73eb0d] border border-[#73eb0d]/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {status.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
                    <span>{status.msg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="theme-btn w-full justify-center py-4 text-base cursor-pointer disabled:opacity-50 br-30"
                >
                  <span className="link-effect">
                    <span className="effect-1">
                      {loading ? "Please wait..." : "Send Message"}
                    </span>
                    <span className="effect-1">
                      {loading ? "Please wait..." : "Send Message"}
                    </span>
                  </span>
                  <span className="arrow-all">
                    <Send size={14} className="text-[#73eb0d]" />
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Direct Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#09155c] border border-white/10 shadow-xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Direct Information</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Contact our technology team directly for immediate assistance, project planning, or tech consultations.
              </p>

              <div className="space-y-4 pt-2 text-sm text-white/90">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#73eb0d]/20 flex items-center justify-center text-[#73eb0d] shrink-0 font-bold">
                    📞
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Direct Contact</span>
                    <a href={`tel:${siteConfig.contact.phone}`} className="font-bold text-base hover:text-[#73eb0d]">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#73eb0d]/20 flex items-center justify-center text-[#73eb0d] shrink-0 font-bold">
                    ✉️
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Official Inquiries</span>
                    <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-base hover:text-[#73eb0d]">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#73eb0d]/20 flex items-center justify-center text-[#73eb0d] shrink-0 font-bold">
                    📍
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Location</span>
                    <p className="font-bold text-base">{siteConfig.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
