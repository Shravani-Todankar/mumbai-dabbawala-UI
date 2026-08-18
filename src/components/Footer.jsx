import { Link } from 'react-router-dom';
import { footerLinks, site } from '../data/content';
import './Footer.css';

// Footer link lists mix Home-section hash links ("/#services") with clean
// routes ("/about") — router Link for the latter, plain anchor for the
// former, since a client-side Link transition doesn't trigger the browser's
// native hash-scroll the way a full navigation does.
function FooterLink({ href, children }) {
  return href.includes('#') ? <a href={href}>{children}</a> : <Link to={href}>{children}</Link>;
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/assets/images/logo.png" alt="" width="634" height="171" />
          <p>{site.tagline}</p>
        </div>

        <nav className="footer__col" aria-label="Quick links">
          <h2>Quick Links</h2>
          <ul>
            {footerLinks.quick.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Useful links">
          <h2>Useful Links</h2>
          <ul>
            {footerLinks.useful.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2>Get in Touch</h2>
          <address>
            <p>{site.addresses[0]}</p>
            <p>
              <a href={`tel:${site.phones[0].replace(/[^\d+]/g, '')}`}>{site.phones[0]}</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </address>
        </div>
      </div>

      <div className="container footer__bar">
        <p>&copy; {new Date().getFullYear()} {site.name}. All Rights Reserved.</p>
        <p className="footer__credit">
          Designed &amp; Developed By{' '}
          <a href="https://www.techinfinity.io" target="_blank" rel="noopener noreferrer">
            Techinfinity
          </a>
        </p>
        <ul>
          {footerLinks.legal.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
