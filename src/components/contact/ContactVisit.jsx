import { contactVisit } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './ContactVisit.css';

/**
 * Real addresses as a small set of cards with a genuine Google Maps search
 * link each — no embedded map (that needs an API key this project doesn't
 * have), just an honest link out rather than a fake static map image.
 */
export default function ContactVisit() {
  const scope = useSectionFx();

  return (
    <section className="section section--slab section--tint contact-visit" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">Visit us</p>
        <AnimatedHeading text="Two offices, one relay" className="section-title" />

        <ul className="contact-visit__grid" data-stagger>
          {contactVisit.map((place) => (
            <li className="contact-visit__card" key={place.label}>
              <h3 className="contact-visit__label">{place.label}</h3>
              <p className="contact-visit__address">{place.address}</p>
              <a className="contact-visit__link" href={place.mapHref} target="_blank" rel="noreferrer">
                View on map &rarr;
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
