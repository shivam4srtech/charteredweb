import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes plain HTML/CSS/JS to `out/`, which any web server
 * (InMotion / Apache) can serve — no Node.js process needed on the server.
 * URL redirects for old addresses live in public/.htaccess.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
