"use client";

import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import SkeletonCard from "./SkeletonCard";
import CarouselCard from "./CarouselCard";

interface Product { 
  id: string;
  title: string;
  description: string;
  price?: number;
  installation_cost?: number;
  images: string[];
}

interface Props {
  products: Product[];
  loading?: boolean;
}

export default function ProductShowcase({ products, loading }: Props) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 360);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔁 Skeleton loader that keeps layout height
  if (loading) {
    return (
      <div className="min-h-[420px] sm:min-h-[520px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // 🔁 Grid fallback for VERY small screens
  if (isSmallScreen) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {products.map((p) => (
          <CarouselCard key={p.id} product={p} />
        ))}
      </div>
    );
  }

  // 🎠 Carousel path
  return (
    <div className="relative min-h-[420px] sm:min-h-[520px]">
      <Carousel
        items={products.map((p) => (
          <CarouselCard key={p.id} product={p} />
        ))}
      />
    </div>
  );
}
