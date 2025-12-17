"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface PortfolioItem {
  _id: string;
  title: string;
  color: string;
  images: string[];
  description: string;
}

// Portfolio data organized by color - Each car is correctly categorized by its actual color
const portfolioData: PortfolioItem[] = [
  // BLACK CARS
  {
    _id: "1",
    title: "Matte Black Mazda cx8",
    color: "black",
    images: [
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765322264/mazda_xehbwl.jpg",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666781/matte_balack_mazda_rze14w.jpg",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666800/matte_black_grku0w.jpg",
    ],
    description: "Full matte black wrap with gloss black accents",
  },
  
  // RED CARS
  {
    _id: "2",
    title: "Racing Red Ferrari 488",
    color: "red",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80",
      "",
    ],
    description: "Gloss racing red with carbon fiber details",
  },
  
  // BLUE CARS
  {
    _id: "3",
    title: "Midnight Blue Mazda CX8",
    color: "blue",
    images: [
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666747/midnight_nn0hf6.jpg "  ,
      "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&q=80",
    ],
    description: "Deep midnight blue metallic finish",
  },
  
  // WHITE CARS
  {
    _id: "4",
    title: "Pearl White Mazda CX8",
    color: "white",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765322264/mazda2_gdtq4p.jpg",
      
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    ],
    description: "Satin pearl white with chrome delete",
  },
  
  // GRAY CARS
  {
    _id: "5",
    title: "Nardo Gray Audi RS7",
    color: "gray",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666783/gray_mazda_qf5li6.jpg",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
    ],
    description: "Iconic Nardo gray with matte finish",
  },
  
  // ORANGE CARS
  {
    _id: "6",
    title: "Sunset Orange Audi",
    color: "orange",
    images: [
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765978672/OR1_bpbhlo.jpg",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765978672/OR2_vpcidt.jpg.jpg",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765977028/sunset_orangeaudi_m6qxjl.jpg",
    ],
    description: "Stunning sunset orange metallic wrap",
  },
  
  // GREEN CARS
  {
    _id: "7",
    title: "British Racing Green Jaguar",
    color: "green",
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&q=80",
    ],
    description: "Classic British racing green restoration",
  },
  
  // YELLOW CARS
  {
    _id: "8",
    title: "Velocity Yellow Corvette",
    color: "yellow",
    images: [
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666783/yellow_mazda_kqxayy.jpg",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
     
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    ],
    description: "Vibrant velocity yellow with racing stripes",
  },
];

