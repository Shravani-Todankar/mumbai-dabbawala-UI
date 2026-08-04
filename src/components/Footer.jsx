import { footerLinks, site } from '../data/content';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/assets/images/logo.png" alt="" width="56" height="56" />
          <p>{site.tagline}</p>
        </div>

        <nav className="footer__col" aria-label="Quick links">
          <h2>Quick Links</h2>
          <ul>
            {footerLinks.quick.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
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
        <ul>
          {footerLinks.legal.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
