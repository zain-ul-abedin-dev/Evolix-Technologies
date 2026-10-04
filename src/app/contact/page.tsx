import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageBreadcrumb } from "@/components/inotek/PageBreadcrumb";
import { ContactForm } from "@/components/inotek/ContactForm";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata: Metadata = {
  title: "Contact Us - Free IT Consultation & Project Quotes",
  description:
    "Contact Evolix Technologies in Islamabad. Reach our senior engineers for software consulting, web app development, and technical SEO quotes.",
  alternates: { canonical: "/contact" },
};

const LinkEffect = ({ label }: { label: string }) => (
  <span className="link-effect">
    <span className="effect-1">{label}</span>
    <span className="effect-1" aria-hidden="true">
      {label}
    </span>
  </span>
);

/** Contact page – layout of the Inotek template's contact.html. */
export default function ContactPage() {
  const { contact, social } = siteConfig;
  const services = siteConfig.services.map((s) => ({ value: s.slug, label: s.title }));
  const mapQuery = encodeURIComponent(`${siteConfig.name}, ${contact.address}`);

  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <PageBreadcrumb title="Contact Us" trail={[{ name: "Contact" }]} />
        <section className="tv-contact-section inner space bg-light">
          <div className="container">
            <div className="row gy-30">
              <div className="col-lg-5">
                <div className="contact-content-wrap">
                  <div className="title-wrap" data-wow-duration="1.5s" data-wow-delay=".4s">
                    <div className="sub-title-2 text-theme">
                      <i className="fa-solid fa-circle-check" />
                      Contact Us
                    </div>
                    <h2 className="sec-title">Get in Touch with Evolix Contact Information</h2>
                    <p>We’re always ready to help your business. Let’s talk with us</p>
                  </div>
                  <div className="contact-info">
                    <div className="contact-item">
                      <div className="icon">
                        <i className="fa-sharp fa-regular fa-location-dot" />
                      </div>
                      <div className="info">
                        <h4 className="title">Our Address</h4>
                        <p>
                          {siteConfig.name},
                          <br />
                          {contact.address}
                        </p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="icon">
                        <i className="fa-light fa-circle-phone" />
                      </div>
                      <div className="info">
                        <h4 className="title">Call us Anytime</h4>
                        <div className="content">
                          Phone / WhatsApp: <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                          <br />
                          {contact.hours}
                        </div>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="icon">
                        <i className="fa-light fa-envelope" />
                      </div>
                      <div className="info">
                        <h4 className="title">Send E-Mail</h4>
                        <div className="content">
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="social-links">
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                      <LinkEffect label="Facebook" />
                    </a>{" "}
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                      <LinkEffect label="Twitter/X" />
                    </a>{" "}
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                      <LinkEffect label="LinkedIn" />
                    </a>{" "}
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                      <LinkEffect label="Instagram" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-form">
                  <h2 className="title mt--5 mb-35">Let’s Contact with us</h2>
                  <ContactForm services={services} variant="full" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="tv-contact-map">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="map-box">
                <iframe
                  className="map-canvas"
                  title={`${siteConfig.name} location map`}
                  src={`https://maps.google.com/maps?q=${mapQuery}&t=m&z=12&output=embed&iwloc=near`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
        <NewsletterBox />
      </div>
    </div>
  );
}
