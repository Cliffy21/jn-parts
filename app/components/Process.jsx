"use client";

import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

export default function Process() {
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const stepsRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  const steps = [
    { title: "Consultation", desc: "Discuss your needs with our experts." },
    { title: "Selection", desc: "Choose from our range of premium products." },
    {
      title: "Installation",
      desc: "Professional installation by certified technicians.",
    },
    {
      title: "Enjoy",
      desc: "Experience the transformation of your vehicle.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold text-center mb-14 opacity-0"
        >
          How It{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Works
          </span>
        </h2>
        <div ref={stepsRef} className="grid md:grid-cols-4 gap-8 opacity-0">
          {steps.map((s, idx) => (
            <div key={s.title} className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl sm:text-3xl font-bold">
                {idx + 1}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
