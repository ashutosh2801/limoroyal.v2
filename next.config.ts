import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,   // ← add this
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};
 
export default nextConfig;
