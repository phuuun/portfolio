import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSplitReveal } from '../hooks/useSplitReveal';
import { gsap, lenis, reducedMotion, ScrollTrigger, SplitText } from '../lib/motion';
import { PROJECTS } from '../data/projects.js';
import HeroCanvas from './HeroCanvas.jsx';
import { PartsDialog, Tags } from './Projects.jsx';
import './Hero.css';

const current = PROJECTS.filter((p) => p.status);
const liveDemos = PROJECTS.filter((p) => p.parts || p.links.some((l) => /demo/i.test(l.label))).length;
// The 4 newest finished projects with a picture. sort() is stable, so ties keep array order.
const RECENT = PROJECTS.filter((p) => !p.status && (p.video || p.image))
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 4);
const pad = (n) => String(n).padStart(2, '0');
const taglineOf = (p) => p.tagline ?? p.description.split(/(?<=[.!?])\s/)[0];

const wide = window.matchMedia('(min-width: 768px)');
const subscribeWide = (onChange) => {
  wide.addEventListener('change', onChange);
  return () => wide.removeEventListener('change', onChange);
};

export default function Hero() {
  const metaRef = useScrollReveal();
  const headlineRef = useSplitReveal();

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

      <RecentWork />
    </>
  );
}

function RecentWork() {
  const isWide = useSyncExternalStore(subscribeWide, () => wide.matches);

  return (
    <section className="recent-work is-inverted" aria-labelledby="recent-work-heading">
      {isWide && !reducedMotion ? <Showcase /> : <Cards />}
    </section>
  );
}

function AllLink() {
  return (
    <a href="#/work" className="rw-all">
      All {PROJECTS.length} projects <span className="rw-all-arrow" aria-hidden="true">→</span>
    </a>
  );
}

function Heading() {
  const ref = useSplitReveal();
  return (
    <h2 id="recent-work-heading" className="rw-heading" ref={ref}>
      Recent work
    </h2>
  );
}

// Desktop: the section pins and each scroll step swaps in the next project.
function Showcase() {
  const pinRef = useRef(null);
  const frameRef = useRef(null);
  const textRef = useRef(null);
  const [active, setActive] = useState(0);
  const project = RECENT[active];

  // Layout effect, so the pin spacer is unwrapped before React removes the node.
  // The wrapper <div> stays React's, ScrollTrigger only ever touches what's inside it.
  useLayoutEffect(() => {
    const steps = RECENT.length - 1;
    const st = ScrollTrigger.create({
      trigger: pinRef.current,
      pin: true,
      start: 'top top',
      end: '+=' + steps * 100 + '%',
      scrub: true,
      snap: {
        snapTo: 1 / steps,
        duration: 0.4,
        ease: 'power2.inOut',
        // Lenis is often still easing its last pixel when the snap starts. Left running, it nudges
        // the scroll back by a pixel, flips the direction and the snap reverses to the previous step.
        onStart: () => lenis?.scrollTo(window.scrollY, { immediate: true }),
      },
      onUpdate: (self) => setActive(Math.round(self.progress * steps)),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    [...frameRef.current.children].forEach((m, i) => {
      if (m.tagName !== 'VIDEO') return;
      if (i === active) m.play().catch(() => {});
      else m.pause();
    });
  }, [active]);

  // The text block is keyed by index, so each step mounts fresh nodes to split and slide in
  useLayoutEffect(() => {
    const el = textRef.current;
    const split = SplitText.create(el.querySelectorAll('.rw-title, .rw-tagline'), {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
    });
    const tween = gsap.from([...split.lines, el.querySelector('.rw-foot')], {
      yPercent: 120,
      duration: 0.6,
      ease: 'expo.out',
      stagger: 0.06,
      onComplete: () => split.revert(),
    });
    return () => {
      tween.kill();
      split.revert();
    };
  }, [active]);

  return (
    <div>
      <div className="rw-pin" ref={pinRef}>
        <div className="rw-container rw-layout">
          <header className="rw-head">
            <Heading />
            <p className="rw-count">
              <span className="rw-count-current">{pad(active + 1)}</span> / {pad(RECENT.length)}
            </p>
          </header>

          <div className="rw-stage">
            <div className="rw-frame" ref={frameRef}>
              {RECENT.map((p, i) => (
                <Media key={p.id} project={p} className={i === active ? 'is-active' : undefined} hidden={i !== active} />
              ))}
            </div>

            <div className="rw-text" key={active} ref={textRef}>
              <h3 className="rw-title">{project.title}</h3>
              <p className="rw-tagline">{taglineOf(project)}</p>
              <div className="rw-foot-mask">
                <div className="rw-foot">
                  <Tags tags={project.tags} />
                  <Cta project={project} />
                </div>
              </div>
            </div>
          </div>

          <div className="rw-bottom">
            <ol className="rw-dots" aria-hidden="true">
              {RECENT.map((p, i) => (
                <li key={p.id} className={i === active ? 'is-active' : undefined} />
              ))}
            </ol>
            <AllLink />
          </div>
        </div>
      </div>
    </div>
  );
}

// Phones and reduced motion: no pin, just stacked cards
function Cards() {
  return (
    <div className="rw-container rw-cards-wrap">
      <Heading />
      <AllLink />
      <ol className="rw-cards">
        {RECENT.map((p) => (
          <li key={p.id}>
            <Card project={p} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Card({ project }) {
  const videoRef = useInViewVideo();
  return (
    <article className="rw-card">
      <div className="rw-card-frame">
        <Media project={project} videoRef={videoRef} className="is-active" />
      </div>
      <h3 className="rw-title">{project.title}</h3>
      <p className="rw-tagline">{taglineOf(project)}</p>
      <Tags tags={project.tags} />
      <Cta project={project} />
    </article>
  );
}

// Plays the video while at least 25% of it is visible. Under reduced motion it never autoplays.
function useInViewVideo() {
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

function Media({ project, className, hidden, videoRef }) {
  return project.video ? (
    <video
      ref={videoRef}
      className={className}
      src={project.video}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-hidden={hidden || undefined}
      aria-label={`Video of ${project.title}`}
    />
  ) : (
    <img
      className={className}
      src={project.image}
      alt={`Screenshot of ${project.title}`}
      aria-hidden={hidden || undefined}
      loading="lazy"
    />
  );
}

// Several apps open the parts dialog; otherwise the live demo, else the first link
function Cta({ project }) {
  const dialogRef = useRef(null);
  const label = (
    <>
      View project <span className="rw-cta-arrow" aria-hidden="true">↗</span>
    </>
  );

  if (project.parts) {
    return (
      <>
        <button
          type="button"
          className="rw-cta"
          onClick={() => dialogRef.current.showModal()}
          aria-haspopup="dialog"
          aria-label={`View project: the demos and code for ${project.title}`}
        >
          {label}
        </button>
        <PartsDialog ref={dialogRef} project={project} />
      </>
    );
  }

  const target = project.links.find((l) => l.label === 'Live demo') ?? project.links[0];
  if (!target) return null;
  return (
    <a
      href={target.url}
      className="rw-cta"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View project: ${target.label} for ${project.title} (opens in a new tab)`}
    >
      {label}
    </a>
  );
}
