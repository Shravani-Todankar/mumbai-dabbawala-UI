import { useRef } from 'react';
import { stats } from '../data/content';
import { useCountUp, useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import './Stats.css';

// me&u's "The Numbers" leads with one figure and demotes the rest. The daily
// delivery count is the number this operation is actually known for.
const [LEAD, ...REST] = stats;

function StatValue({ stat, className }) {
  const numberRef = useRef(null);
  useCountUp(numberRef, stat.value);

  return (
    <p className={className}>
      <span ref={numberRef}>0</span>
      <span className="stats__suffix">{stat.suffix}</span>
    </p>
  );
}

export default function Stats() {
  const scope = useSectionFx();

  return (
    <section className="section section--slab section--tint stats" id="work" ref={scope}>
      <div className="container">
        <div className="stats__head">
          <p className="eyebrow reveal">The numbers</p>
          <AnimatedHeading text="Our Portfolio" className="section-title" />
        </div>

        <div className="stats__lead reveal">
          <StatValue stat={LEAD} className="stats__lead-value" />
          <p className="stats__lead-label">{LEAD.label}</p>
        </div>

        <ul className="stats__grid" data-stagger>
          {REST.map((stat) => (
            <li className="stats__item" key={stat.label}>
              <StatValue stat={stat} className="stats__value" />
              <p className="stats__label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
