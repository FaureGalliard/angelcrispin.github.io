import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",

      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      }
    ],
  },
};

export default nextConfig;