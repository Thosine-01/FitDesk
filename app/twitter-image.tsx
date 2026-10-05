import { seo } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = seo.ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
