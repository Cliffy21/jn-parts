"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

// COMMENTED OUT: Backend API base URL
// const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface PortfolioItem {
  _id: string;
  title: string;
  color: string;
  images: string[];
  description?: string;
  createdAt?: string;
}

// ============================================
// MOCK DATA - Replace with your Cloudinary URLs
// ============================================
const mockPortfolioItems: PortfolioItem[] = [
  {
    _id: "1",
    title: "Matte Black BMW M4",
    color: "black",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    ],
    description: "Full matte black wrap with gloss black accents",
    createdAt: "2024-01-15",
  },
  {
    _id: "2",
    title: "Racing Red Porsche 911",
    color: "red",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    ],
    description: "Gloss racing red with carbon fiber details",
    createdAt: "2024-02-20",
  },
  {
    _id: "3",
    title: "Midnight Blue Mercedes AMG",
    color: "blue",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    ],
    description: "Deep midnight blue metallic finish",
    createdAt: "2024-03-10",
  },
  {
    _id: "4",
    title: "Pearl White Audi RS7",
    color: "white",
    images: [
      "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
    ],
    description: "Satin pearl white with chrome delete",
    createdAt: "2024-03-25",
  },
  {
    _id: "5",
    title: "Nardo Gray Lamborghini",
    color: "gray",
    images: [
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    ],
    description: "Iconic Nardo gray with matte finish",
    createdAt: "2024-04-05",
  },
  {
    _id: "6",
    title: "Electric Purple McLaren",
    color: "purple",
    images: [
      "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&q=80",
      "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?w=800&q=80",
    ],
    description: "Vibrant electric purple color shift wrap",
    createdAt: "2024-04-18",
  },
  {
    _id: "7",
    title: "British Racing Green Jaguar",
    color: "green",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80",
    ],
    description: "Classic British racing green restoration",
    createdAt: "2024-05-02",
  },
  {
    _id: "8",
    title: "Sunset Orange Ferrari",
    color: "orange",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1546614042-7df3c8c3c68e?w=800&q=80",
    ],
    description: "Stunning sunset orange metallic wrap",
    createdAt: "2024-05-15",
  },
];
// ============================================

const accentColors: Record<string, { bg: string; border: string; text: string }> = {
  red: { bg: "bg-red-500", border: "border-red-500", text: "text-red-500" },
  blue: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-500" },
  purple: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-500" },
  green: { bg: "bg-green-500", border: "border-green-500", text: "text-green-500" },
  gray: { bg: "bg-gray-400", border: "border-gray-400", text: "text-gray-400" },
  silver: { bg: "bg-gray-400", border: "border-gray-400", text: "text-gray-400" },
  black: { bg: "bg-neutral-600", border: "border-neutral-600", text: "text-neutral-400" },
  white: { bg: "bg-slate-300", border: "border-slate-300", text: "text-slate-300" },
  orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-500" },
  yellow: { bg: "bg-yellow-500", border: "border-yellow-500", text: "text-yellow-500" },
  pink: { bg: "bg-pink-500", border: "border-pink-500", text: "text-pink-500" },
  default: { bg: "bg-red-500", border: "border-red-500", text: "text-red-500" },
};

const getAccentColor = (color: string) => {
  const normalizedColor = color?.toLowerCase() || "default";
  return accentColors[normalizedColor] || accentColors.default;
};

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const gridRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  useEffect(() => {
    // ============================================
    // COMMENTED OUT: Original backend fetch
    // ============================================
    /*
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${base}/api/portfolio`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio");
        }
        
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
    */
    // ============================================

    // USING MOCK DATA INSTEAD
    const loadMockData = () => {
      try {
        setLoading(true);
        // Simulate a small delay like a real API call
        setTimeout(() => {
          setItems(mockPortfolioItems);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setLoading(false);
      }
    };

    loadMockData();
  }, []);

  const openModal = (item: PortfolioItem) => {
    setSelected(item);
    setActiveImageIndex(0);
  };

  const closeModal = () => {
    setSelected(null);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (selected) {
      setActiveImageIndex((prev) => (prev + 1) % selected.images.length);
    }
  };

  const prevImage = () => {
    if (selected) {
      setActiveImageIndex((prev) => (prev - 1 + selected.images.length) % selected.images.length);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section id="portfolio" className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">

            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Recent Transformations
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="aspect-[3/4] rounded-2xl bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="portfolio" className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Recent Transformations
          </h2>
          <p className="text-gray-500">Unable to load portfolio. Please try again later.</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <section id="portfolio" className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto text-center">
        
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Recent Transformations
          </h2>
          <p className="text-gray-500">No portfolio items available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* REMOVED opacity-0 - was causing content to disappear */}
        <div ref={titleRef} className="text-center mb-16">

          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Recent Transformations
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Showcasing our premium wrap and customization projects
          </p>
        </div>

        {/* Grid */}
        {/* REMOVED opacity-0 - was causing content to disappear */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map((item) => {
            const accent = getAccentColor(item.color);
            return (
              <button
                key={item._id}
                onClick={() => openModal(item)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm ${accent.text}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${accent.bg}`} />
                    {item.color}
                  </span>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {item.images.length} photo{item.images.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          style={{ animation: "fadeIn 0.2s ease-out" }}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "scaleIn 0.3s ease-out" }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{selected.title}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {selected.description || "Professional wrap installation by JN Parts & Accessories"}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Main Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 mb-4">
              <Image
                src={selected.images[activeImageIndex]}
                alt={`${selected.title} - Image ${activeImageIndex + 1}`}
                fill
                className="object-cover"
                key={activeImageIndex}
              />

              {/* Navigation Arrows - only show if more than 1 image */}
              {selected.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-white"
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
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-white"
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
                </>
              )}

              {/* Image Counter */}
              {selected.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                  <span className="text-white text-sm font-medium">
                    {activeImageIndex + 1} / {selected.images.length}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails - only show if more than 1 image */}
            {selected.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {selected.images.map((img, idx) => {
                  const accent = getAccentColor(selected.color);
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-200 ${
                        activeImageIndex === idx
                          ? `ring-2 ${accent.border} ring-offset-2 ring-offset-black`
                          : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${selected.title} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}