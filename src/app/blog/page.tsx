import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { blogImage } from "@/config/media";
import { PageBreadcrumb } from "@/components/inotek/PageBreadcrumb";
import { Img } from "@/components/inotek/Img";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata: Metadata = {
  title: "Insights & Tech Blog - Engineering, SEO & Web Strategy",
  description:
    "Stay ahead with deep dives into modern web engineering, technical SEO, UI/UX interaction design, and cloud architectures from Evolix Technologies.",
  alternates: { canonical: "/blog" },
};

/** Blog listing – layout of the Inotek template's blog-grid.html. */
export default function BlogPage() {
  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <PageBreadcrumb title="Latest Blog" trail={[{ name: "Blog" }]} />
        <div className="tv-blog-section space bg-color2">
          <div className="container">
            <div className="row gy-25">
              {siteConfig.blogs.map((post) => (
                <div key={post.slug} className="col-lg-4 col-md-6 col-sm-6">
                  <article className="blog-single-box">
                    <div className="inner-box">
                      <div className="blog-image">
                        <Img src={blogImage(post.slug, "card")} alt={post.title} loading="lazy" />
                        <div className="category-tag">
                          <span />
                          {post.date}
                        </div>
                      </div>
                      <div className="blog-content">
                        <h2 className="title h4">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>
                        <div className="pt-25 pb-30">
                          <div className="border dark" />
                        </div>
                        <div className="blog-meta">
                          <Link href={`/blog/${post.slug}`} className="continue-reading">
                            Explore More
                          </Link>
                          <span>{post.category}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
        <NewsletterBox />
      </div>
    </div>
  );
}
