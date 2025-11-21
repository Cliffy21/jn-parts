"use client";

import { useState } from "react";
import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

const items = [
  {
    title: "Matte Red Supercar",
    image:
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80",
    overlay: "from-red-600/80",
  },
  {
    title: "Gloss Blue Sports",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    overlay: "from-blue-600/80",
  },
  {
    title: "Matte Red Supercar",
    image:
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80",
    overlay: "from-red-600/80",
  },
  {
    title: "Gloss Blue Sports",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    overlay: "from-blue-600/80",
  },
  {
    title: "Satin Purple Beast",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    overlay: "from-purple-600/80",
  },
  {
    title: "Racing Green Classic",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    overlay: "from-green-600/80",
  },
   {
    title: "Satin Purple Beast",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    overlay: "from-purple-600/80",
  },
   {
    title: "Racing Green Classic",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    overlay: "from-green-600/80",
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
          className="text-4xl sm:text-5xl font-bold text-center mb-14 opacity-0"
        >
          Recent{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Transformations
          </span>
        </h2>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0">
          {items.map((item) => (
            <button
              key={item.title}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelected(item)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${item.overlay} to-black/60`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details →
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="ml-auto mb-3 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 hover:bg-black/80"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <div className="relative max-h-[70vh]">
              <Image
                src={selected.image}
                alt={selected.title}
                width={1200}
                height={800}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-center text-2xl font-bold mt-4">
              {selected.title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}
