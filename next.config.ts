import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
