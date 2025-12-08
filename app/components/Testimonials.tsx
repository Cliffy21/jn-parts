"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  vehicle?: string;
}

const testimonials: Testimonial[] = [
  {
    _id: "1",
    name: "James Mwangi",
    location: "Nairobi",
    text: "Incredible work on my BMW wrap! Attention to detail was outstanding.",
    rating: 5,
    vehicle: "BMW M4",
  },
  {
    _id: "2",
    name: "Sarah Wanjiku",
    location: "Westlands",
    text: "Full interior upgrade exceeded expectations. Premium quality throughout.",
    rating: 5,
    vehicle: "Mercedes GLE",
  },
  {
    _id: "3",
    name: "David Ochieng",
    location: "Mombasa",
    text: "Best parts supplier in Kenya! Fast delivery and genuine products.",
    rating: 5,
    vehicle: "Toyota Land Cruiser",
  },
  {
    _id: "4",
    name: "Grace Njeri",
    location: "Kileleshwa",
    text: "The matte black wrap is stunning. Everyone asks where I got it done.",
    rating: 5,
    vehicle: "Range Rover",
  },
  {
    _id: "5",
    name: "Michael Kimani",
    location: "Karen",
    text: "Professional service from start to finish. Fair prices, genuine parts.",
    rating: 5,
    vehicle: "Porsche 911",
  },
  {
    _id: "6",
    name: "Alice Akinyi",
    location: "Kisumu",
    text: "Custom exhaust and body kit transformed my car. Amazing results!",
    rating: 5,
    vehicle: "Subaru WRX",
  },
];

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  const handleInteraction = (action: () => void) => {
    setIsAutoPlaying(false);
    action();
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 sm:py-28 px-4 bg-black overflow-hidden"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2">
              Client{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Reviews
              </span>
            </h2>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleInteraction(prev)}
              className="w-11 h-11 rounded-full border border-gray-800 hover:border-gray-700 hover:bg-white/5 flex items-center justify-center transition-all"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleInteraction(next)}
              className="w-11 h-11 rounded-full border border-gray-800 hover:border-gray-700 hover:bg-white/5 flex items-center justify-center transition-all"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Main Featured Card */}
            <div className="md:col-span-2 relative">
              <div className="relative h-full min-h-[280px] sm:min-h-[320px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800/50 p-6 sm:p-8 overflow-hidden">
                {/* Quote accent */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-red-500/10">
                  <svg className="w-16 h-16 sm:w-24 sm:h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col">
                  {testimonials.map((t, idx) => (
                    <div
                      key={t._id}
                      className={`absolute inset-0 p-0 flex flex-col transition-all duration-500 ${
                        idx === activeIndex
                          ? "opacity-100 translate-x-0"
                          : idx < activeIndex
                          ? "opacity-0 -translate-x-8"
                          : "opacity-0 translate-x-8"
                      }`}
                    >
                      {/* Stars */}
                      <div className="flex gap-1 mb-4 sm:mb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              i < t.rating ? "text-yellow-500" : "text-gray-700"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed flex-grow">
                        &ldquo;{t.text}&rdquo;
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center justify-between mt-6 sm:mt-8 pt-6 border-t border-gray-800/50">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                            {getInitials(t.name)}
                          </div>
                          <div>
                            <p className="text-white font-semibold text-sm sm:text-base">{t.name}</p>
                            <p className="text-gray-500 text-xs sm:text-sm">{t.location}</p>
                          </div>
                        </div>
                        {t.vehicle && (
                          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-gray-400 text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                            {t.vehicle}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Rating Card */}
              <div className="flex-1 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 p-6 sm:p-8 flex flex-col justify-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2">
                  4.9
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 text-sm">Average rating from 200+ customers</p>
              </div>

              {/* Trust Badge */}
              <div className="flex-1 rounded-2xl sm:rounded-3xl bg-gray-900/50 border border-gray-800/50 p-6 sm:p-8 flex flex-col justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-base sm:text-lg">Trusted Since 2010</p>
                <p className="text-gray-500 text-sm mt-1">14+ years of excellence</p>
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleInteraction(() => setActiveIndex(idx))}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-gradient-to-r from-red-500 to-orange-500"
                    : "w-1.5 bg-gray-700 hover:bg-gray-600"
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
            <button
              onClick={() => handleInteraction(prev)}
              className="w-10 h-10 rounded-full border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleInteraction(next)}
              className="w-10 h-10 rounded-full border border-gray-800 hover:border-gray-700 flex items-center justify-center transition-all"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}