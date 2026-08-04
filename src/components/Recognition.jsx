import { useMemo, useState } from 'react';
import { recognition, recognitionFilters } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import './Recognition.css';

export default function Recognition() {
  const [filter, setFilter] = useState('All');
  const scope = useSectionFx();

  const items = useMemo(
    () => (filter === 'All' ? recognition : recognition.filter((r) => r.kind === filter)),
    [filter]
  );

  return (
    <section className="section recognition" ref={scope}>
      <div className="container">
        <div className="recognition__head">
          <p className="eyebrow reveal">Mumbai Dabbawala</p>
          <AnimatedHeading text="Recognition and Accolades" className="section-title" />
        </div>

        <div className="recognition__filters" role="group" aria-label="Filter accolades">
          {recognitionFilters.map((name) => (
            <button
              type="button"
              key={name}
              className={`recognition__filter${filter === name ? ' is-active' : ''}`}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Keyed on the filter so every change mounts fresh nodes. useSectionFx
            runs once, and its `fromTo` leaves inline opacity on the cards it
            owns — reusing them would show a filtered set half at opacity 0. */}
        <ul className="recognition__grid" data-stagger key={filter}>
          {items.map((item, i) => (
            <li key={`${item.year}-${i}`} className="recognition__card">
              {item.image ? (
                <div className="recognition__media">
                  <img src={item.image} alt="" loading="lazy" data-parallax="7" />
                  <span className="recognition__badge">{item.year}</span>
                </div>
              ) : (
                <span className="recognition__badge recognition__badge--static">{item.year}</span>
              )}
              <p className="recognition__kind">{item.kind}</p>
              <p className="recognition__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
