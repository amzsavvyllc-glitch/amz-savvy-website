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
  experimental: {
    /**
     * Inline the Tailwind CSS into a <style> tag in <head> instead of a
     * render-blocking <link>. Removes the HTML→discover-CSS→fetch waterfall
     * that cost ~700ms of the answer-page LCP (SEO audit #04). Right trade-off
     * here: atomic CSS is small, and our traffic is first-visit-heavy (search
     * and AI-answer entry points), so the cached-stylesheet benefit we give up
     * rarely applies.
     */
    inlineCss: true,
  },
};

export default nextConfig;
