import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CATEGORIES, PROJECTS } from '../data/projects.js';
import './Projects.css';

const TABS = ['Finished', 'WIP'];

export default function Projects() {
  const headerRef = useScrollReveal();
  const [tab, setTab] = useState('Finished');
  const [filter, setFilter] = useState('All');
  const inTab = PROJECTS.filter((p) => !p.status === (tab === 'Finished'));
  const count = (c) => (c === 'All' ? inTab.length : inTab.filter((p) => p.categories.includes(c)).length);
  const shown = inTab
    .filter((p) => filter === 'All' || p.categories.includes(filter))
    .sort((a, b) => b.date.localeCompare(a.date));
  // Gallery-style: one group per month, newest on top. Array order is kept within a month.
  const groups = new Map();
  for (const p of shown) groups.set(p.date, [...(groups.get(p.date) ?? []), p]);

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

          <div className="filter-bar tab-bar" role="group" aria-label="Show finished or in-progress projects">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                className={`filter-chip ${tab === t ? 'is-active' : ''}`}
                aria-pressed={tab === t}
                onClick={() => {
                  setTab(t);
                  setFilter('All');
                }}
              >
                {t}
                <span className="filter-count">
                  {PROJECTS.filter((p) => !p.status === (t === 'Finished')).length}
                </span>
              </button>
            ))}
          </div>

          <div className="filter-bar" role="group" aria-label="Filter projects by category">
            {CATEGORIES.filter((c) => count(c) > 0).map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-chip ${filter === c ? 'is-active' : ''}`}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
                <span className="filter-count">{count(c)}</span>
              </button>
            ))}
          </div>
        </header>

        {[...groups].map(([date, projects]) => (
          <DateGroup key={`${tab}-${filter}-${date}`} date={date} projects={projects} />
        ))}
      </div>
    </section>
  );
}

function DateGroup({ date, projects }) {
  const featured = projects.filter((p) => p.image);
  const rest = projects.filter((p) => !p.image);
  const [year, month] = date.split('-');
  const label = month
    ? new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : year;

  return (
    <section className="date-group" aria-label={label}>
      <h2 className="date-heading">{label}</h2>
      {featured.length > 0 && (
        <div className="featured-list">
          {featured.map((p) => (
            <FeaturedItem key={p.id} project={p} />
          ))}
        </div>
      )}
      {rest.length > 0 && (
        <div className="project-grid">
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}

function FeaturedItem({ project }) {
  const ref = useScrollReveal(0.1);
  // Picture opens the live demo, or the first link (GitHub) when there's no demo.
  const target = project.links.find((l) => l.label === 'Live demo') ?? project.links[0];
  // Videos loop muted with no controls, so they can't be paused. The screenshot shows while it loads.
  const img = project.video ? (
    <video
      src={project.video}
      poster={project.image}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-label={`Video of ${project.title}`}
    />
  ) : (
    <img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" />
  );

  return (
    <article className="featured-item reveal" ref={ref}>
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
      <h3 className="project-title">{project.title}</h3>
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
