import { chefHygiene } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import Icon from '../Icon';
import './ChefHygiene.css';

/**
 * Plain white section, no slab/tint — the kitchen-side equivalent of the
 * homepage's Six Sigma/ISO trust strip, reusing the same icon set so it
 * feels like part of the same site rather than a one-off component.
 */
export default function ChefHygiene() {
  const scope = useSectionFx();

  return (
    <section className="section chef-hygiene" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">How the kitchens are kept honest</p>
        <AnimatedHeading text="What we check before it reaches you" className="section-title" />

        <ul className="chef-hygiene__grid" data-stagger>
          {chefHygiene.map((item) => (
            <li className="chef-hygiene__item" key={item.title}>
              <span className="chef-hygiene__icon">
                <Icon name={item.icon} />
              </span>
              <h3 className="chef-hygiene__title">{item.title}</h3>
              <p className="chef-hygiene__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
