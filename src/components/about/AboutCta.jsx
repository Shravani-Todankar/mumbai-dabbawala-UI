import { aboutCta } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './AboutCta.css';

/**
 * Compact light-tint banner — both the brand red (`section--brand`, too
 * bright) and the dark charcoal (`section--invert`, also rejected) were
 * tried and dropped. `section--tint` is the palette's remaining neutral
 * surface, already used elsewhere (ContactVisit) — the red stays only on
 * the button as an accent, not the whole section.
 */
export default function AboutCta() {
  const scope = useSectionFx();

  return (
    <section className="section section--slab section--tint about-cta" ref={scope}>
      <div className="container about-cta__inner">
        <p className="eyebrow reveal">{aboutCta.eyebrow}</p>
        <AnimatedHeading text={aboutCta.title} className="section-title about-cta__title" />
        <p className="section-lead reveal">{aboutCta.text}</p>

        <a className="btn btn--primary about-cta__btn reveal" href="/#contact">
          {aboutCta.buttonLabel}
        </a>
      </div>
    </section>
  );
}
