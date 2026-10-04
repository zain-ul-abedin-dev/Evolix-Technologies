import { Marquee } from "@/components/inotek/Marquee";
import { Img } from "@/components/inotek/Img";

const ITEMS = ["Digital Marketing", "Branding Solutions", "Custom Website", "Innovation Design", "Cyber Security"];

/** Green service ticker (`.tv-marquee-section`). `inset` = inner-page variant with side margins. */
export function MarqueeTicker({ inset = false }: { inset?: boolean }) {
  return (
    <div className="tv-marquee-section bg-light position-relative">
      <div className={`tv-marquee-inner${inset ? " mx-30 ml-mx-0" : ""} position-relative`}>
        <div className="container-fluid p-0 overflow-hidden">
          <div className="slider__marquee clearfix br-0 marquee-wrap style-2">
            <Marquee className="marquee_mode marquee__group">
              {ITEMS.map((item) => (
                <div key={item} className="item m-item">
                  <Img className="icon" src="/assets/images/icons/evolix-mark-on-green.svg" alt="" /> {item}
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}
