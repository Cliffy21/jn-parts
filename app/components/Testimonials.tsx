"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Star, Quote, Shield, Car } from "lucide-react";
import { cn } from "@/lib/utils";

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

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4 sm:w-5 sm:h-5",
            i < rating
              ? "fill-yellow-500 text-yellow-500"
              : "fill-gray-700 text-gray-700"
          )}
        />
      ))}
    </div>
  );
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

  const currentTestimonial = testimonials[activeIndex];

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
          className={cn(
            "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
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
            <Button
              onClick={() => handleInteraction(prev)}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-800 bg-black/50 hover:bg-white/5 hover:border-gray-700"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </Button>
            <Button
              onClick={() => handleInteraction(next)}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-800 bg-black/50 hover:bg-white/5 hover:border-gray-700"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div
          className={cn(
            "relative transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Main Featured Card */}
            <div className="md:col-span-2">
              <Card className="relative h-full min-h-[280px] sm:min-h-[320px] border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
                {/* Quote accent */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-red-500/10">
                  <Quote className="w-16 h-16 sm:w-24 sm:h-24" />
                </div>

                <CardHeader className="relative z-10">
                  <StarRating rating={currentTestimonial.rating} />
                </CardHeader>

                <CardContent className="relative z-10 flex-1 flex flex-col">
                  <blockquote className="text-lg sm:text-xl md:text-2xl text-white font-medium leading-relaxed flex-grow">
                    &ldquo;{currentTestimonial.text}&rdquo;
                  </blockquote>
                </CardContent>

                <CardFooter className="relative z-10 pt-6 border-t border-gray-800/50">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                        {getInitials(currentTestimonial.name)}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm sm:text-base">
                          {currentTestimonial.name}
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {currentTestimonial.location}
                        </p>
                      </div>
                    </div>
                    {currentTestimonial.vehicle && (
                      <Badge
                        variant="outline"
                        className="hidden sm:flex items-center gap-1.5 bg-white/5 border-gray-800 text-gray-400 hover:bg-white/10"
                      >
                        <Car className="w-3.5 h-3.5" />
                        {currentTestimonial.vehicle}
                      </Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Rating Card */}
              <Card className="flex-1 border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-500/5">
                <CardContent className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2">
                    4.9
                  </div>
                  <div className="mb-3">
                    <StarRating rating={5} />
                  </div>
                  <p className="text-gray-400 text-sm">Average rating from 200+ customers</p>
                </CardContent>
              </Card>

              {/* Trust Badge */}
              <Card className="flex-1 border-gray-800/50 bg-gray-900/50">
                <CardContent className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <p className="text-white font-semibold text-base sm:text-lg">
                    Trusted Since 2010
                  </p>
                  <p className="text-gray-500 text-sm mt-1">14+ years of excellence</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleInteraction(() => setActiveIndex(idx))}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === activeIndex
                    ? "w-8 bg-gradient-to-r from-red-500 to-orange-500"
                    : "w-1.5 bg-gray-700 hover:bg-gray-600"
                )}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
            <Button
              onClick={() => handleInteraction(prev)}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-800 bg-black/50 hover:bg-white/5"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </Button>
            <Button
              onClick={() => handleInteraction(next)}
              variant="outline"
              size="icon"
              className="rounded-full border-gray-800 bg-black/50 hover:bg-white/5"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
