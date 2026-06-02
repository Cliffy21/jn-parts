import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },

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
