import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default is 1mb; project cover images need more headroom.
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
