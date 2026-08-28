import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-a3549df401e3480c9835e8f4f29d0855.r2.dev",
      },
    ],
  },
};

export default nextConfig;
