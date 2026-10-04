import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeButton } from "@/components/inotek/ThemeButton";
import { Img } from "@/components/inotek/Img";

/** Two-line titles and icons for the services page cards (template `.tv-service-single-box`). */
const CARDS: Record<string, { title: [string, string]; icon: string }> = {
  "web-development": { title: ["Website and Mobile Apps", "Development"], icon: "/assets/images/service/details-icon01.webp" },
  "seo-marketing": { title: ["Social Media Marketing", "Management"], icon: "/assets/images/service/hm1-icon03.webp" },
  "ui-ux-design": { title: ["Web and Mobile UI/UX", "Designing"], icon: "/assets/images/service/details-icon02.webp" },
  "search-engine-optimization": { title: ["Search Engine", "Optimization (SEO)"], icon: "/assets/images/service/hm1-icon01.webp" },
  "cloud-security": { title: ["Domain, Hosting and", "Cloud Solutions"], icon: "/assets/images/service/hm1-icon02.webp" },
  "3d-graphics": { title: ["3D Vector Graphic", "Designing"], icon: "/assets/images/service/details-icon03.webp" },
};

/** All services as cards (`.tv-service-section.inner.style-2`). */
export function ServiceCards() {
  return (
    <section className="tv-service-section space-bottom inner style-2 bg-light">
      <div className="tv-service-inner position-relative overflow-hidden mx-30 ml-mx-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="title-wrap two white" data-wow-duration="2s" data-wow-delay=".0s">
                <div className="sub-title-2">
                  <i className="fa-solid fa-circle-check" />
                  Services
                </div>
                <h2 className="sec-title text-dark">
                  Empowering Companies with Reliable <br /> and Scalable IT Services
                </h2>
              </div>
            </div>
          </div>
          <div className="row gy-30">
            {siteConfig.services.map((service) => {
              const card = CARDS[service.slug];
              return (
                <div key={service.slug} className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div className="tv-service-single-box wow fadeInUp" data-wow-delay=".2s">
                    <div className="inner-box">
                      <div className="icon">
                        <Img src={card?.icon ?? service.icon} alt="" />
                      </div>
                      <h4 className="title">
                        {card ? (
                          <>
                            {card.title[0]} <br /> {card.title[1]}
                          </>
                        ) : (
                          service.title
                        )}
                      </h4>
                      <div className="border2 mt-20 mb-20" />
                      <p className="text">{service.shortDesc}</p>
                      <Link href={`/services/${service.slug}`} className="theme-btn w-100 mt-40">
                        <span className="link-effect">
                          <span className="effect-1">EXPLORE MORE</span>
                          <span className="effect-1" aria-hidden="true">
                            EXPLORE MORE
                          </span>
                        </span>
                        <i className="fa-solid fa-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Consult Understand", text: "We learn your business, users and goals first", icon: "/assets/images/process/hm1-icon1.webp" },
  { title: "Plan Strategize", text: "A clear roadmap and tech stack built for you", icon: "/assets/images/process/hm1-icon2.webp" },
  { title: "Implement Execute", text: "Agile sprints with weekly demos and testing", icon: "/assets/images/process/hm1-icon3.webp" },
  { title: "Support Optimize", text: "Launch, monitor and keep improving results", icon: "/assets/images/process/hm1-icon4.webp" },
];

/** Four-step working process on a dark band (`.tv-process-section`). */
export function ProcessSteps() {
  return (
    <section className="tv-process-section bg-light position-relative">
      <div className="p-top-center z-1 wow slideInTop">
        <Img src="/assets/images/process/hm1-shape01.png" alt="" />
      </div>
      <div className="process-inner bg-theme3  mx-30 ml-mx-0 br_bl-30 br_br-30 ml-br-0  space  overflow-hidden xxl-br-0 position-relative">
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-12">
              <div className="process-title mt--25">
                <h2 className="text-white text-center">
                  PR<span className="text-theme">O</span>CESS
                </h2>
              </div>
            </div>
          </div>
          <div className="row gy-30">
            {STEPS.map((step, i) => (
              <div key={step.title} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className="tv-process-item wow fadeInRightBig" data-wow-delay={`.${i + 2}s`}>
                  <h4 className="title-text">STEP 0{i + 1}</h4>
                  <div className="process-box">
                    <div className="icon">
                      <Img src={step.icon} alt="" />
                    </div>
                    <h3 className="title">{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** "Let's collaborate" call-to-action with a photo grid (`.tv-cta-section.inner`). */
export function CollaborateCta() {
  const team = siteConfig.team;
  return (
    <section className="tv-cta-section inner bg-light">
      <div className="container border-top">
        <div className="row gy-30 align-items-center">
          <div className="col-lg-6">
            <div className="cta-content-wrapper">
              <div className="title-wrap three" data-wow-duration="1.5s" data-wow-delay=".4s">
                <div className="sub-title-2 text-theme">
                  <i className="fa-solid fa-circle-check" />
                  Get In Touch
                </div>
                <h2 className="sec-title">Let’s Collaborate with Us</h2>
                <p>
                  Tell us about your idea and we will plan the right website, app or marketing strategy for it.
                  <br />
                  Free consultation, clear pricing and a team that delivers on time.
                </p>
              </div>
              <ThemeButton href="/contact" label="Contact with Us" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image-grid">
              <div className="lines">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} />
                ))}
              </div>
              <div className="lines2">
                {Array.from({ length: 14 }, (_, i) => (
                  <span key={i} />
                ))}
              </div>
              <div className="image-box">
                <div className="image-item">
                  <Img src="/assets/images/evolix/services/collab-01.webp" alt={team[0]?.name ?? ""} loading="lazy" />
                </div>
                <div className="image-item">
                  <div className="icon">
                    <i className="icon-handshake" />
                  </div>
                </div>
                {[2, 3, 4].map((n) => (
                  <div key={n} className="image-item">
                    <Img src={`/assets/images/evolix/services/collab-0${n}.webp`} alt={team[n - 1]?.name ?? ""} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
