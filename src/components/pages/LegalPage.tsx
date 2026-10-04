import type { ReactNode } from "react";
import { PageBreadcrumb } from "@/components/inotek/PageBreadcrumb";
import { NewsletterBox } from "@/components/home/NewsletterBox";

type LegalPageProps = {
  title: string;
  updated: string;
  sections: { heading: string; body: ReactNode }[];
};

/** Privacy policy / terms pages, styled like the template's article card (blog-details.html). */
export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <div className="inotek">
      <div className="page-wrapper bg-light">
        <PageBreadcrumb title={title} trail={[{ name: title }]} />
        <section className="blog-details-section space bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-9 col-lg-10">
                <article className="blog-list-card style-2">
                  <div className="card-content">
                    <span className="category">Last updated: {updated}</span>
                    {sections.map((s, i) => (
                      <div key={s.heading}>
                        <h2 className={`title h3 ${i ? "mt-45" : "mt-20"} mb-10`}>{s.heading}</h2>
                        <p className="text">{s.body}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        <NewsletterBox />
      </div>
    </div>
  );
}
