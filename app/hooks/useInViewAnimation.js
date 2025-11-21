import { useEffect, useRef } from "react";

export function useInViewAnimation(options = {}) {
  const ref = useRef(null);
  const {
    threshold = 0.1,
    rootMargin = "0px",
    animation = "animate-fadeIn",
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animation);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animation, threshold, rootMargin]);

  return ref;
}
