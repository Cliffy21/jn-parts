"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
      className="relative py-24 bg-zinc-950 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-900/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
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
             
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Trusted by <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Enthusiasts.
                </span>
              </h2>
              
              <p className="text-lg text-gray-400 mt-6 leading-relaxed max-w-md">
                Don't just take our word for it. Read what genuine car owners have to say about our premium parts and installation services.
              </p>
            </motion.div>

            {/* Trust Metrics */}
            <div className="flex items-center gap-8 pt-4 border-t border-white/10">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">4.9</span>
                  <span className="text-gray-500">/5.0</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Google Reviews</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">2k+</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Happy Clients</p>
              </div>
            </div>

            {/* Desktop Navigation Controls */}
            <div className="hidden lg:flex gap-4 pt-4">
              <Button
                onClick={() => { setIsAutoPlaying(false); paginate(-1); }}
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-white/10 bg-white/5 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => { setIsAutoPlaying(false); paginate(1); }}
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-white/10 bg-white/5 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300"
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
                  <div className="h-full bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-2xl">
                    
                    {/* Card Content */}
                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <StarRating rating={current.rating} />
                        {current.vehicle && (
                          <Badge variant="secondary" className="bg-white/5 text-gray-300 hover:bg-white/10 border-white/5 font-normal tracking-wide">
                            {current.vehicle}
                          </Badge>
                        )}
                      </div>

                      <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-relaxed">
                        "{current.text}"
                      </blockquote>
                    </div>

                    {/* Footer: User Info */}
                    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {current.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-semibold text-lg">{current.name}</h4>
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{current.role}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-700" />
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
                          ? "w-8 bg-gradient-to-r from-red-500 to-orange-500" 
                          : "w-2 bg-gray-800"
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
            <div className="hidden lg:block absolute -bottom-12 left-0 right-0 h-1 bg-gray-800 rounded-full overflow-hidden">
               {isAutoPlaying && (
                 <motion.div 
                   key={activeIndex}
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                   className="h-full bg-red-600"
                 />
               )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}