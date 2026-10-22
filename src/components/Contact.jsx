import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSplitReveal } from '../hooks/useSplitReveal';
import './Contact.css';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/phuuun',
    label: 'github.com/phuuun',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/fikovanhouten/',
    label: 'linkedin.com/in/fikovanhouten',
  },
];

export default function Contact() {
  const revealRef = useScrollReveal();
  const titleRef = useSplitReveal();

  return (
    <section id="contact" className="contact-section" aria-label="Contact Information">
      <div className="contact-container">
        <div className="contact-header">
          <p className="eyebrow">Contact</p>
          <h1 className="contact-section-title" ref={titleRef}>Let's build something.</h1>
        </div>

        <div className="reveal" ref={revealRef}>
        <p className="contact-statement">
          Open to interesting projects and collaborations. Feel free to reach out.
        </p>

        <div className="contact-email-wrapper">
          <a
            href="mailto:fikovanhouten2006@gmail.com"
            className="contact-email-link"
            aria-label="Send email to fikovanhouten2006@gmail.com"
          >
            fikovanhouten2006@gmail.com
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
                {link.name} <span className="contact-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}
