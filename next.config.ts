import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to ./out,
// which any free static host (Cloudflare Pages, Netlify, GitHub Pages) can serve.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
