"use client";

import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";
import { motion } from "framer-motion";
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
      className="relative overflow-hidden bg-[#050a10] py-24 sm:py-28 px-4"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-12 h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />
        <div className="absolute bottom-8 right-12 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-red-400/90">
            Premium Service Suite
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
            Performance-driven{" "}
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-300 sm:text-lg"
          >
            From premium wraps and protection to lighting and detailing, every service is built to elevate your vehicle and your driving experience.
          </motion.p>
        </motion.div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.45, 
                delay: idx * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-[#0f141b] to-[#090d12] shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-all duration-500 hover:border-red-500/40 hover:shadow-[0_24px_70px_rgba(239,68,68,0.18)]"
            >
              <div className="relative h-52 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a10] via-[#050a10]/25 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                  Service
                </div>
              </div>
              
              <div className="space-y-3 p-5 sm:p-6">
                <motion.h3 
                  className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-red-400"
                  whileHover={{ x: 3 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                  <span>Learn more</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
                </div>
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
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
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 px-8 py-3.5 text-base font-bold text-white shadow-[0_12px_30px_rgba(239,68,68,0.35)] transition-all duration-300 hover:shadow-[0_18px_35px_rgba(239,68,68,0.45)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Your Service
              <span aria-hidden="true">→</span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}