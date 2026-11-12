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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const itemsRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#15171B] py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
         
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#FF1616]">Support</p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#F7F8FD]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-[#A5A8AE]">
            Everything you need to know about our parts and services
          </p>
        </div>

        {/* FAQ Items */}
        <div ref={itemsRef} className="opacity-0">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border-b border-[#34373D] ${
                  idx === 0 ? "border-t border-[#34373D]" : ""
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-6 flex items-center justify-between gap-4 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-lg font-medium transition-colors duration-200 ${
                      isOpen ? "text-[#F7F8FD]" : "text-[#A5A8AE] group-hover:text-[#F7F8FD]"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-[#FF1616] rotate-180"
                        : "bg-[#22252A] group-hover:bg-[#2b2e34]"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-colors duration-200 ${
                        isOpen ? "text-white" : "text-[#A5A8AE]"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-[#A5A8AE] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#A5A8AE]">
            Still have questions?{" "}
            <a
              href="#contact"
              className="font-medium text-[#FF1616] transition-colors hover:text-[#D90F0F]"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}