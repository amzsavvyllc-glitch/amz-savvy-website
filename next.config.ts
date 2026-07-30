import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export — `next build` writes a plain folder of HTML/CSS/JS to
   * ./out that uploads to Hostinger exactly like the old single-file site.
   * No Node server required on the host.
   */
  output: "export",
  images: {
    // Required for static export: no server to run the optimizer.
    unoptimized: true,
  },
  // Hostinger serves /path/ as /path/index.html
  trailingSlash: true,
};

export default nextConfig;
