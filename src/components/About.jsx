import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

export default function About() {
  const revealRef = useScrollReveal();

  return (
    <section id="about" className="about-section" aria-label="About Me">
      <div className="about-container reveal" ref={revealRef}>
        <div className="about-header">
          <h2 className="about-section-title">About</h2>
        </div>

        <div className="about-content">
          {/* Placeholder: Short editorial paragraph, restrained */}
          <p className="about-lead">
            [I am an engineer and interface designer dedicated to software that feels immediate, calm, and durable. My work balances systems architecture with typographic precision, eliminating arbitrary ornament in service of focused workflows.]
          </p>

          <p className="about-body">
            [Previously led client engineering on core design platforms, real-time audio tooling, and browser renderers. Currently consulting with product teams on high-fidelity web experiences and custom design engineering systems.]
          </p>
        </div>
      </div>
    </section>
  );
}
