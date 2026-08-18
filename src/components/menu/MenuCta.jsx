import { menuCalendarCta } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './MenuCta.css';

/**
 * Same compact `section--tint` closing banner every sub-page settled on
 * (About/Contact/Chef's Corner) — no photo, no stats row, red kept only on
 * the button.
 */
export default function MenuCta() {
  const scope = useSectionFx();

  return (
    <section className="section section--slab section--tint menu-cta" ref={scope}>
      <div className="container menu-cta__inner">
        <p className="eyebrow reveal">{menuCalendarCta.eyebrow}</p>
        <AnimatedHeading text={menuCalendarCta.title} className="section-title menu-cta__title" />
        <p className="section-lead reveal">{menuCalendarCta.text}</p>

        <a className="btn btn--primary menu-cta__btn reveal" href="/contact">
          {menuCalendarCta.buttonLabel}
        </a>
      </div>
    </section>
  );
}
