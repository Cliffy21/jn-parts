"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;
      
      // Determine if header should be visible
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

      // Update active section based on scroll position
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

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <>
      {/* SEO-optimized header */}
      <header
        id="header"
        role="banner"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Glass-morphism background with gradient border */}
        <div className={`relative ${
          scrolled 
            ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-red-500/5" 
            : "bg-black/20 backdrop-blur-md border-b border-white/5"
        } transition-all duration-500`}>
          
          {/* Animated gradient line at top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating particles effect */}
          {scrolled && (
            <>
              <div className="absolute top-0 left-1/4 w-1 h-1 bg-red-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute top-0 right-1/3 w-1 h-1 bg-orange-500/30 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            </>
          )}

          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center relative">
            {/* Logo with premium hover effect */}
            <button 
              onClick={() => scrollToSection("home")}
              className="relative overflow-hidden rounded-xl cursor-pointer group z-10"
              aria-label="JN Parts & Accessories - Go to home"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-orange-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              <Image 
                src="/1.png" 
                alt="JN Parts & Accessories - Premium Automotive Parts" 
                width={380} 
                height={200}
                className="h-14 sm:h-16 lg:h-20 w-auto relative z-10 transition-all duration-500 group-hover:scale-110 drop-shadow-2xl"
                priority
              />
              
              {/* Premium shimmer overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />
              
              {/* Subtle border glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/20 rounded-xl transition-all duration-500" />
            </button>

            {/* Desktop Navigation with glass cards */}
            <nav className="hidden lg:flex gap-1 items-center" aria-label="Primary navigation">
              {sections.map((s) => {
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group ${
                      isActive 
                        ? "text-white" 
                        : "text-gray-300 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Glass background on hover/active */}
                    <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 shadow-lg shadow-red-500/20"
                        : "bg-white/0 group-hover:bg-white/5 backdrop-blur-sm border border-transparent group-hover:border-white/10"
                    }`} />
                    
                    {/* Text with relative positioning */}
                    <span className="relative z-10 tracking-wide">{s.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                    )}
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/0 via-red-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
                  </button>
                );
              })}
              
              {/* CTA Button with premium effects */}
              <button
                onClick={() => scrollToSection("contact")}
                className="ml-4 relative group overflow-hidden"
                aria-label="Get a quote for automotive parts"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-full transition-all duration-300 group-hover:scale-105" />
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-orange-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2 px-6 py-2.5 font-bold text-sm tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  Get Quote
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </nav>

            {/* Mobile Menu Button with glass effect */}
            <button
              className="lg:hidden relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Menu className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-xl bg-red-500/20 animate-ping opacity-0 group-hover:opacity-100" />
            </button>
          </nav>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </header>

      {/* Mobile menu overlay with blur */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      {/* Mobile slide panel with premium glass effect */}
      <aside
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm z-50 transform transition-all duration-500 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Mobile navigation menu"
        aria-modal="true"
      >
        {/* Glass panel background */}
        <div className="h-full bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl">
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 pointer-events-none" />
          
          <div className="p-6 flex flex-col h-full relative z-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
              {/* Mobile Logo */}
              <button 
                onClick={() => scrollToSection("home")}
                className="relative overflow-hidden rounded-xl cursor-pointer group"
                aria-label="JN Parts & Accessories - Go to home"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-orange-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                
                <Image 
                  src="/1.png" 
                  alt="JN Parts & Accessories" 
                  width={380} 
                  height={200}
                  className="h-14 w-auto relative z-10 transition-all duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />
              </button>
              
              {/* Close button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300 group"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2 flex-1 overflow-y-auto" aria-label="Mobile navigation">
              {sections.map((s, index) => {
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`relative text-left py-4 px-5 rounded-xl transition-all duration-300 group ${
                      isActive ? "text-white" : "text-gray-300"
                    }`}
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: menuOpen ? 'slideInRight 0.5s ease-out forwards' : 'none'
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Glass background */}
                    <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 shadow-lg shadow-red-500/20"
                        : "bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20"
                    }`} />
                    
                    {/* Content */}
                    <span className="relative z-10 flex items-center justify-between font-medium tracking-wide">
                      {s.label}
                      <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? "text-red-500 translate-x-1" : "text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                      }`} />
                    </span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-r-full shadow-lg shadow-red-500/50" />
                    )}
                  </button>
                );
              })}
              
              {/* CTA Button */}
              <button
                onClick={() => scrollToSection("contact")}
                className="mt-6 relative group overflow-hidden rounded-xl"
                aria-label="Get a quote for automotive parts"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-xl transition-all duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-4 font-bold tracking-wide">
                  <Sparkles className="w-5 h-5" />
                  Get Quote
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </nav>

            {/* Footer info */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 text-center">
                Premium Automotive Parts & Accessories
              </p>
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}