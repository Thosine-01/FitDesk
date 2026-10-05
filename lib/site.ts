/** Absolute site origin, used for metadataBase, canonical, sitemap and JSON-LD. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://fitdesk.ng"
).replace(/\/$/, "");

export const siteHost = new URL(siteUrl).host;
