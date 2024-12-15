import { useEffect, useRef, useState } from "react";

export function useInView(options = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once element has been seen, we can stop observing
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "-10% 0px -10% 0px",
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isInView };
}
