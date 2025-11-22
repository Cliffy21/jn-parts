"use client";

import { useState } from "react";
import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

const items = [
  {
    title: "Matte Red Supercar",
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80",
    overlay: "from-red-600/80",
  },
  {
    title: "Gloss Blue Sports",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    overlay: "from-blue-600/80",
  },
  {
    title: "Satin Purple Beast",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    overlay: "from-purple-600/80",
  },
  {
    title: "Racing Green Classic",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    overlay: "from-green-600/80",
  },
  {
    title: "Chrome Silver Luxury",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
    overlay: "from-gray-600/80",
  },
  {
    title: "Matte Black Stealth",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    overlay: "from-black/80",
  },
  {
    title: "Pearl White Elegance",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    overlay: "from-white/60",
  },
  {
    title: "Candy Orange Exotic",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
    overlay: "from-orange-600/80",
  },
];

export default function Portfolio() {
  const [selected, setSelected] = useState(null);
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const gridRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  return (
    <section
      id="portfolio"
      className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold text-center mb-4 opacity-0"
        >
          Recent{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Transformations
          </span>
        </h2>
        <p className="text-center text-gray-400 mb-14 text-lg">
          Showcasing our premium wrap and customization projects
        </p>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0">
          {items.map((item, idx) => (
            <button
              key={`${item.title}-${idx}`}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20"
              onClick={() => setSelected(item)}
              style={{
                animationDelay: `${idx * 75}ms`
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${item.overlay} to-black/60 group-hover:to-black/40 transition-all duration-300`}
              />
              
              {/* Hover indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details →
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-4xl w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="ml-auto mb-3 flex items-center justify-center w-10 h-10 rounded-full bg-red-500/80 hover:bg-red-500 backdrop-blur-sm transition-colors duration-300"
              onClick={() => setSelected(null)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative h-[70vh] rounded-2xl overflow-hidden border-2 border-red-500/30">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-center text-2xl font-bold mt-6 mb-2">
              {selected.title}
            </h3>
            <p className="text-center text-gray-400">
              Professional wrap installation by JN Parts & Accessories
            </p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}