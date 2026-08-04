import { process } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import './Process.css';

/**
 * The relay, as a numbered flow. Structured after Spice Box's "How it works":
 * a big rounded slab, centred heading, capsule step cards each led by a circular
 * badge, and a single call to action closing the block.
 */
export default function Process() {
  const scope = useSectionFx();

  return (
    <section className="section section--slab section--tint process" id="process" ref={scope}>
      <div className="container process__inner">
        <p className="process__kicker reveal">How it works</p>
        <AnimatedHeading
          text="From your kitchen to your desk"
          className="process__title-main"
        />

        <ol className="process__list" data-stagger>
          {process.map((step, i) => (
            <li className="process__step" key={step.title}>
              <span className="process__badge" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__text">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="process__cta reveal">
          <a className="btn btn--primary" href="#contact">
            Talk to us about a route
          </a>
        </div>
      </div>
    </section>
  );
}
