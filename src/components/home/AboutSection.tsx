import { siteConfig } from "@/config/site";
import { Img } from "@/components/inotek/Img";

const TAGS = ["DESIGN", "AUTOMATION", "MARKETING", "DEVELOPMENT", "BUSINESS STRATEGY"];

/** About company (`.tv-about-section.style-5`). */
export function AboutSection() {
  const { contact, social } = siteConfig;
  return (
    <section className="tv-about-section style-5 bg-light space">
      <div className="container">
        <div className="row gy-30 align-items-center">
          <div className="col-lg-12">
            <div className="about-title-area d-flex justify-content-between sm-flex-column sm-mb-30">
              <div className="title-wrap three" data-wow-duration="1.5s" data-wow-delay=".4s">
                <div className="sub-title-2 text-theme">
                  <i className="fa-solid fa-circle-check" />
                  About Company
                </div>
              </div>
              <div className="title-wrap three" data-wow-duration="1.5s" data-wow-delay=".4s">
                <h2 className="sec-title">
                  Proven track record of driving <br /> digital transformation speed <br /> and clarity solutions
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row gy-30">
          <div className="col-xl-3 col-lg-6">
            <div className="about-left-box">
              <div className="box-top">
                <div className="icon">
                  <Img src="/assets/images/about/hm5-icon1.webp" alt="" />
                </div>
                <h2>
                  <span className="count-number odometer" data-count={siteConfig.stats.experienceYears}>
                    0
                  </span>
                </h2>
              </div>
              <div className="box-midle">
                <h6>Years of Experiences</h6>
                <div className="border mb-25" />
                <p>Explore how we transform idea into extraordinary best digital experiences 2026</p>
              </div>
              <div className="box-bottom">
                <div className="social">
                  <Img src="/assets/images/social/social-img01.webp" alt="" />
                  <Img src="/assets/images/social/social-img02.webp" alt="" />
                  <Img src="/assets/images/social/social-img03.webp" alt="" />
                  <Img src="/assets/images/social/social-img04.webp" alt="" />
                </div>
                <h6>{siteConfig.stats.happyClients} Happy customers</h6>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="about-midle">
              <div className="about-card overlay-anim4">
                <Img className="image" src="/assets/images/about/hm5-img01.webp" alt={`${siteConfig.name} team at work`} loading="lazy" />
                <div className="about-details">
                  <h5>
                    “Innovation IT Solutions for your next gen <br />
                    Business and growing customers”
                  </h5>
                  <p className="title">
                    {siteConfig.name} <span>/ Islamabad, Pakistan</span>
                  </p>
                </div>
                <div className="video-btn">
                  <a className="popup-video" href={siteConfig.videoUrl} data-fancybox="video-gallery" aria-label="Play company video">
                    <i className="fa-sharp fa-solid fa-play" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="about-right">
              <div className="about-tags">
                <h4 className="title">Our Solutions</h4>
                <div className="widget-box">
                  <div className="tag-list">
                    {TAGS.map((tag) => (
                      <span key={tag} className={`tag${tag === "AUTOMATION" ? " active" : ""}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-contact-card">
                <div className="p-top-right wow slideInRight z-0">
                  <Img src="/assets/images/about/hm5-shape01.webp" alt="" />
                </div>
                <h4>Reach out Us</h4>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  <i className="fa-solid fa-phone-volume" />
                  {contact.phone}
                </a>{" "}
                <a href={`mailto:${contact.email}`}>
                  <i className="fa-solid fa-envelope" />
                  {contact.email}
                </a>
                <ul className="social-icon">
                  <li>
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                      <i className="fa-brands fa-x-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <i className="fa-brands fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
