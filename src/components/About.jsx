import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const SKILLS = [
  { group: 'Machine learning', items: ['NLP (TF-IDF → RoBERTa)', 'Classical computer vision', 'Classical ML', 'Data scraping', 'Jupyter'] },
  { group: 'Web', items: ['React', 'TypeScript', 'Vite', 'Express', 'HTML & CSS'] },
  { group: 'Games', items: ['Godot / GDScript', 'Unity / C#', 'Java'] },
  { group: 'Systems & research', items: ['C', 'Python', 'Arduino', 'Controlled experiments'] },
];

export default function About() {
  const revealRef = useScrollReveal();
  const skillsRef = useScrollReveal();

  return (
    <section id="about" className="about-section" aria-label="About Me">
      <div className="about-container">
        <div className="reveal" ref={revealRef}>
          <p className="eyebrow">About</p>
          <h1 className="about-title">Picking the stack that fits the problem.</h1>

          <div className="about-content">
            <p className="about-lead">
              I'm a Computer Science student minoring in AI, building things across machine learning,
              the web, games and hardware. Trust me, anything you give me, I'll handle.
            </p>
            <p className="about-body">
              I pick up whatever the problem needs — a new framework, a speech model, an Arduino
              sensor. What drives me is learning and understanding more, because the more I build,
              the more I realise how little I actually know.
            </p>
          </div>
        </div>

        <div className="skills reveal" ref={skillsRef}>
          {SKILLS.map((s) => (
            <div key={s.group} className="skill-group">
              <h2 className="skill-title">{s.group}</h2>
              <ul className="skill-list">
                {s.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
