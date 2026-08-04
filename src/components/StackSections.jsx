import { Children, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reducedMotion } from '../hooks/useScrollFx';
import './StackSections.css';

gsap.registerPlugin(ScrollTrigger);

// Below this the cards are taller than the viewport, so a sticky stack would
// pin a card whose lower half can never be scrolled into view. They fall back
// to ordinary stacked sections.
const MIN_WIDTH = 1001;

// How far a covered card lags, in px. Kept under the 36px gap between sticky
// offsets so the card underneath keeps a visible edge instead of vanishing.
const LAG = 20;

/**
 * Deck-of-cards scroll effect. Each child sticks under the one before it at a
 * slightly lower offset, and drifts down a little as the next card covers it —
 * the lag reads as depth, the way a more distant object moves less.
 *
 * The recede is a translate, not a scale: scaling would make the covered cards
 * visibly narrower than the one on top, and every card here is the same width.
 * No opacity change either — covered cards stay fully opaque.
 */
export default function StackSections({ children }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add(`(min-width: ${MIN_WIDTH}px)`, () => {
      const items = gsap.utils.toArray('.stack__item', el);

      items.forEach((item, i) => {
        const next = items[i + 1];
        if (!next) return;

        // Scrubbed against the *next* card's travel, so the card underneath
        // settles back exactly as it is covered.
        gsap.to(item.firstElementChild, {
          y: LAG,
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="stack" ref={root}>
      {Children.map(children, (child) => (
        <div className="stack__item">{child}</div>
      ))}
    </div>
  );
}
