"use client";

import { useState, useEffect, useRef, useId } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface Product {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price?: number;
  image_url?: string;
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export const categoryLabels: Record<string, string> = {
  engine: "Engine",
  exterior: "Exterior",
  interior: "Interior",
  electronics: "Electronics",
};

// Mock products with relevant images
export const mockProducts: Product[] = [
  // ENGINE CATEGORY
  {
    id: "1",
    name: "High Performance Air Filter",
    category: "engine",
    description: "K&N style high-flow air filter for improved engine breathing.",
    price: 4500,
    image_url: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80", // Engine air filter / engine bay
  },
  {
    id: "2",
    name: "Performance Exhaust System",
    category: "engine",
    description: "Stainless steel cat-back exhaust with deep tone.",
    price: 35000,
    image_url: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80", // Exhaust pipes
  },
  {
    id: "3",
    name: "Turbo Intercooler Kit",
    category: "engine",
    description: "Front-mount intercooler for turbocharged engines.",
    price: 28000,
    image_url: "https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=800&q=80", // Turbo/intercooler setup
  },

  // EXTERIOR CATEGORY
  {
    id: "4",
    name: "Carbon Fiber Hood",
    category: "exterior",
    description: "Lightweight carbon fiber hood with aggressive vents.",
    price: 85000,
    image_url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", // Carbon fiber car hood
  },
  {
    id: "5",
    name: "LED Headlight Kit",
    category: "exterior",
    description: "6000K LED headlight bulbs. Plug and play.",
    price: 8500,
    image_url: "https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?w=800&q=80", // Car LED headlights
  },
  {
    id: "6",
    name: "Wide Body Fender Flares",
    category: "exterior",
    description: "ABS plastic fender flares for wide body look.",
    price: 22000,
    image_url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80", // Wide body car fenders
  },

  // INTERIOR CATEGORY
  {
    id: "7",
    name: "Racing Bucket Seats",
    category: "interior",
    description: "FIA approved racing seats with Alcantara finish.",
    price: 65000,
    image_url: "https://res.cloudinary.com/dgumz7yur/image/upload/v1766331305/headlights_lp0cwl.jpg", // Racing bucket seats
  },
  {
    id: "8",
    name: "Quick Release Steering",
    category: "interior",
    description: "350mm flat-bottom wheel with quick release hub.",
    price: 15000,
    image_url: "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&q=80", // Sports steering wheel
  },
  {
    id: "9",
    name: "Carbon Fiber Trim Kit",
    category: "interior",
    description: "Real carbon fiber interior trim pieces.",
    price: 18000,
    image_url: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&q=80", // Carbon fiber interior trim
  },

  // ELECTRONICS CATEGORY
  {
    id: "10",
    name: "Android Auto Head Unit",
    category: "electronics",
    description: "10.1 inch touchscreen with CarPlay and GPS.",
    price: 32000,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", // Car touchscreen/infotainment
  },
  {
    id: "11",
    name: "360° Camera System",
    category: "electronics",
    description: "Bird's eye view camera with parking sensors.",
    price: 25000,
    image_url: "https://res.cloudinary.com/dgumz7yur/image/upload/v1767652210/laser_jets_g3ug1t.jpg", // Car camera/parking view
  },
  {
    id: "12",
    name: "Performance ECU Tune",
    category: "electronics",
    description: "Custom ECU remapping for more power.",
    price: 45000,
    image_url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80", // ECU/car electronics
  },
];



export default function Products() {
  const [allProducts] = useState<Product[]>(mockProducts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

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

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProduct(null);
      }
    }

    if (activeProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProduct]);

  useOutsideClick(modalRef, () => setActiveProduct(null));

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
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-[11px] xs:text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
                } snap-start`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
                <span
                  className={`ml-1.5 sm:ml-2 text-[9px] xs:text-[10px] sm:text-xs px-1.5 py-0.5 rounded-md ${
                    activeCategory === cat.id ? "bg-white/20" : "bg-gray-800"
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Expandable Cards Modal */}
        <AnimatePresence>
          {activeProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm h-full w-full z-50"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeProduct ? (
            <div className="fixed inset-0 grid place-items-center z-[100] p-4">
              <motion.button
                key={`button-${activeProduct.id}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-10 w-10 z-10"
                onClick={() => setActiveProduct(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${activeProduct.id}-${id}`}
                ref={modalRef}
                className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-gray-900 border border-gray-800 sm:rounded-3xl overflow-hidden"
              >
                <motion.div layoutId={`image-${activeProduct.id}-${id}`} className="relative h-80 lg:h-96">
                  {activeProduct.image_url ? (
                    <Image
                      src={activeProduct.image_url}
                      alt={activeProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="w-24 h-24 rounded-2xl bg-red-500/10 flex items-center justify-center">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>

                <div className="flex-1 overflow-y-auto">
                  <div className="flex justify-between items-start p-6">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${activeProduct.id}-${id}`}
                        className="text-2xl font-bold text-white mb-2"
                      >
                        {activeProduct.name}
                      </motion.h3>
                      {activeProduct.category && (
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full mb-3">
                          {categoryLabels[activeProduct.category] || activeProduct.category}
                        </span>
                      )}
                      {activeProduct.price && (
                        <motion.p
                          layoutId={`price-${activeProduct.id}-${id}`}
                          className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                        >
                          KES {activeProduct.price.toLocaleString()}
                        </motion.p>
                      )}
                    </div>
                    <motion.button
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={scrollToContact}
                      className="px-6 py-3 text-sm rounded-full font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:shadow-red-500/25 transition-all ml-4"
                    >
                      Inquire
                    </motion.button>
                  </div>
                  <div className="px-6 pb-6">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-gray-300 text-base leading-relaxed"
                    >
                      {activeProduct.description ? (
                        <p>{activeProduct.description}</p>
                      ) : (
                        <p className="text-gray-500">No description available.</p>
                      )}
                      <div className="mt-6 pt-6 border-t border-gray-800">
                        <p className="text-sm text-gray-400">
                          Interested in this product? Click the &quot;Inquire&quot; button to get in touch with us for more information and pricing details.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        {/* Products Grid */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
              {visibleProducts.map((product, idx) => (
                <motion.div
                  layoutId={`card-${product.id}-${id}`}
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: idx * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-800/50 overflow-hidden hover:border-red-500/30 transition-all duration-500 w-full cursor-pointer"
                >
                  {/* Image */}
                  <motion.div layoutId={`image-${product.id}-${id}`} className="relative aspect-square bg-gray-800 overflow-hidden">
                    {product.image_url ? (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full"
                      >
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-red-500/10 flex items-center justify-center">
                          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    {product.category && (
                      <div className="absolute top-1.5 left-1.5 sm:top-2 md:top-3 left-2 sm:left-3 z-10">
                        <span className="px-1.5 py-0.5 sm:px-2 md:px-2.5 sm:py-0.5 md:py-1 text-[9px] xs:text-[10px] sm:text-xs font-medium bg-black/80 backdrop-blur-sm rounded-full text-gray-300 border border-white/10">
                          {categoryLabels[product.category] || product.category}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="p-2 sm:p-3 md:p-4">
                    <motion.h3 layoutId={`title-${product.id}-${id}`} className="text-xs xs:text-sm sm:text-base font-semibold text-white mb-1 line-clamp-1 leading-tight">
                      {product.name}
                    </motion.h3>
                    
                    {/* Description */}
                    <p className="hidden sm:block text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {product.price ? (
                          <motion.p layoutId={`price-${product.id}-${id}`} className="text-sm xs:text-base sm:text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent truncate">
                            KES {product.price.toLocaleString()}
                          </motion.p>
                        ) : (
                          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400 truncate">Request price</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
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