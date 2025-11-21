"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useInViewAnimation } from "@/app/hooks/useInViewAnimation";

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [displayedText2, setDisplayedText2] = useState("");
  const [displayedDesc, setDisplayedDesc] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showDescCursor, setShowDescCursor] = useState(false);
  const fullText1 = "TRANSFORM";
  const fullText2 = "YOUR RIDE";
  const fullDesc = "Premium Vehicle Parts & Accessories · Quality Guaranteed · Expert Installation";

  const buttonsRef = useInViewAnimation({
    animation: "animate-fadeInUp",
    threshold: 0.1,
  });

  useEffect(() => {
    let currentIndex = 0;
    let isFirstLine = true;
    let isSecondLine = false;
    let isDescription = false;

    const typingInterval = setInterval(() => {
      if (isFirstLine) {
        if (currentIndex < fullText1.length) {
          setDisplayedText(fullText1.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          isFirstLine = false;
          isSecondLine = true;
          currentIndex = 0;
        }
      } else if (isSecondLine) {
        if (currentIndex < fullText2.length) {
          setDisplayedText2(fullText2.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          isSecondLine = false;
          isDescription = true;
          currentIndex = 0;
          setShowCursor(false);
          setShowDescCursor(true);
          // Small pause before description
          setTimeout(() => {}, 300);
        }
      } else if (isDescription) {
        if (currentIndex < fullDesc.length) {
          setDisplayedDesc(fullDesc.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          // Keep cursor blinking for a bit then hide
          setTimeout(() => setShowDescCursor(false), 2000);
        }
      }
    }, 80); // Typing speed

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
      setShowDescCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-[95vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt="Luxury sports car"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-red-900/40 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 drop-shadow-lg min-h-[200px] flex flex-col items-center justify-center">
          <span className="animate-gradient inline-block">
            {displayedText}
            {displayedText.length < fullText1.length && showCursor && (
              <span className="inline-block w-1 h-[0.9em] bg-red-500 ml-1 animate-pulse" />
            )}
          </span>
          <br />
          <span className="animate-gradient inline-block">
            {displayedText2}
            {displayedText.length === fullText1.length && 
             displayedText2.length < fullText2.length && 
             showCursor && (
              <span className="inline-block w-1 h-[0.9em] bg-red-500 ml-1 animate-pulse" />
            )}
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 min-h-[60px]">
          {displayedDesc}
          {displayedText2.length === fullText2.length && 
           showDescCursor && (
            <span className="inline-block w-0.5 h-[1em] bg-gray-300 ml-1 animate-pulse" />
          )}
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
        >
          <button
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3 rounded-full text-base sm:text-lg font-bold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-red-500/50"
          >
            Browse Products →
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-2 border-red-500 px-8 py-3 rounded-full text-base sm:text-lg font-bold hover:bg-red-500/10 transition-all duration-300"
          >
            Get Quote
          </button>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center items-start">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-1 animate-bounce" />
        </div>
      </div>
    </section>
  );
}