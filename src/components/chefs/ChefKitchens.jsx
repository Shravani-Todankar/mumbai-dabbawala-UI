import { chefKitchens } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './ChefKitchens.css';

/**
 * Real photo cards, not the initials-block used for AboutTeam — this grid is
 * about food and kitchens, so a stand-in dish photo carries the card better
 * than a letter block would. Leads with the cook's own name (`chef`), not
 * the kitchen's brand name — the page is meant to introduce the chefs, so
 * the kitchen name and years on the route sit underneath as context.
 *
 * Deliberately not `section--tint` — every other tinted section on this site
 * (Kitchens previously, ContactVisit, both CTA banners) uses the same flat
 * #F5F5F5, which read as repetitive once this page had several sections.
 * This one gets its own warm "recipe card" surface + a fine paper-grain
 * texture instead, scoped to `.chef-kitchens` alone.
 */
export default function ChefKitchens() {
  const scope = useSectionFx();

  return (
    <section className="section section--slab chef-kitchens" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">This week on the route</p>
        <AnimatedHeading text="Meet the chefs behind the relay" className="section-title" />

        <ul className="chef-kitchens__grid" data-stagger>
          {chefKitchens.map((kitchen, i) => (
            <li className="chef-kitchens__card" key={kitchen.name + i}>
              <div className="chef-kitchens__image-frame">
                <img src={kitchen.image} alt="" width="500" height="500" loading="lazy" />
                <span className="chef-kitchens__since">Since {kitchen.since}</span>
              </div>
              <h3 className="chef-kitchens__name">{kitchen.chef}</h3>
              <p className="chef-kitchens__kitchen">
                {kitchen.name} &middot; {kitchen.years}
              </p>
              <p className="chef-kitchens__specialty">{kitchen.specialty}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
