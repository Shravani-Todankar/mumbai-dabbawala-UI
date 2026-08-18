import { aboutTimeline } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './AboutTimeline.css';

/**
 * Milestones as a bento grid. This replaced a scroll-pinned timeline that
 * showed one milestone at a time behind a `position: sticky` scroller — every
 * milestone is now visible at once, and the section no longer adds ~5
 * viewport-heights of scroll to the About page.
 *
 * Bento (explicitly placed CSS grid areas) rather than the multi-column
 * masonry this briefly used: columns fill top-to-bottom, which put the visual
 * sequence down each column instead of across the row — wrong for a
 * chronology. A grid fills row-major, so 1890 → 1930s → 1998 → 2005 → Today
 * reads left-to-right, top-to-bottom, matching DOM order exactly. The varied
 * tile sizes give the same staggered rhythm masonry was there for.
 *
 * `section--slab` is safe now: it sets `overflow: hidden`, which used to break
 * the sticky pin this section relied on. With the pin gone, nothing here
 * depends on sticky.
 */
export default function AboutTimeline() {
  const scope = useSectionFx();

  return (
    <section className="section section--slab section--tint about-timeline" ref={scope}>
      <div className="container">
        <div className="about-timeline__head">
          <p className="eyebrow reveal">Milestones</p>
          <AnimatedHeading text="How the network grew" className="section-title" />
        </div>

        <ol className="about-timeline__bento" data-stagger>
          {aboutTimeline.map((item) => (
            <li className="about-timeline__card" key={item.year}>
              <div className="about-timeline__image-frame">
                <img src={item.image} alt="" width="280" height="180" loading="lazy" />
              </div>
              <div className="about-timeline__body">
                <span className="about-timeline__year">{item.year}</span>
                <h3 className="about-timeline__title">{item.title}</h3>
                <p className="about-timeline__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
