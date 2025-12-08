"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price?: number;
  image_url?: string;
}

const categoryLabels: Record<string, string> = {
  engine: "Engine",
  exterior: "Exterior",
  interior: "Interior",
  electronics: "Electronics",
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "High Performance Air Filter",
    category: "engine",
    description: "K&N style high-flow air filter for improved engine breathing.",
    price: 4500,
    image_url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
  },
  {
    id: "2",
    name: "Performance Exhaust System",
    category: "engine",
    description: "Stainless steel cat-back exhaust with deep tone.",
    price: 35000,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "3",
    name: "Turbo Intercooler Kit",
    category: "engine",
    description: "Front-mount intercooler for turbocharged engines.",
    price: 28000,
    image_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
  {
    id: "4",
    name: "Carbon Fiber Hood",
    category: "exterior",
    description: "Lightweight carbon fiber hood with aggressive vents.",
    price: 85000,
    image_url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
  },
  {
    id: "5",
    name: "LED Headlight Kit",
    category: "exterior",
    description: "6000K LED headlight bulbs. Plug and play.",
    price: 8500,
    image_url: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80",
  },
  {
    id: "6",
    name: "Wide Body Fender Flares",
    category: "exterior",
    description: "ABS plastic fender flares for wide body look.",
    price: 22000,
    image_url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  },
  {
    id: "7",
    name: "Racing Bucket Seats",
    category: "interior",
    description: "FIA approved racing seats with Alcantara finish.",
    price: 65000,
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
  {
    id: "8",
    name: "Quick Release Steering",
    category: "interior",
    description: "350mm flat-bottom wheel with quick release hub.",
    price: 15000,
    image_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
  },
  {
    id: "9",
    name: "Carbon Fiber Trim Kit",
    category: "interior",
    description: "Real carbon fiber interior trim pieces.",
    price: 18000,
    image_url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  },
  {
    id: "10",
    name: "Android Auto Head Unit",
    category: "electronics",
    description: "10.1 inch touchscreen with CarPlay and GPS.",
    price: 32000,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "11",
    name: "360° Camera System",
    category: "electronics",
    description: "Bird's eye view camera with parking sensors.",
    price: 25000,
    image_url: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&q=80",
  },
  {
    id: "12",
    name: "Performance ECU Tune",
    category: "electronics",
    description: "Custom ECU remapping for more power.",
    price: 45000,
    image_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
];

export default function Products() {
  const [allProducts] = useState<Product[]>(mockProducts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const filterScrollRef = useRef<HTMLDivElement>(null);

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

  const dynamicCategories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  ) as string[];

  const filters = [
    { id: "all", label: "All", count: allProducts.length },
    ...dynamicCategories.map((c) => ({
      id: c,
      label: categoryLabels[c] || c.charAt(0).toUpperCase() + c.slice(1),
      count: allProducts.filter((p) => p.category === c).length,
    })),
  ];

  const visibleProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 bg-black overflow-x-hidden"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div
          className={`text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight px-2">
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-md mx-auto px-4">
            Premium vehicle parts and accessories
          </p>
        </div>

        {/* Filter Tabs - Horizontally scrollable on mobile */}
        <div
          className={`mb-6 sm:mb-8 md:mb-10 lg:mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            ref={filterScrollRef}
            className="flex overflow-x-auto pb-2 sm:pb-0 sm:justify-center gap-2 sm:gap-2.5 md:gap-3 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0 snap-x snap-mandatory"
          >
            {filters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-[11px] xs:text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
                } snap-start`}
              >
                {cat.label}
                <span
                  className={`ml-1.5 sm:ml-2 text-[9px] xs:text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md ${
                    activeCategory === cat.id ? "bg-white/20" : "bg-gray-800"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
              {visibleProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={`group bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-800/50 overflow-hidden hover:border-red-500/30 transition-all duration-500 w-full ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${idx * 50 + 300}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-800 overflow-hidden">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-red-500/10 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge - Mobile optimized */}
                    {product.category && (
                      <div className="absolute top-1.5 left-1.5 sm:top-2 md:top-3 left-2 sm:left-3 z-10">
                        <span className="px-1.5 py-0.5 sm:px-2 md:px-2.5 sm:py-0.5 md:py-1 text-[9px] xs:text-[10px] sm:text-xs font-medium bg-black/80 backdrop-blur-sm rounded-full text-gray-300 border border-white/10">
                          {categoryLabels[product.category] || product.category}
                        </span>
                      </div>
                    )}

                    {/* Quick Action - Shows on hover (desktop) */}
                    <div className="absolute inset-0 items-center justify-center hidden sm:flex opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={scrollToContact}
                        className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-3 md:p-4">
                    <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-white mb-1 line-clamp-1 leading-tight">
                      {product.name}
                    </h3>
                    
                    {/* Description - Hidden on smallest screens */}
                    <p className="hidden sm:block text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {product.price ? (
                          <p className="text-sm xs:text-base sm:text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent truncate">
                            KES {product.price.toLocaleString()}
                          </p>
                        ) : (
                          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400 truncate">Request price</p>
                        )}
                      </div>
                      
                      {/* Inquire button - Always visible on mobile */}
                      <button
                        onClick={scrollToContact}
                        className="flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 touch-manipulation"
                        aria-label="Inquire about product"
                      >
                        <svg
                          className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-10 sm:py-16 md:py-20 px-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-md mx-auto">
                {activeCategory === "all"
                  ? "No products available yet."
                  : "No products in this category."}
              </p>
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="mt-4 sm:mt-5 md:mt-6 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gray-900 text-white text-xs sm:text-sm rounded-xl hover:bg-gray-800 transition-colors min-h-[40px] touch-manipulation"
                >
                  View All
                </button>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        {visibleProducts.length > 0 && (
          <div
            className={`text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs sm:text-sm md:text-base font-semibold rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all min-h-[44px] touch-manipulation"
            >
              <span className="hidden sm:inline">Can&apos;t find what you need?</span>
              <span className="sm:hidden">Need something else?</span>
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Hide scrollbar but keep functionality */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-start {
          scroll-snap-align: start;
        }
      `}</style>
    </section>
  );
}