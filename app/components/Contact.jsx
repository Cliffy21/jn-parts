"use client";

import { useState } from "react";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const titleRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const contactInfoRef = useInViewAnimation({ animation: "animate-fadeInUp" });
  const formRef = useInViewAnimation({ animation: "animate-fadeInUp" });

  function handleSubmit(e) {
    e.preventDefault();
    // later: send to Flask backend
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    e.target.reset();
  }

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold text-center mb-12 opacity-0"
        >
          Get Your{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Free Quote
          </span>
        </h2>

        <div ref={contactInfoRef} className="grid md:grid-cols-3 gap-4 mb-10 opacity-0">
          <div className="flex items-center gap-3 justify-center p-4 bg-gray-900 rounded-lg border border-white/10 hover:border-red-500/50">
            <svg
              className="text-red-500 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>+254741509156</span>
          </div>
          <div className="flex items-center gap-3 justify-center p-4 bg-gray-900 rounded-lg border border-white/10 hover:border-red-500/50">
            <svg
              className="text-red-500 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>jncarparts301@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 justify-center p-4 bg-gray-900 rounded-lg border border-white/10 hover:border-red-500/50">
            <svg
              className="text-red-500 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Nairobi, Kenya</span>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-white/10 space-y-6 opacity-0"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your Name"
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm"
            />
            <input
              type="tel"
              required
              placeholder="Phone Number"
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm"
            />
            <input
              type="text"
              placeholder="Vehicle Model"
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm"
            />
          </div>
          <textarea
            rows={4}
            placeholder="Tell us about your project..."
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm resize-none"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 py-3 rounded-lg font-bold text-lg hover:scale-105 glow-red"
          >
            Request Free Quote
          </button>
        </form>

        {showSuccess && (
          <div className="fixed top-24 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg">
            Message sent successfully!
          </div>
        )}
      </div>
    </section>
  );
}

