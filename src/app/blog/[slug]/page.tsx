import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { blogImage } from "@/config/media";
import { blogContent } from "@/config/blog-content";
import { PageBreadcrumb } from "@/components/inotek/PageBreadcrumb";
import { NewsletterForm } from "@/components/inotek/NewsletterForm";
import { Img } from "@/components/inotek/Img";
import { NewsletterBox } from "@/components/home/NewsletterBox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = siteConfig.blogs.find((b) => b.slug === slug);
  if (!blog) return { title: "Article Not Found" };

  return {
    title: `${blog.title} - Tech Insights`,
    description: blog.excerpt,
    keywords: [blog.category, "SEO Pakistan", "Next.js Blog", "Evolix Technologies"],
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: { type: "article", images: [blogImage(blog.slug, "detail")] },
  };
}

/** Blog article – layout of the Inotek template's blog-details.html. */
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = siteConfig.blogs.find((b) => b.slug === slug);
  if (!blog) notFound();
  const article = blogContent[blog.slug];
  const url = encodeURIComponent(`${siteConfig.url}/blog/${blog.slug}`);
  const categories = [...new Set(siteConfig.blogs.map((b) => b.category))];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: `${siteConfig.url}${blogImage(blog.slug, "detail")}`,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/blog/${blog.slug}`,
  };

  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PageBreadcrumb title="Blog Details" trail={[{ name: "Blog", href: "/blog" }, { name: blog.title }]} />
        <section className="blog-details-section space bg-light">
          <div className="container">
            <div className="row gy-30 flex-column-reverse flex-lg-row">
              <div className="col-xl-8 col-lg-8">
                <div className="blog-details-left">
                  <article className="blog-list-card style-2">
                    <div className="image overlay-anim1">
                      <Img src={blogImage(blog.slug, "detail")} alt={blog.title} fetchPriority="high" />
                    </div>
                    <div className="card-content">
                      <span className="category">{blog.category}</span>
                      <h2 className="title h3">{blog.title}</h2>
                      <div className="author-info">
                        <div className="author">
                          <Img src="/assets/images/icons/evolix-mark.svg" alt={siteConfig.name} />
                          <span className="name">
                            <span>By</span> {blog.author}
                          </span>
                        </div>
                        <span className="date">
                          <i className="icon-calender" />
                          {blog.date}
                        </span>
                      </div>
                      <div className="pt-20 pb-25">
                        <div className="border dark" />
                      </div>
                      {article ? (
                        <>
                          {article.intro.map((p, i) => (
                            <p key={i} className={i === 0 ? "text" : undefined}>
                              {p}
                            </p>
                          ))}
                          <h3 className="title mt-45 mb-10">{article.sections[0].heading}</h3>
                          <p className="mb-35">{article.sections[0].text}</p>
                          <div className="blogs-quote">
                            <p>{article.quote.text}</p>
                            <span className="name">{article.quote.author}</span>
                          </div>
                          <h3 className="title mt-30 mb-20">{article.sections[1].heading}</h3>
                          <p className="mb-25">{article.sections[1].text}</p>
                          <div className="featured-list-box">
                            <div className="featured-list">
                              <ul className="list-style-2">
                                {article.list.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text">{blog.excerpt}</p>
                      )}
                      <div className="blog-details__bottom">
                        <div className="blog-details__tags">
                          <span>Posted In :</span>
                          <ul className="blog-details__tags">
                            <li>{blog.category}</li>
                          </ul>
                        </div>
                        <div className="blog-details__social-list">
                          <span>Share:</span>
                          <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                            <i className="fa-brands fa-facebook-f" />
                          </a>
                          <a href={`https://x.com/intent/post?url=${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
                            <i className="fa-brands fa-x-twitter" />
                          </a>
                          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                            <i className="fa-brands fa-linkedin-in" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4">
                <aside className="sidebar-widget blog-sidebar pl-15 lg-pl-0">
                  <div className="sidebar-category-list">
                    <h4 className="sidebar-title">Category</h4>
                    <div className="widget-box">
                      <ul className="categories">
                        {categories.map((c) => (
                          <li key={c}>
                            <Link href="/blog">
                              {c}
                              <span>({siteConfig.blogs.filter((b) => b.category === c).length})</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="sidebar-latest-posts">
                    <h4 className="sidebar-title">Latest Posts</h4>
                    <div className="widget-box">
                      <div className="latest-posts">
                        {siteConfig.blogs.map((post) => (
                          <div key={post.slug} className="post">
                            <Link href={`/blog/${post.slug}`}>
                              <Img src={blogImage(post.slug, "thumb")} alt={post.title} loading="lazy" />
                            </Link>
                            <div className="post-content">
                              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                              <p>{post.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-tags">
                    <h4 className="sidebar-title">Popular Tags</h4>
                    <div className="widget-box">
                      <div className="tag-list">
                        {["SEO", "NEXT.JS", "UI/UX", "MARKETING", "CLOUD", "DEVELOPMENT"].map((tag, i) => (
                          <span key={tag} className={`tag${i === 1 ? " active" : ""}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-newsletter">
                    <h4 className="sidebar-title">Newsletter</h4>
                    <div className="widget-box mb-0">
                      <NewsletterForm placeholder="Enter email" />
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
        <NewsletterBox />
      </div>
    </div>
  );
}
