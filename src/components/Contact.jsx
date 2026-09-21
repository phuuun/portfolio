import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/phuuun',
    label: 'github.com/phuuun',
  },
];

export default function Contact() {
  const revealRef = useScrollReveal();

  return (
    <section id="contact" className="contact-section" aria-label="Contact Information">
      <div className="contact-container reveal" ref={revealRef}>
        <div className="contact-header">
          <p className="eyebrow">Contact</p>
          <h1 className="contact-section-title">Let's build something.</h1>
        </div>

        <p className="contact-statement">
          Open to interesting projects and collaborations. Feel free to reach out.
        </p>

        <div className="contact-email-wrapper">
          <a
            href="mailto:phuuun0@gmail.com"
            className="contact-email-link"
            aria-label="Send email to phuuun0@gmail.com"
          >
            <svg
              className="contact-email-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>phuuun0@gmail.com</span>
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
