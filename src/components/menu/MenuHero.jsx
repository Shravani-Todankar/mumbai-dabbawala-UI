import { menuCalendarHero } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import './MenuHero.css';

/**
 * Same full-bleed photo + statement pattern as every other sub-page hero
 * (About/Contact/Chef's Corner) — kept consistent rather than reinvented.
 */
export default function MenuHero() {
  const scope = useSectionFx();

  return (
    <section className="section section--invert menu-hero" ref={scope}>
      <div className="menu-hero__bg">
        <img
          className="menu-hero__bg-image"
          src={menuCalendarHero.image}
          alt=""
          width="1600"
          height="1000"
          data-parallax="5"
        />
        <div className="menu-hero__scrim" />
      </div>

      <div className="container menu-hero__content">
        <p className="eyebrow reveal">{menuCalendarHero.eyebrow}</p>

        <h1 className="menu-hero__statement" data-stagger>
          {menuCalendarHero.statement.map((line) => (
            <span className="menu-hero__line" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className="menu-hero__sub reveal">{menuCalendarHero.sub}</p>
      </div>
    </section>
  );
}
