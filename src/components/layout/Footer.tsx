import Link from "next/link";
import { siteConfig } from "@/config/site";
import { blogImage } from "@/config/media";
import { Img } from "@/components/inotek/Img";

const INFO_LINKS = [
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Portfolio", href: "/projects" },
  { name: "Latest Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

// Short labels so each fits on one line, like the template's footer list.
const SERVICE_LINKS = [
  { name: "Web Development", slug: "web-development" },
  { name: "UI/UX Design", slug: "ui-ux-design" },
  { name: "Digital Marketing", slug: "seo-marketing" },
  { name: "SEO Optimization", slug: "search-engine-optimization" },
  { name: "Cloud Hosting", slug: "cloud-security" },
];

const FOOTER_POSTS = siteConfig.blogs.slice(0, 2).map((post) => ({ ...post, thumb: blogImage(post.slug, "thumb") }));

/** Site footer (template `.footer-section`). */
export function Footer() {
  const { contact, social } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <div className="inotek">
      <footer className="footer-section z-1 br-30 xxl-br-0 pt-75 bg-dark position-relative mx-30 mb-30 xxl-m-0 overflow-hidden">
        <div className="bg image mbm-screen">
          <Img src="/assets/images/footer/hm1-bg01.webp" alt="" loading="lazy" />
        </div>
        <div className="footer-top space">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6 footer-brand">
                <div className="brand-info wow fadeInUp" data-wow-delay=".2s">
                  <div className="logo">
                    <Link href="/">
                      <Img src="/Evolix LOGO SVG -02.svg" alt={`${siteConfig.name} logo`} style={{ height: 42, width: "auto" }} />
                    </Link>
                  </div>
                  <div className="contact-info">
                    <div className="contact-item">
                      <h3 className="title">FREE CONVERSATION</h3>
                      <a href={`mailto:${contact.email}`}>
                        <i className="fa-sharp fa-light fa-envelope" /> {contact.email}
                      </a>
                    </div>
                    <div className="contact-item">
                      <h3 className="title">CALL US :</h3>
                      <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                        <i className="flaticon-phone" /> {contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="social-links">
                    <a href={social.facebook} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href={social.twitter} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                      <i className="fab fa-x-twitter" />
                    </a>
                    <a href={social.linkedin} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in" />
                    </a>
                    <a href={social.instagram} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="row">
                  <div className="col-lg-6 col-md-6 p-0 sm-pl-15">
                    <div className="footer-widget wow fadeInUp" data-wow-delay="0.4s">
                      <h4 className="title">Information</h4>
                      <ul className="list-unstyled">
                        {INFO_LINKS.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href}>{link.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 p-0 sm-pl-15">
                    <div className="footer-widget wow fadeInUp" data-wow-delay="0.6s">
                      <h4 className="title">Services</h4>
                      <ul className="list-unstyled">
                        {SERVICE_LINKS.map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`}>{s.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 md-d-none" />
              <div className="col-lg-3 col-md-4">
                <div className="footer-widget ml-0 mb-0 wow fadeInUp" data-wow-delay="0.8s">
                  <h4 className="title">Latest Blog</h4>
                  {FOOTER_POSTS.map((post, i) => (
                    <div key={post.slug} className={`recent-post-item${i === FOOTER_POSTS.length - 1 ? " mb--20" : ""}`}>
                      <figure className="image">
                        <Link href={`/blog/${post.slug}`}>
                          <Img src={post.thumb} alt="" loading="lazy" />
                        </Link>
                      </figure>
                      <div className="recent-post-info">
                        <h4 className="title">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <span className="post-date">{post.date.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row gy-15">
              <div className="col-md-6">
                <div className="copyright wow fadeInUp" data-wow-delay=".3s">
                  <p className="mb-0">
                    Copyright &copy; {year}{" "}
                    <Link className="text-theme" href="/">
                      {siteConfig.name}
                    </Link>
                    . All Rights Reserved.
                  </p>
                </div>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="footer-policy wow fadeInUp" data-wow-delay=".6s">
                  <Link href="/privacy-policy">Privacy Policy</Link>{" "}
                  <Link href="/terms">Terms &amp; Conditions</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
