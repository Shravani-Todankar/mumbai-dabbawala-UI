import { chefMenu } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import Icon from '../Icon';
import './ChefMenu.css';

// JS getDay() is Sun-first (0-6); chefMenu is Mon-first, so Sunday sits last.
const TODAY_INDEX = (new Date().getDay() + 6) % 7;

/**
 * Printed "menu card" list instead of a dark grid of boxes — a single
 * bordered card holding one row per day, day name and dish joined by a
 * dotted leader like a restaurant table d'hôte menu, rather than seven
 * separate tiles. Plain light background, no invert — the dark band read
 * wrong for this page's rhythm. Menu-page touches: a flourish rule, corner
 * brackets, a letterhead, a distinct dish icon per row (not the same
 * utensil glyph repeated seven times), today's row picked out with a badge,
 * a green veg-mark (the FSSAI-style square-and-dot printed next to
 * vegetarian dishes on Indian menus — every dish in this particular
 * illustrative rotation happens to be one, not a claim about the real
 * service's actual menu), and a signed-off closing line.
 */
export default function ChefMenu() {
  const scope = useSectionFx();

  return (
    <section className="section chef-menu" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">This week's rotation</p>
        <AnimatedHeading text="What actually goes into the dabba" className="section-title" />

        <div className="chef-menu__ornament reveal" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <div className="chef-menu__card reveal">
          <span className="chef-menu__corner chef-menu__corner--tl" aria-hidden="true" />
          <span className="chef-menu__corner chef-menu__corner--tr" aria-hidden="true" />
          <span className="chef-menu__corner chef-menu__corner--bl" aria-hidden="true" />
          <span className="chef-menu__corner chef-menu__corner--br" aria-hidden="true" />

          <p className="chef-menu__letterhead">Weekly Set Menu</p>
          <p className="chef-menu__est">Est. 1890</p>

          <ol className="chef-menu__list">
            {chefMenu.map((item, i) => (
              <li className="chef-menu__row" key={item.day}>
                <Icon name={item.icon} className="chef-menu__utensil" size={16} />
                <span className="chef-menu__day-name">{item.day}</span>
                {i === TODAY_INDEX && <span className="chef-menu__today">Today</span>}
                <span className="chef-menu__leader" aria-hidden="true" />
                {item.veg && (
                  <span className="chef-menu__veg" title="Vegetarian" aria-label="Vegetarian">
                    <span />
                  </span>
                )}
                <p className="chef-menu__dish">{item.dish}</p>
              </li>
            ))}
          </ol>

          <p className="chef-menu__signoff">— cooked fresh, one kitchen at a time.</p>
        </div>
      </div>
    </section>
  );
}
