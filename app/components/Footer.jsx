"use client";

import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

export default function Footer() {
  const contentRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  return (
    <footer className="border-t border-white/10 py-10 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div ref={contentRef} className="grid md:grid-cols-4 gap-8 mb-8 text-sm opacity-0">
          <div>
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              JN parts & accessories
            </h3>
            <p className="text-gray-400">
              Your trusted partner for premium vehicle parts and accessories in
              Kenya.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-3">Quick Links</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#about" className="hover:text-red-500">
                About Us
              </a>
              <br />
              <a href="#services" className="hover:text-red-500">
                Services
              </a>
              <br />
              <a href="#products" className="hover:text-red-500">
                Products
              </a>
              <br />
              <a href="#contact" className="hover:text-red-500">
                Contact
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-3">Contact Info</h4>
            <div className="space-y-1 text-gray-400">
              <p>+254741509156 || +254707447238</p>
              <p>jncarparts301@gmail.com</p>
              <p>Kirinyaga road, Nairobi, Kenya</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 cursor-pointer">
                f
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 cursor-pointer">
                in
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 cursor-pointer">
                X
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 text-center text-gray-500 text-xs">
          © 2025 JN parts & accessories. Premium Vehicle Parts & Accessories
          Specialists. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
