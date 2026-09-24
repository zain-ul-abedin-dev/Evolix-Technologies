import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ContactSection } from "@/components/home/ContactSection";
import { NewsletterBox } from "@/components/home/NewsletterBox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = siteConfig.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} - Case Study`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = siteConfig.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Page Header */}
      <section className="relative py-24 bg-[#1a1817] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/cta/hm5-bg02.webp"
            alt="Case Study Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#73eb0d] uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <div className="sub-title-badge dark-mode">
            <CheckCircle2 size={16} className="text-[#73eb0d]" />
            <span>Case Study</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-3 max-w-3xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-white/70 mt-4 leading-relaxed">
            {project.desc}
          </p>
        </div>
      </section>

      {/* Case Study Body */}
      <section className="py-20 lg:py-28 bg-[#f6f4f3]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 space-y-12">
          {/* Main Showcase Image */}
          <div className="relative aspect-16/9 rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-[#1a1817]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Details Overview */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-xl space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-6 border-b border-black/5">
              <div>
                <span className="text-xs text-[#5a5856] block">Category</span>
                <span className="font-bold text-sm text-[#1a1817]">{project.category}</span>
              </div>
              <div>
                <span className="text-xs text-[#5a5856] block">Client</span>
                <span className="font-bold text-sm text-[#1a1817]">Enterprise Client</span>
              </div>
              <div>
                <span className="text-xs text-[#5a5856] block">Engineering</span>
                <span className="font-bold text-sm text-[#73eb0d] bg-[#1a1817] px-2 py-0.5 rounded-md inline-block">
                  Next.js & Cloud
                </span>
              </div>
              <div>
                <span className="text-xs text-[#5a5856] block">Outcome</span>
                <span className="font-bold text-sm text-[#1a1817]">3.5x Traffic Growth</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#1a1817]">Project Challenge & Strategic Execution</h2>
            <p className="text-[#5a5856] text-base leading-relaxed">
              The client needed a modern, highly scalable platform capable of handling intense peak user traffic while delivering an instantaneous interactive experience. Our Islamabad engineering lab structured a modular microservice architecture backed by Next.js Server Components.
            </p>
            <p className="text-[#5a5856] text-base leading-relaxed">
              Key results included a 90% reduction in page load latency, zero layout shift (CLS), and top search visibility across targeted keyword segments.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Newsletter */}
      <NewsletterBox />
    </>
  );
}
