import { chefHero } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import './ChefHero.css';

/**
 * Same full-bleed photo + statement pattern as AboutHero/ContactHero — kept
 * deliberately consistent across sub-pages rather than reinvented per page.
 */
export default function ChefHero() {
  const scope = useSectionFx();

  return (
    <section className="section section--invert chef-hero" ref={scope}>
      <div className="chef-hero__bg">
        <img
          className="chef-hero__bg-image"
          src={chefHero.image}
          alt=""
          width="1600"
          height="1000"
          data-parallax="5"
        />
        <div className="chef-hero__scrim" />
      </div>

      <div className="container chef-hero__content">
        <p className="eyebrow reveal">{chefHero.eyebrow}</p>

        <h1 className="chef-hero__statement" data-stagger>
          {chefHero.statement.map((line) => (
            <span className="chef-hero__line" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className="chef-hero__sub reveal">{chefHero.sub}</p>
      </div>
    </section>
  );
}
