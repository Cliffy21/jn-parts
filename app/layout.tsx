import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JN Parts & Accessories | Premium Vehicle Parts Kenya",
  description:
    "Transform your vehicle with premium parts, wraps, and accessories. Professional installation and top quality products.",
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
