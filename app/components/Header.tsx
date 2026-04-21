"use client";

import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";
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
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setVisible(true);
        setScrolled(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
        setScrolled(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
        setScrolled(true);
      }
      setLastScrollY(currentScrollY);

      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      for (const { id, element } of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className={`transition-all duration-500 ${
          scrolled 
            ? "bg-black/80 backdrop-blur-2xl py-2 shadow-2xl border-b border-white/10" 
            : "bg-transparent py-5"
        }`}>
          
          <nav className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
            
            {/* --- LOGO SECTION --- */}
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="group relative z-10 flex items-center justify-center overflow-visible -ml-3 md:-ml-4"
              style={{ width: "220px" }}
            >
              <div className="absolute inset-0 bg-red-600/10 blur-[50px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative flex items-center justify-center w-full h-full">
                <Image
                  src="/1.png"
                  alt="JN Parts & Accessories"
                  width={400}
                  height={400}
                  className={`
                    w-auto object-contain transition-all duration-500
                    scale-[2.2] md:scale-[2.8]
                    brightness-110 contrast-125
                    ${scrolled ? "h-10 lg:h-12" : "h-14 lg:h-16"}
                  `}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none scale-150" />
              </div>
            </button>

            {/* --- DESKTOP NAV --- */}
            <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1 backdrop-blur-md">
              {sections.map((s) => {
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                      isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-red-600 rounded-full -z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                    )}
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* --- DESKTOP: OUR BLOG --- */}
            <div className="hidden lg:block">
              <button
                type="button"
                onClick={() => scrollToSection("blog")}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20"
              >
                OUR BLOG
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              ref={menuButtonRef}
              className="lg:hidden p-3 rounded-xl bg-white/10 border border-white/10 text-white"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </nav>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] transition-all duration-500 ${
          menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }`}
      >
        <div className="p-8 flex flex-col h-full min-h-0">
          <div className="flex justify-between items-center mb-12 shrink-0">
            <Image src="/1.png" alt="Logo" width={180} height={60} className="h-12 w-auto object-contain" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="p-3 text-white"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 flex-1 overflow-y-auto min-h-0">
            {sections.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="text-3xl font-black text-white text-left flex justify-between items-center group"
              >
                <span className={activeSection === s.id ? "text-red-600" : ""}>{s.label}</span>
                <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 text-red-600 transition-all shrink-0" />
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10 shrink-0 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("blog")}
              className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-black text-lg text-white shadow-lg shadow-red-600/20 transition-colors"
            >
              OUR BLOG
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="w-full border border-white/20 hover:border-red-500/50 hover:bg-white/5 py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3 transition-colors"
            >
              <Sparkles className="w-5 h-5 text-red-500" />
              GET A QUOTE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}