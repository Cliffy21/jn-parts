"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Lens } from "@/components/ui/lens";

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
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      "https://res.cloudinary.com/dgumz7yur/image/upload/v1765666783/gray_mazda_qf5li6.jpg",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
    ],
    description: "Iconic Nardo gray with matte finish",
  },
  
  {
    _id: "6",
    title: "Papaya Orange Ford Mustang",
    color: "orange",
    images: [
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80", // Orange Mustang
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80", // Orange muscle car
      "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&q=80", // Classic orange car
    ],
    description: "Papaya orange Ford Mustang GT with racing stripes",
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

  // Transform portfolio items into carousel cards
  const carouselCards = filteredItems
    .filter((item) => item.images.length > 0 && item.images[0]?.trim() !== "")
    .map((item) => {
      const mainImage = item.images[0]?.trim() || "";
      const validImages = item.images.filter((img) => img?.trim() !== "");

      return {
        src: mainImage,
        title: item.title,
        category: item.color.charAt(0).toUpperCase() + item.color.slice(1),
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base md:text-lg">{item.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {validImages.map((image, idx) => (
                <Lens key={idx} zoomFactor={2} lensSize={200}>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
                    <Image
                      src={image.trim()}
                      alt={`${item.title} - View ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Lens>
              ))}
            </div>
          </div>
        ),
      };
    });

  // Create carousel items from cards
  const carouselItems = carouselCards.map((card, index) => (
    <Card key={index} card={card} index={index} layout={false} />
  ));

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

        {/* Carousel */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {carouselItems.length > 0 ? (
            <Carousel items={carouselItems} />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">No projects found for this color.</p>
            </div>
          )}
        </div>


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

    </section>
  );
}