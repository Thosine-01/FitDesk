import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback. Low qualities keep the 1.4 MB budget on 3G.
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
