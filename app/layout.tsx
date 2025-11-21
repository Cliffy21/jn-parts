export const metadata = {
  title: "JN Parts & Accessories | Premium Vehicle Parts Kenya",
  description:
    "Transform your vehicle with premium parts, wraps, and accessories. Professional installation and top quality products.",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
