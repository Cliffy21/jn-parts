"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";
import { cn } from "@/lib/utils";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Animation refs for text elements
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const contentRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [statsVisible, setStatsVisible] = useState(false);

  // Parallax Logic
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1) relative to viewport
        if (rect.top <= viewHeight && rect.bottom >= 0) {
          const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
          setScrollY(progress);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats Logic (Simplified for brevity)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Run stats counter when visible
  useEffect(() => {
    if (!statsVisible) return;
    statsRef.current.forEach((el) => {
      if (!el) return;
      const target = parseInt(el.dataset.target || "0");
      let start = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          el.innerText = target.toString() + (el.dataset.suffix || "");
          clearInterval(timer);
        } else {
          el.innerText = Math.ceil(start).toString() + (el.dataset.suffix || "");
        }
      }, 30);
    });
  }, [statsVisible]);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative w-full min-h-[800px] flex items-center overflow-hidden py-20"
    >
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 w-full h-[120%]"
          style={{
            // Parallax transform: Moves slower than scroll
            transform: `translateY(${scrollY * -100}px)`, 
            transition: 'transform 0.1s linear',
          }}
        >
          {/* High-res car engine/detail shot from Unsplash */}
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2832&auto=format&fit=crop"
            alt="Engine Detail Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* --- OVERLAYS --- */}
        {/* 1. Darkens the whole image */}
        <div className="absolute inset-0 bg-black/60" />
        {/* 2. Gradient from left to right to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        {/* 3. Gradient from bottom for mobile fading */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Text Content */}
          <div className="max-w-2xl">
            {/* Small Badge */}
            <div 
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-widest mb-6",
                statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 transition-all duration-700"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Premium Quality
            </div>

            <div ref={titleRef} className="opacity-0">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                ENGINEERED FOR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  PERFECTION
                </span>
              </h2>
            </div>

            <div ref={contentRef} className="opacity-0 space-y-6 text-gray-300 text-lg md:text-xl font-light">
              <p>
                JN Parts & Accessories isn't just about spare parts; it's about the <strong className="text-white">heartbeat of your vehicle.</strong> We source components that meet the rigorous demands of modern automotive engineering.
              </p>
              <p>
                Whether you are upgrading for performance or maintaining reliability, our certified inventory ensures your journey never stops.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#catalog" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 text-center">
                  View Catalog
                </a>
                <a href="#contact" className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white hover:text-black text-white font-bold rounded-lg transition-all text-center backdrop-blur-sm">
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Stats Grid - Floating on the right (or bottom on mobile) */}
          <div className="flex flex-col justify-end lg:justify-center">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { val: "1000", suffix: "+", label: "Happy Clients" },
                { val: "5000", suffix: "+", label: "Parts Sold" },
                { val: "15", suffix: "Yrs", label: "Experience" },
                { val: "100", suffix: "%", label: "Genuine" },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl hover:border-red-500/50 transition-all duration-500",
                    statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <h3 
                    ref={el => { statsRef.current[idx] = el }}
                    data-target={item.val}
                    data-suffix={item.suffix}
                    className="text-3xl md:text-4xl font-bold text-white mb-1"
                  >
                    0
                  </h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}