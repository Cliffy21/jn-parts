"use client";

import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Products", href: "#products" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@jn_parts_accesories?_r=1&_d=el5bciacmkkj6j&sec_uid=MS4wLjABAAAAlGis07agjJdlbhtcL6lb7FRrHNxZ-JbbZTudT07luZRBr7mDi7FIq_8WNpzvblom&share_author_id=7562451803967636491&sharer_language=en&source=h5_m&u_code=f02009ejjc3d9k&timestamp=1764701164&user_id=7562451803967636491&sec_user_id=MS4wLjABAAAAlGis07agjJdlbhtcL6lb7FRrHNxZ-JbbZTudT07luZRBr7mDi7FIq_8WNpzvblom&item_author_type=1&utm_source=more&utm_campaign=client_share&utm_medium=android&share_iid=7577600691825411896&share_link_id=8f51d3c9-e11e-4b55-8e99-6bacd9a9e638&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/jn_parts_accesories?igsh=MXE1ZThobmxoczZlZw%3D%3D&utm_source=qr",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/254741509156",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const contentRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  return (
    <footer className="relative bg-black border-t border-white/5">
      {/* Subtle gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 opacity-0"
        >
          {/* Brand Section */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                JN
              </span>
              <span className="text-white ml-1">Parts & Accessories</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Your trusted partner for premium vehicle parts and accessories in
              Kenya since 2018.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm text-gray-500 hover:text-white transition-colors duration-200"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+254741509156"
                className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4 h-4 text-red-500/70" />
                +254 741 509 156
              </a>
              <a
                href="mailto:jncarparts301@gmail.com"
                className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 text-red-500/70" />
                jncarparts301@gmail.com
              </a>
              <p className="flex items-center gap-3 text-gray-500">
                <MapPin className="w-4 h-4 text-red-500/70" />
                Kirinyaga Rd, Nairobi
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.name}
                  className={cn(
                    "w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center",
                    "text-gray-500 hover:bg-red-500/20 hover:text-red-400",
                    "transition-all duration-200"
                  )}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="mt-16 bg-white/5" />
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © 2025 JN Parts & Accessories. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <a
              href="#"
              className="hover:text-gray-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

