import { NewsletterForm } from "@/components/inotek/NewsletterForm";
import { Img } from "@/components/inotek/Img";

/** Newsletter banner overlapping the footer (`.newsletter-section.mb--75`). Used above the footer on most pages. */
export function NewsletterBox() {
  return (
    <div className="inotek">
      <section className="newsletter-section mb--75">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="newsletter">
                <div className="arrow-shape md-d-none">
                  <Img src="/assets/images/newsletter/arrow-shape.webp" alt="" />
                </div>
                <div className="bg image">
                  <Img className="br-30" src="/assets/images/newsletter/hm1-bg01.webp" alt="" loading="lazy" />
                </div>
                <div className="thumb d-none d-xl-block">
                  <Img src="/assets/images/evolix/newsletter.webp" alt="" loading="lazy" />
                </div>
                <div className="image-text">
                  <Img src="/assets/images/icons/check-circle2.png" alt="" />
                  <h3 className="title title-anim" data-animation="bounce-in">
                    Subscribe Our Newsletter <br /> For Latest Updates
                  </h3>
                </div>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
