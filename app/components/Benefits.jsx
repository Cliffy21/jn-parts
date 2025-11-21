"use client";

import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

export default function Benefits() {
  const titleRef = useInViewAnimation({ animation: "animate-fadeInLeft" });
  const bulletsRef = useInViewAnimation({ animation: "animate-fadeInLeft" });
  const imageRef = useInViewAnimation({ animation: "animate-fadeInRight" });

  const bullets = [
    "Premium 3M & Avery Dennison materials",
    "5-7 year durability guarantee",
    "Professional certified installers",
    "Paint protection & resale value",
    "Unlimited color & finish options",
    "Complete warranty coverage",
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl font-bold mb-6 opacity-0"
          >
            Why Choose{" "}
            <span className="text-red-500">JN parts & accessories?</span>
          </h2>
          <div ref={bulletsRef} className="space-y-3 opacity-0">
            {bullets.map((b) => (
              <div key={b} className="flex items-center gap-3 text-base">
                <svg
                  className="text-red-500 flex-shrink-0 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div ref={imageRef} className="relative h-80 opacity-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl animate-pulse opacity-20 blur-3xl" />
          <div className="relative rounded-3xl overflow-hidden h-full border-4 border-red-500/30">
            <Image
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80"
              alt="Luxury car showcase"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end justify-center p-8">
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-red-500 mx-auto mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <p className="text-3xl font-bold">1000+</p>
                <p className="text-gray-300">Vehicles Wrapped</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
