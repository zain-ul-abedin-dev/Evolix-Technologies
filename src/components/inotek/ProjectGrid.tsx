"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/inotek/Img";

export type ProjectItem = {
  slug: string;
  title: string;
  tag: string;
  desc: string;
  image: string;
  filters: string[];
};

const FILTERS = [
  { label: "All Works", value: "*" },
  { label: "Designing", value: ".design" },
  { label: "Development", value: ".development" },
  { label: "Business", value: ".business" },
];

type IsotopeInstance = { arrange: (opts: { filter: string }) => void; destroy: () => void };

/** Isotope masonry + filtering on `.grid-item` children (template: masonryIsotope()). */
function useIsotopeFilter() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<IsotopeInstance | null>(null);
  const [active, setActive] = useState("*");

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    let destroyed = false;

    Promise.all([import("isotope-layout"), import("imagesloaded")]).then(([{ default: Isotope }, { default: imagesLoaded }]) => {
      imagesLoaded(grid, () => {
        if (destroyed) return;
        isoRef.current = new Isotope(grid, {
          itemSelector: ".grid-item",
          filter: "*",
          layoutMode: "masonry",
          transitionDuration: "0.8s",
        }) as IsotopeInstance;
      });
    });

    return () => {
      destroyed = true;
      isoRef.current?.destroy();
      isoRef.current = null;
    };
  }, []);

  const filter = (value: string) => {
    setActive(value);
    isoRef.current?.arrange({ filter: value });
  };

  return { gridRef, active, filter };
}

function FilterButtons({ active, filter, allLabel }: { active: string; filter: (v: string) => void; allLabel: string }) {
  return (
    <div className="project-filter-buttons mb-40 mt-35">
      <ul className="menu-filtering">
        {FILTERS.map((f) => (
          <li
            key={f.value}
            className={active === f.value ? "active" : undefined}
            data-filter={f.value}
            role="button"
            tabIndex={0}
            onClick={() => filter(f.value)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && filter(f.value)}
          >
            {" "}
            {f.value === "*" ? allLabel : f.label}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Home page project section: filter + tall cards. */
export function ProjectGrid({ projects }: { projects: ProjectItem[] }) {
  const { gridRef, active, filter } = useIsotopeFilter();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-wrap three text-center">
              <div className="sub-title-2 text-theme">
                <i className="fa-solid fa-circle-check" />
                Projects
              </div>
              <h2 className="sec-title">
                We’ve successfully completed
                <br />
                the creative projects
              </h2>
            </div>
            <FilterButtons active={active} filter={filter} allLabel="All Works" />
          </div>
        </div>
      </div>
      <div className="container-fluid px-60 ml-px-15 xxl-px-50">
        <div ref={gridRef} className="row gy-30 image_load">
          {projects.map((p) => (
            <div key={p.slug} className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item ${p.filters.join(" ")}`}>
              <div className="tv-project-single-box">
                <div className="image-wrapper">
                  <Img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <div className="project-info">
                  <span className="tag">{p.tag}</span>
                  <h3 className="title">
                    <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <div className="border mb-20" />
                  <p>{p.desc}</p>
                  <div className="icon-box">
                    <Link href={`/projects/${p.slug}`} className="hover-icon" aria-label={`View ${p.title}`}>
                      <i className="fa-regular fa-arrow-up-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export type CaseStudyItem = { slug: string; title: string; tag: string; date: string; image: string; filters: string[] };

/** Projects page grid (`.tv-project-section.inner`): filter + wide case-study cards. */
export function CaseStudyGrid({ projects }: { projects: CaseStudyItem[] }) {
  const { gridRef, active, filter } = useIsotopeFilter();

  return (
    <>
      <FilterButtons active={active} filter={filter} allLabel="All Case" />
      <div ref={gridRef} className="row gy-40 image_load">
        {projects.map((p) => (
          <div key={p.slug} className={`col-lg-4 col-md-6 col-sm-6 grid-item ${p.filters.join(" ")}`}>
            <div className="project-single-box">
              <div className="thumb">
                <Img className="img" src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="project-info">
                <h4 className="title">
                  <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                </h4>
                <div className="project-badge">
                  <span>{p.tag}</span> <span>{p.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
