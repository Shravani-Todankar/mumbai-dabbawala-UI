import { waitlistWhy } from '../../data/waitlist';
import { useSectionFx } from '../../hooks/useScrollFx';
import './WhySection.css';

/**
 * "Why Mumbai Dabbawala 2.0" — a run of alternating left/right statements
 * (client reference: a dark bold-caps "BUILT TO DOMINATE." layout; same
 * zigzag rule/row structure, this site's own palette and type). Odd rows
 * (01, 03) sit left with a hairline rule above; the even row (02) sits right,
 * unruled — that alternation, not a repeated icon+heading shape, is what
 * keeps three statements from reading as a card grid.
 */
export default function WhySection() {
  const scope = useSectionFx();

  return (
    <section className="section wl-why" id="how-it-works" tabIndex={-1} aria-labelledby="wl-why-title" ref={scope}>
      <div className="container">
        <p className="eyebrow wl-eyebrow reveal">{waitlistWhy.eyebrow}</p>
        <h2 className="wl-why__heading reveal" id="wl-why-title">
          {waitlistWhy.heading}
        </h2>

        <ol className="wl-why__rows">
          {waitlistWhy.rows.map((row, i) => {
            const side = i % 2 === 0 ? 'left' : 'right';
            return (
              <li
                className={`wl-why__row wl-why__row--${side}${i % 2 === 0 ? ' wl-why__row--rule' : ''} reveal`}
                key={row.claim}
              >
                <div className="wl-why__row-inner">
                  <span className="wl-why__index wl-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="wl-why__claim">{row.claim}</h3>
                  <p className="wl-why__body-text">{row.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
