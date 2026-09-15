import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

const PROJECTS = [
  {
    id: 'owi',
    title: 'owi',
    description: 'Checks Indonesian political claims against open evidence — fact-check archives, official releases, court rulings, and verified reporting. Says so when no evidence exists instead of guessing.',
    tags: ['React', 'TypeScript', 'Vite'],
    githubUrl: 'https://github.com/phuuun/owi',
    image: '/projects/owi.png',
    previewLabel: 'FRAME PREVIEW — 01',
  },
  {
    id: 'glitchmare',
    title: 'Glitchmare',
    description: 'A Godot 2D game project built from a clean engine layout, with custom sprites, scenes, and audio.',
    tags: ['Godot', 'GDScript', 'Game Dev'],
    githubUrl: 'https://github.com/phuuun/Glitchmare',
    previewLabel: 'FRAME PREVIEW — 02',
  },
  {
    id: 'notredstone2d',
    title: 'NotRedstone2D',
    description: 'A 2D redstone-style circuit simulator in Godot — levers, dust, lamps, and repeaters wired into working logic.',
    tags: ['Godot', 'GDScript', 'Simulation'],
    githubUrl: 'https://github.com/phuuun/NotRedstone2D',
    image: '/projects/notredstone2d.png',
    previewLabel: 'FRAME PREVIEW — 03',
  },
  {
    id: 'superhoop',
    title: 'SuperHoop',
    description: 'An embedded system project for basketball scoring and game management.',
    tags: ['Embedded System', 'Hardware'],
    githubUrl: 'https://github.com/phuuun/superhoop',
    image: '/projects/superhoop.png',
    previewLabel: 'FRAME PREVIEW — 04',
  },
];

export default function Projects() {
  const headerRef = useScrollReveal();

  return (
    <section id="work" className="work-section" aria-label="Selected Work">
      <div className="work-container">
        <div className="work-header reveal" ref={headerRef}>
          <h2 className="work-section-title">Selected Work</h2>
        </div>

        <div className="work-list">
          {PROJECTS.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project }) {
  const itemRef = useScrollReveal();

  return (
    <article className="project-item reveal" ref={itemRef}>
      <div className="project-frame">
        {project.image ? (
          <img
            className="project-frame-img"
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
          />
        ) : (
          <div className="frame-preview" role="img" aria-label={`Preview frame for ${project.title}`}>
            <div className="frame-preview-header">
              <div className="frame-dots">
                <span className="frame-dot" />
                <span className="frame-dot" />
                <span className="frame-dot" />
              </div>
              <span className="frame-label">{project.previewLabel}</span>
            </div>
            <div className="frame-preview-body">
              <div className="frame-line long" />
              <div className="frame-line medium" />
              <div className="frame-line short" />
            </div>
            <div className="frame-preview-footer">
              <span className="frame-badge">PREVIEW UNAVAILABLE</span>
              <span className="frame-badge">SEE SOURCE</span>
            </div>
          </div>
        )}
      </div>

      {/* Project Meta Information */}
      <div className="project-meta">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-footer">
          <ul className="project-tags" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <li key={tag} className="project-tag">
                {tag}
              </li>
            ))}
          </ul>

          <div className="project-links">
            <a
              href={project.githubUrl}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <span>GitHub</span>
              <span className="project-link-arrow" aria-hidden="true">&rsaquo;</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
