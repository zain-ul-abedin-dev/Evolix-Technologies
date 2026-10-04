import { siteConfig } from "@/config/site";
import { Img } from "@/components/inotek/Img";

/** Video banner with counters (`.tv-video-section`). */
export function VideoStatsBanner() {
  const completed = parseInt(siteConfig.stats.completedProjects, 10) || 32;
  const satisfaction = parseInt(siteConfig.stats.satisfactionRate, 10) || 98;

  return (
    <section className="tv-video-section">
      <div className="bg image">
        <Img className="mw-inherit" src="/assets/images/video/hm5-bg01.webp" alt="" loading="lazy" />
      </div>
      <div className="container space-top">
        <div className="row">
          <div className="col-lg-6">
            <div className="video-area">
              <div className="video-box">
                <a className="popup-video play-btn style-2" href={siteConfig.videoUrl} data-fancybox="video-gallery" aria-label="Play company video">
                  <i className="fa-sharp fa-solid fa-play" />
                </a>
              </div>
              <div className="text">
                <h4>
                  We make the creative <br /> solution for business?
                </h4>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="stats-container">
              <div className="stat-box one">
                <div className="box-inner">
                  <div className="box-left">
                    <div className="icon">
                      <Img src="/assets/images/video/hm5-icon01.webp" alt="" />
                    </div>
                  </div>
                  <div className="box-right">
                    <div className="count-box">
                      <span className="count-number odometer" data-count={completed} />
                      <span className="plus">K+</span>
                    </div>
                    <p className="text">Completed Works</p>
                  </div>
                </div>
              </div>
              <div className="stat-box two">
                <div className="box-inner">
                  <div className="box-left">
                    <div className="icon">
                      <Img src="/assets/images/video/hm5-icon02.webp" alt="" />
                    </div>
                  </div>
                  <div className="box-right">
                    <div className="count-box">
                      <span className="count-number odometer" data-count={satisfaction} />%
                    </div>
                    <p className="text">Satisfaction Rates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
