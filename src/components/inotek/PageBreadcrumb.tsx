import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Img } from "@/components/inotek/Img";

type Crumb = { name: string; href?: string };

/**
 * Inner-page banner (template `.tv-breadcrumb-section`) with the page's <h1>
 * and BreadcrumbList structured data for search engines.
 */
export function PageBreadcrumb({ title, trail }: { title: string; trail: Crumb[] }) {
  const items = [{ name: "Home", href: "/" }, ...trail];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${siteConfig.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <section className="tv-breadcrumb-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="tv-breadcrumb-inner mx-30 ml-mx-0 position-relative overflow-hidden br-30 ml-br-0">
        <div className="bg image">
          <Img src="/assets/images/bg-img/breadcrumb.webp" alt="" fetchPriority="high" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title-outer">
                <div className="page-title">
                  <h1 className="title">{title}</h1>
                  <ul className="page-breadcrumb">
                    <li>
                      <Link href="/">
                        <i className="fa-solid fa-house-chimney" />
                        Home
                      </Link>
                    </li>
                    {trail.map((c) => (
                      <li key={c.name}>
                        <span>/</span> {c.href ? <Link href={c.href}>{c.name}</Link> : c.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="image-box md-d-none">
                  <div className="shapes">
                    <div className="shape shape-1">
                      <Img src="/assets/images/shapes/circle.webp" alt="" />
                    </div>
                    <div className="shape shape-2 spin2">
                      <Img src="/assets/images/shapes/star.webp" alt="" />
                    </div>
                    <div className="shape shape-3 ">
                      <Img src="/assets/images/shapes/snake.webp" alt="" />
                    </div>
                    <div className="shape shape-4 jump3">
                      <Img src="/assets/images/shapes/doot.webp" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
