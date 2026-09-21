import { useScrollReveal } from '../hooks/useScrollReveal';
import { PROJECTS } from '../data/projects.js';
import './Hero.css';

const current = PROJECTS.filter((p) => p.status);
const liveDemos = PROJECTS.filter((p) => p.links.some((l) => l.label === 'Live demo')).length;

export default function Hero() {
  const revealRef = useScrollReveal();
  const nowRef = useScrollReveal();

  return (
    <>
      <section id="hero" className="hero-section" aria-label="Introduction">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-container reveal" ref={revealRef}>
          <p className="eyebrow">Fiko Alexie van Houten</p>

          <h1 className="hero-headline">
            I get <span className="hero-gradient">shit done.</span>
          </h1>

          <p className="hero-statement">
            Computer Science student minoring in AI. I build across machine learning, the web,
            games and hardware — whatever the problem actually needs.
          </p>

          <div className="hero-actions">
            <a href="#/work" className="btn btn-primary">
              View my work <span aria-hidden="true">→</span>
            </a>
            <a href="#/contact" className="btn btn-ghost">Get in touch</a>
          </div>

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
        </div>
      </section>

      <section className="now-section" aria-label="Currently building">
        <div className="now-container reveal" ref={nowRef}>
          <p className="eyebrow">Currently building</p>
          <ul className="now-list">
            {current.map((p) => (
              <li key={p.id}>
                <a href="#/work" className="now-item">
                  <span className="now-title">{p.title}</span>
                  <span className="now-desc">{p.description.split(/[.—]/)[0].trim()}.</span>
                  <span className="now-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
