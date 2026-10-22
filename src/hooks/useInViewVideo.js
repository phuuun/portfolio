import { useEffect, useRef } from 'react';
import { reducedMotion } from '../lib/motion';

// Plays the video while at least 25% of it is visible. Under reduced motion it never autoplays.
export function useInViewVideo() {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.intersectionRatio >= 0.25 ? video.play().catch(() => {}) : video.pause()),
      { threshold: [0, 0.25] },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return ref;
}
