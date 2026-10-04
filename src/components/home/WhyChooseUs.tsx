import { ChooseTabs, type ChooseItem } from "@/components/inotek/ChooseTabs";
import { BrandsSlider } from "@/components/inotek/BrandsSlider";
import { Img } from "@/components/inotek/Img";

const ITEMS: ChooseItem[] = [
  {
    icon: "/assets/images/choose/hm5-icon01.webp",
    label: "Discovery",
    title: "Innovative Solutions",
    text: "We turn your ideas into fast, scalable digital products using modern frameworks, clean architecture and proven delivery processes that keep quality high.",
    image: "/assets/images/choose/hm5-img01.webp",
  },
  {
    icon: "/assets/images/choose/hm5-icon02.webp",
    label: "Our Experts",
    title: "High Professional Team",
    text: "Engineers, designers and growth specialists work as one team, collaborating closely with you from strategy and design to launch and long-term growth.",
    image: "/assets/images/choose/hm5-img02.webp",
  },
  {
    icon: "/assets/images/choose/hm5-icon03.webp",
    label: "Supports",
    title: "24 Hrs Dedicated Support",
    text: "Round-the-clock monitoring, quick response times and proactive maintenance keep your website, apps and infrastructure secure and always running.",
    image: "/assets/images/choose/hm5-img03.webp",
    noBorder: true,
  },
];

const BRAND_LOGOS = [
  "/assets/images/brands/hm4-img01.webp",
  "/assets/images/brands/hm4-img02.webp",
  "/assets/images/brands/hm4-img03.webp",
  "/assets/images/brands/hm4-img04.webp",
  "/assets/images/brands/hm4-img05.webp",
];
// Same order as the template: logos 1-5 followed by 1-3.
const BRANDS = [0, 1, 2, 3, 4, 0, 1, 2].map((n, i) => ({ src: BRAND_LOGOS[n], alt: `Brand ${String(i + 1).padStart(2, "0")}` }));

/** Why choose us + brand ticker (`.tv-choose-section.style-5`). */
export function WhyChooseUs() {
  return (
    <section className="tv-choose-section style-5 space-top overflow-hidden position-relative">
      <div className="bg image">
        <Img src="/assets/images/choose/hm5-bg01.webp" alt="" loading="lazy" />
      </div>
      <div className="container space-bottom">
        <div className="row gy-30 align-items-center">
          <div className="col-lg-12">
            <div className="choose-title-area d-flex justify-content-between sm-flex-column sm-mb-30">
              <div className="title-wrap three" data-wow-duration="1.5s" data-wow-delay=".4s">
                <div className="sub-title-2 two text-white">
                  <i className="fa-solid fa-circle-check" />
                  Why Choose Us
                </div>
              </div>
              <div className="title-wrap three" data-wow-duration="1.5s" data-wow-delay=".4s">
                <h2 className="sec-title text-white">
                  Proven track record of driving
                  <br />
                  digital transformation
                </h2>
              </div>
            </div>
          </div>
        </div>
        <ChooseTabs items={ITEMS} />
      </div>
      <div className="container pt-50 xs-pt-20 space-bottom position-relative pos">
        <div className="tv-brands-section style-3 position-relative z-3 ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="sponsors-outer  brand-outher">
                  {/* Doubled so Swiper's loop always has enough slides. */}
                  <BrandsSlider brands={[...BRANDS, ...BRANDS]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
