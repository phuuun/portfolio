import { useEffect, useRef } from 'react';
import { gsap, SplitText, reducedMotion } from '../lib/motion';

/**
 * Reveals a headline line by line, sliding each line up from a mask.
 * autoSplit re-splits on font load and resize so lines always re-wrap cleanly.
 */
export function useSplitReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const split = SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 100,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
    });

    return () => split.revert();
  }, []);

  return ref;
}
