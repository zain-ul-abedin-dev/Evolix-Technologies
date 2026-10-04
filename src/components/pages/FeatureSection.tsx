import { siteConfig } from "@/config/site";
import { ThemeButton } from "@/components/inotek/ThemeButton";
import { Img } from "@/components/inotek/Img";

const FEATURES = [
  { icon: "/assets/images/feature/hm1-icon01.webp", title: ["IT Consultancy and", "Management"], text: "Expert guidance to plan, build and manage technology that grows your business", dark: false },
  { icon: "/assets/images/feature/hm1-icon02.webp", title: ["Digital Transformation", "And Automation"], text: "Modern platforms and automation that remove manual work and speed you up", dark: true },
];

const WhiteArrow = () => (
  <i>
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10.0035 3.90804L1.41153 12.5L0 11.0885L8.59097 2.49651H1.01922V0.5H12V11.4808H10.0035V3.90804Z" fill="white" />
    </svg>
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10.0035 3.90804L1.41153 12.5L0 11.0885L8.59097 2.49651H1.01922V0.5H12V11.4808H10.0035V3.90804Z" fill="white" />
    </svg>
  </i>
);

/** Social-proof card + two feature cards (`.tv-feature-section`), used on About and Services. */
export function FeatureSection({ spacing = "space" }: { spacing?: "space" | "space-top" }) {
  return (
    <section className={`tv-feature-section bg-light ${spacing}`}>
      <div className="container">
        <div className="row gy-30">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="tv-feature-item wow fadeInLeft" data-wow-delay=".5s">
              <div className="client-social-proof">
                <div className="social">
                  <Img src="/assets/images/social/social-img01.webp" alt="Client 01" />
                  <Img src="/assets/images/social/social-img02.webp" alt="Client 02" />
                  <Img src="/assets/images/social/social-img03.webp" alt="Client 03" />
                  <h4>+{siteConfig.stats.happyClients.replace("+", "")}</h4>
                </div>
                <div className="count-box mt-30">
                  <span className="count-number odometer" data-count="10,000" />
                </div>
                <div className="rating-viewers">happy clients worldwide</div>
                <ThemeButton href="/contact" label="Explore More" className="style2 mt-20 br-30" variant="diagonal" />
                <div className="scribble-shape1 moving">
                  <Img src="/assets/images/feature/scribble.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
          {FEATURES.map((f, i) => (
            <div key={f.title[0]} className="col-lg-4 col-md-6 col-sm-6">
              <div className={`tv-feature-box${f.dark ? " bg-theme3" : ""} wow fadeInLeft`} data-wow-delay={i ? ".9s" : ".7s"}>
                <div className="icon-top">
                  <div className={`icon${f.dark ? " style2 bg-dark" : ""}`}>
                    <WhiteArrow />
                  </div>
                </div>
                <div className="logo mb-40">
                  <Img src={f.icon} alt="" />
                </div>
                <h2>
                  {f.title[0]} <br />
                  {f.title[1]}
                </h2>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
