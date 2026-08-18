import { aboutValues } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './AboutValues.css';

/**
 * Image-forward bento grid instead of the numbered hover-reveal rows — the
 * numeral-and-thumbnail pattern had already been the section's look across
 * several redesign rounds; this pass leads with the photo full-bleed behind
 * the copy, closer to Framework's tile treatment on Home, so About picks up
 * a texture the rest of the site already uses instead of a page-only pattern.
 */
export default function AboutValues() {
  const scope = useSectionFx();

  return (
    <section className="section about-values" ref={scope}>
      <div className="container">
        <AnimatedHeading text="What we stand for" className="section-title" />

        <ul className="about-values__grid" data-stagger>
          {aboutValues.map((item) => (
            <li className="about-values__tile" key={item.image}>
              <img className="about-values__tile-bg" src={item.image} alt="" width="500" height="500" loading="lazy" />
              <div className="about-values__tile-scrim" aria-hidden="true" />
              <div className="about-values__tile-copy">
                <h3 className="about-values__title">{item.title}</h3>
                <p className="about-values__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
