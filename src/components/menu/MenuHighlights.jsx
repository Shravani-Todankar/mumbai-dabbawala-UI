import { menuHighlights } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './MenuHighlights.css';

/**
 * Editorial preview of the 4 regions before the interactive filter/calendar
 * below — a photo and one line each, not the full week (that's what
 * MenuBoard is for). Gives a visual sense of the range before narrowing to
 * one region.
 */
export default function MenuHighlights() {
  const scope = useSectionFx();

  return (
    <section className="section menu-highlights" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">Four regions</p>
        <AnimatedHeading text="What each thali actually tastes like" className="section-title" />

        <ul className="menu-highlights__grid" data-stagger>
          {menuHighlights.map((item) => (
            <li className="menu-highlights__card" key={item.type}>
              <div className="menu-highlights__image-frame">
                <img src={item.image} alt="" width="320" height="320" loading="lazy" />
              </div>
              <h3 className="menu-highlights__type">{item.type}</h3>
              <p className="menu-highlights__tagline">{item.tagline}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
