import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "JN Car Accessories | Premium Car Wraps, PPF & Detailing",
  description:
    "JN Car Accessories offers high-quality car wraps, paint protection films, detailing, and premium automotive accessories.",
  keywords: [
    "car wraps",
    "paint protection film",
    "PPF",
    "detailing",
    "car accessories",
    "vehicle wraps",
    "automotive services",
  ],

  openGraph: {
    title: "JN Car Accessories",
    description:
      "Premium car wraps, PPF, tinting and automotive accessories.",
    url: "https://jncaraccessories.com",
    siteName: "JN Car Accessories",
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://jncaraccessories.com" />
      </head>
      <body className="bg-black text-white overflow-x-hidden antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
