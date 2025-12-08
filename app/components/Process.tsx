"use client";

import { useState, useEffect, useRef } from "react";

const steps = [
  {
    title: "Consultation",
    desc: "Discuss your needs with our experts. We'll help identify the perfect upgrades for your vehicle.",
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    title: "Selection",
    desc: "Browse our curated collection of premium parts and accessories from quality brands.",
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    title: "Installation",
    desc: "Professional installation by certified technicians with guaranteed satisfaction.",
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Enjoy",
    desc: "Experience the transformation of your vehicle with enhanced performance and style.",
    icon: (
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function Process() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 bg-black"
    >
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-14 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">How It </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
            Four simple steps to upgrade your ride
          </p>
        </div>

        {/* Timeline connector - Desktop */}
        <div className="hidden lg:block absolute top-[200px] left-[12.5%] right-[12.5%] h-px bg-gray-800">
          <div
            className={`h-full bg-gradient-to-r from-red-500/50 to-orange-500/50 transition-all duration-1000 ease-out ${
              isVisible ? "w-full" : "w-0"
            }`}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className={`relative transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${idx * 100 + 200}ms` }}
              onMouseEnter={() => setActiveStep(idx)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Card */}
              <div className="group text-center lg:text-left">
                {/* Icon with number */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  {/* Icon circle */}
                  <div
                    className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeStep === idx
                        ? "bg-gradient-to-br from-red-500 to-orange-500 text-white scale-110 shadow-lg shadow-red-500/20"
                        : "bg-gray-900 text-gray-400 border border-gray-800 group-hover:border-gray-700"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step number badge */}
                  <div
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      activeStep === idx
                        ? "bg-white text-red-500"
                        : "bg-gray-800 text-gray-500 border border-gray-700"
                    }`}
                  >
                    {idx + 1}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-lg sm:text-xl font-bold mb-2 transition-colors duration-300 ${
                    activeStep === idx ? "text-white" : "text-gray-200"
                  }`}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed transition-colors duration-300 ${
                    activeStep === idx ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {step.desc}
                </p>
              </div>

              {/* Mobile connector line */}
              {idx < steps.length - 1 && (
                <div className="sm:hidden flex justify-center my-6">
                  <div className="w-px h-8 bg-gradient-to-b from-gray-700 to-gray-800" />
                </div>
              )}

              {/* Tablet connector (2 col) */}
              {idx < steps.length - 1 && idx % 2 === 0 && (
                <div className="hidden sm:block lg:hidden absolute top-8 -right-4 w-8 h-px bg-gray-800" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-14 sm:mt-16 text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors duration-300"
          >
            <span>Get started today</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
      </div>

      {/* Subtle bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
    </section>
  );
}