import { siteConfig } from "@/config/site";
import { ThemeButton } from "@/components/inotek/ThemeButton";
import { Img } from "@/components/inotek/Img";

/** Card copy sized like the template: two-line title + two-line summary. Full text lives in siteConfig. */
const CARDS: Record<string, { title: [string, string]; text: string }> = {
  "web-development": { title: ["Website", "Development"], text: "Fast, secure websites and web apps built with Next.js and modern stacks" },
  "seo-marketing": { title: ["Social Media", "Marketing"], text: "Data-driven campaigns that grow your brand across every social channel" },
  "ui-ux-design": { title: ["User Interface", "UI/UX Designing"], text: "Intuitive, pixel-perfect interfaces and design systems crafted in Figma" },
  "search-engine-optimization": { title: ["Search Engine", "Optimization (SEO)"], text: "Technical SEO and content strategy that put you at the top of Google" },
  "cloud-security": { title: ["Domain & Hosting", "Solutions"], text: "Reliable domains, cloud hosting and SSL with 99.9% uptime and backups" },
  "3d-graphics": { title: ["3D Vector Graphic", "Designing"], text: "Striking 3D models, vector illustrations and motion graphics for brands" },
};

/** Services grid (`.tv-service-section.style-5`). */
export function ServicesGrid() {
  return (
    <section className="tv-service-section style-5 bg-light2 space">
      <div className="container">
        <div className="row gy-30 align-items-center">
          <div className="col-lg-12">
            <div className="service-title-area d-flex justify-content-between sm-flex-column sm-mb-30">
              <div className="title-wrap" data-wow-duration="1.5s" data-wow-delay=".4s">
                <div className="sub-title-2 text-theme">
                  <i className="fa-solid fa-circle-check" />
                  Services
                </div>
                <h2 className="sec-title">
                  Comprehensive, scalable it services <br /> empower growing businesses
                </h2>
              </div>
              <div className="service-btn sm-justify-content-start">
                <ThemeButton href="/services" label="Discover More" className="br-30 mt-30 sm-mt-0" />
              </div>
            </div>
          </div>
        </div>
        <div className="row gy-25">
          {siteConfig.services.map((service) => {
            const card = CARDS[service.slug];
            const [line1, line2] = card?.title ?? [service.title, ""];
            return (
              <div key={service.slug} className="col-lg-4 col-md-6">
                <div className="service-box-five">
                  <div className="icon-top">
                    <div className="icon">
                      <span>{service.id}</span>
                    </div>
                  </div>
                  <div className="service-top">
                    <div className="logo">
                      <Img src={service.icon} alt="" />
                    </div>
                    <h4>
                      {line1} <br /> {line2}
                    </h4>
                  </div>
                  <p>{card?.text ?? service.shortDesc}</p>
                  <ThemeButton href={`/services/${service.slug}`} label="Explore More" className="style2 br-30" variant="diagonal" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
