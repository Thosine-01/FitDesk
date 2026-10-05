import type { Metadata } from "next";
import { seo, site } from "./content";
import { ogSize } from "./og-size";

/**
 * Open Graph for a sub-page. Setting `openGraph` on a page replaces the
 * layout's, so the shared card image and site fields are re-applied here.
 */
export function pageOpenGraph(
  path: string,
  title: string,
  description: string,
): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: site.name,
    locale: seo.locale,
    url: path,
    title,
    description,
    images: [{ url: "/opengraph-image", ...ogSize, alt: seo.ogAlt }],
  };
}
