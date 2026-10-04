import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { serviceImage } from "@/config/media";
import { PageBreadcrumb } from "@/components/inotek/PageBreadcrumb";
import { ThemeButton } from "@/components/inotek/ThemeButton";
import { FaqAccordion } from "@/components/inotek/FaqAccordion";
import { Img } from "@/components/inotek/Img";
import { NewsletterBox } from "@/components/home/NewsletterBox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} - Services`,
    description: service.shortDesc,
    keywords: [service.title, "IT Services Islamabad", "Evolix Technologies", "Custom Software"],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { images: [serviceImage(service.slug)] },
  };
}

const faqs = (title: string) => [
  {
    question: `01. How long does a ${title.toLowerCase()} project take?`,
    answer:
      "Most projects take 2 to 8 weeks depending on scope. After a free consultation we share a clear timeline with milestones, so you always know what is being delivered and when.",
  },
  {
    question: "02. How much does it cost?",
    answer:
      "Pricing depends on your requirements. We give a fixed quote after understanding your goals, with no hidden costs, and flexible packages for startups and growing businesses.",
  },
  {
    question: "03. Do you provide support after launch?",
    answer:
      "Yes. We offer ongoing maintenance, security updates, performance monitoring and improvements, so your product keeps running smoothly and keeps growing.",
  },
];

/** Service detail – layout of the Inotek template's service-details.html. */
export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const half = Math.ceil(service.features.length / 2);
  const featureLists = [service.features.slice(0, half), service.features.slice(half)];

  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <PageBreadcrumb title={service.title} trail={[{ name: "Services", href: "/services" }, { name: service.title }]} />
        <section className="services-details space bg-light">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4">
                <div className="service-sidebar">
                  <div className="sidebar-widget service-sidebar-single">
                    <div className="widget-box category-list">
                      <h4 className="sidebar-title">Our Services</h4>
                      <div className="sidebar-service-list">
                        <ul>
                          {siteConfig.services.map((s) => (
                            <li key={s.slug} className={s.slug === service.slug ? "current" : undefined}>
                              <Link href={`/services/${s.slug}`}>
                                {s.title}
                                <i className="fas fa-arrow-right" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="widget-box service-details-help bg-dark">
                      <div className="bg image">
                        <Img src="/assets/images/service/details-bg.webp" alt="" loading="lazy" />
                      </div>
                      <div className="service-details-content">
                        <div className="icon">
                          <Img src="/assets/images/icons/contact.png" alt="" />
                        </div>
                        <h2 className="help-title">
                          Need Tech Service?
                          <br />
                          Contact Us
                        </h2>
                        <p className="text">Talk to our team for a free consultation and a clear project quote</p>
                        <div className="help-contact">
                          <ThemeButton href="/contact" label="Contact with Us" className="br-30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8">
                <div className="services-details__content">
                  <div className="image overlay-anim1">
                    <Img className="br-10 w-100" src={serviceImage(service.slug)} alt={service.title} fetchPriority="high" />
                  </div>
                  <h2 className="title-two h3">{service.title}</h2>
                  <p>{service.shortDesc}</p>
                  <p className="mb-25">
                    At {siteConfig.name}, our approach to {service.title.toLowerCase()} is centered on performance, security and measurable
                    results. We plan carefully, build with modern best practices and keep you updated at every step, so the final result
                    fits your business and your customers.
                  </p>
                  <div className="row gy-30 align-items-center">
                    <div className="row service-details-box my-40  md-my-0 md-gy-30">
                      <div className="col-lg-6 col-md-6">
                        <div className="service-details-block">
                          <div className="inner-box d-flex align-items-center">
                            <div className="icon mr-20">
                              <Img src="/assets/images/service/alam.webp" alt="" />
                            </div>
                            <h5 className="title my-0">
                              On-Time Delivery
                              <br />
                              Guarantee
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="service-details-block">
                          <div className="inner-box d-flex align-items-center">
                            <div className="icon bg-dark mr-20">
                              <Img src="/assets/images/service/check.webp" alt="" />
                            </div>
                            <h5 className="title my-0">
                              Quality and Security
                              <br />
                              Guarantee
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="title">What is Included?</h3>
                    <p className="my-0">
                      Every {service.title.toLowerCase()} engagement includes the following, tailored to your goals and budget.
                    </p>
                    <div className="row md-gy-30 align-items-center mt-30 md-mt-0 mb-40 md-mb-0">
                      {featureLists.map((list, i) => (
                        <div key={i} className="col-lg-6 col-md-6 col-sm-6">
                          <div className="featured-list">
                            <ul className="list-style-1">
                              {list.map((feature) => (
                                <li key={feature}>
                                  <span>
                                    <Img src="/assets/images/service/details-check.webp" alt="" />
                                  </span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="row md-gy-30 align-items-center">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="details-image-box overlay-anim1">
                          <Img className="img1 w-100 br-10" src="/assets/images/evolix/services/detail-team.webp" alt={`${siteConfig.name} team`} loading="lazy" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="details-image-box overlay-anim1">
                          <Img className="img1 w-100 br-10" src="/assets/images/evolix/services/detail-meeting.webp" alt="Client meeting" loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <div className="innerpage mt-70 sm-mt-30">
                      <h3 className="title mb-30 vxs-mb-25">Frequently Asked Questions</h3>
                      <div className="tv-faq-section">
                        <FaqAccordion items={faqs(service.title)} />
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
