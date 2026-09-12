import { useEffect, useState } from 'react';

function normalize(hash) {
  const path = hash.replace(/^#/, '');
  return path === '' ? '/' : path;
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => normalize(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(normalize(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  return route;
}
