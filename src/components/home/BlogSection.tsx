import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Img } from "@/components/inotek/Img";

/** Latest blog posts (`.tv-blog-section`). Also used on /blog. */
export function BlogSection() {
  return (
    <div className="inotek">
      <section className="tv-blog-section space bg-color2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-wrap text-center">
                <div className="sub-title-2  text-theme">
                  <i className="fa-solid fa-circle-check" />
                  Latest Blog
                </div>
                <h2 className="sec-title">
                  Read our Latest Insights from <br /> Update Blog Posts
                </h2>
              </div>
            </div>
          </div>
          <div className="row gy-25">
            {siteConfig.blogs.map((post) => (
              <div key={post.slug} className="col-lg-4 col-md-6 col-sm-6">
                <article className="blog-single-box style-3">
                  <div className="inner-box">
                    <div className="blog-image">
                      <Img src={post.image} alt={post.title} loading="lazy" />
                      <div className="category-tag">{post.category}</div>
                    </div>
                    <div className="blog-content">
                      <h4 className="title">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <p className="text">{post.excerpt}</p>
                      <div className="pt-25 pb-20">
                        <div className="border dark" />
                      </div>
                      <div className="blog-meta">
                        <div className="date">{post.date}</div>
                        <span>By - {post.author}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
