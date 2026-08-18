import { aboutTeam } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './AboutTeam.css';

/**
 * ID-badge cards instead of the roster-row list — the flat row read closer
 * to a plain staff directory than a page about the people running a
 * century-old relay. Each card gets a lanyard-clip notch, a centred initials
 * badge and a focus tag styled like a barcode strip, distinct from both
 * this section's earlier card-grid and row-list treatments. Illustrative
 * roster for this demo, not the real network's actual leadership — same
 * disclosure convention Chef's Corner uses for its kitchens.
 */
export default function AboutTeam() {
  const scope = useSectionFx();

  return (
    <section className="section about-team" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">Illustrative roster</p>
        <AnimatedHeading text="The people behind the relay" className="section-title" />

        <ul className="about-team__grid" data-stagger>
          {aboutTeam.map((member) => (
            <li className="about-team__card" key={member.name}>
              <span className="about-team__clip" aria-hidden="true" />

              <span className="about-team__initials" aria-hidden="true">
                {member.initials}
              </span>

              <h3 className="about-team__name">{member.name}</h3>
              <p className="about-team__role">{member.role}</p>

              <span className="about-team__focus">{member.focus}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
