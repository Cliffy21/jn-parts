"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

// Car images from Unsplash - different colors and brands
const carSlides = [
  {
    url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80",
    alt: "Red Ferrari sports car",
    brand: "Performance Parts",
  },
  {
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
    alt: "Porsche 911 silver",
    brand: "Luxury Accessories",
  },
  {
    url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=80",
    alt: "BMW M4 blue",
    brand: "Premium Quality",
  },
  {
    url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80",
    alt: "Mercedes AMG GT",
    brand: "Expert Service",
  },
  {
    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80",
    alt: "Chevrolet Corvette yellow",
    brand: "American Muscle",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [displayedDesc, setDisplayedDesc] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showDescCursor, setShowDescCursor] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const fullText1 = "TRANSFORM";
  const fullText2 = "YOUR RIDE";
  const fullDesc =
    "Premium Vehicle Parts & Accessories · Quality Guaranteed · Expert Installation";

  // Auto-slide functionality
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % carSlides.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  // Typing animation
  useEffect(() => {
    let currentIndex = 0;
    let isFirstLine = true;
    let isSecondLine = false;
    let isDescription = false;

    const typingInterval = setInterval(() => {
      if (isFirstLine) {
        if (currentIndex < fullText1.length) {
          setDisplayedText(fullText1.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          isFirstLine = false;
          isSecondLine = true;
          currentIndex = 0;
        }
      } else if (isSecondLine) {
        if (currentIndex < fullText2.length) {
          setDisplayedText2(fullText2.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          isSecondLine = false;
          isDescription = true;
          currentIndex = 0;
          setShowCursor(false);
          setShowDescCursor(true);
        }
      } else if (isDescription) {
        if (currentIndex < fullDesc.length) {
          setDisplayedDesc(fullDesc.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setShowDescCursor(false), 2000);
        }
      }
    }, 80);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
      setShowDescCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Initial load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] max-h-[1200px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Sliding Background Images */}
      <div className="absolute inset-0">
        {carSlides.map((slide, index) => (
          <motion.div
            key={index}
            style={{ 
              y: index === currentSlide ? y1 : 0,
              opacity: index === currentSlide ? opacity : 0,
              scale: index === currentSlide ? 1 : 1.05
            }}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            } ${isTransitioning ? "blur-sm" : "blur-0"}`}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-transparent to-black/90" />

        {/* Animated accent lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60" />
        <div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 transition-all duration-1000 ${
            isLoaded ? "w-full" : "w-0"
          }`}
        />
      </div>

      {/* Slide brand indicator */}
      <div
        className={`absolute top-24 sm:top-28 md:top-32 right-4 sm:right-8 md:right-12 z-20 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        <span className="text-xs sm:text-sm tracking-[0.3em] text-red-400 font-light uppercase">
          {carSlides[currentSlide].brand}
        </span>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div 
            style={{ y: y2 }}
            className="text-center lg:text-left flex-1 max-w-2xl"
          >
            {/* Decorative element */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-red-500 to-orange-500" />
              <span className="text-xs sm:text-sm tracking-[0.2em] text-gray-400 uppercase font-light">
                Since 2010
              </span>
              <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-orange-500 to-red-500" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-[0.95] tracking-tight">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
                {displayedText}
                {displayedText.length < fullText1.length && showCursor && (
                  <span className="inline-block w-[3px] sm:w-1 h-[0.85em] bg-red-500 ml-1 animate-pulse rounded-sm" />
                )}
              </span>
              <span className="block bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent mt-1 sm:mt-2">
                {displayedText2}
                {displayedText.length === fullText1.length &&
                  displayedText2.length < fullText2.length &&
                  showCursor && (
                    <span className="inline-block w-[3px] sm:w-1 h-[0.85em] bg-red-500 ml-1 animate-pulse rounded-sm" />
                  )}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 min-h-[50px] sm:min-h-[60px] font-light tracking-wide">
              {displayedDesc}
              {displayedText2.length === fullText2.length && showDescCursor && (
                <span className="inline-block w-[2px] h-[1em] bg-gray-400 ml-1 animate-pulse" />
              )}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start transition-all duration-1000 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-orange-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-2">
                  Browse Products
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 border-2 border-red-500/50 rounded-full group-hover:border-red-500 transition-colors" />
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 rounded-full transition-colors duration-300" />
                <span className="relative text-white">Get Free Quote</span>
              </button>
            </div>
          </motion.div>

          {/* Slide Navigation - Desktop */}
          <div
            className={`hidden lg:flex flex-col items-center gap-6 transition-all duration-1000 delay-700 ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Current slide number */}
            <div className="text-center">
              <span className="text-4xl xl:text-5xl font-black text-white">
                0{currentSlide + 1}
              </span>
              <span className="text-lg xl:text-xl text-gray-600 font-light">
                {" "}
                / 0{carSlides.length}
              </span>
            </div>

            {/* Vertical progress bars */}
            <div className="flex flex-col gap-2">
              {carSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative w-1 h-12 xl:h-16 bg-white/20 rounded-full overflow-hidden hover:bg-white/30 transition-colors"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-red-500 to-orange-500 rounded-full transition-all duration-500 ${
                      index === currentSlide ? "h-full" : "h-0 group-hover:h-1/3"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide Indicators */}
      <div
        className={`lg:hidden absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {carSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-gradient-to-r from-red-500 to-orange-500"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}   
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>



      {/* Corner Accents */}
      <div className="absolute top-20 left-4 sm:left-8 w-16 sm:w-24 h-16 sm:h-24 border-l-2 border-t-2 border-red-500/20 pointer-events-none" />
      <div className="absolute bottom-20 right-4 sm:right-8 w-16 sm:w-24 h-16 sm:h-24 border-r-2 border-b-2 border-red-500/20 pointer-events-none" />
    </section>
  );
}