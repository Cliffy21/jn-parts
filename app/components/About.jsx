"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

export default function About() {
  const titleRef = useInViewAnimation({ animation: "animate-fadeInLeft" });
  const contentRef = useInViewAnimation({ animation: "animate-fadeInLeft" });
  const imageRef = useInViewAnimation({ animation: "animate-fadeInRight" });
  const statsRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = Number(el.dataset.target || "0");
            let current = 0;
            const step = target / 40;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                el.textContent = target + (target >= 1000 ? "+" : "");
                clearInterval(timer);
              } else {
                el.textContent =
                  Math.floor(current) + (target >= 1000 ? "+" : "");
              }
            }, 40);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsRef.current.forEach((el) => el && obs.observe(el));

    return () => obs.disconnect();
  }, []);

  const setRef = (el, index) => {
    statsRef.current[index] = el;
  };

  return (
    <section
      id="about"
      className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold mb-6 opacity-0"
          >
            About{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              JN parts & accessories
            </span>
          </h2>
          <div ref={contentRef} className="opacity-0">
            <p className="text-gray-300 text-lg mb-4">
              With years of experience in the automotive industry, JN parts &
              accessories has established itself as a trusted name in Kenya for
              premium vehicle parts and accessories. We specialize in providing
              high-quality automotive components that enhance both performance and
              aesthetics.
            </p>
            <p className="text-gray-300 text-lg">
              Our commitment to excellence, combined with expert installation
              services, ensures that every customer receives the best value for
              their investment. We source only the finest parts from reputable
              manufacturers worldwide.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div
                data-target="1000"
                ref={(el) => setRef(el, 0)}
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
              >
                0
              </div>
              <p className="text-gray-400 text-sm mt-1">Happy Customers</p>
            </div>
            <div className="text-center">
              <div
                data-target="5000"
                ref={(el) => setRef(el, 1)}
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
              >
                0
              </div>
              <p className="text-gray-400 text-sm mt-1">Parts Installed</p>
            </div>
            <div className="text-center">
              <div
                data-target="15"
                ref={(el) => setRef(el, 2)}
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
              >
                0
              </div>
              <p className="text-gray-400 text-sm mt-1">Years Experience</p>
            </div>
          </div>
        </div>
        <div ref={imageRef} className="relative opacity-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl opacity-20 blur-3xl" />
          <div className="relative rounded-3xl overflow-hidden border-4 border-red-500/30">
            <Image
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80"
              alt="Auto parts workshop"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
