import { useEffect, useRef } from 'react';

const count = window.matchMedia('(pointer: coarse), (max-width: 767px)').matches ? 3000 : 8000;

export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    // Same attributes three asks for; the context is reused, so request it once here.
    // Without WebGL2 the canvas stays transparent and the hero shows type only.
    if (!canvas.getContext('webgl2', { antialias: false })) return;

    let cancelled = false;
    const hero = import('../hero/ParticleHero.js')
      .then(({ createParticleHero }) =>
        cancelled ? null : createParticleHero(canvas, { count, trigger: canvas.closest('.hero-section') }))
      .then((instance) => {
        if (!cancelled) {
          canvas.classList.add('is-ready');
          return instance;
        }
        instance?.destroy();
        return null;
      });

    return () => {
      cancelled = true;
      hero.then((instance) => instance?.destroy());
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
