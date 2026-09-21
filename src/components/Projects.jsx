import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CATEGORIES, PROJECTS } from '../data/projects.js';
import './Projects.css';

export default function Projects() {
  const headerRef = useScrollReveal();
  const [filter, setFilter] = useState('All');
  const shown = PROJECTS.filter((p) => filter === 'All' || p.categories.includes(filter));
  const featured = shown.filter((p) => p.image);
  const rest = shown.filter((p) => !p.image);

  return (
    <section id="work" className="work-section" aria-label="Work">
      <div className="work-container">
        <header className="work-header reveal" ref={headerRef}>
          <p className="eyebrow">Work</p>
          <h1 className="work-title">Everything I've built.</h1>
          <p className="work-intro">
            {PROJECTS.length} projects across machine learning, the web, games, hardware and
            research. Newest first.
          </p>

          <div className="filter-bar" role="group" aria-label="Filter projects by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-chip ${filter === c ? 'is-active' : ''}`}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
                <span className="filter-count">
                  {c === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.categories.includes(c)).length}
                </span>
              </button>
            ))}
          </div>
        </header>

        {featured.length > 0 && (
          <div className="featured-list">
            {featured.map((p, i) => (
              <FeaturedItem key={`${filter}-${p.id}`} project={p} index={i} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="project-grid">
            {rest.map((p) => (
              <ProjectCard key={`${filter}-${p.id}`} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedItem({ project, index }) {
  const ref = useScrollReveal(0.1);
  // Picture opens the live demo, or the first link (GitHub) when there's no demo.
  const target = project.links.find((l) => l.label === 'Live demo') ?? project.links[0];
  const img = <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" />;

  return (
    <article className={`featured-item reveal ${index % 2 ? 'is-flipped' : ''}`} ref={ref}>
      {target ? (
        <a
          className="featured-frame"
          href={target.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${target.label} for ${project.title} (opens in a new tab)`}
        >
          {img}
          <span className="featured-frame-cta" aria-hidden="true">Open {target.label} ↗</span>
        </a>
      ) : (
        <div className="featured-frame">{img}</div>
      )}
      <div className="featured-meta">
        <ProjectHeading project={project} />
        <p className="project-description">{project.description}</p>
        <Tags tags={project.tags} />
        <Links project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  const ref = useScrollReveal(0.1);

  return (
    <article className="project-card reveal" ref={ref}>
      <ProjectHeading project={project} />
      <p className="project-description">{project.description}</p>
      <div className="project-card-footer">
        <Tags tags={project.tags} />
        <Links project={project} />
      </div>
    </article>
  );
}

function ProjectHeading({ project }) {
  return (
    <div className="project-heading">
      <p className="project-period">
        <span>{project.period}</span>
        {project.status && <span className="project-status">{project.status}</span>}
        {project.note && <span className="project-note">{project.note}</span>}
      </p>
      <h2 className="project-title">{project.title}</h2>
    </div>
  );
}

function Tags({ tags }) {
  return (
    <ul className="project-tags" aria-label="Technologies used">
      {tags.map((t) => (
        <li key={t} className="project-tag">{t}</li>
      ))}
    </ul>
  );
}

function Links({ project }) {
  if (project.links.length === 0) return null;
  return (
    <div className="project-links">
      {project.links.map((l, i) => (
        <a
          key={l.url}
          href={l.url}
          className={`project-link ${i === 0 ? '' : 'is-secondary'}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.label} for ${project.title} (opens in a new tab)`}
        >
          {l.label}
          <span className="project-link-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
