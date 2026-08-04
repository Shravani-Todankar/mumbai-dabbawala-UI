import { framework } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import './Framework.css';

export default function Framework() {
  const scope = useSectionFx();

  return (
    <section className="section framework" id="framework" ref={scope}>
      <div className="container framework__grid">
        <div className="framework__head">
          <p className="eyebrow reveal">Mumbai Dabbawala</p>
          <AnimatedHeading text="Transformational Framework" className="section-title" />
        </div>

        <ol className="framework__list" data-stagger>
          {framework.map((item, i) => (
            <li key={item.id} className="framework__row">
              <span className="framework__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="framework__title">{item.title}</h3>
              <span className="framework__arrow" aria-hidden="true">
                &rarr;
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
