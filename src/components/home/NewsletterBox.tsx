"use strict";
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, CheckCircle2 } from "lucide-react";

export const NewsletterBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 -mb-16">
      <div className="relative rounded-3xl overflow-hidden bg-[#061153] text-white p-8 lg:p-12 shadow-2xl border border-white/10">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/newsletter/hm1-bg01.webp"
            alt="Newsletter Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Headline */}
          <div className="lg:col-span-6 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Subscribe Our Newsletter <br />
              For Latest Updates
            </h3>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-[#73eb0d]/20 text-[#73eb0d] border border-[#73eb0d]/30 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>Thank you for subscribing! We will keep you updated.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-hidden focus:border-[#73eb0d] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto theme-btn py-3.5 px-8 shrink-0 cursor-pointer br-30"
                >
                  <span className="link-effect">
                    <span className="effect-1">Subscribe</span>
                    <span className="effect-1">Subscribe</span>
                  </span>
                  <span className="arrow-all">
                    <Send size={14} className="text-[#73eb0d]" />
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
