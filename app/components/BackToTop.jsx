"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-4 w-11 h-11 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg hover:-translate-y-1 z-40"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
