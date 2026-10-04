import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/inotek/ContactForm";
import { Img } from "@/components/inotek/Img";

/** "Need help?" call-back form (`.tv-contact-section.style-5`). Also used on /contact, service and project pages. */
export function ContactSection() {
  const services = siteConfig.services.map((s) => ({ value: s.slug, label: s.title }));

  return (
    <div className="inotek">
      <section className="tv-contact-section style-5 space position-relative" id="contact">
        <div className="p-top-left wow slideInLeft z-0 xs-d-none">
          <Img src="/assets/images/contact/hm5-shape01.webp" alt="" />
        </div>
        <div className="bg image">
          <Img src="/assets/images/contact/hm5-bg01.webp" alt="" loading="lazy" />
        </div>
        <div className="container">
          <div className="row align-items-end gy-30">
            <div className="col-lg-6">
              <div className="title-wrap three white">
                <div className="sub-title-2 text-white two">
                  <i className="fa-solid fa-circle-check" />
                  Get in Touch
                </div>
                <h2 className="sec-title">Need help? We&apos;re Here...</h2>
              </div>
              <div className="contact-form style-5">
                <h2 className="sec-title">Request for a call back</h2>
                <ContactForm services={services} />
              </div>
            </div>
            <div className="col-lg-6" />
          </div>
        </div>
      </section>
    </div>
  );
}
