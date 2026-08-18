import { aboutHero } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import './AboutHero.css';

/**
 * Editorial statement over a full-bleed photo rather than plain white space
 * — the text-only version read as too flat. `.section--invert` flips every
 * text token to light-on-dark for free; the photo + scrim sit behind it on
 * their own absolutely-positioned layer so data-parallax can drift the
 * image without moving the text. A floating stat card in the corner borrows
 * Home's own hero convention (its "Six Sigma / 99.999999" badge) so this
 * page's opening beat feels like part of the same site, not a bolt-on.
 */
export default function AboutHero() {
  const scope = useSectionFx();

  return (
    <section className="section section--invert about-hero" ref={scope}>
      <div className="about-hero__bg">
        <img
          className="about-hero__bg-image"
          src={aboutHero.image}
          alt=""
          width="1600"
          height="1000"
          data-parallax="5"
        />
        <div className="about-hero__scrim" />
      </div>

      <div className="container about-hero__content">
        <p className="eyebrow reveal">{aboutHero.eyebrow}</p>

        <h1 className="about-hero__statement" data-stagger>
          {aboutHero.statement.map((line) => (
            <span className="about-hero__line" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className="about-hero__sub reveal">{aboutHero.sub}</p>
      </div>

      <div className="about-hero__stat reveal" aria-hidden="true">
        <span className="about-hero__stat-value">{aboutHero.stat.value}</span>
        <span className="about-hero__stat-label">{aboutHero.stat.label}</span>
      </div>
    </section>
  );
}
