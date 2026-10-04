import { siteConfig } from "@/config/site";
import { ThemeButton } from "@/components/inotek/ThemeButton";
import { SwiperBox } from "@/components/inotek/SwiperBox";
import { Img } from "@/components/inotek/Img";

const SKILLS = [
  { title: "Web & App Development", value: 92 },
  { title: "SEO & Digital Marketing", value: 88 },
];

/** Intro with skill bars, rotating video badge and founder card (`.tv-about-section.style-3`). */
export function AboutIntro() {
  const lead = siteConfig.team[0];
  return (
    <section className="tv-about-section style-3 space bg-light">
      <div className="container">
        <div className="row gy-30 align-items-center">
          <div className="col-lg-4">
            <div className="about-left">
              <div className="about-thumb">
                <Img className="br-20" src="/assets/images/evolix/about/intro.webp" alt={`${siteConfig.name} team meeting`} />
              </div>
              <div className="pt-50 pb-30 md-d-none">
                <div className="border" />
              </div>
              <div className="counter">
                <div className="about-counter">
                  <div className="count-box">
                    <span className="count-number odometer" data-count={siteConfig.stats.experienceYears} />
                  </div>
                  <div className="text">
                    <span>+</span>
                    <p>
                      Years of <br /> Experience
                    </p>
                  </div>
                  <div className="scribble md-d-none">
                    <Img src="/assets/images/icons/scribble-2.webp" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 col-sm-6">
            <div className="about-content-wrap">
              <div className="title-wrap three">
                <div className="sub-title-2 text-theme">
                  <i className="fa-solid fa-circle-check" />
                  Get to Know Us
                </div>
                <h2 className="sec-title">Empowering Businesses with Innovative IT Solutions Worldwide</h2>
                <p>
                  {siteConfig.name} is a software engineering and digital growth studio in Islamabad. We design, build and market fast, secure
                  products for startups and enterprises around the world.
                </p>
              </div>
              <div className="skills">
                {SKILLS.map((skill) => (
                  <div key={skill.title} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-title">{skill.title}</div>
                    </div>
                    <div className="skill-bar">
                      <div className="bar-inner">
                        <div className="bar progress-line" data-width={skill.value}>
                          <div className="skill-percentage">
                            <div className="count-box">
                              <span className="count-text" data-speed="3000" data-stop={skill.value}>
                                0
                              </span>
                              %
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ThemeButton href="/contact" label="Discover More" className="mt-40 br-30" />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 d-flex align-items-end">
            <div className="about-right ml-40 xs-ml-0">
              <div className="video-box">
                <div className="circle-box">
                  <a className="logo-box popup-video" href={siteConfig.videoUrl} data-fancybox="video-gallery" aria-label="Play company video">
                    <Img src="/assets/images/hero/spin-icon.webp" alt="" />
                  </a>
                  <div className="text-inner" style={{ animation: "10s linear 0s infinite normal none running text-rotate" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="192.5" height="192.5" viewBox="0 0 250.5 250.5" aria-hidden="true">
                      <path d="M.25,125.25a125,125,0,1,1,125,125,125,125,0,0,1-125-125" id="about-circle-path" />
                      <text>
                        <textPath href="#about-circle-path" startOffset="0%">
                          TECHNOLOGY BUSINESS SOLUTION INNOVATION
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="profile-card overlay-anim1 mt-40">
                <Img className="image overlay-anim1" src="/assets/images/evolix/about/profile.webp" alt={lead.name} />
                <div className="profile-details">
                  <h5 className="name">{lead.name.toUpperCase()}</h5>
                  <p className="title">{lead.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Dark team slider (`.tv-team-section.style-2`). */
export function TeamSlider() {
  // Swiper's loop needs more slides than are visible, so the team is listed twice.
  const slides = [...siteConfig.team, ...siteConfig.team];
  return (
    <section className="tv-team-section style-2 bg-light position-relative z-2">
      <div className="team-inner space overflow-hidden position-relative mx-30 xxl-mx-0">
        <div className="bg image">
          <Img src="/assets/images/team/hm2-bg01.webp" alt="" loading="lazy" />
        </div>
        <div className="container">
          <div className="row gy-30">
            <div className="col-lg-4 col-md-6">
              <div className="team-content-wrap">
                <div className="title-wrap white" data-wow-duration="2s" data-wow-delay=".0s">
                  <div className="sub-title-2 text-white two">
                    <i className="fa-solid fa-circle-check" />
                    Our Team
                  </div>
                  <h2 className="sec-title">Meet Our Experts Dedication Team Members</h2>
                </div>
                <div className="team-btn-wrapper">
                  <div className="array-button">
                    <button type="button" className="array-prev" aria-label="Previous team member">
                      <i className="fa fa-arrow-left-long" />
                    </button>
                    <button type="button" className="array-next active" aria-label="Next team member">
                      <i className="fa fa-arrow-right-long" />
                    </button>
                  </div>
                </div>
                <div className="team-social-wrapper">
                  <div className="client-social-proof">
                    <div className="social">
                      <Img src="/assets/images/social/social-img02.webp" alt="Client 02" />
                      <Img src="/assets/images/social/social-img03.webp" alt="Client 03" />
                      <h4>+{siteConfig.team.length * 5}</h4>
                    </div>
                    <h4 className="text">
                      Professional <br /> Members
                    </h4>
                    <div className="scribble-shape scribble md-d-none">
                      <Img src="/assets/images/team/hm2-scribble.webp" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6">
              <SwiperBox preset="team" className="tv-team-slider" navScope=".team-inner">
                {slides.map((member, i) => (
                  <div className="swiper-slide" key={i}>
                    <div className="tv-team-card style-2">
                      <div className="team-photo">
                        <Img src={`/assets/images/evolix/team/member-0${(i % siteConfig.team.length) + 1}.webp`} alt={member.name} loading="lazy" />
                        <div className="team-social">
                          <a href={member.social.linkedin} aria-label={`${member.name} on LinkedIn`}>
                            <i className="fa-brands fa-linkedin-in" />
                          </a>
                          <a href={member.social.twitter} aria-label={`${member.name} on X`}>
                            <i className="fa-brands fa-x-twitter" />
                          </a>
                          <a href={member.social.github} aria-label={`${member.name} on GitHub`}>
                            <i className="fa-brands fa-github" />
                          </a>
                        </div>
                      </div>
                      <div className="team-info">
                        <div className="info-inner">
                          <h3 className="team-name text-white">{member.name}</h3>
                          <p className="team-role text-white">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </SwiperBox>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Green "join our team" band (`.tv-cta-section.style-2`). */
export function JoinCta() {
  return (
    <section className="tv-cta-section style-2 bg-light position-relative z-2">
      <div className="cta-inner py-65 overflow-hidden position-relative mx-30 xxl-mx-0">
        <div className="bg image">
          <Img src="/assets/images/cta/hm2-bg01.webp" alt="" loading="lazy" />
        </div>
        <div className="overlay bg-theme mbm-overlay" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="cta-left">
                <h2 className="sec-title text-white">Expert Engineers and Marketers Powering Growth</h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cta-right text-right">
                <ThemeButton href="/contact" label="Work With Us" className="br-30" />
                <div className="arrow">
                  <Img src="/assets/images/cta/arrow.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Achievements with counters (`.tv-achivement-section`). */
export function Achievements() {
  const { stats, contact } = siteConfig;
  return (
    <section className="tv-achivement-section bg-light space-top overflow-hidden">
      <div className="container">
        <div className="row gy-30">
          <div className="col-lg-6 col-xxl-6">
            <div className="achivement-content-wrapper">
              <div className="title-wrap three" data-wow-duration="1.5s" data-wow-delay=".4s">
                <div className="sub-title-2 text-theme">
                  <i className="fa-solid fa-circle-check" />
                  Achievements
                </div>
                <h2 className="sec-title">
                  Helping Global Brands <br />
                  and Startups to Achieve <br />
                  Business Excellence
                </h2>
                <p>
                  {siteConfig.name} - engineering fast, secure and <br /> scalable products that help businesses grow <br /> in competitive
                  markets
                </p>
              </div>
              <div className="inner-contact">
                <div className="icon">
                  <Img src="/assets/images/callus/call-iocn.webp" alt="" />
                </div>
                <div className="content">
                  <h6 className="call-text">Need Help?</h6>
                  <a className="call-phone" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                    {contact.phone}
                  </a>
                </div>
              </div>
              <ThemeButton href="/contact" label="Discover More" className="mt-40 br-30" />
            </div>
          </div>
          <div className="col-lg-3 col-xxl-3 lpm-d-none">
            <div className="achivement-image-wrapper">
              <div className="thumb-bg">
                <svg version="1.1" viewBox="0 0 586.23 500.74" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <g transform="translate(-1.0738 -1.2546)">
                    <path d="m211.33 501.74c-187.01-7.406-269.07-172.39-164.01-329.74 130.19-194.98 434.71-232.19 520.53-63.614 85.759 168.44-126.35 402.46-356.52 393.35zm63.333-96.994c199.68-42.298 301.86-265.24 140.24-305.98-121.19-30.549-281.94 59.67-317 177.91-27.173 91.643 57.87 153.26 176.77 128.07z" />
                  </g>
                </svg>
              </div>
              <div className="thumb img-anim-right">
                <Img src="/assets/images/evolix/about/achievement.webp" alt={`${siteConfig.name} consultants with a client`} loading="lazy" />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-xxl-3">
            <div className="achivement-right-wrapper">
              <div className="content">
                <span>
                  <Img className="spin2" src="/assets/images/achivement/spin.webp" alt="" />
                </span>
                <h4>Achievements</h4>
              </div>
              <div className="counter-box">
                <div className="counter-inner">
                  <div className="icon">
                    <Img src="/assets/images/achivement/hm2-icon01.webp" alt="" />
                  </div>
                  <div className="count">
                    <span className="count-number odometer" data-count={parseInt(stats.completedProjects, 10)}>
                      0
                    </span>
                    K<span className="plus">+</span>
                  </div>
                </div>
                <p>{stats.completedProjects} Works Completed</p>
              </div>
              <div className="counter-box">
                <div className="counter-inner">
                  <div className="icon">
                    <Img src="/assets/images/achivement/hm2-icon02.webp" alt="" />
                  </div>
                  <div className="count">
                    <span className="count-number odometer" data-count={parseInt(stats.happyClients, 10)}>
                      0
                    </span>
                    K<span className="plus">+</span>
                  </div>
                </div>
                <p>{stats.happyClients} Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const BRANDS_TWO = ["/assets/images/brands/01.png", "/assets/images/brands/02.png", "/assets/images/brands/03.png", "/assets/images/brands/04.png", "/assets/images/brands/05.png"];

/** "Trusted by" brand slider (`.tv-brands-section` + `.brands-slider-two`). */
export function TrustedBrands() {
  const slides = [...BRANDS_TWO, ...BRANDS_TWO];
  return (
    <div className="tv-brands-section bg-light position-relative z-3 ">
      <div className="brand-inner bg-light2 overflow-hidden position-relative space br-30 ml-br-0 mx-30 xxl-mx-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sponsors-outer  brand-outher bg-light2">
                <div className="trusted-partners d-flex align-items-center mb-60">
                  <span className="line" />
                  <div className="title">
                    TRUSTED <span className="text-theme">{siteConfig.stats.happyClients}</span> CUSTOMERS OVER ALL WORLD
                  </div>
                  <span className="line" />
                </div>
                <SwiperBox preset="brandsTwo" className="brands-slider-two">
                  {slides.map((src, i) => (
                    <div className="swiper-slide" key={i}>
                      <div className="brand-item">
                        <span className="image">
                          <Img src={src} alt={`Client brand ${(i % BRANDS_TWO.length) + 1}`} loading="lazy" />
                          <Img src={src} alt="" aria-hidden="true" loading="lazy" />
                        </span>
                      </div>
                    </div>
                  ))}
                </SwiperBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CLIP =
  "m121.5 257.34c-12.412-0.72765-28.182-2.8044-31.586-17.301-2.793-4.7182 1.5857-17.575-0.91518-18.486-6.9121 8.0007-15.665 16.497-27.297 14.062-12.112-3.5031-20.188-14.556-28.777-23.182-7.8713-8.1452-15.98-19.896-9.8053-31.396 1.7993-7.4536 22.589-17.642 5.6303-15.507-12.465 2.6063-25.259-7.6117-25.342-20.399-1.5559-14.691-1.4603-30.117 3.0379-44.264 5.6087-11.603 19.422-12.54 30.554-11.632-10.032-8.1008-18.117-21.786-10.943-34.369 9.9376-12.778 21.593-25.07 35.927-32.791 13.707-5.7697 23.972 8.0297 31.682 13.692-1.3068-11.36-0.29036-26.277 12.613-30.597 17.13-4.2617 35.742-3.8162 52.583 1.479 12.999 5.2971 11.29 20.476 10.951 31.352 8.3856-11.327 25.183-20.051 37.491-8.9629 11.685 9.7824 24.383 20.724 29.954 35.2 3.327 12.905-5.8445 22.582-15.258 29.719 12.816-1.0321 28.867 0.70354 33.387 15.198 3.5614 16.402 2.9324 34.088-1.9799 50.147-4.8191 10.631-17.912 13.661-28.426 11.082-3.9402 5.1302 14.868 13.858 10.483 24.117 0.75317 12.174-10.641 19.899-17.882 28.095-9.3379 8.628-20.586 20.096-34.604 15.289-7.848 0.12536-13.831-15.895-17.691-12.727 1.3139 10.463 0.62546 23.95-10.484 28.943-10.509 3.8647-22.254 4.0698-33.304 3.2383z";

const STEPS = [
  { title: "Idea Planning", text: "We study your goals, users and market to plan the right product strategy", image: "/assets/images/process/hm3-img01.webp", style: "" },
  { title: "Deployments", text: "Design, development and testing in quick iterations, shipped to production", image: "/assets/images/process/hm3-img02.webp", style: " style-2" },
  { title: "Finished Work", text: "Launch, measure and keep improving with ongoing support and growth", image: "/assets/images/process/hm3-img03.webp", style: " style-3" },
];

/** Three-step strategy with blob-shaped images (`.tv-process-section.style-2`). */
export function StrategyProcess() {
  return (
    <section className="tv-process-section style-2 bg-light position-relative">
      <div className="process-inner mx-30 ml-mx-0 space  overflow-hidden xxl-br-0 position-relative">
        <div className="container position-relative">
          <div className="title-wrap text-center three" data-wow-duration="1.5s" data-wow-delay=".4s">
            <div className="sub-title-2">
              <i className="fa-solid fa-circle-check" />
              Strategy
            </div>
            <h2 className="sec-title text-dark">
              From Research to Great Result <br /> Driven Real Success
            </h2>
          </div>
          <div className="row gx-0">
            {STEPS.map((step, i) => (
              <div key={step.title} className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div className={`process-box${step.style}`}>
                  <div className="process-img">
                    <svg viewBox="0 0 255.15 255.45" className="clip-svg" aria-hidden="true">
                      <clipPath id={`clip-shape-${i + 1}`}>
                        <path d={CLIP} />
                      </clipPath>
                    </svg>
                    <Img src={step.image} alt={step.title} className="main-img" style={{ clipPath: `url(#clip-shape-${i + 1})` }} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <div className="process-number">
                    <span>0{i + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
