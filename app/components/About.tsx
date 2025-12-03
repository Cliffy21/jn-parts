"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

export default function About() {
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const contentRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const imageRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = Number(el.dataset.target || "0");
            const suffix = el.dataset.suffix || "";
            let current = 0;
            const step = target / 50;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                el.textContent = target + suffix;
                clearInterval(timer);
              } else {
                el.textContent = Math.floor(current) + suffix;
              }
            }, 30);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsRef.current.forEach((el) => el && obs.observe(el));

    return () => obs.disconnect();
  }, []);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    statsRef.current[index] = el;
  };

  const stats = [
    { value: 1000, suffix: "+", label: "Happy Customers" },
    { value: 5000, suffix: "+", label: "Parts Installed" },
    { value: 15, suffix: "", label: "Years Experience" },
  ];

  return (
    <section id="about" className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative opacity-0 order-2 lg:order-1">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-[2rem] blur-2xl" />

            {/* Main Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"
                  alt="Auto parts workshop"
                  fill
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">Certified</p>
                    <p className="text-gray-500 text-sm">Quality Assured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <div ref={titleRef} className="opacity-0">

              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Your Trusted Partner for{" "}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Premium Auto Parts
                </span>
              </h2>
            </div>

            <div ref={contentRef} className="mt-6 opacity-0">
              <p className="text-gray-400 text-lg leading-relaxed">
                With years of experience in the automotive industry, JN Parts &
                Accessories has established itself as a trusted name in Kenya for
                premium vehicle parts and accessories. We specialize in providing
                high-quality automotive components that enhance both performance
                and aesthetics.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mt-4">
                Our commitment to excellence, combined with expert installation
                services, ensures that every customer receives the best value for
                their investment.
              </p>

              {/* Feature List */}
              <div className="mt-8 space-y-4">
                {[
                  "Genuine parts from reputable manufacturers",
                  "Professional installation by certified technicians",
                  "Competitive pricing with warranty coverage",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-shadow"
              >
                Get in Touch
                <svg
                  className="w-4 h-4"
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
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative text-center py-8 px-4 rounded-2xl border border-white/5 bg-gray-900/50">
                <div
                  data-target={stat.value}
                  data-suffix={stat.suffix}
                  ref={(el) => setRef(el, idx)}
                  className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                >
                  0
                </div>
                <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}