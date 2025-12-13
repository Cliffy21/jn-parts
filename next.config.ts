import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Vercel is expecting build artifacts in `Next.js/`
  // (e.g. `/vercel/path0/Next.js/routes-manifest.json`).
  // Align Next.js build output directory with that expectation.
  distDir: "Next.js",

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

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ];
  },
};

export default nextConfig;
