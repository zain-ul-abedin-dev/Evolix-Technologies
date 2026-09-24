import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, Calendar, User } from "lucide-react";
import { siteConfig } from "@/config/site";
import { NewsletterBox } from "@/components/home/NewsletterBox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = siteConfig.blogs.find((b) => b.slug === slug);
  if (!blog) return { title: "Article Not Found" };

  return {
    title: `${blog.title} - Tech Insights`,
    description: blog.excerpt,
    keywords: [blog.category, "SEO Pakistan", "Next.js Blog", "Evolix Technologies"],
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = siteConfig.blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      {/* Page Header */}
      <section className="relative py-24 bg-[#1a1817] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/assets/images/cta/hm5-bg02.webp"
            alt="Article Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#73eb0d] uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft size={14} /> Back to All Articles
          </Link>
          <div className="sub-title-badge dark-mode">
            <CheckCircle2 size={16} className="text-[#73eb0d]" />
            <span>{blog.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 max-w-4xl leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 mt-4 text-xs text-white/60">
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#73eb0d]" /> {blog.date}</span>
            <span className="flex items-center gap-1.5"><User size={14} className="text-[#73eb0d]" /> By {blog.author}</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-20 lg:py-28 bg-[#f6f4f3]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <article className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-xl space-y-8">
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-[#1a1817]">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-[#5a5856] text-base leading-relaxed space-y-6">
              <p className="text-lg font-medium text-[#1a1817] leading-relaxed">
                {blog.excerpt}
              </p>
              <h2 className="text-2xl font-bold text-[#1a1817] pt-4">
                1. Core Architectural Principles
              </h2>
              <p>
                In today&apos;s digital ecosystem, performance and structured data are foundational to Google search visibility and user retention. By reducing First Input Delay (FID/INP) and streamlining server-rendered HTML payloads, modern web applications outrank bloated legacy stacks with ease.
              </p>
              <h2 className="text-2xl font-bold text-[#1a1817] pt-4">
                2. Continuous Optimization & Monitoring
              </h2>
              <p>
                Technical SEO is not a one-time checklist—it requires ongoing monitoring of Core Web Vitals, crawl budget utilization, semantic metadata indexing, and user interaction signals.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterBox />
    </>
  );
}
