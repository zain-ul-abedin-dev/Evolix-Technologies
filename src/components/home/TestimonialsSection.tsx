import { Fragment } from "react";
import { siteConfig } from "@/config/site";
import { Img } from "@/components/inotek/Img";

/** Client testimonials (`.tv-testimonial-section.style-5`). Also used on /about. */
export function TestimonialsSection() {
  const average = (siteConfig.testimonials.reduce((sum, t) => sum + t.rating, 0) / siteConfig.testimonials.length).toFixed(1);

  return (
    <div className="inotek">
      <section className="tv-testimonial-section style-5 bg-light2 space position-relative z-2">
        <div className="container">
          <div className="row gy-30">
            <div className="col-lg-6 col-md-6">
              <div className="testi-left">
                <div className="title-wrap " data-wow-duration="2s" data-wow-delay=".0s">
                  <div className="sub-title-2 text-theme">
                    <i className="fa-solid fa-circle-check" />
                    Testimonial
                  </div>
                  <h2 className="sec-title text-dark">
                    Real Stories from Organic <br />
                    Clients Worldwide
                  </h2>
                  <p>
                    {siteConfig.name} - trusted by startups and enterprises <br />
                    to design, build and grow their digital products
                  </p>
                </div>
                <div className="border mb-15" />
                <div className="client-social-proof">
                  <div className="social">
                    <div className="icon">
                      <Img src="/assets/images/video/hm5-icon02.webp" alt="" />
                    </div>
                    <div className="icon bg-dark">{average}</div>
                  </div>
                  <div className="content">
                    <h4>
                      Average Our <br /> Clients Ratings
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              {siteConfig.testimonials.map((t, i) => (
                <div key={t.id} className={`testi-box-five${i ? " mt-25" : ""}`}>
                  <div className="content">
                    <h4 className="title">
                      <Img className="quote-icon" src="/assets/images/testimonial/hm5-quote.webp" alt="" />
                      {t.quote}
                    </h4>
                    <p>{t.text}</p>
                  </div>
                  <div className="rating" aria-label={`Rated ${t.rating} out of 5`}>
                    {Array.from({ length: 5 }, (_, s) => (
                      <Fragment key={s}>
                        <i className="fas fa-star" />{" "}
                      </Fragment>
                    ))}
                    <span>{t.rating.toFixed(1)}</span>
                  </div>
                  <div className="box-user">
                    <div className="image position-relative z-1">
                      <Img src={t.avatar} alt={t.author} loading="lazy" />
                      <span className="quote-icon">
                        <i className="fa-solid fa-quote-left" />
                      </span>
                    </div>
                    <div className="testi-info">
                      <h4>{t.author}</h4>
                      <p>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
