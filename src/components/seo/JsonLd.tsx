import React from "react";
import { siteConfig } from "@/config/site";

export const JsonLd: React.FC = () => {
  const sameAs = Object.values(siteConfig.social).filter((url) => /^https?:\/\/[^/]+\/.+/.test(url));
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/evolix-logo.png`,
        image: `${siteConfig.url}/og-image.jpg`,
        description: siteConfig.description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Islamabad",
          addressCountry: "PK",
        },
        // Only real profile URLs: placeholders like "https://facebook.com" would tell Google the
        // company *is* facebook.com. Fill in the profile links in src/config/site.ts.
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        image: `${siteConfig.url}/og-image.jpg`,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        priceRange: "$$",
        telephone: siteConfig.contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Islamabad",
          addressLocality: "Islamabad",
          addressRegion: "ICT",
          addressCountry: "PK",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:30",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
