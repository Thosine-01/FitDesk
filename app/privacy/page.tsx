import type { Metadata } from "next";
import { legal } from "@/lib/content";
import { pageOpenGraph } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";

const copy = legal.privacy;

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  alternates: { canonical: "/privacy" },
  openGraph: pageOpenGraph("/privacy", copy.title, copy.description),
};

export default function Page() {
  return (
    <LegalPage title={copy.title} intro={copy.intro} sections={copy.sections} />
  );
}
