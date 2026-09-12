import { useState } from 'react';
import { useHashRoute } from '../hooks/useHashRoute.js';
import './Nav.css';

const LINKS = [
  { to: '#/work', label: 'Work' },
  { to: '#/about', label: 'About' },
  { to: '#/contact', label: 'Contact' },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const route = useHashRoute();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="nav-header">
      <nav className="nav-container" aria-label="Main navigation">
        <a href="#/" className="nav-brand" onClick={closeMenu}>
          Fiko Alexie van Houten
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                className={`nav-link ${route === link.to.slice(1) ? 'is-active' : ''}`}
                aria-current={route === link.to.slice(1) ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          type="button"
          className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <div className="nav-toggle-icon" aria-hidden="true">
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`nav-mobile-menu ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <ul className="nav-mobile-links">
          {LINKS.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                className={`nav-mobile-link ${route === link.to.slice(1) ? 'is-active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
