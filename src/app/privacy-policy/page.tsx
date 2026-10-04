import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy - Evolix Technologies",
  description: "Read our privacy policy detailing how Evolix Technologies protects client confidentiality and data security.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const email = siteConfig.contact.email;
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2026"
      sections={[
        {
          heading: "1. Introduction",
          body: `${siteConfig.name} ("we", "our", or "us") is committed to protecting your privacy and confidential intellectual property. This Privacy Policy outlines our practices regarding information collected via our website and services.`,
        },
        {
          heading: "2. Data Collection & Use",
          body: "We only collect information voluntarily provided by you through our contact and newsletter forms (such as name, email, phone number and project requirements) strictly to respond to inquiries and provide consulting services. We never sell, rent, or distribute personal information to third parties.",
        },
        {
          heading: "3. Contact & Inquiries",
          body: (
            <>
              If you have questions regarding this policy, contact us at <a href={`mailto:${email}`}>{email}</a>.
            </>
          ),
        },
      ]}
    />
  );
}
