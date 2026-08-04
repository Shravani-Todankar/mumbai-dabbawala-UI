import { benefits } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import GlowCard from './GlowCard';
import Icon from './Icon';
import './GlowSection.css';

/**
 * Section built around GlowCard, laid out like the supplied App.tsx demo: four
 * cards in a centred row with a 20px gap, on the page's own background.
 *
 * Carries the four value props (Six Sigma, ISO, headcount, founding year). This
 * replaced a plain-row `Benefits` section that showed the same four facts; that
 * section is gone and this now sits in its slot, straight after the video.
 */
export default function GlowSection() {
  const scope = useSectionFx();

  return (
    <section className="section glow-section" id="glow" ref={scope}>
      <div className="container">
        <AnimatedHeading text="Why the dabba always arrives" className="section-title" />

        <ul className="glow-section__row" data-stagger>
          {benefits.map((item) => (
            <li key={item.title}>
              <GlowCard className="glow-section__card" glowColor="blue" customSize>
                <div className="glow-section__body">
                  <Icon name={item.icon} className="glow-section__icon" size={44} />
                  <h3 className="glow-section__title">{item.title}</h3>
                  <p className="glow-section__text">{item.text}</p>
                </div>

                <a className="glow-section__link" href={item.href}>
                  Learn more
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </GlowCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
