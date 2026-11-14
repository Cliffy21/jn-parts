"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Star, Quote, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface Testimonial {
  _id: string;
  name: string;
  role: string; // e.g., "Verified Owner"
  location: string;
  text: string;
  rating: number;
  vehicle?: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Walter Okoth",
    role: "Verified Owner",
    location: "Nairobi",
    text: "Incredible work on my BMW wrap! The attention to detail around the edges was outstanding. It honestly looks like factory paint.",
    rating: 5,
    vehicle: "BMW M4 Competition",
  },
  {
    _id: "2",
    name: "Joseph Mairu",
    role: "Regular Client",
    location: "Westlands",
    text: "I was skeptical about sourcing parts locally, but JN Parts delivered genuine OEM components for my Mercedes faster than importing them myself.",
    rating: 5,
    vehicle: "Mercedes GLE 450",
  },
  {
    _id: "3",
    name: "Kennedy Omondi",
    role: "Car Enthusiast",
    location: "Mombasa",
    text: "The custom exhaust installation has completely transformed the sound of my car. Professional service from start to finish.",
    rating: 5,
    vehicle: "Toyota Land Cruiser V8",
  },
  {
    _id: "4",
    name: "Clifford Manase",
    role: "Verified Owner",
    location: "Kileleshwa",
    text: "The matte black finish is stunning. I get compliments at every traffic light. Worth every shilling for this level of quality.",
    rating: 5,
    vehicle: "Range Rover Sport",
  },
];

// --- Sub-components ---
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300",
          i < rating ? "fill-red-500 text-red-500" : "fill-gray-800 text-gray-800"
        )}
      />
    ))}
  </div>
);

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const AUTOPLAY_DELAY = 6000;

  // Navigation Logic
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  }, []);

  // Auto-play Logic
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => paginate(1), AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]);

  // Pause on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const current = testimonials[activeIndex];

  // Animation Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
    }),
  };

  return (
    <section 
      id="testimonials" 
      className="relative overflow-hidden bg-[#08090B] py-24"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF1616]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F7F8FD]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* --- LEFT COLUMN: Header & Stats --- */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
             
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[#F7F8FD]">
                Trusted by <br />
                <span className="bg-gradient-to-r from-[#FF1616] to-[#F7F8FD] bg-clip-text text-transparent">
                  Enthusiasts.
                </span>
              </h2>
              
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#A5A8AE]">
                Don&apos;t just take our word for it. Read what genuine car owners have to say about our premium parts and installation services.
              </p>
            </motion.div>

            {/* Trust Metrics */}
            <div className="flex items-center gap-8 pt-4 border-t border-[#34373D]">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#F7F8FD]">4.9</span>
                  <span className="text-[#A5A8AE]">/5.0</span>
                </div>
                <p className="mt-1 text-sm text-[#A5A8AE]">Google Reviews</p>
              </div>
              <div className="h-12 w-px bg-[#34373D]" />
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#F7F8FD]">2k+</span>
                </div>
                <p className="mt-1 text-sm text-[#A5A8AE]">Happy Clients</p>
              </div>
            </div>

            {/* Desktop Navigation Controls */}
            <div className="hidden lg:flex gap-4 pt-4">
              <Button
                onClick={() => { setIsAutoPlaying(false); paginate(-1); }}
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-[#34373D] bg-[#15171B] text-[#F7F8FD] transition-all duration-300 hover:border-[#FF1616] hover:bg-[#FF1616] hover:text-white"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => { setIsAutoPlaying(false); paginate(1); }}
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-[#34373D] bg-[#15171B] text-[#F7F8FD] transition-all duration-300 hover:border-[#FF1616] hover:bg-[#FF1616] hover:text-white"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: The Active Card --- */}
          <div 
            className="lg:col-span-7 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Decorative Quote Icon Behind */}
            <div className="absolute -top-12 -left-8 text-white/[0.03] pointer-events-none select-none">
              <Quote className="w-64 h-64 rotate-12 transform" />
            </div>

            <div className="relative min-h-[420px] md:min-h-[380px] w-full">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    filter: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-[#34373D] bg-[#15171B]/90 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-12">
                    
                    {/* Card Content */}
                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <StarRating rating={current.rating} />
                        {current.vehicle && (
                          <Badge variant="secondary" className="border-[#34373D] bg-[#22252A] font-normal tracking-wide text-[#F7F8FD] hover:bg-[#2b2e34]">
                            {current.vehicle}
                          </Badge>
                        )}
                      </div>

                      <blockquote className="text-xl font-medium leading-relaxed text-[#F7F8FD] md:text-2xl lg:text-3xl">
                        &ldquo;{current.text}&rdquo;
                      </blockquote>
                    </div>

                    {/* Footer: User Info */}
                    <div className="mt-8 flex items-center gap-4 border-t border-[#34373D] pt-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF1616] to-[#D90F0F] text-lg font-bold text-white shadow-lg">
                        {current.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-semibold text-[#F7F8FD]">{current.name}</h4>
                          <CheckCircle2 className="h-4 w-4 text-[#FF1616]" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#A5A8AE]">
                          <span>{current.role}</span>
                          <span className="h-1 w-1 rounded-full bg-[#A5A8AE]" />
                          <span>{current.location}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Navigation & Progress */}
            <div className="flex lg:hidden justify-between items-center mt-8">
               <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setIsAutoPlaying(false); setActiveIndex(idx); }}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        idx === activeIndex 
                          ? "w-8 bg-gradient-to-r from-[#FF1616] to-[#D90F0F]" 
                          : "w-2 bg-[#34373D]"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
               </div>
               <div className="flex gap-3">
                 <Button onClick={() => paginate(-1)} size="icon" variant="ghost" className="text-white hover:bg-white/10">
                   <ArrowLeft className="w-5 h-5" />
                 </Button>
                 <Button onClick={() => paginate(1)} size="icon" variant="ghost" className="text-white hover:bg-white/10">
                   <ArrowRight className="w-5 h-5" />
                 </Button>
               </div>
            </div>

            {/* Auto-play Progress Bar (Desktop) */}
            <div className="hidden lg:block absolute -bottom-12 left-0 right-0 h-1 overflow-hidden rounded-full bg-[#34373D]">
               {isAutoPlaying && (
                 <motion.div 
                   key={activeIndex}
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                   className="h-full bg-[#FF1616]"
                 />
               )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}