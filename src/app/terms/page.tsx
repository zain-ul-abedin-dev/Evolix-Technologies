import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service - Evolix Technologies",
  description: "Terms and conditions governing the software engineering and IT consulting services provided by Evolix Technologies.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const email = siteConfig.contact.email;
  return (
    <LegalPage
      title="Terms of Service"
      updated="September 2026"
      sections={[
        {
          heading: "1. Acceptance of Terms",
          body: `By accessing this website or engaging ${siteConfig.name} for IT solutions and custom development, you agree to comply with and be bound by these Terms of Service.`,
        },
        {
          heading: "2. Intellectual Property",
          body: "All custom deliverables and source code developed for client projects become the exclusive property of the client upon fulfillment of contractual agreements.",
        },
        {
          heading: "3. Contact Information",
          body: (
            <>
              For legal inquiries, contact <a href={`mailto:${email}`}>{email}</a>.
            </>
          ),
        },
      ]}
    />
  );
}
