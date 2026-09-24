import React from "react";
import Image from "next/image";
import { CheckCircle2, Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata = {
  title: "Contact Us - Free IT Consultation & Project Quotes",
  description: "Contact Evolix Technologies in Islamabad. Reach our senior engineers for software consulting, web app development, and technical SEO quotes.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="relative py-24 bg-[#1a1817] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/cta/hm5-bg02.webp"
            alt="Contact Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="sub-title-badge dark-mode mx-auto">
            <CheckCircle2 size={16} className="text-[#73eb0d]" />
            <span>Connect with Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-4">
            Get in Touch with Our Team
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/70 mt-4 leading-relaxed">
            Have a project in mind or need expert technical guidance? We are available via direct call, WhatsApp, or instant email form below.
          </p>
        </div>
      </section>

      {/* Info Cards Row */}
      <section className="py-12 bg-[#f6f4f3] border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#73eb0d]/20 flex items-center justify-center text-[#1a1817] shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <span className="text-xs text-[#5a5856] font-semibold block">Office Location</span>
                <p className="font-bold text-sm text-[#1a1817]">{siteConfig.contact.address}</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#73eb0d]/20 flex items-center justify-center text-[#1a1817] shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <span className="text-xs text-[#5a5856] font-semibold block">Phone / WhatsApp</span>
                <a href={`tel:${siteConfig.contact.phone}`} className="font-bold text-sm text-[#1a1817] hover:text-[#62cb08]">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#73eb0d]/20 flex items-center justify-center text-[#1a1817] shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <span className="text-xs text-[#5a5856] font-semibold block">Direct Inquiries</span>
                <a href={`mailto:${siteConfig.contact.email}`} className="font-bold text-sm text-[#1a1817] hover:text-[#62cb08]">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/5 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#73eb0d]/20 flex items-center justify-center text-[#1a1817] shrink-0">
                <Clock size={22} />
              </div>
              <div>
                <span className="text-xs text-[#5a5856] font-semibold block">Business Hours</span>
                <p className="font-bold text-xs text-[#1a1817]">Mon - Sat: 9 AM - 6:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <ContactSection />
    </>
  );
}
