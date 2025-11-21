"use client";

import { useEffect, useState } from "react";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

const testimonials = [
  {
    initials: "JM",
    name: "John Mwangi",
    location: "Nairobi",
    text: "Excellent service and quality parts! My car runs like new after the upgrades. Highly recommend JN parts & accessories.",
  },
  {
    initials: "SK",
    name: "Sarah Kamau",
    location: "Mombasa",
    text: "Professional installation and great customer service. The team really knows their stuff. My vehicle looks amazing!",
  },
  {
    initials: "DK",
    name: "David Kipchoge",
    location: "Kisumu",
    text: "Best prices in town and genuine parts. Fast delivery and installation. Will definitely come back for more upgrades!",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const cardRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  function next() {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section
      id="testimonials"
      className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold text-center mb-14 opacity-0"
        >
          What Our{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Customers Say
          </span>
        </h2>

        <div
          ref={cardRef}
          className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 opacity-0"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-xl font-bold">
              {t.initials}
            </div>
            <div>
              <h4 className="text-lg font-bold">{t.name}</h4>
              <p className="text-gray-400 text-sm">{t.location}</p>
            </div>
          </div>
          <div className="flex mb-4 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-300">{t.text}</p>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
