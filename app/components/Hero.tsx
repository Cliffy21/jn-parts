
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const carSlides = [
  {
    url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=85",
    alt: "Premium red performance sports car",
    brand: "PERFORMANCE PARTS",
  },
  {
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85",
    alt: "Luxury Porsche sports car",
    brand: "LUXURY ACCESSORIES",
  },
  {
    url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=85",
    alt: "Premium BMW performance vehicle",
    brand: "PREMIUM QUALITY",
  },
  {
    url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=85",
    alt: "Mercedes performance vehicle",
    brand: "EXPERT SERVICE",
  },
  {
    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=85",
    alt: "Chevrolet performance sports car",
    brand: "AUTOMOTIVE EXCELLENCE",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[700px] h-screen max-h-[1100px] w-full items-center overflow-hidden bg-[#08090B] text-white"
    >
      {/* CINEMATIC BACKGROUND SLIDER */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 7 } }}
            className="absolute inset-0"
          >
            <Image
              src={carSlides[currentSlide].url}
              alt={carSlides[currentSlide].alt}
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* DARK CINEMATIC OVERLAYS */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B] via-[#08090B]/85 to-[#08090B]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-[#08090B]/60" />

        {/* SUBTLE RED BRAND ACCENT */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF1616] to-transparent opacity-70" />
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16 xl:px-20 transition-all duration-1000 ${
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-12">

          {/* LEFT CONTENT */}
          <div className="max-w-3xl">

            {/* BRAND EYEBROW */}
            <div className="mb-7 flex items-center gap-4">
              <span className="h-[2px] w-10 bg-[#FF1616]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75 sm:text-xs">
                JN PARTS & ACCESSORIES
              </span>

              <span className="h-[2px] w-10 bg-white/30" />
            </div>

            {/* MAIN HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-7 text-[48px] font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px]"
            >
              <span className="block text-[#F7F8FD]">
                PREMIUM
              </span>

              <span className="mt-2 block text-[#FF1616]">
                AUTO STYLING
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-9 max-w-xl text-sm font-normal leading-7 tracking-wide text-[#C0C2C7] sm:text-base md:text-lg"
            >
              Car wraps, PPF, detailing and accessories built for drivers who want more presence on the road.
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              {/* PRIMARY BUTTON */}
              <button
                onClick={() => scrollTo("products")}
                className="group inline-flex items-center justify-center gap-4 bg-[#FF1616] px-8 py-[17px] text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#D90F0F] hover:-translate-y-1"
              >
                Explore Products

                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7-7 7 7-7 7"
                  />
                </svg>
              </button>

              {/* SECONDARY BUTTON */}
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center justify-center gap-3 border border-white/40 bg-white/[0.04] px-8 py-[17px] text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#FF1616] hover:bg-[#FF1616]/10"
              >
                Get a Quote

                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M7 17 17 7M7 7h10v10"
                  />
                </svg>
              </button>
            </motion.div>

            {/* BRAND SERVICES STRIP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6"
            >
              {["CAR WRAPS", "PPF PROTECTION", "AUTO ACCESSORIES"].map(
                (item, index) => (
                  <div key={item} className="flex items-center gap-6">
                    <span className="text-[9px] font-semibold tracking-[0.17em] text-white/65 sm:text-[10px]">
                      {item}
                    </span>

                    {index !== 2 && (
                      <span className="h-1 w-1 rounded-full bg-[#FF1616]" />
                    )}
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* RIGHT SIDE SLIDE NAVIGATION */}
          <div className="hidden flex-col items-center gap-7 lg:flex">

            <div className="text-center">
              <span className="text-4xl font-bold tracking-tight text-white">
                0{currentSlide + 1}
              </span>

              <span className="ml-1 text-sm text-white/40">
                / 0{carSlides.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {carSlides.map((slide, index) => (
                <button
                  key={slide.brand}
                  onClick={() => goToSlide(index)}
                  aria-label={`View ${slide.brand}`}
                  className={`relative h-12 w-[3px] overflow-hidden transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-[#FF1616]"
                      : "bg-white/25 hover:bg-white/60"
                  }`}
                >
                  {currentSlide === index && (
                    <motion.div
                      layoutId="active-slide"
                      className="absolute inset-0 bg-[#FF1616]"
                    />
                  )}
                </button>
              ))}
            </div>

            <span className="text-[9px] font-semibold tracking-[0.25em] text-white/40 [writing-mode:vertical-rl]">
              {carSlides[currentSlide].brand}
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE INDICATORS */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 lg:hidden">
        {carSlides.map((slide, index) => (
          <button
            key={slide.brand}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-[3px] transition-all duration-300 ${
              currentSlide === index
                ? "w-9 bg-[#FF1616]"
                : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-9 right-8 hidden items-center gap-3 xl:flex">
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
          Scroll to explore
        </span>

        <div className="h-10 w-[1px] bg-white/20">
          <motion.div
            animate={{ height: ["0%", "100%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full bg-[#FF1616]"
          />
        </div>
      </div>
    </section>
  );
}
