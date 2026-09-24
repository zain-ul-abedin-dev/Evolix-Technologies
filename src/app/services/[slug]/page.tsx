import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactSection } from "@/components/home/ContactSection";
import { NewsletterBox } from "@/components/home/NewsletterBox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} - Services`,
    description: service.shortDesc,
    keywords: [service.title, "IT Services Islamabad", "Evolix Technologies", "Custom Software"],
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Page Header */}
      <section className="relative py-24 bg-[#1a1817] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/cta/hm5-bg02.webp"
            alt="Service Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#73eb0d] uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to All Services
          </Link>
          <div className="sub-title-badge dark-mode">
            <CheckCircle2 size={16} className="text-[#73eb0d]" />
            <span>Service Detail</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-3 max-w-3xl">
            {service.title}
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-white/70 mt-4 leading-relaxed">
            {service.shortDesc}
          </p>
        </div>
      </section>

      {/* Main Content & Features */}
      <section className="py-20 lg:py-28 bg-[#f6f4f3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Main Article */}
            <div className="lg:col-span-8 space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-xl">
              <div className="flex items-center gap-4 pb-6 border-b border-black/5">
                <div className="w-16 h-16 rounded-2xl bg-[#73eb0d]/20 flex items-center justify-center shrink-0">
                  <Image src={service.icon} alt={service.title} width={36} height={36} />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#73eb0d]">
                    Enterprise Offering #{service.id}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1817]">
                    Overview & Capabilities
                  </h2>
                </div>
              </div>

              <div className="prose text-[#5a5856] text-base leading-relaxed space-y-4">
                <p>
                  At <strong>Evolix Technologies</strong>, our approach to <strong>{service.title}</strong> is centered on performance, security, and measurable ROI. We build scalable systems that streamline user operations and accelerate conversions.
                </p>
                <p>
                  Every solution is engineered with modern best practices, automated CI/CD deployment pipelines, responsive design, and deep search engine optimization.
                </p>
              </div>

              {/* Key Features Included */}
              <div className="pt-6">
                <h3 className="text-xl font-bold text-[#1a1817] mb-6">
                  What is Included in this Service:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-[#f6f4f3] border border-black/5"
                    >
                      <CheckCircle2 size={18} className="text-[#73eb0d] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-[#1a1817]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="p-8 rounded-3xl bg-[#1a1817] text-white mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-bold text-white">Need a Custom Quote?</h4>
                  <p className="text-xs text-white/60 mt-1">Get in touch for a technical breakdown and scope estimate.</p>
                </div>
                <Link href="/contact" className="theme-btn shrink-0">
                  <span className="link-effect">
                    <span className="effect-1">Request Quote</span>
                    <span className="effect-1">Request Quote</span>
                  </span>
                  <span className="arrow-all">
                    <ArrowRight size={14} className="text-[#73eb0d]" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Sidebar: Other Services */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/5 shadow-lg">
                <h4 className="text-lg font-bold text-[#1a1817] mb-4 pb-3 border-b border-black/5">
                  All Services
                </h4>
                <ul className="space-y-2">
                  {siteConfig.services.map((s) => {
                    const isCurrent = s.slug === service.slug;
                    return (
                      <li key={s.id}>
                        <Link
                          href={`/services/${s.slug}`}
                          className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                            isCurrent
                              ? "bg-[#1a1817] text-[#73eb0d]"
                              : "text-[#5a5856] hover:bg-[#f6f4f3] hover:text-[#1a1817]"
                          }`}
                        >
                          <span>{s.title}</span>
                          <ArrowRight size={14} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Callback Contact Form */}
      <ContactSection />

      {/* Newsletter */}
      <NewsletterBox />
    </>
  );
}
