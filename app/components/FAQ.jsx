"use client";

import { useState } from "react";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

const faqs = [
  {
    q: "What types of parts do you offer?",
    a: "We offer a wide range of vehicle parts and accessories including engine components, exterior body parts, interior upgrades, electronics, lighting systems, and performance enhancements.",
  },
  {
    q: "Do you provide installation services?",
    a: "Yes, we provide professional installation services by certified technicians. Installation fees vary depending on the complexity of the part and vehicle model.",
  },
  {
    q: "What warranty do you offer?",
    a: "All our parts come with a manufacturer's warranty. Installation work is guaranteed for 6 months. Warranty terms vary by product, so please ask for details when making your purchase.",
  },
  {
    q: "How long does installation take?",
    a: "Installation time varies by product. Simple installations like LED lights may take 1-2 hours, while complex body kits or engine modifications can take a full day or more.",
  },
  {
    q: "Do you accept custom orders?",
    a: "Yes, we accept custom orders for specialized parts and modifications. Please contact us with your requirements, and we'll provide a quote and timeline.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const itemsRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold text-center mb-14 opacity-0"
        >
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <div ref={itemsRef} className="space-y-4 opacity-0">
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={item.q}
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-white/10"
              >
                <button
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <span className="text-lg font-semibold">{item.q}</span>
                  <span
                    className={`text-red-500 transform transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-gray-300 text-sm">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
