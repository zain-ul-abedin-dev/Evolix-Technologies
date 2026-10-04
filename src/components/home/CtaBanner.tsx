import { ThemeButton } from "@/components/inotek/ThemeButton";
import { Img } from "@/components/inotek/Img";

/** Call-to-action strip (`.tv-cta-section.style-4`). Also used on /projects and /services. */
export function CtaBanner() {
  return (
    <div className="inotek">
      <section className="tv-cta-section style-4 py-90 xs-py-60 overflow-hidden bg-light position-relative z-2 ">
        <div className="bg image">
          <Img src="/assets/images/cta/hm5-bg02.webp" alt="" loading="lazy" />
        </div>
        <div className="overlay" />
        <div className="container">
          <div className="row align-items-center gy-30">
            <div className="col-lg-3" />
            <div className="col-lg-6 col-md-8">
              <div className="cta-left">
                <h2 className="sec-title text-white mb-0">
                  Empowering Your Businesses <br /> Innovative Solutions
                </h2>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="cta-right text-right sm-text-left">
                <ThemeButton href="/projects" label="Browse all Works" className="style-2 br-30" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
