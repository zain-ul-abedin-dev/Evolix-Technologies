"use strict";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const BlogSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#f3f6fe] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="sub-title-badge">
            <span className="w-2 h-2 rounded-full bg-[#73eb0d]" />
            <span>Latest Blog</span>
          </div>
          <h2 className="sec-title mt-2">
            Read our Latest Insights from <br />
            Update Blog Posts
          </h2>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#061153]/8 shadow-lg hover:border-[#73eb0d] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Blog Image & Badge */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#061153]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[11px] font-black uppercase tracking-wider bg-[#061153]/90 text-[#73eb0d] px-3.5 py-1 rounded-full border border-white/10 backdrop-blur-xs">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-[#061153] group-hover:text-[#5ebf0a] transition-colors mb-3 line-clamp-2 leading-snug">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#616161] leading-relaxed line-clamp-2">
                    Technically into chain to references to main extensive Dramatically faster
                  </p>
                </div>
              </div>

              {/* Meta Footer */}
              <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-[#061153]/8 flex items-center justify-between text-xs text-[#616161]">
                <div className="flex items-center gap-1.5 font-medium">
                  <span>01 Jan, 2026</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <span>By - Inotek</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
