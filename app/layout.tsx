import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { RevealProvider } from "@/components/ui/Reveal";
import { brand } from "@/lib/brand";
import { seo, site } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Inter for everything. Variable, with the optical-size axis loaded so
// headings get Inter's display cut (`font-variation-settings: 'opsz' 32`).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s — ${site.name}` },
  description: seo.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: seo.locale,
    url: "/",
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

// viewport-fit=cover so the sticky mobile CTA can pad for the home indicator.
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: brand.bgDark,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
        <RevealProvider />
      </body>
    </html>
  );
}
