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
          <p className="about-lead">
            I'm a Computer Science student minoring in AI, building things across web, games, and machine learning rather than sticking to one lane.
          </p>

          <p className="about-body">
            My projects range from an evidence-based fact-checking tool built with React and TypeScript, to 2D games and simulations built in Godot, to small Python tools. I like picking whatever stack actually fits the problem.
          </p>
        </div>
      </div>
    </section>
  );
}
