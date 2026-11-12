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
            ? "border-b border-[#34373D] bg-[#08090B]/80 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl" 
            : "bg-transparent py-5"
        }`}>
          
          <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
            
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="group relative z-10 -ml-3 flex items-center justify-center overflow-visible md:-ml-4"
              style={{ width: "220px" }}
            >
              <div className="absolute inset-0 rounded-full bg-[#FF1616]/10 blur-[50px] opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative flex h-full w-full items-center justify-center">
                <Image
                  src="/1.png"
                  alt="JN Parts & Accessories"
                  width={400}
                  height={400}
                  className={`w-auto object-contain brightness-110 contrast-125 transition-all duration-500 ${scrolled ? "h-10 scale-[2.1] lg:h-12" : "h-14 scale-[2.2] lg:h-16"}`}
                  priority
                />
              </div>
            </button>

            <div className="hidden items-center gap-1 rounded-full border border-[#34373D] bg-[#111317]/80 px-2 py-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-md lg:flex">
              {sections.map((s) => {
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                      isActive ? "text-[#F7F8FD]" : "text-[#A5A8AE] hover:text-[#F7F8FD]"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 -z-10 rounded-full bg-[#FF1616] shadow-[0_0_18px_rgba(255,22,22,0.35)]" />
                    )}
                    {s.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:block">
              <button
                type="button"
                onClick={() => scrollToSection("blog")}
                className="rounded-xl bg-gradient-to-r from-[#FF1616] to-[#D90F0F] px-6 py-2.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(255,22,22,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(255,22,22,0.35)]"
              >
                OUR BLOG
              </button>
            </div>

            <button
              ref={menuButtonRef}
              className="rounded-xl border border-[#34373D] bg-[#111317]/80 p-3 text-[#F7F8FD] lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-7 w-7" />
            </button>
          </nav>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 z-[60] bg-[#08090B]/95 backdrop-blur-xl transition-all duration-500 ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-full min-h-0 flex-col p-8">
          <div className="mb-12 flex shrink-0 items-center justify-between">
            <Image src="/1.png" alt="Logo" width={180} height={60} className="h-12 w-auto object-contain" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="p-3 text-[#F7F8FD]"
              aria-label="Close menu"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          <nav className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto">
            {sections.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="group flex items-center justify-between text-left text-3xl font-black text-[#F7F8FD]"
              >
                <span className={activeSection === s.id ? "text-[#FF1616]" : ""}>{s.label}</span>
                <ChevronRight className="h-8 w-8 shrink-0 text-[#FF1616] opacity-0 transition-all group-hover:opacity-100" />
              </button>
            ))}
          </nav>

          <div className="mt-8 flex shrink-0 flex-col gap-3 border-t border-[#34373D] pt-8">
            <button
              type="button"
              onClick={() => scrollToSection("blog")}
              className="w-full rounded-2xl bg-gradient-to-r from-[#FF1616] to-[#D90F0F] py-4 text-lg font-black text-white shadow-[0_16px_30px_rgba(255,22,22,0.22)] transition-colors"
            >
              OUR BLOG
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#34373D] bg-[#111317] py-4 text-lg font-bold text-[#F7F8FD] transition-colors hover:border-[#FF1616]/50 hover:bg-[#1a1d23]"
            >
              <Sparkles className="h-5 w-5 text-[#FF1616]" />
              GET A QUOTE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}