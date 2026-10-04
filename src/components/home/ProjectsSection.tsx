import { siteConfig } from "@/config/site";
import { ProjectGrid } from "@/components/inotek/ProjectGrid";

/** Filterable projects (`.tv-project-section.style-3`). Also used on /projects. */
export function ProjectsSection() {
  const projects = siteConfig.projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    tag: p.category.toUpperCase(),
    desc: p.desc,
    image: p.image,
    filters: [p.filterCategory],
  }));

  return (
    <div className="inotek">
      <section className="tv-project-section style-3 space bg-light">
        <ProjectGrid projects={projects} />
      </section>
    </div>
  );
}
