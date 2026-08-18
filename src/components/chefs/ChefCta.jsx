import { chefCta } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './ChefCta.css';

/**
 * "Order ticket" band instead of another `section--tint` slab — this page
 * already replaced Kitchens' tint with its own warm surface, so the closing
 * CTA needed a different move too rather than falling back to the same gray
 * tint every other page uses. Plain page background, dashed top/bottom rules
 * standing in for a perforated ticket edge, red kept only on the button.
 */
export default function ChefCta() {
  const scope = useSectionFx();

  return (
    <section className="section chef-cta" ref={scope}>
      <div className="container chef-cta__inner">
        <p className="eyebrow reveal">{chefCta.eyebrow}</p>
        <AnimatedHeading text={chefCta.title} className="section-title chef-cta__title" />
        <p className="section-lead reveal">{chefCta.text}</p>

        <a className="btn btn--primary chef-cta__btn reveal" href="/contact">
          {chefCta.buttonLabel}
        </a>
      </div>
    </section>
  );
}
