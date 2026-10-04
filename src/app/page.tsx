import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeTicker } from "@/components/home/MarqueeTicker";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { VideoStatsBanner } from "@/components/home/VideoStatsBanner";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { TeamSection } from "@/components/home/TeamSection";
import { ContactSection } from "@/components/home/ContactSection";
import { TeamCtaBanner } from "@/components/home/TeamCtaBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Home page – section for section the Inotek "home-5" layout. */
export default function Home() {
  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <HeroSection />
        <MarqueeTicker />
        <AboutSection />
        <ServicesGrid />
        <VideoStatsBanner />
        <WhyChooseUs />
        <ProjectsSection />
        <CtaBanner />
        <TeamSection />
        <ContactSection />
        <TeamCtaBanner />
        <TestimonialsSection />
        <BlogSection />
        <NewsletterBox />
      </div>
    </div>
  );
}
