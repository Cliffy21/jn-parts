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
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;
      
      // Determine if header should be visible
      if (currentScrollY < 10) {
        // Always show at top
        setVisible(true);
        setScrolled(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setVisible(true);
        setScrolled(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down - hide header
        setVisible(false);
        setScrolled(true);
      }
      
      setLastScrollY(currentScrollY);
    }
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

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
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300 ${
          scrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-black/80 backdrop-blur-sm"
        } ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo - Clickable with Shimmer */}
          <button 
            onClick={() => scrollToSection("home")}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            aria-label="Go to home"
          >
            <Image 
              src="/1.png" 
              alt="JN Parts & Accessories" 
              width={380} 
              height={200}
              className="h-16 sm:h-20 w-auto relative z-10 transition-all duration-300 group-hover:scale-105"
              priority
            />
            {/* Shimmer overlay effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center text-sm">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="hover:text-red-500 transition-colors duration-200 font-medium"
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-4 bg-gradient-to-r from-red-500 to-orange-500 px-5 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-red-500/50"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile slide panel */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-black/95 backdrop-blur-md border-l border-white/10 z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            {/* Mobile Logo - Clickable with Shimmer */}
            <button 
              onClick={() => {
                setMenuOpen(false);
                scrollToSection("home");
              }}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              aria-label="Go to home"
            >
              <Image 
                src="/1.png" 
                alt="JN Parts & Accessories" 
                width={380} 
                height={200}
                className="h-16 w-auto relative z-10 transition-all duration-300 group-hover:scale-105"
              />
              {/* Shimmer overlay effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />
            </button>
            
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(s.id);
                }}
                className="text-left py-3 px-4 rounded-lg border-b border-white/5 hover:bg-white/5 hover:text-red-500 transition-all duration-200 font-medium"
              >
                {s.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                scrollToSection("contact");
              }}
              className="mt-6 bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-red-500/50"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}