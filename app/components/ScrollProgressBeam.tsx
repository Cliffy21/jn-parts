"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export default function ScrollProgressBeam() {
  const [heroEnd, setHeroEnd] = useState(0);
  const [scrollableHeight, setScrollableHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Track scroll progress
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calculateDimensions = () => {
      // Wait a bit for DOM to be ready
      requestAnimationFrame(() => {
        const heroSection = document.querySelector("main > section:first-of-type");
        const footer = document.querySelector("footer");
        
        if (!heroSection) {
          // Fallback: use viewport height
          const viewportHeight = window.innerHeight;
          setHeroEnd(viewportHeight);
          setScrollableHeight(Math.max(0, document.documentElement.scrollHeight - viewportHeight - 100));
          return;
        }

        const heroRect = heroSection.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const heroEndPos = scrollY + heroRect.bottom;

        let height = 0;
        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          const footerTop = scrollY + footerRect.top;
          height = Math.max(0, footerTop - heroEndPos - 50);
        } else {
          height = Math.max(0, document.documentElement.scrollHeight - heroEndPos - 100);
        }

        setHeroEnd(heroEndPos);
        setScrollableHeight(height);
      });
    };

    // Calculate after DOM is ready with multiple attempts
    const timer1 = setTimeout(calculateDimensions, 100);
    const timer2 = setTimeout(calculateDimensions, 500);
    const timer3 = setTimeout(calculateDimensions, 1000);
    
    window.addEventListener("resize", calculateDimensions);
    window.addEventListener("scroll", calculateDimensions, { passive: true });
    window.addEventListener("load", calculateDimensions);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", calculateDimensions);
      window.removeEventListener("scroll", calculateDimensions);
      window.removeEventListener("load", calculateDimensions);
    };
  }, [isMounted]);

  // Animated progress
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Fallback progress for when dimensions aren't calculated yet
  const fallbackHeight = useTransform(progress, (p) => `${p * 100}%`);
  const fallbackTop = useTransform(progress, (p) => `${p * 100}%`);

  // Calculate beam height based on scroll progress
  const beamHeight = useTransform(progress, (p) => {
    if (!isMounted || scrollableHeight === 0) return 0;
    // Only show progress after scrolling past hero
    const scrollPos = p * (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollPos < heroEnd) return 0;
    const scrolledPastHero = scrollPos - heroEnd;
    return Math.min(scrolledPastHero, scrollableHeight);
  });

  // Calculate dot position
  const dotPosition = useTransform(progress, (p) => {
    if (!isMounted || scrollableHeight === 0) return heroEnd;
    const scrollPos = p * (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollPos < heroEnd) return heroEnd;
    return Math.min(heroEnd + (scrollPos - heroEnd), heroEnd + scrollableHeight);
  });

  if (!isMounted) {
    return null;
  }

  // Show a minimal version even if calculations aren't perfect
  if (heroEnd === 0 || scrollableHeight <= 0) {
    // Fallback: show a simple progress indicator
    return (
      <div className="fixed right-4 sm:right-6 md:right-8 top-0 bottom-0 w-px pointer-events-none z-30 hidden lg:block">
        <div className="absolute left-1/2 -translate-x-1/2 w-px bg-gray-800/20 top-0 bottom-0" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-red-500 shadow-lg shadow-red-500/30"
          style={{
            height: fallbackHeight,
          }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/50 ring-2 ring-red-500/20"
          style={{
            top: fallbackTop,
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed right-4 sm:right-6 md:right-8 top-0 bottom-0 w-px pointer-events-none z-30 hidden lg:block">
      {/* Static background line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-px bg-gray-800/20"
        style={{
          top: `${heroEnd}px`,
          height: `${scrollableHeight}px`,
        }}
      />

      {/* Animated progress beam */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-red-500 shadow-lg shadow-red-500/30"
        style={{
          top: `${heroEnd}px`,
          height: beamHeight,
        }}
      />

      {/* Animated progress dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/50 ring-2 ring-red-500/20"
        style={{
          top: dotPosition,
        }}
      />
    </div>
  );
}
