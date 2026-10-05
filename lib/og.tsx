import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "./brand";
import { hero, seo, site } from "./content";
import { siteHost } from "./site";

export { ogSize } from "./og-size";
import { ogSize } from "./og-size";

/**
 * The link-preview card. This is what an owner sees when the link is
 * forwarded on WhatsApp, so it carries the logo, the headline and the
 * positioning on the brand background. Flat colours keep it far under 300 KB.
 */
export async function renderOgImage() {
  const [medium, bold] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Inter-500.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Inter-700.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: brand.bgDark,
        backgroundImage: `radial-gradient(circle at 92% 8%, rgba(52,209,134,.22), rgba(52,209,134,0) 46%)`,
        color: brand.textOnDark,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: brand.accentBright,
          }}
        />
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.2 }}>
          {site.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -3.6,
          }}
        >
          {hero.headline.before.trim()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -3.6,
          }}
        >
          <span style={{ color: brand.accentBright }}>
            {hero.headline.highlight}
          </span>
          <span>{hero.headline.after}</span>
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            fontWeight: 500,
            color: brand.textOnDarkSec,
            letterSpacing: -0.5,
          }}
        >
          {seo.ogLine}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: `1px solid ${brand.borderOnDark}`,
          fontSize: 26,
          fontWeight: 500,
          color: brand.textOnDarkMuted,
        }}
      >
        <div>{seo.ogCities}</div>
        <div>{siteHost}</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: medium, weight: 500, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
