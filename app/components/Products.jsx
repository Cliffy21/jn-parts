"use client";

import { useEffect, useState } from "react";

const categoryLabels = {
  engine: "Engine Parts",
  exterior: "Exterior",
  interior: "Interior",
  electronics: "Electronics",
};

export default function Products({ initialProducts = [] }) {
  const [allProducts, setAllProducts] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(!initialProducts.length);
  const [error, setError] = useState(null);

  // Optional client-side refresh
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${base}/api/products`);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
        if (!allProducts.length) setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // derive categories from data
  const dynamicCategories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  );

  const filters = [
    { id: "all", label: "All Products" },
    ...dynamicCategories.map((c) => ({
      id: c,
      label: categoryLabels[c] || c.charAt(0).toUpperCase() + c.slice(1),
    })),
  ];

  const visibleProducts =
    activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Products
          </span>
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Browse our catalog of premium vehicle parts and accessories
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full border text-sm ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-transparent"
                  : "bg-gray-900 border-white/10 hover:border-red-500/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-center text-gray-400">Loading products…</p>
        )}
        {error && !loading && (
          <p className="text-center text-red-400">{error}</p>
        )}

        {/* Grid */}
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleProducts.map((p) => (
            <div
              key={p.id}
              className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-white/10 hover:border-red-500/50 transform hover:-translate-y-2"
            >
              <div className="w-full h-40 bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {p.image_url ? (
                  // just simple <img> – you can swap to next/image later
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-16 h-16 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{p.name}</h3>
              {p.description && (
                <p className="text-gray-400 mb-4 text-sm">{p.description}</p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-red-500 font-bold text-lg">
                  {p.price ? `KES ${p.price}` : "Request price"}
                </span>
                <button
                  className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 text-sm"
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
          ))}
          {!loading && !visibleProducts.length && (
            <p className="col-span-full text-center text-gray-400">
              No products available yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
