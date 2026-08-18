import { Link } from 'react-router-dom';
import { site } from '../data/content';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        {/* Floating pill shell. Still mostly menu-less — the nav links were
            removed earlier and only the shape came from the reference — but
            About/Blog/Contact are now real routes, not same-page anchors, so
            they need actual entry points. */}
        <div className="header__bar">
          <Link className="header__brand" to="/" aria-label={`${site.name} — home`}>
            <img src="/assets/images/logo.png" alt="" width="634" height="171" />
          </Link>

          <nav className="header__nav" aria-label="Primary">
            <Link className="header__nav-link" to="/about">
              About
            </Link>
            <Link className="header__nav-link" to="/blog">
              Blog
            </Link>
            <Link className="header__nav-link" to="/chefs-corner">
              Chef's Corner
            </Link>
            <Link className="header__nav-link" to="/menu-calendar">
              Menu Calendar
            </Link>
          </nav>

          <Link className="header__cta" to="/contact">
            Contact us
          </Link>
        </div>
      </div>
    </header>
  );
}
