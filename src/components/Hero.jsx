import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSplitReveal } from '../hooks/useSplitReveal';
import { gsap, reducedMotion } from '../lib/motion';
import { PROJECTS } from '../data/projects.js';
import HeroCanvas from './HeroCanvas.jsx';
import './Hero.css';

const current = PROJECTS.filter((p) => p.status);
const liveDemos = PROJECTS.filter((p) => p.parts || p.links.some((l) => /demo/i.test(l.label))).length;
const featured = PROJECTS.filter((p) => p.video || p.image).sort((a, b) => b.date.localeCompare(a.date));
const canHover = window.matchMedia('(hover: hover)').matches;

export default function Hero() {
  const metaRef = useScrollReveal();
  const headlineRef = useSplitReveal();
  const workHeadingRef = useSplitReveal();

  return (
    <>
      <section id="hero" className="hero-section" aria-label="Introduction">
        <div className="hero-canvas-slot">
          <HeroCanvas />
        </div>

        <div className="hero-content">
          <p className="hero-role">Computer Science · AI</p>

          <div className="hero-bottom">
            <h1 className="hero-headline" ref={headlineRef}>I get shit done.</h1>

            <div className="hero-meta reveal" ref={metaRef}>
              <p className="hero-statement">
                Computer Science student minoring in AI. I build across machine learning, the web,
                games and hardware — whatever the problem actually needs.
              </p>

              <dl className="hero-stats">
                <div>
                  <dt>Projects</dt>
                  <dd>{PROJECTS.length}</dd>
                </div>
                <div>
                  <dt>Live demos</dt>
                  <dd>{liveDemos}</dd>
                </div>
                <div>
                  <dt>Building now</dt>
                  <dd>{current.length}</dd>
                </div>
              </dl>

              <span className="hero-scroll" aria-hidden="true">
                <span className="hero-scroll-arrow">↓</span> Scroll
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="selected-work is-inverted" aria-labelledby="selected-work-heading">
        <div className="sw-container">
          <h2 id="selected-work-heading" className="sw-heading" ref={workHeadingRef}>
            Selected work
          </h2>
          <WorkList />
          <a href="#/work" className="sw-all">
            All {PROJECTS.length} projects <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  );
}

function WorkList() {
  const previewRef = useRef(null);
  const moveRef = useRef(null);
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!canHover) return;
    const el = previewRef.current;
    // Reduced motion snaps to the cursor (quickTo with duration 0 doesn't move it)
    const follow = (prop) => reducedMotion
      ? gsap.quickSetter(el, prop, 'px')
      : gsap.quickTo(el, prop, { duration: 0.4, ease: 'power3' });
    const xTo = follow('x');
    const yTo = follow('y');
    moveRef.current = (e) => { xTo(e.clientX); yTo(e.clientY); };
    return () => gsap.killTweensOf(el);
  }, []);

  const hoverProps = canHover && {
    onMouseEnter: (e) => gsap.set(previewRef.current, { x: e.clientX, y: e.clientY }),
    onMouseMove: (e) => moveRef.current?.(e),
    onMouseLeave: () => setVisible(false),
  };

  return (
    <>
      <ol className="sw-list" {...hoverProps}>
        {featured.map((p, i) => (
          <li key={p.id}>
            <a
              href="#/work"
              className="sw-row"
              onMouseEnter={canHover ? () => { setActive(p); setVisible(true); } : undefined}
            >
              <span className="sw-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="sw-title">{p.title}</span>
              <span className="sw-cats">{p.categories.join(' · ')}</span>
              <span className="sw-status">{p.status}</span>
              <span className="sw-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>

      {canHover && (
        <div className={`sw-preview${visible ? ' is-visible' : ''}`} ref={previewRef} aria-hidden="true">
          {active?.video ? (
            <video key={active.id} src={active.video} muted autoPlay loop playsInline />
          ) : active?.image ? (
            <img key={active.id} src={active.image} alt="" />
          ) : null}
        </div>
      )}
    </>
  );
}
