import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { reducedMotion, scrollToTop, ScrollTrigger } from '../lib/motion.js';

function normalize(hash) {
  const path = hash.replace(/^#/, '');
  return path === '' ? '/' : path;
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => normalize(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      const next = normalize(window.location.hash);
      if (document.startViewTransition && !reducedMotion) {
        document.startViewTransition(() => flushSync(() => setRoute(next)));
      } else {
        setRoute(next);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    scrollToTop(true);
    ScrollTrigger.refresh();
  }, [route]);

  return route;
}
