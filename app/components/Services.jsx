"use client";

import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Services() {
  const services = [
    {
      title: "Vehicle Wraps",
      desc: "Complete transformation with premium vinyl wraps in any color or finish",
      image: "https://res.cloudinary.com/dgumz7yur/image/upload/v1767652210/wraps_xmlfow.jpg",
    },
    {
      title: "Paint Protection Films",
      desc: "TPU self-healing films in 7.5 & 8.5 mils thickness for ultimate protection",
      image: "https://res.cloudinary.com/das3x6ips/image/upload/v1770744118/colored_ppf-80k_a4li9w.jpg",
    },
    {
      title: "Car LED's",
      desc: "Premium LED lighting upgrades for interior and exterior styling",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    },
    {
      title: "Engine Fluids",
      desc: "High-quality engine oils and fluids for optimal performance",
      image: "https://res.cloudinary.com/das3x6ips/image/upload/v1770745107/Service_parts-15k_p9pydu.jpg",
    },
    {
      title: "Transmission Fluids",
      desc: "Premium transmission fluids for smooth shifting and longevity",
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
    },
    {
      title: "Laser Projectors",
      desc: "Custom laser door projectors with logos and designs",
      image: "https://res.cloudinary.com/das3x6ips/image/upload/v1770744118/projectors-20k_urbofq.jpg",
    },
    {
      title: "Window Tints",
      desc: "Professional window tinting for privacy, UV protection, and style",
      image: "https://res.cloudinary.com/das3x6ips/image/upload/v1770744115/chamelion_tints-13k_windscreen_ng0nwi.jpg",
    },
    {
      title: "Custom Accessories",
      desc: "Wide range of vehicle accessories for personalization and functionality",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 sm:py-28 px-4 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-center text-gray-400 mb-16 text-lg sm:text-xl"
          >
            We connect you with the best service providers
          </motion.p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 hover:border-red-500/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/30"
            >
              {/* Image with zoom effect */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
                
                {/* Animated overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-orange-500/0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
              
              {/* Hover indicator with animation */}
              <motion.div 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ rotate: 45, scale: 1.1 }}
              >
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.div>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* CTA with enhanced animation */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-red-500/50 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Your Service Now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}