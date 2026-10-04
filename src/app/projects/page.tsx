import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { projectImage } from "@/config/media";
import { PageBreadcrumb } from "@/components/inotek/PageBreadcrumb";
import { CaseStudyGrid } from "@/components/inotek/ProjectGrid";
import { NewsletterBox } from "@/components/home/NewsletterBox";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio - Proven Digital Systems",
  description: "Browse enterprise software engineering, web applications, and UI/UX case studies delivered by Evolix Technologies.",
  alternates: { canonical: "/projects" },
};

/** Portfolio – layout of the Inotek template's project.html. */
export default function ProjectsPage() {
  const projects = siteConfig.projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    tag: p.category.toUpperCase(),
    date: p.date,
    image: projectImage(p.slug, "wide"),
    filters: [p.filterCategory],
  }));

  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <PageBreadcrumb title="Our Portfolio" trail={[{ name: "Portfolio" }]} />
        <section className="tv-project-section inner space bg-light">
          <div className="container">
            <div className="title-wrap text-center" data-wow-duration="1.5s" data-wow-delay=".4s">
              <div className="sub-title-2 text-theme">
                <i className="fa-solid fa-circle-check" />
                Projects
              </div>
              <h2 className="sec-title">Selected Case Studies</h2>
              <p>Websites, apps and digital products we have designed, built and grown for our clients</p>
            </div>
            <CaseStudyGrid projects={projects} />
          </div>
        </section>
        <NewsletterBox />
      </div>
    </div>
  );
}
