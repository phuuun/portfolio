import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const lenis = reducedMotion
  ? null
  : new Lenis({ autoRaf: false, prevent: (node) => node.closest('dialog') !== null });

if (lenis) {
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);
}

export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0 });
}

export { gsap, ScrollTrigger, SplitText };