const colorStyles: Record<string, { bg: string; border: string; text: string }> = {
  red: { bg: "bg-red-500", border: "border-red-500", text: "text-red-400" },
  blue: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-400" },
  green: { bg: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-400" },
  gray: { bg: "bg-gray-400", border: "border-gray-400", text: "text-gray-400" },
  black: { bg: "bg-neutral-500", border: "border-neutral-500", text: "text-neutral-400" },
  white: { bg: "bg-slate-200", border: "border-slate-200", text: "text-slate-300" },
  orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-400" },
  yellow: { bg: "bg-yellow-400", border: "border-yellow-400", text: "text-yellow-400" },
};

const getColorStyle = (color: string) => {
  return colorStyles[color.toLowerCase()] || colorStyles.red;
};

export default function Portfolio() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  // Group items by color for accurate filtering
  const itemsByColor = portfolioData.reduce((acc, item) => {
    const color = item.color.toLowerCase().trim();
    if (!acc[color]) {
      acc[color] = [];
    }
    acc[color].push(item);
    return acc;
  }, {} as Record<string, PortfolioItem[]>);

  // Get available colors with counts (only colors that have items)
  const availableColors = Object.keys(itemsByColor).filter(
    (color) => itemsByColor[color] && itemsByColor[color].length > 0
  );

  // Order colors consistently
  const colorOrder = ["black", "red", "blue", "white", "gray", "orange", "green", "yellow"];
  const orderedColors = colorOrder.filter((color) => availableColors.includes(color));

  // Build filters array with "all" first, then ordered colors
  const filters = [
    { id: "all", label: "All", count: portfolioData.length, color: null },
    ...orderedColors.map((color) => ({
      id: color,
      label: color.charAt(0).toUpperCase() + color.slice(1),
      count: itemsByColor[color].length,
      color: color,
    })),
  ];

  // Filter items - case-insensitive and trimmed for accuracy
  const filteredItems =
    filter === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.color.toLowerCase().trim() === filter.toLowerCase().trim());

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const openModal = (item: PortfolioItem) => {
    setSelected(item);
    setActiveImageIndex(0);
  };

  const closeModal = useCallback(() => {
    setSelected(null);
    setActiveImageIndex(0);
  }, []);

  const nextImage = useCallback(() => {
    if (selected) {
      setActiveImageIndex((prev) => (prev + 1) % selected.images.length);
    }
  }, [selected]);

  const prevImage = useCallback(() => {
    if (selected) {
      setActiveImageIndex((prev) => (prev - 1 + selected.images.length) % selected.images.length);
    }
  }, [selected]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, closeModal, nextImage, prevImage]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-24 sm:py-32 px-4 bg-black overflow-hidden"
    >
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
        
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Recent{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Transformations
            </span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
            Showcasing our premium wrap and customization projects
          </p>
        </div>

        {/* Filter Tabs with Color Indicators */}
        <div
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filters.map((filterOption) => {
            const isActive = filter === filterOption.id;
            const colorStyle = filterOption.color ? getColorStyle(filterOption.color) : null;

            // Determine background class based on active state and filter type
            let bgClass = "";
            if (isActive) {
              if (filterOption.id === "all") {
                bgClass = "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20";
              } else {
                // Use the color's background for active color filters
                bgClass = `${colorStyle?.bg || "bg-gray-600"} text-white shadow-lg`;
              }
            } else {
              bgClass = "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800";
            }

            return (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`group flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 min-h-[40px] ${bgClass}`}
                aria-label={`Filter by ${filterOption.label} (${filterOption.count} items)`}
              >
                {/* Color indicator dot - only show for color filters, not "all" */}
                {filterOption.color && (
                  <span
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      isActive
                        ? "bg-white"
                        : colorStyle?.bg || "bg-gray-600"
                    } transition-colors duration-300`}
                  />
                )}
                <span className="capitalize">{filterOption.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold flex-shrink-0 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-800 text-gray-500"
                  }`}
                >
                  {filterOption.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {filteredItems.map((item, idx) => {
            const accent = getColorStyle(item.color);
            const isLarge = idx === 0 || idx === 5;

            return (
              <div
                key={item._id}
                className={`${isLarge ? "md:col-span-2 md:row-span-2" : ""} transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${idx * 80 + 200}ms` }}
              >
                <button
                  onClick={() => openModal(item)}
                  className={`group relative w-full ${
                    isLarge ? "aspect-square md:aspect-[4/5]" : "aspect-[4/5]"
                  } rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black`}
                >
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Color Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-black/60 backdrop-blur-md ${accent.text} border border-white/10 capitalize`}
                    >
                      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${accent.bg}`} />
                      {item.color}
                    </span>
                  </div>

                  {/* Image count badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-black/60 backdrop-blur-md text-white/80 border border-white/10">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {item.images.length}
                    </span>
                  </div>

                  {/* Hover expand icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 border border-white/20">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                    <h3
                      className={`${
                        isLarge ? "text-lg sm:text-xl md:text-2xl" : "text-sm sm:text-base md:text-lg"
                      } font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`${
                        isLarge ? "text-sm" : "text-xs sm:text-sm"
                      } text-gray-400 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 line-clamp-2`}
                    >
                      {item.description}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* No results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No projects found for this color.</p>
          </div>
        )}

        {/* View all CTA */}
        <div
          className={`mt-12 sm:mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors duration-300">
            <span>View all projects</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/98 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={closeModal}
        >
          <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 ${
                      getColorStyle(selected.color).text
                    } capitalize`}
                  >
                    <span className={`w-2 h-2 rounded-full ${getColorStyle(selected.color).bg}`} />
                    {selected.color}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{selected.title}</h3>
                <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-xl">{selected.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0 ml-4"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Image */}
            <div className="relative aspect-[16/10] sm:aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-900 mb-4">
              <Image
                src={selected.images[activeImageIndex]}
                alt={`${selected.title} - Image ${activeImageIndex + 1}`}
                fill
                className="object-cover"
                key={activeImageIndex}
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />

              {/* Navigation Arrows */}
              {selected.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {selected.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="text-white text-sm font-medium">
                    {activeImageIndex + 1} / {selected.images.length}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {selected.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {selected.images.map((img, idx) => {
                  const accent = getColorStyle(selected.color);
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 sm:w-28 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                        activeImageIndex === idx
                          ? `ring-2 ${accent.border} ring-offset-2 ring-offset-black scale-105`
                          : "opacity-50 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${selected.title} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Keyboard hint */}
            <div className="hidden sm:flex justify-center gap-4 mt-6 text-gray-600 text-xs">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded bg-white/10 text-gray-400">←</kbd>
                <kbd className="px-2 py-1 rounded bg-white/10 text-gray-400">→</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded bg-white/10 text-gray-400">Esc</kbd>
                Close
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}