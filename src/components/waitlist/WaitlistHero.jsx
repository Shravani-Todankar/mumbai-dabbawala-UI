import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { reducedMotion } from '../../hooks/useScrollFx';
import { waitlistHero } from '../../data/waitlist';
import WaitlistForm from './WaitlistForm';
import HeroMascot from './HeroMascot';
import './WaitlistHero.css';

/**
 * Full-screen hero. Owns its own entrance timeline rather than useSectionFx's
 * declarative `.reveal` (which only fires on scroll-into-view — everything
 * here is above the fold at load, so it needs to animate on mount instead).
 * The H1 is hand-broken into two lines rather than run through
 * AnimatedHeading/SplitText, since the accent full stop (`<span
 * className="wl-dot">`) would not survive SplitText's re-parenting of the
 * text node.
 */
export default function WaitlistHero() {
  const rootRef = useRef(null);
  const linesRef = useRef([]);
  const ruleRef = useRef(null);
  const leadRef = useRef(null);
  const formRef = useRef(null);
  const noteRef = useRef(null);

  useLayoutEffect(() => {
    const targets = [ruleRef.current, leadRef.current, noteRef.current].filter(Boolean);
    const formChildren = formRef.current
      ? Array.from(formRef.current.querySelectorAll('.wl-form__field, .wl-form__submit, .wl-form__hint'))
      : [];
    const lines = linesRef.current.filter(Boolean);

    if (reducedMotion()) {
      gsap.set([...targets, ...formChildren, ...lines], { opacity: 1, y: 0, yPercent: 0, scaleX: 1 });
      return undefined;
    }

    gsap.set([...targets, ...formChildren], { opacity: 0, y: 16 });
    gsap.set(lines, { yPercent: 110 });
    gsap.set(ruleRef.current, { scaleX: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(lines, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.09 })
        .to(ruleRef.current, { opacity: 1, scaleX: 1, y: 0, duration: 0.7, ease: 'power2.inOut' }, 0.4)
        .to(leadRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
        .to(formChildren, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.55)
        .to(noteRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.75);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="wl-hero" id="top" tabIndex={-1} ref={rootRef}>
      <div className="container wl-hero__grid">
        <div className="wl-hero__main">
          <h1 className="wl-hero__title">
            {waitlistHero.titleLines.map((line, i) => (
              <span className="wl-hero__mask" key={line}>
                <span className="wl-hero__line" ref={(el) => (linesRef.current[i] = el)}>
                  {i === waitlistHero.titleLines.length - 1 ? (
                    <>
                      {line.slice(0, -1)}
                      <span className="wl-dot">{line.slice(-1)}</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <span className="wl-rule" ref={ruleRef} aria-hidden="true">
            <i className="wl-rule__bar" />
          </span>

          <p className="wl-hero__lead" ref={leadRef}>
            {waitlistHero.lead}
          </p>

          <div ref={formRef}>
            <WaitlistForm variant="hero" />
          </div>

          <p className="wl-hero__note" ref={noteRef}>
            {waitlistHero.note}
          </p>
        </div>

        <div className="wl-hero__aside">
          <HeroMascot />
        </div>
      </div>
    </section>
  );
}
