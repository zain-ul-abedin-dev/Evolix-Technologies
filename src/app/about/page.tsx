import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/inotek/PageBreadcrumb";
import { FeatureSection } from "@/components/pages/FeatureSection";
import { AboutIntro, TeamSlider, JoinCta, Achievements, TrustedBrands, StrategyProcess } from "@/components/pages/AboutSections";
import { MarqueeTicker } from "@/components/home/MarqueeTicker";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata: Metadata = {
  title: "About Us - Engineering Excellence & Vision",
  description: "Learn about Evolix Technologies, our Islamabad engineering lab, leadership vision, and proven track record in global digital innovation.",
  alternates: { canonical: "/about" },
};

/** About page – layout of the Inotek template's about.html. */
export default function AboutPage() {
  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <PageBreadcrumb title="About Us" trail={[{ name: "About Us" }]} />
        <FeatureSection spacing="space-top" />
        <AboutIntro />
        <MarqueeTicker inset />
        <TeamSlider />
        <JoinCta />
        <Achievements />
        <TrustedBrands />
        <StrategyProcess />
        <NewsletterBox />
      </div>
    </div>
  );
}
