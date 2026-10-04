// Article bodies for the blog detail pages, keyed by the slugs in src/config/site.ts.

export type BlogArticle = {
  intro: string[];
  sections: { heading: string; text: string }[];
  quote: { text: string; author: string };
  list: string[];
};

export const blogContent: Record<string, BlogArticle> = {
  "top-seo-marketing-strategies-2026": {
    intro: [
      "Search has changed. Google now rewards pages that load instantly, answer the searcher's real question and prove expertise. Ranking in 2026 is less about tricks and more about building a fast, well-structured website that people genuinely want to use.",
      "Below are the technical SEO strategies we apply on every client website at Evolix Technologies, from Islamabad start-ups to international brands.",
    ],
    sections: [
      {
        heading: "Core Web Vitals Come First",
        text: "Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift are confirmed ranking signals. Serve HTML from the server, compress and size images properly, reserve space for media and keep JavaScript lean. A page that renders in under two seconds wins both rankings and conversions.",
      },
      {
        heading: "Structured Data and Search Intent",
        text: "Schema.org markup for your organisation, services, articles and breadcrumbs helps search engines understand your pages and unlocks rich results. Pair it with content mapped to search intent: one clear topic per page, answered better than any competitor.",
      },
    ],
    quote: { text: "The fastest, clearest answer to the searcher's question is what ranks. Everything else is detail.", author: "Evolix SEO Team" },
    list: ["Audit Core Web Vitals monthly", "Add schema to every key page", "Build topical authority with helpful content"],
  },
  "building-scalable-saas-nextjs": {
    intro: [
      "A SaaS product has to stay fast when it grows from ten users to a hundred thousand. Next.js gives us a strong foundation for that: server components, smart caching and edge delivery out of the box.",
      "This is how we architect SaaS platforms that scale without rewrites.",
    ],
    sections: [
      {
        heading: "Server Components and Caching",
        text: "Rendering on the server sends less JavaScript to the browser and keeps pages fast on any device. Combined with static generation for marketing pages and fine-grained caching for dashboards, most requests never touch the database at all.",
      },
      {
        heading: "Database and Infrastructure",
        text: "Connection pooling, read replicas and background queues keep the database healthy under load. Automated CI/CD pipelines, preview deployments and monitoring mean every release is tested, reversible and observable.",
      },
    ],
    quote: { text: "Scalability is a design decision you make on day one, not a fix you add later.", author: "Evolix Engineering" },
    list: ["Render on the server by default", "Cache aggressively, invalidate precisely", "Automate testing and deployments"],
  },
  "modern-ui-ux-design-principles": {
    intro: [
      "Good interfaces feel effortless. Small details such as hover feedback, smooth transitions and clear focus states tell users that the product is responding to them, and that builds trust.",
      "Here are the interaction design principles our UI/UX team uses to turn visitors into customers.",
    ],
    sections: [
      {
        heading: "Motion With a Purpose",
        text: "Every animation should explain something: where an element came from, what changed, or what can be clicked. Keep micro-interactions short, use consistent easing and always respect the reduced-motion preference.",
      },
      {
        heading: "Accessible by Default",
        text: "Readable contrast, keyboard navigation, visible focus and descriptive labels help every user, and they also help search engines understand your page. Accessibility is part of good design, not an extra step.",
      },
    ],
    quote: { text: "Design is not only how it looks. It is how quickly a user reaches their goal.", author: "Evolix Design Team" },
    list: ["Give feedback on every action", "Keep transitions under 300ms", "Design for keyboard and screen readers"],
  },
};
