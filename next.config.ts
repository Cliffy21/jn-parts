import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: ["192.168.0.101", "192.168.0.102", "localhost", "127.0.0.1"],

  // Only proxy a dedicated backend path in local dev (never hijack /api/upload).
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }

    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
      return [];
    }

    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
