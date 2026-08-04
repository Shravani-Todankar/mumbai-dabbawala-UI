import { services } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import Icon from './Icon';
import './Services.css';

/**
 * Structured after me&u's "Key Features" block: a dark slab, the statement and
 * its lead split across two columns at the top, then a dense row of compact
 * tiles underneath. The dark fill is what separates it from the cream Process
 * slab above and the terracotta portfolio band below.
 */
export default function Services() {
  const scope = useSectionFx();

  return (
    <section className="section section--slab section--invert services" id="services" ref={scope}>
      <div className="container">
        <div className="services__head">
          <div>
            <p className="services__kicker reveal">Key services</p>
            <AnimatedHeading text="Six ways we serve Mumbai" className="services__statement" />
          </div>

          <p className="services__lead reveal">
            From the daily tiffin run to classrooms, campaigns and kitchens — the same network,
            put to work six different ways.
          </p>
        </div>

        <ul className="services__grid" data-stagger>
          {services.map((service) => (
            <li key={service.id} className="services__card">
              <Icon name={service.icon} className="services__icon" size={40} />
              <h3 className="services__title">{service.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
