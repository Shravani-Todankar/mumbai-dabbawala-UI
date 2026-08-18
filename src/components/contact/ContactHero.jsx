import { contactHero } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import './ContactHero.css';

/**
 * Same full-bleed photo + statement pattern as AboutHero, so the site's
 * sub-pages (About/Contact/Blog) read as one family rather than each
 * reinventing its own hero shape. `.section--invert` flips text tokens to
 * light-on-dark; the photo + scrim sit on their own layer behind it.
 */
export default function ContactHero() {
  const scope = useSectionFx();

  return (
    <section className="section section--invert contact-hero" ref={scope}>
      <div className="contact-hero__bg">
        <img
          className="contact-hero__bg-image"
          src={contactHero.image}
          alt=""
          width="1600"
          height="900"
          data-parallax="5"
        />
        <div className="contact-hero__scrim" />
      </div>

      <div className="container contact-hero__content">
        <p className="eyebrow reveal">{contactHero.eyebrow}</p>

        <h1 className="contact-hero__statement" data-stagger>
          {contactHero.statement.map((line) => (
            <span className="contact-hero__line" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className="contact-hero__sub reveal">{contactHero.sub}</p>
      </div>
    </section>
  );
}
