import { useSectionFx } from '../../hooks/useScrollFx';
import { waitlistCta } from '../../data/waitlist';
import './FinalCta.css';

/**
 * Closing block — the three headline figures. The statement and the second
 * waitlist form that used to sit above these were removed on client request;
 * the hero form is now the page's only signup entry point.
 */
export default function FinalCta() {
  const scope = useSectionFx();

  return (
    // section--slab is safe here: its overflow:hidden only breaks sticky/pinned
    // descendants, and this block has none.
    <section
      className="section section--slab section--tint wl-final"
      id="waitlist"
      aria-label="Mumbai Dabbawala by the numbers"
      ref={scope}
    >
      <ul className="container wl-final__stats" data-stagger>
        {waitlistCta.stats.map((stat) => (
          <li key={stat.label} className="wl-final__stat">
            <span className="wl-final__stat-rule" aria-hidden="true" />
            <span className="wl-final__stat-value wl-num">{stat.value}</span>
            <span className="wl-final__stat-label">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
