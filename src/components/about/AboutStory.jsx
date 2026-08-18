import { aboutStory } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './AboutStory.css';

/**
 * Image leads this time, copy follows — the reverse of the Contact/Chef's
 * Corner spotlight split, so About's own intro reads differently from every
 * other page opening on the same "photo left, text right" beat. Image still
 * carries data-parallax drift plus a hover scale rather than a static photo.
 */
export default function AboutStory() {
  const scope = useSectionFx();

  return (
    <section className="section about-story" ref={scope}>
      <div className="container about-story__grid">
        <div className="about-story__image-frame reveal">
          {/* GSAP's data-parallax owns this element's own transform every scrub
              frame, so the hover-scale interaction lives one level up instead
              of fighting it for the same inline style. */}
          <div className="about-story__image-scale">
            <img
              className="about-story__image"
              src={aboutStory.image}
              alt=""
              width="700"
              height="820"
              data-parallax="3"
            />
          </div>
        </div>

        <div className="about-story__copy">
          <p className="eyebrow reveal">{aboutStory.eyebrow}</p>
          <AnimatedHeading text={aboutStory.title} className="section-title about-story__title" />

          <div className="about-story__paragraphs reveal">
            {aboutStory.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="about-story__ticker" aria-hidden="true">
        <div className="about-story__ticker-track">
          {[...aboutStory.ticker, ...aboutStory.ticker].map((word, i) => (
            <span className="about-story__ticker-word" key={word + i}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
