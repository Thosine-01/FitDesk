import type { Metadata } from "next";
import { seo, site } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { MobileCta } from "@/components/layout/MobileCta";
import { Commitment } from "@/components/sections/Commitment";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Screens } from "@/components/sections/Screens";
import { Segments } from "@/components/sections/Segments";
import { ValueBar } from "@/components/sections/ValueBar";
import { EarlyAccessForm } from "@/components/ui/EarlyAccessForm";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// SoftwareApplication. No `offers`: no prices are published on this page.
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: seo.appCategory,
  operatingSystem: "Web",
  description: seo.description,
  url: siteUrl,
  provider: {
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    email: site.email,
  },
};

export default function Home() {
  return (
    <main>
      <JsonLd data={appJsonLd} />
      <Hero />
      <ValueBar />
      <Segments />
      <HowItWorks />
      <Screens />
      <Features />
      <Commitment />
      <Faq />
      <FinalCta form={<EarlyAccessForm />} />
      <MobileCta />
    </main>
  );
}
