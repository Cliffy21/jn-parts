"use client";

import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";
import { Lens } from "@/components/ui/lens";

export default function Services() {
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const itemsRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  const services = [
    {
      title: "Vehicle Wraps",
      desc: "Complete transformation with premium vinyl wraps in any color or finish",
      image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80",
    },
    {
      title: "Paint Protection Films",
      desc: "TPU self-healing films in 7.5 & 8.5 mils thickness for ultimate protection",
      image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80",
    },
    {
      title: "Car LED's",
      desc: "Premium LED lighting upgrades for interior and exterior styling",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    },
    {
      title: "Engine Fluids",
      desc: "High-quality engine oils and fluids for optimal performance",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    },
    {
      title: "Transmission Fluids",
      desc: "Premium transmission fluids for smooth shifting and longevity",
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
    },
    {
      title: "Laser Projectors",
      desc: "Custom laser door projectors with logos and designs",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    },
    {
      title: "Window Tints",
      desc: "Professional window tinting for privacy, UV protection, and style",
      image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=800&q=80",
    },
    {
      title: "Custom Accessories",
      desc: "Wide range of vehicle accessories for personalization and functionality",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold text-center mb-4 opacity-0"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Services
          </span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          We connect you with the best service providers
        </p>
        
        <div ref={itemsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 hover:border-red-500/50 overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20"
              style={{
                animationDelay: `${idx * 100}ms`
              }}
            >
              {/* Image */}
              <Lens zoomFactor={2.5} lensSize={180}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                </div>
              </Lens>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
              
              {/* Hover indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-red-500/50"
          >
            Book Your Service Now →
          </button>
        </div>
      </div>
    </section>
  );
}