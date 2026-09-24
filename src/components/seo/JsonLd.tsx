"use strict";
import React from "react";
import { siteConfig } from "@/config/site";

export const JsonLd: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/assets/images/logo/logo.png`,
        description: siteConfig.description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Islamabad",
          addressCountry: "PK",
        },
        sameAs: [
          siteConfig.social.facebook,
          siteConfig.social.twitter,
          siteConfig.social.linkedin,
          siteConfig.social.github,
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        image: `${siteConfig.url}/assets/images/hero/hm5-img01.webp`,
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
