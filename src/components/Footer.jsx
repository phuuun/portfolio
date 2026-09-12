import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} Fiko Alexie van Houten. All rights reserved.
        </p>

        <div className="footer-meta">
          <span className="footer-status">
            <span className="footer-status-dot" aria-hidden="true" />
            <span>[Available for new projects]</span>
          </span>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
