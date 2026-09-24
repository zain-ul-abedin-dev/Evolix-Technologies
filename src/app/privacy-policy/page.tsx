import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy - Evolix Technologies",
  description: "Read our privacy policy detailing how Evolix Technologies protects client confidentiality and data security.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-24 bg-[#f6f4f3]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-xl space-y-6 text-[#5a5856]">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1a1817]">Privacy Policy</h1>
          <p className="text-xs text-[#5a5856]">Last Updated: September 2026</p>
          <hr className="border-black/5" />
          <h2 className="text-xl font-bold text-[#1a1817]">1. Introduction</h2>
          <p>
            Evolix Technologies (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy and confidential intellectual property. This Privacy Policy outlines our practices regarding information collected via our website and services.
          </p>
          <h2 className="text-xl font-bold text-[#1a1817]">2. Data Collection & Use</h2>
          <p>
            We only collect information voluntarily provided by you through our contact forms (such as Name, Email, Project Requirements) strictly to respond to inquiries and provide consulting services. We never sell, rent, or distribute personal information to third parties.
          </p>
          <h2 className="text-xl font-bold text-[#1a1817]">3. Contact & Inquiries</h2>
          <p>
            If you have questions regarding this policy, contact us at{" "}
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
