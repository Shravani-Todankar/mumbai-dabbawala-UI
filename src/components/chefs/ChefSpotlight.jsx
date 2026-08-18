import { chefSpotlight } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './ChefSpotlight.css';

/**
 * Text column beside a parallax + hover-scale image, same split as
 * AboutStory, but closes on a blockquote instead of a ticker — this section
 * introduces one specific kitchen rather than the whole network's history.
 */
export default function ChefSpotlight() {
  const scope = useSectionFx();

  return (
    <section className="section chef-spotlight" ref={scope}>
      <div className="container chef-spotlight__grid">
        <div className="chef-spotlight__image-frame reveal">
          <div className="chef-spotlight__image-scale">
            <img
              className="chef-spotlight__image"
              src={chefSpotlight.image}
              alt=""
              width="700"
              height="820"
              data-parallax="3"
            />
          </div>
        </div>

        <div className="chef-spotlight__copy">
          <p className="eyebrow reveal">{chefSpotlight.eyebrow}</p>
          <AnimatedHeading text={chefSpotlight.title} className="section-title chef-spotlight__title" />

          <div className="chef-spotlight__paragraphs reveal">
            {chefSpotlight.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <blockquote className="chef-spotlight__quote reveal">
            <p>&ldquo;{chefSpotlight.quote}&rdquo;</p>
            <footer>
              <span className="chef-spotlight__quote-name">{chefSpotlight.name}</span>
              <span className="chef-spotlight__quote-role">{chefSpotlight.role}</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
