import { site } from '../data/content';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        {/* Floating pill shell. Deliberately still menu-less — the nav links
            were removed earlier; only the shape came from the reference. */}
        <div className="header__bar">
          <a className="header__brand" href="#home" aria-label={`${site.name} — home`}>
            <img src="/assets/images/logo.png" alt="" width="634" height="171" />
          </a>

          <a className="header__cta" href="#contact">
            Contact us
          </a>
        </div>
      </div>
    </header>
  );
}
