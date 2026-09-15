import { useScrollReveal } from '../hooks/useScrollReveal';
import './Hero.css';

export default function Hero() {
  const revealRef = useScrollReveal();

  return (
    <section id="hero" className="hero-section" aria-label="Introduction">
      <div className="hero-container reveal" ref={revealRef}>
        <p className="hero-name">Fiko Alexie van Houten</p>

        {/* Large Hero Headline */}
        <h1 className="hero-headline">I get shit done.</h1>

        <p className="hero-statement">
          I'm a Computer Science enthusiast minoring in AI.
        </p>

        {/* One quiet CTA with restrained accent color */}
        <div className="hero-actions">
          <a href="#/work" className="hero-cta">
            <span>View Selected Work</span>
            <span className="hero-cta-arrow" aria-hidden="true">&rsaquo;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
