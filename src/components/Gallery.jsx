import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { gallery } from '../data/content';
import { reducedMotion, useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import './Gallery.css';

// Pixels per second each row drifts on its own.
const SPEED = 34;

/**
 * Width of one repetition, measured as the gap between the first slide of the
 * first set and the first slide of the second. Deriving it from `scrollWidth`
 * instead would fold in the track's own `padding-inline` and overstate it,
 * which leaves the wrap point on screen.
 */
function setWidthOf(track, count) {
  const first = track.children[0];
  const second = track.children[count];
  if (!first || !second) return 0;
  return second.offsetLeft - first.offsetLeft;
}

/**
 * One auto-scrolling row. `direction` is 1 for a leftward drift (content moves
 * left, scrollLeft rises) and -1 for the opposite.
 */
function CarouselRow({ items, direction, label }) {
  const [copies, setCopies] = useState(2);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  const slides = useMemo(
    () => Array.from({ length: copies }, () => items).flat(),
    [items, copies]
  );

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || items.length === 0) return;

    const measure = () => {
      const setWidth = setWidthOf(track, items.length);
      if (!setWidth || !track.clientWidth) return;
      // The loop wraps by one set's width, so the track has to hold enough
      // copies that the wrap point stays off-screen — i.e. the scrollable
      // range past the wrap must still cover the viewport. Smaller slides and
      // a narrowed filter both push this number up.
      const needed = Math.max(2, Math.ceil(track.clientWidth / setWidth) + 1);
      if (needed !== copies) setCopies(needed);
    };

    measure();
    // The track can measure 0 before first layout, which would leave the row
    // one set short and make the wrap visible.
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [items, copies]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || items.length === 0 || reducedMotion()) return;

    // A rightward row starts one set in, so there is room to scroll back
    // before the first wrap.
    if (direction < 0) track.scrollLeft = setWidthOf(track, items.length);

    // Driven off gsap's ticker rather than a bare rAF so the drift shares the
    // same clock as the scroll animations.
    const tick = (_time, deltaMs) => {
      if (pausedRef.current) return;
      const setWidth = setWidthOf(track, items.length);
      if (!setWidth) return;

      let next = track.scrollLeft + (direction * SPEED * deltaMs) / 1000;
      if (next >= setWidth) next -= setWidth;
      if (next < 0) next += setWidth;
      track.scrollLeft = next;
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [items, copies, direction]);

  if (items.length === 0) return null;

  return (
    /* Full-bleed track. Focus pauses it as well as hover — otherwise tabbing to
       a slide would scroll the focused element straight back out of view. */
    <div
      className="gallery__track"
      ref={trackRef}
      tabIndex={0}
      role="region"
      aria-label={label}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
    >
      {slides.map((item, i) => (
        <figure
          className="gallery__slide"
          key={`${item.src}-${i}`}
          /* Only the first set is exposed; the rest are duplicates that exist
             to make the loop seamless. */
          aria-hidden={i >= items.length ? 'true' : undefined}
        >
          <img
            src={item.src}
            alt={i < items.length ? item.alt : ''}
            width={item.width}
            height={item.height}
            loading="lazy"
          />
        </figure>
      ))}
    </div>
  );
}

// Alternating rather than split down the middle, so each row carries a mix of
// categories instead of one row holding a single kind of photo.
const ROW_A = gallery.filter((_, i) => i % 2 === 0);
const ROW_B = gallery.filter((_, i) => i % 2 === 1);

export default function Gallery() {
  const scope = useSectionFx();

  return (
    <section className="section gallery" id="gallery" ref={scope}>
      <div className="container">
        <div className="gallery__head">
          <p className="eyebrow reveal">Mumbai Dabbawala</p>
          <AnimatedHeading text="Image Gallery" className="section-title" />
        </div>
      </div>

      {/* Two rows running against each other. */}
      <div className="gallery__rows">
        <CarouselRow items={ROW_A} direction={1} label="Gallery carousel, first row" />
        <CarouselRow items={ROW_B} direction={-1} label="Gallery carousel, second row" />
      </div>
    </section>
  );
}
