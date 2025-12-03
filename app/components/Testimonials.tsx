"use client";

import { useEffect, useState, useCallback } from "react";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

// COMMENTED OUT: Backend API base URL
// const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  text: string;
  rating?: number;
  initials?: string;
  createdAt?: string;
}

// ============================================
// MOCK DATA - Testimonials
// ============================================
const mockTestimonials: Testimonial[] = [
  {
    _id: "1",
    name: "James Mwangi",
    location: "Nairobi, Kenya",
    text: "Absolutely incredible work on my BMW wrap! The attention to detail was outstanding and the team was professional throughout. My car looks better than when I bought it.",
    rating: 5,
    createdAt: "2024-01-15",
  },
  {
    _id: "2",
    name: "Sarah Wanjiku",
    location: "Westlands, Nairobi",
    text: "I brought my Mercedes for a full interior upgrade. The quality of materials and craftsmanship exceeded my expectations. Highly recommend JN Parts for any customization work!",
    rating: 5,
    createdAt: "2024-02-20",
  },
  {
    _id: "3",
    name: "David Ochieng",
    location: "Mombasa, Kenya",
    text: "Best car parts supplier in Kenya! Fast delivery, genuine products, and excellent customer service. I've been a loyal customer for over 2 years now.",
    rating: 5,
    createdAt: "2024-03-10",
  },
  {
    _id: "4",
    name: "Grace Njeri",
    location: "Kileleshwa, Nairobi",
    text: "The matte black wrap on my Range Rover is stunning! Everyone asks where I got it done. The team at JN Parts truly knows their craft.",
    rating: 5,
    createdAt: "2024-03-25",
  },
  {
    _id: "5",
    name: "Michael Kimani",
    location: "Karen, Nairobi",
    text: "Professional service from start to finish. They helped me source rare parts for my classic car restoration. Fair prices and genuine products.",
    rating: 4,
    createdAt: "2024-04-05",
  },
  {
    _id: "6",
    name: "Alice Akinyi",
    location: "Kisumu, Kenya",
    text: "Transformed my Subaru with a custom exhaust system and body kit. The performance improvement is noticeable and the car looks amazing!",
    rating: 5,
    createdAt: "2024-04-18",
  },
];
// ============================================

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const contentRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  // ============================================
  // COMMENTED OUT: Original backend fetch
  // ============================================
  /*
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${base}/api/testimonials`);

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  */
  // ============================================

  // USING MOCK DATA INSTEAD
  useEffect(() => {
    const loadMockData = () => {
      try {
        setLoading(true);
        // Simulate a small delay like a real API call
        setTimeout(() => {
          setTestimonials(mockTestimonials);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next, testimonials.length]);

  // Loading state
  if (loading) {
    return (
      <section id="testimonials" className="py-24 px-4 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              What Our Customers Say
            </h2>
          </div>
          <div className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 rounded-3xl border border-white/5 p-16">
            <div className="flex flex-col items-center justify-center gap-4 animate-pulse">
              <div className="w-24 h-6 bg-gray-700 rounded" />
              <div className="w-full max-w-2xl h-20 bg-gray-800 rounded" />
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full" />
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-700 rounded" />
                  <div className="w-20 h-3 bg-gray-800 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="testimonials" className="py-24 px-4 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-500">Unable to load testimonials. Please try again later.</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-24 px-4 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-500">No testimonials available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-24 px-4 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* REMOVED opacity-0 - was causing content to disappear */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Trusted by vehicle owners across Kenya
          </p>
        </div>

        {/* Testimonials Carousel */}
        {/* REMOVED opacity-0 - was causing content to disappear */}
        <div ref={contentRef} className="relative">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center z-10">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-3xl border border-white/5 pt-12 pb-8 px-8 md:px-16">
            {/* Testimonial Content */}
            <div className="relative min-h-[200px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ${
                    index === activeIndex
                      ? "opacity-100 translate-x-0"
                      : index < activeIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < (testimonial.rating || 5) ? "text-yellow-500" : "text-gray-700"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mb-8">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.initials || getInitials(testimonial.name)}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-white/5">
              {/* Prev Button */}
              <button
                onClick={() => {
                  prev();
                  setIsAutoPlaying(false);
                }}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-gradient-to-r from-red-500 to-orange-500"
                        : "w-2 bg-gray-700 hover:bg-gray-600"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  next();
                  setIsAutoPlaying(false);
                }}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}