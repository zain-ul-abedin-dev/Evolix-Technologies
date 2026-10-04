import { siteConfig } from "@/config/site";
import { ThemeButton } from "@/components/inotek/ThemeButton";
import { Img } from "@/components/inotek/Img";

/** Home-5 hero (`.tv-hero-section.style-5`). */
export function HeroSection() {
  return (
    <section className="tv-hero-section style-5 overflow-hidden">
      <div className="bg image">
        <Img src="/assets/images/hero/hm5-bg01.webp" alt="" fetchPriority="high" />
      </div>
      <div className="container">
        <div className="row gy-25 align-items-center">
          <div className="col-lg-6">
            <div className="hero-left position-relative">
              <span className="sub-title">
                <Img src="/assets/images/hero/check2.webp" alt="" /> INNOVATIVE SOLUTIONS
              </span>
              <h1 className="hero-title wow text-anim-left">
                We helping <span>1M+</span>
                <br />
                Digital Business Innovation
              </h1>
              <div className="text-icon position-relative">
                <div className="icon zoom-pulse">
                  <Img src="/assets/images/icons/evolix-mark.svg" alt="" />
                </div>
                <p className="text">
                  Competently empower high standards in materials through <br /> transparent models create cross-platform
                </p>
              </div>
              <div className="hero-user">
                <ThemeButton href="/about" label="Discover More" className="br-30" />
                <div className="hero-social-proof">
                  <div className="social">
                    <Img src="/assets/images/social/social-img01.webp" alt="Client 01" />
                    <Img src="/assets/images/social/social-img02.webp" alt="Client 02" />
                    <Img src="/assets/images/social/social-img03.webp" alt="Client 03" />
                  </div>
                  <div className="happy-customers">
                    <div className="text">{siteConfig.stats.activeCustomers}</div>
                    <div className="rating-viewers">active customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-right">
              <div className="image-box">
                <div className="image wow animate__slideFromBottom" data-wow-delay="0.2s">
                  <div className="bg-image">
                    <Img src="/assets/images/hero/hm5-bg02.webp" alt="" />
                  </div>
                  <Img className="img" src="/assets/images/hero/hm5-img01.webp" alt={`${siteConfig.name} digital solutions`} fetchPriority="high" />
                </div>
                <div className="hero-count">
                  <h2>
                    <span className="count-number odometer" data-count={siteConfig.stats.experienceYears}>
                      0
                    </span>
                  </h2>
                  <div className="experience-card">
                    <h6>
                      YEARS OF <br /> EXPERIENCE
                    </h6>
                  </div>
                  <div className="image-2 img-anim-right overlay-anim4">
                    <Img src="/assets/images/hero/hm5-img02.webp" alt="" />
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
