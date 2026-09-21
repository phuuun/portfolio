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
              the web, games and hardware rather than sticking to one lane.
            </p>
            <p className="about-body">
              Lately that's meant tools for media literacy — spotting coordinated comment sections
              and bot activity — alongside a fine-tuned RoBERTa toxicity classifier, an X-ray fracture
              detector that deliberately skips deep learning, a Godot redstone simulator and an
              Arduino basketball arcade. I care about tools that explain their answers and say so
              when they don't know.
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
