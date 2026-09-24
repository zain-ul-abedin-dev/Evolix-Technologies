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
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section (Home-5 Layout) */}
      <HeroSection />

      {/* 2. Marquee Continuous Ticker */}
      <MarqueeTicker />

      {/* 3. About Company Section with Video Modal & Counters */}
      <AboutSection />

      {/* 4. 6-Services Grid */}
      <ServicesGrid />

      {/* 5. Video CTA & Live Counters Banner */}
      <VideoStatsBanner />

      {/* 6. Why Choose Us with Feature Switcher & Brand Carousel */}
      <WhyChooseUs />

      {/* 7. Filterable Projects & Portfolio Showcase */}
      <ProjectsSection />

      {/* 8. Call To Action Banner */}
      <CtaBanner />

      {/* 9. Expert Team Member Showcase with Hover Overlays */}
      <TeamSection />

      {/* 10. Contact / Callback Request Form with Backend Email Gateway */}
      <ContactSection />

      {/* 11. Stacking Testimonials on Scroll */}
      <TestimonialsSection />

      {/* 12. Latest Tech & SEO Insights Blog Section */}
      <BlogSection />

      {/* 13. Overlapping Newsletter Subscription */}
      <NewsletterBox />
    </>
  );
}
