import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { projectImage } from "@/config/media";
import { PageBreadcrumb } from "@/components/inotek/PageBreadcrumb";
import { ThemeButton } from "@/components/inotek/ThemeButton";
import { Img } from "@/components/inotek/Img";
import { NewsletterBox } from "@/components/home/NewsletterBox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = siteConfig.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} - Case Study`,
    description: project.desc,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { images: [projectImage(project.slug, "detail")] },
  };
}

/** Service most related to each portfolio filter, shown in the sidebar. */
const SERVICE_FOR: Record<string, string> = {
  development: "web-development",
  design: "ui-ux-design",
  business: "seo-marketing",
};

/** Project detail – layout of the Inotek template's project-details.html. */
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = siteConfig.projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = siteConfig.projects[index];
  const prev = siteConfig.projects[(index - 1 + siteConfig.projects.length) % siteConfig.projects.length];
  const next = siteConfig.projects[(index + 1) % siteConfig.projects.length];
  const service = siteConfig.services.find((s) => s.slug === SERVICE_FOR[project.filterCategory]);
  const url = encodeURIComponent(`${siteConfig.url}/projects/${project.slug}`);

  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <PageBreadcrumb title={project.title} trail={[{ name: "Portfolio", href: "/projects" }, { name: project.title }]} />
        <section className="project-details space bg-light">
          <div className="container">
            <div className="row gy-30">
              <div className="col-xl-4 col-lg-4">
                <div className="project-sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-box project-details-box">
                      <h4 className="title">Project Details</h4>
                      <div className="content">
                        <ul>
                          <li>
                            <strong>Category :</strong> {project.category}
                          </li>
                          <li>
                            <strong>Delivered :</strong> {project.date}
                          </li>
                          {service && (
                            <li>
                              <strong>Service :</strong> <Link href={`/services/${service.slug}`}>{service.title}</Link>
                            </li>
                          )}
                          <li>
                            <strong>Built By :</strong> {siteConfig.name}
                          </li>
                          <li>
                            <strong>Location :</strong> {siteConfig.contact.address}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="widget-box consulting-box bg-dark">
                      <div className="bg image">
                        <Img src="/assets/images/project/details-bg.webp" alt="" loading="lazy" />
                      </div>
                      <div className="inner-box">
                        <div className="icon">
                          <Img src="/assets/images/project/details-icon.webp" alt="" />
                        </div>
                        <h4 className="title">Need any Project? Contact Us</h4>
                        <p className="text">Tell us about your idea and get a free consultation and quote</p>
                        <ThemeButton href="/contact" label="Contact with Us" className="mt-40 br-30" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8">
                <div className="project-details__content">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="details__content-right">
                        <div className="details-image br-10 overflow-hidden mb-30 overlay-anim4">
                          <Img src={projectImage(project.slug, "detail")} alt={project.title} fetchPriority="high" />
                        </div>
                        <h2 className="title h3">{project.title}</h2>
                        <p className="mb-15">{project.desc}</p>
                        <p className="mb-40">
                          Our team handled the complete journey, from discovery workshops and UX research to engineering, testing and
                          launch. Every decision was measured against the client&apos;s business goals: speed, reliability and a better
                          experience for their users.
                        </p>
                        <h3 className="title">Project Benefits</h3>
                        <p className="mb-25">What the client gained from working with {siteConfig.name}:</p>
                        <div className="featured-list mb-35">
                          <ul className="list-style-1">
                            <li>A fast, secure product built on modern, scalable technology</li>
                            <li>A clean, user-friendly design that improves engagement</li>
                            <li>Search-engine optimised pages that bring organic traffic</li>
                            <li>Ongoing support, monitoring and continuous improvements</li>
                          </ul>
                        </div>
                        <div className="row gy-30 align-items-center mb-50">
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="details-image-box overlay-anim1">
                              <Img className="img1" src="/assets/images/evolix/projects/detail-research.webp" alt="Research workshop" loading="lazy" />
                              <h5 className="title">Competitor Research</h5>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="details-image-box overlay-anim1">
                              <Img className="img1" src="/assets/images/evolix/projects/detail-analysis.webp" alt="Market analysis" loading="lazy" />
                              <h5 className="title">Current Market Analysis</h5>
                            </div>
                          </div>
                        </div>
                        <h3 className="title">Complete Result</h3>
                        <p>
                          The finished product launched on schedule and keeps improving with regular updates. Performance, search
                          visibility and user satisfaction were tracked from day one, so results are measurable and keep growing.
                        </p>
                        <div className="featured-list">
                          <ul className="list-style-2">
                            <li>Delivered on time and within budget</li>
                            <li>Measurable gains in speed and conversions</li>
                            <li>Long-term partnership for growth</li>
                          </ul>
                        </div>
                      </div>
                      <div className="project-details__bottom">
                        <div className="project-details__tags">
                          <span>Tags:</span>
                          <ul className="project-details__tags">
                            <li>{project.category}</li>
                            {service && <li>{service.title.split(" ")[0]}</li>}
                          </ul>
                        </div>
                        <div className="project-details__social-list">
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
                      <div className="details__pagination-box">
                        <ul className="details__pagination">
                          <li className="previous">
                            <Link href={`/projects/${prev.slug}`} aria-label={`Previous project: ${prev.title}`}>
                              <i className="fa-light fa-arrow-left-long" />
                              <span>Previous Projects</span>
                            </Link>
                          </li>
                          <li className="next">
                            <Link href={`/projects/${next.slug}`} aria-label={`Next project: ${next.title}`}>
                              <span>Next Projects</span>
                              <i className="fa-light fa-arrow-right-long" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <NewsletterBox />
      </div>
    </div>
  );
}
