"use client";

import { useRef } from "react";

interface Props {
  items: React.ReactNode[];
}

export default function Carousel({ items }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="
          flex gap-4
          overflow-x-auto
          snap-x snap-mandatory
          scroll-smooth
          touch-pan-x
          overscroll-x-contain
          px-4
          [-webkit-overflow-scrolling:touch]
        "
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="
              snap-center
              min-w-[85vw] sm:min-w-[60vw] lg:min-w-[33vw]
              flex-shrink-0
            "
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
