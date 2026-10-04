import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/inotek/PageBreadcrumb";
import { FeatureSection } from "@/components/pages/FeatureSection";
import { ServiceCards, ProcessSteps, CollaborateCta } from "@/components/pages/ServiceSections";
import { MarqueeTicker } from "@/components/home/MarqueeTicker";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata: Metadata = {
  title: "IT Services & Solutions - Web, Mobile, Cloud & SEO",
  description:
    "Explore enterprise IT services provided by Evolix Technologies: custom web development, mobile apps, UI/UX design, cloud solutions, and technical SEO.",
  alternates: { canonical: "/services" },
};

/** Services page – layout of the Inotek template's service.html. */
export default function ServicesPage() {
  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <PageBreadcrumb title="Our Services" trail={[{ name: "Services" }]} />
        <FeatureSection />
        <ServiceCards />
        <MarqueeTicker inset />
        <ProcessSteps />
        <CollaborateCta />
        <NewsletterBox />
      </div>
    </div>
  );
}
