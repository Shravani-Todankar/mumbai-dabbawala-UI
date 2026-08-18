import { framework } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import FrameworkVisual from './FrameworkVisual';
import PixelCanvas from './PixelCanvas';
import './Framework.css';

// Same brand-red/ink pair as PressStrip's pixel shimmer — one shared accent
// pairing rather than a colour per tile, since these four tiles have no
// individual brand palette to draw from.
const PIXEL_COLORS = ['#ed3237', '#373435'];

/**
 * Bento grid, after 21st.dev's "bento grid 01": a big tile, a stacked pair of
 * small tiles, and another big tile across three columns — the four
 * framework steps map onto those four cells 1:1. Each cell centres a
 * circular frame over a title + one-line description. Kept on this page's
 * own light surface rather than the source's dark zinc cards, and animation
 * stays on GSAP's shared `useSectionFx`/`data-stagger` rather than
 * framer-motion. The frame holds the supplied illustration per step
 * (FrameworkVisual.jsx); Start Up Initiation has no supplied image, so it
 * keeps a looping placeholder SVG. Each tile also carries the same
 * pixel-shimmer hover effect as PressStrip's "Pixel Logo Grid" tiles
 * (PixelCanvas.jsx), covering the whole card rather than just one word.
 */
export default function Framework() {
  const scope = useSectionFx();

  return (
    <section className="section framework" id="framework" ref={scope}>
      <div className="container">
        <div className="framework__head">
          <p className="eyebrow reveal">Mumbai Dabbawala</p>
          <AnimatedHeading text="Transformational Framework" className="section-title" />
        </div>

        <ul className="framework__bento" data-stagger>
          {framework.map((item, i) => (
            <li className={`framework__tile framework__tile--${i + 1}`} key={item.id}>
              <PixelCanvas colors={PIXEL_COLORS} />
              <FrameworkVisual index={i} />
              <div className="framework__tile-body">
                <h3 className="framework__tile-title">{item.title}</h3>
                <p className="framework__tile-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
