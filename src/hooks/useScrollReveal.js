import { useEffect, useRef } from 'react';

/**
 * Custom hook to trigger fade-up-on-scroll using IntersectionObserver.
 * Adheres to Apple-style subtle motion and respects prefers-reduced-motion.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If user prefers reduced motion, reveal immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-revealed');
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return ref;
}
