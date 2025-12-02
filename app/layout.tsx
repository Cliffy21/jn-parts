import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JN Parts & Accessories | Premium Vehicle Parts Kenya",
  description:
    "Transform your vehicle with premium parts, wraps, and accessories. Professional installation and top quality products.",
  icons: {
    // Use the favicon assets from the public/ folder
    icon: [
      { url: '/favicon.ico', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}