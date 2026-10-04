import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Versioned by scripts/build-inotek-css.mjs (`?v=<hash>`), so they can be cached for a year.
        source: "/assets/:dir(css|fontawesome)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Images keep their file names when replaced: cache a week, then refresh in the background.
        source: "/:path((?:assets/images|assets/fonts)/.*|.*\.(?:svg|png|jpg|webp))",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
