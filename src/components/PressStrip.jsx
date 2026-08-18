import { press } from '../data/content';
import PixelCanvas from './PixelCanvas';
import './PressStrip.css';

// One shimmer colour, not per-brand: we have no licence to the real logos
// (see below), so there's no brand palette to draw the pixels from either.
const PIXEL_COLORS = ['#ed3237', '#373435'];

/**
 * Credibility row under the hero CTA. Wordmarks are set as type: every name
 * here is an organisation cited in Recognition, and we have no licence to
 * reproduce anyone's actual logo. Each tile borrows the pixel-shimmer hover
 * effect from 21st.dev's "Pixel Logo Grid" (ported in PixelCanvas.jsx),
 * scaled down to a single accent colour instead of per-brand palettes.
 */
export default function PressStrip() {
  return (
    <div className="press-strip">
      <p className="press-strip__label">As featured in</p>
      <ul className="press-strip__list">
        {press.map((name) => (
          <li className="press-strip__item" key={name}>
            <PixelCanvas colors={PIXEL_COLORS} />
            <span className="press-strip__name">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
