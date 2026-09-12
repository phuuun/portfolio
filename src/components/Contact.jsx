import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

/* Social / portfolio links placeholders */
const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/[yourhandle]',
    label: 'github.com/[yourhandle]',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/[yourhandle]',
    label: 'linkedin.com/in/[yourhandle]',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/[yourhandle]',
    label: 'x.com/[yourhandle]',
  },
  {
    name: 'Read.cv',
    url: 'https://read.cv/[yourhandle]',
    label: 'read.cv/[yourhandle]',
  },
];

export default function Contact() {
  const revealRef = useScrollReveal();

  return (
    <section id="contact" className="contact-section" aria-label="Contact Information">
      <div className="contact-container reveal" ref={revealRef}>
        <div className="contact-header">
          <h2 className="contact-section-title">Contact</h2>
        </div>

        {/* Placeholder Statement */}
        <p className="contact-statement">
          [I am currently available for select advisory, architectural consulting, and design engineering projects. Feel free to initiate a conversation.]
        </p>

        {/* Primary Email Link */}
        <div className="contact-email-wrapper">
          <a
            href="mailto:[your.email@example.com]"
            className="contact-email-link"
            aria-label="Send email to [your.email@example.com]"
          >
            <svg
              className="contact-email-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>[your.email@example.com]</span>
          </a>
        </div>

        {/* Secondary Links */}
        <ul className="contact-links-list" aria-label="Social and professional profiles">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                className="contact-external-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.name} profile (${link.label})`}
              >
                <span>{link.name}</span>
                <svg
                  className="contact-arrow-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
