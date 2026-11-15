import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a verification build run in a separate folder without touching the
  // running dev server's .next directory.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      // Old Mongolian-only URLs from the first version of the site.
      { source: "/aimag/:slug", destination: "/mn/province/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
