import { siteConfig } from "@/config/site";
import { ThemeButton } from "@/components/inotek/ThemeButton";
import { Img } from "@/components/inotek/Img";

/** Green "Meet our team" band (`.tv-team-section.style-3`). */
export function TeamCtaBanner() {
  return (
    <section className="tv-team-section style-3 bg-light position-relative z-2">
      <div className="tv-team-inner py-65 overflow-hidden position-relative">
        <div className="scribble-shape scribble md-d-none">
          <Img src="/assets/images/team/hm4-scribble.webp" alt="" />
        </div>
        <div className="bg image">
          <Img src="/assets/images/team/hm4-bg1.webp" alt="" loading="lazy" />
        </div>
        <div className="overlay bg-theme mbm-overlay" />
        <div className="container">
          <div className="row d-flex gy-30 align-items-center align-items-md-start">
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
              <div className="client-social-proof">
                <div className="social">
                  <Img src="/assets/images/social/social-img02.webp" alt="Client 02" />
                  <Img src="/assets/images/social/social-img03.webp" alt="Client 03" />
                  <h4>{siteConfig.stats.happyClients.replace("+", "")}</h4>
                </div>
                <h4 className="text">
                  Our Satisfied <br /> Customers
                </h4>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-5 col-lg-5 col-md-6">
              <div className="team-text">
                <h2 className="sec-title text-white">
                  Meet Our Super Professional <br /> Team Members
                </h2>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
              <div className="team-right text-start text-lg-end">
                <ThemeButton href="/contact" label="Discover More" className="br-30 mt-15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
