import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow blob: URLs for client-side image preview
    dangerouslyAllowSVG: true,
    remotePatterns: [],
    // Let Next.js serve locally uploaded files from /public/uploads
    unoptimized: false,
  },
  experimental: {
    // Required to allow blob: URLs via URL.createObjectURL in next/image
    // We use `unoptimized` prop on the preview <Image> instead
  },
};

export default nextConfig;
