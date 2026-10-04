import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeButton } from "@/components/inotek/ThemeButton";
import { HoverImage } from "@/components/inotek/HoverImage";
import { Img } from "@/components/inotek/Img";

/** Expert team (`.tv-team-section.style-4`). Also used on /about. */
export function TeamSection() {
  // The template shows six cards (2 x 3); repeat members when there are fewer.
  const team = Array.from({ length: 6 }, (_, i) => siteConfig.team[i % siteConfig.team.length]);

  return (
    <div className="inotek">
      <section className="tv-team-section style-4 bg-light space">
        <div className="container">
          <div className="row gy-30">
            <div className="col-lg-6">
              <div className="team-left">
                <div className="title-wrap three">
                  <div className="sub-title-2 text-theme">
                    <i className="fa-solid fa-circle-check" />
                    Our Team
                  </div>
                  <h2 className="sec-title">
                    Meet the expert team <br />
                    powering our goals and <br />
                    ambitions{" "}
                  </h2>
                  <p>
                    {siteConfig.name} - engineers, designers and marketers <br /> building fast, secure and scalable products <br /> for
                    growing businesses worldwide
                  </p>
                  <ThemeButton href="/about" label="All Member" className="br-30 mt-20" />
                </div>
                <div className="team-left-thumb br-30 wow img-anim-right data-item-hover overflow-hidden">
                  <HoverImage src="/assets/images/team/hm5-img05.webp" alt={`${siteConfig.name} team`} style="01" intensity={0.2} speedIn={1} speedOut={1} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row gy-25">
                {team.map((member, i) => (
                  <div key={i} className="col-lg-6 col-md-6 col-sm-6">
                    <div className="tv-team-card-four">
                      <div className="team-photo">
                        <Img src={member.image} alt={member.name} loading="lazy" />
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
                        <h4 className="team-name">
                          <Link href="/about">{member.name}</Link>
                        </h4>
                        <p className="team-role">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
