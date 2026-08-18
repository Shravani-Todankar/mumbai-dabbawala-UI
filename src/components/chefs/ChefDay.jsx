import { chefDay } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './ChefDay.css';

/**
 * A connected-line timeline instead of another card grid — Kitchens right
 * below this already uses cards, so this section reads differently: one
 * horizontal line with time-stamped stops, following the kitchen's actual
 * morning in sequence rather than listing facts about it.
 */
export default function ChefDay() {
  const scope = useSectionFx();

  return (
    <section className="section chef-day" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">Before your lunch arrives</p>
        <AnimatedHeading text="A kitchen's morning, hour by hour" className="section-title" />

        <ol className="chef-day__line" data-stagger>
          {chefDay.map((step) => (
            <li className="chef-day__stop" key={step.time}>
              <span className="chef-day__dot" aria-hidden="true" />
              <span className="chef-day__time">{step.time}</span>
              <h3 className="chef-day__title">{step.title}</h3>
              <p className="chef-day__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
