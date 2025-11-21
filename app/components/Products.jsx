"use client";

import { useState } from "react";
import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

const products = [
  {
    name: "Vehicle Wraps",
    category: "exterior",
    price: "From KES 45,000",
    desc: "Premium vinyl wraps in any color, pattern, or custom design",
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80",
  },
  {
    name: "Paint Protection Film",
    category: "exterior",
    price: "From KES 35,000",
    desc: "TPU self-healing films - 7.5 & 8.5 mils thick for ultimate protection",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80",
  },
  {
    name: "LED Lighting Kits",
    category: "electronics",
    price: "From KES 8,000",
    desc: "Premium LED upgrades for interior and exterior styling",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
  },
  {
    name: "Engine Fluids",
    category: "engine",
    price: "From KES 3,500",
    desc: "High-quality synthetic and conventional engine oils",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
  },
  {
    name: "Transmission Fluids",
    category: "engine",
    price: "From KES 4,000",
    desc: "Premium transmission fluids for automatic and manual vehicles",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
  },
  {
    name: "Laser Door Projectors",
    category: "electronics",
    price: "From KES 5,000",
    desc: "Custom logo projectors with wireless installation",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
  },
  {
    name: "Window Tints",
    category: "exterior",
    price: "From KES 15,000",
    desc: "Professional tinting with UV protection and privacy",
    image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=800&q=80",
  },
  {
    name: "Performance Exhaust Systems",
    category: "engine",
    price: "From KES 15,000",
    desc: "High-quality exhaust systems for enhanced performance and sound",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    name: "Body Kits & Spoilers",
    category: "exterior",
    price: "From KES 25,000",
    desc: "Custom body modifications to enhance your vehicle's appearance",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
  {
    name: "Premium Seats & Upholstery",
    category: "interior",
    price: "From KES 30,000",
    desc: "Luxury seating options and custom interior upgrades",
    image: "https://images.unsplash.com/photo-1449130015084-2dc954ed6f17?w=800&q=80",
  },
  {
    name: "Car Audio Systems",
    category: "electronics",
    price: "From KES 20,000",
    desc: "Premium sound systems and multimedia upgrades",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
  },
  {
    name: "Air Intake Systems",
    category: "engine",
    price: "From KES 12,000",
    desc: "High-performance air filters and intake upgrades",
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=800&q=80",
  },
];

const categories = [
  { id: "all", label: "All Products" },
  { id: "engine", label: "Engine Parts" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "electronics", label: "Electronics" },
];

export default function Products() {
  const [active, setActive] = useState("all");
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const descRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const filtersRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const gridRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section id="products" className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold text-center mb-4 opacity-0"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Products
          </span>
        </h2>
        <p
          ref={descRef}
          className="text-center text-gray-400 mb-10 opacity-0 text-lg"
        >
          Browse our catalog of premium vehicle parts and accessories
        </p>

        {/* Filters */}
        <div
          ref={filtersRef}
          className="flex flex-wrap justify-center gap-3 mb-10 opacity-0"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-300 ${
                active === cat.id
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-transparent shadow-lg shadow-red-500/50 scale-105"
                  : "bg-gray-900 border-white/10 hover:border-red-500/50 hover:scale-105"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0">
          {filtered.map((p, idx) => (
            <div
              key={p.name}
              className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 hover:border-red-500/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-red-500/20"
              style={{
                animationDelay: `${idx * 50}ms`
              }}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-semibold">
                  {categories.find(c => c.id === p.category)?.label}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {p.name}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {p.desc}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-red-500 font-bold text-lg">
                    {p.price}
                  </span>
                  <button
                    className="px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg hover:scale-105 transition-transform duration-300 text-sm font-semibold shadow-lg hover:shadow-red-500/50"
                    onClick={() =>
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when filtered */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
}