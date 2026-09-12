import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

/* Clearly marked project placeholders */
const PROJECTS = [
  {
    id: 'project-1',
    title: '[Project One: Obsidian Notes Engine]',
    description: '[High-throughput local-first markdown indexer with sub-millisecond AST graph parsing.]',
    tags: ['React', 'Web Workers', 'WebAssembly', 'IndexedDB'],
    demoUrl: 'https://example.com/project-one',
    githubUrl: 'https://github.com/[yourhandle]/project-one',
    previewLabel: 'FRAME PREVIEW — 01',
  },
  {
    id: 'project-2',
    title: '[Project Two: Canvas Precision Editor]',
    description: '[Vector manipulation tool for micro-layout typography, grid alignment, and bezier curves.]',
    tags: ['Canvas API', 'TypeScript', 'GLSL', 'Math2D'],
    demoUrl: 'https://example.com/project-two',
    githubUrl: 'https://github.com/[yourhandle]/project-two',
    previewLabel: 'FRAME PREVIEW — 02',
  },
  {
    id: 'project-3',
    title: '[Project Two: Monolith Audio Synthesizer]',
    description: '[Real-time additive sound design studio running on web audio audio-worklet threads.]',
    tags: ['Web Audio API', 'AudioWorklet', 'Wasm', 'DSP'],
    demoUrl: 'https://example.com/project-three',
    githubUrl: 'https://github.com/[yourhandle]/project-three',
    previewLabel: 'FRAME PREVIEW — 03',
  },
  {
    id: 'project-4',
    title: '[Project Four: Chronicle Design System]',
    description: '[A minimal, token-driven component architecture engineered for dark interfaces.]',
    tags: ['Design Systems', 'CSS Tokens', 'Accessibility', 'React'],
    demoUrl: 'https://example.com/project-four',
    githubUrl: 'https://github.com/[yourhandle]/project-four',
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
      {/* Generous empty frame / preview canvas */}
      <div
        className="project-frame"
        role="img"
        aria-label={`Preview frame for ${project.title}`}
      >
        <div className="frame-preview">
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
            <span className="frame-badge">VIEWPORT: 1440 &times; 900</span>
            <span className="frame-badge">SYSTEM SCALE: 1.0</span>
          </div>
        </div>
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
              href={project.demoUrl}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live deployment of ${project.title}`}
            >
              <span>View Live</span>
              <span className="project-link-arrow" aria-hidden="true">&rsaquo;</span>
            </a>
            <a
              href={project.githubUrl}
              className="project-link project-link-secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
