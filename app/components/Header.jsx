"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "products", label: "Products" },
  { id: "portfolio", label: "Portfolio" },
  { id: "testimonials", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-colors duration-300 ${
          scrolled ? "bg-black/95 backdrop-strong" : "bg-black/80 backdrop-strong"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="animate-gradient">JN parts & accessories</span>
          </div>
          <div className="hidden md:flex gap-6 items-center text-sm">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="hover:text-red-500 transition-colors"
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-4 bg-gradient-to-r from-red-500 to-orange-500 px-5 py-2 rounded-full font-semibold text-sm hover:scale-105"
            >
              Get Quote
            </button>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 opacity-0 pointer-events-none transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile slide panel */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-black/95 border-l border-white/10 z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold animate-gradient">
              JN parts & accessories
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(s.id);
                }}
                className="text-left py-2 border-b border-white/10 hover:text-red-500"
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                scrollToSection("contact");
              }}
              className="mt-4 bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 rounded-full font-semibold"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
