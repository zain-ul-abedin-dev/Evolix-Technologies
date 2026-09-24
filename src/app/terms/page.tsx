import React from "react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms of Service - Evolix Technologies",
  description: "Terms and conditions governing the software engineering and IT consulting services provided by Evolix Technologies.",
};

export default function TermsPage() {
  return (
    <section className="py-24 bg-[#f6f4f3]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-xl space-y-6 text-[#5a5856]">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1a1817]">Terms of Service</h1>
          <p className="text-xs text-[#5a5856]">Last Updated: September 2026</p>
          <hr className="border-black/5" />
          <h2 className="text-xl font-bold text-[#1a1817]">1. Acceptance of Terms</h2>
          <p>
            By accessing this website or engaging Evolix Technologies for IT solutions and custom development, you agree to comply with and be bound by these Terms of Service.
          </p>
          <h2 className="text-xl font-bold text-[#1a1817]">2. Intellectual Property</h2>
          <p>
            All custom deliverables and source code developed for client projects become the exclusive property of the client upon fulfillment of contractual agreements.
          </p>
          <h2 className="text-xl font-bold text-[#1a1817]">3. Contact Information</h2>
          <p>
            For legal inquiries, contact{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-[#1a1817] hover:underline">
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
