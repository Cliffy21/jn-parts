"use client";

import { useState } from "react";
import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

const categoryLabels: Record<string, string> = {
  engine: "Engine Parts",
  exterior: "Exterior",
  interior: "Interior",
  electronics: "Electronics",
};

interface Product {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price?: number;
  image_url?: string;
}

// ============================================
// MOCK DATA - Replace image URLs with your Cloudinary URLs
// ============================================
const mockProducts: Product[] = [
  // Engine Parts
  {
    id: "1",
    name: "High Performance Air Filter",
    category: "engine",
    description: "K&N style high-flow air filter for improved engine breathing and performance.",
    price: 4500,
    image_url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
  },
  {
    id: "2",
    name: "Performance Exhaust System",
    category: "engine",
    description: "Stainless steel cat-back exhaust system with deep tone and improved flow.",
    price: 35000,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "3",
    name: "Turbo Intercooler Kit",
    category: "engine",
    description: "Front-mount intercooler kit for turbocharged engines. Improved cooling efficiency.",
    price: 28000,
    image_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
  // Exterior
  {
    id: "4",
    name: "Carbon Fiber Hood",
    category: "exterior",
    description: "Lightweight carbon fiber hood with aggressive vents. Reduces weight by 15kg.",
    price: 85000,
    image_url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
  },
  {
    id: "5",
    name: "LED Headlight Conversion Kit",
    category: "exterior",
    description: "6000K LED headlight bulbs with canbus adapters. Plug and play installation.",
    price: 8500,
    image_url: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80",
  },
  {
    id: "6",
    name: "Wide Body Fender Flares",
    category: "exterior",
    description: "ABS plastic fender flares for aggressive wide body look. Universal fit.",
    price: 22000,
    image_url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  },
  // Interior
  {
    id: "7",
    name: "Racing Bucket Seats (Pair)",
    category: "interior",
    description: "FIA approved racing bucket seats with side mounts. Alcantara finish.",
    price: 65000,
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
  {
    id: "8",
    name: "Quick Release Steering Wheel",
    category: "interior",
    description: "350mm flat-bottom steering wheel with quick release hub adapter.",
    price: 15000,
    image_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
  },
  {
    id: "9",
    name: "Carbon Fiber Trim Kit",
    category: "interior",
    description: "Real carbon fiber interior trim pieces. Dashboard and door panel accents.",
    price: 18000,
    image_url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  },
  // Electronics
  {
    id: "10",
    name: "Android Auto Head Unit",
    category: "electronics",
    description: "10.1 inch touchscreen with Android Auto, Apple CarPlay, and GPS navigation.",
    price: 32000,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "11",
    name: "360° Camera System",
    category: "electronics",
    description: "Bird's eye view camera system with parking sensors and guidelines.",
    price: 25000,
    image_url: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&q=80",
  },
  {
    id: "12",
    name: "Performance ECU Tune",
    category: "electronics",
    description: "Custom ECU remapping for increased horsepower and torque. Dyno tested.",
    price: 45000,
    image_url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
];
// ============================================

// COMMENTED OUT: Original component accepted initialProducts prop from server
// export default function Products({ initialProducts = [] }: { initialProducts?: Product[] }) {

export default function Products() {
  // COMMENTED OUT: Was using props from server-side fetch
  // const [allProducts] = useState<Product[]>(initialProducts);
  
  // USING MOCK DATA INSTEAD
  const [allProducts] = useState<Product[]>(mockProducts);
  
  const [activeCategory, setActiveCategory] = useState("all");
  const headerRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const gridRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  // Derive categories from data
  const dynamicCategories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  ) as string[];

  const filters = [
    { id: "all", label: "All Products", count: allProducts.length },
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
    <section id="products" className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* REMOVED opacity-0 - was causing content to disappear */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-gray-500">
            Browse our catalog of premium vehicle parts and accessories
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-1.5 bg-gray-900/50 rounded-2xl border border-white/5">
            {filters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat.label}
                {cat.count > 0 && (
                  <span
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${
                      activeCategory === cat.id
                        ? "bg-white/20"
                        : "bg-gray-800"
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {/* REMOVED opacity-0 - was causing content to disappear */}
        <div ref={gridRef}>
          {visibleProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-gradient-to-b from-gray-900 to-gray-900/50 rounded-2xl border border-white/5 overflow-hidden hover:border-red-500/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-gray-800 overflow-hidden">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-red-500"
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

                    {/* Category Badge */}
                    {product.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur-sm rounded-full text-gray-300">
                          {categoryLabels[product.category] || product.category}
                        </span>
                      </div>
                    )}

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={scrollToContact}
                        className="px-6 py-3 bg-white text-black font-semibold rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        Inquire Now
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        {product.price ? (
                          <>
                            <p className="text-xs text-gray-500">Price</p>
                            <p className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                              KES {product.price.toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-400">Request for price</p>
                        )}
                      </div>
                      <button
                        onClick={scrollToContact}
                        className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                        aria-label="Inquire about product"
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
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-gray-700"
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
              <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {activeCategory === "all"
                  ? "No products available yet. Check back soon!"
                  : "No products in this category. Try selecting a different filter."}
              </p>
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  View All Products
                </button>
              )}
            </div>
          )}
        </div>

        {/* View More CTA */}
        {visibleProducts.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-shadow"
            >
              Can&apos;t find what you need?
              <svg
                className="w-5 h-5"
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
    </section>
  );
}