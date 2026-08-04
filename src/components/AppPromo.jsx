import { app, services } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import Icon from './Icon';
import './AppPromo.css';

// The six real services, split around the mockup — these are what the app books.
const LEFT = services.slice(0, 3);
const RIGHT = services.slice(3);

function FeatureCard({ service, index }) {
  return (
    <li className={`promo__card promo__card--${index + 1}`}>
      <Icon name={service.icon} className="promo__card-icon" size={40} />
      <span>{service.title}</span>
    </li>
  );
}

export default function AppPromo() {
  const scope = useSectionFx();

  return (
    <section className="section promo" id="app" ref={scope}>
      <div className="container">
        <div className="promo__head">
          <p className="eyebrow reveal">Coming soon</p>
          <AnimatedHeading text={app.title} className="section-title promo__title" />
          <p className="promo__intro reveal">{app.text}</p>
        </div>

        <div className="promo__stage">
          <ul className="promo__cards promo__cards--left" data-pop>
            {LEFT.map((s, i) => (
              <FeatureCard key={s.id} service={s} index={i} />
            ))}
          </ul>

          {/* Intrinsic size reserves the box while it lazy-loads — without it the
              section reflows on arrival and ScrollTrigger measures the wrong height. */}
          <img
            className="promo__phone"
            src={app.mockup}
            alt=""
            width="800"
            height="825"
            loading="lazy"
            data-parallax="4"
          />

          <ul className="promo__cards promo__cards--right" data-pop>
            {RIGHT.map((s, i) => (
              <FeatureCard key={s.id} service={s} index={i + 3} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
