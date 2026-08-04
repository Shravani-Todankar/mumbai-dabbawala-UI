import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { about } from '../data/content';
import { reducedMotion, useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

// The threads' own coordinate space. `preserveAspectRatio="none"` stretches this
// to the section box, so a user-unit point converts to a box percentage by
// straight division — which is what lets the thalis be pinned to the paths.
const VB_W = 1440;
const VB_H = 900;

// Each thali is a milestone *on* a thread, not a decoration beside it: `at` is a
// fraction along that thread's length, and JS reads the real curve to place it.
// Values keep clear of 0 and 1 so a centred thali never hangs off the section,
// and the four alternate left/right down the page as the draw advances.
// Intrinsic sizes are declared so the box has its real aspect ratio before the
// lazy image arrives — without them the height is 0 at first paint and the
// centring resolves against nothing.
const MILESTONES = [
  { src: '/assets/images/thali1.webp', w: 560, h: 445, thread: 'left', at: 0.2, tilt: -6 },
  { src: '/assets/images/thali2.webp', w: 560, h: 412, thread: 'right', at: 0.32, tilt: 6 },
  { src: '/assets/images/thali3.webp', w: 560, h: 387, thread: 'left', at: 0.74, tilt: -3 },
  { src: '/assets/images/thali4.webp', w: 560, h: 371, thread: 'right', at: 0.84, tilt: 4 },
];

export default function About() {
  const scope = useSectionFx();
  const sceneRef = useRef(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const threads = ['left', 'right'].map((name) => {
      const el = scene.querySelector(`[data-thread="${name}"]`);
      return { name, el, len: el.getTotalLength() };
    });

    const floats = gsap.utils.toArray('.about__float', scene).map((el) => ({
      el,
      at: Number(el.dataset.at),
      thread: threads.find((t) => t.name === el.dataset.thread),
      lit: false,
    }));

    // Pin each thali to its point on the curve. Percentages rather than pixels,
    // so this survives the section changing height without re-measuring.
    floats.forEach((f) => {
      const pt = f.thread.el.getPointAtLength(f.thread.len * f.at);
      f.el.style.left = `${(pt.x / VB_W) * 100}%`;
      f.el.style.top = `${(pt.y / VB_H) * 100}%`;
    });

    if (reducedMotion()) {
      // No draw-on, no popping: show the finished state.
      threads.forEach((t) => {
        t.el.style.strokeDasharray = 'none';
      });
      return;
    }

    // Hide each thread by pushing a single full-length dash out of view; the
    // scroll handler walks the offset back to 0, which reads as the line being
    // drawn downward.
    threads.forEach((t) => {
      t.el.style.strokeDasharray = `${t.len}`;
      t.el.style.strokeDashoffset = `${t.len}`;
    });

    const ctx = gsap.context(() => {
      // Only the pop scalar and opacity — never `scale`/`transform`, which would
      // take the centring away from CSS. See About.css for why that matters.
      gsap.set(
        floats.map((f) => f.el),
        { '--about-pop': 0.3, opacity: 0 }
      );

      ScrollTrigger.create({
        // The section, not `scene`: `.about__scene` is `position: absolute`, and
        // ScrollTrigger mis-measures such an element's document offset — it put
        // this trigger's range ~3900px above the section's real position, so the
        // draw was always already finished by the time the reader arrived.
        trigger: scene.closest('.about'),
        start: 'top 85%',
        end: 'bottom 70%',
        // Written straight from progress rather than scrubbed tweens: the draw
        // is one number per thread, and the pops need to fire as discrete
        // events when the line reaches them, not be interpolated.
        onRefresh: (self) => draw(self.progress),
        onUpdate: (self) => draw(self.progress),
      });

      function draw(progress) {
        threads.forEach((t) => {
          t.el.style.strokeDashoffset = `${t.len * (1 - progress)}`;
        });

        floats.forEach((f) => {
          const reached = progress >= f.at;
          if (reached === f.lit) return;
          f.lit = reached;

          // A one-shot spring when the line arrives, and a quicker retreat if
          // the reader scrolls back up past it, so the two stay in sync.
          gsap.to(f.el, {
            '--about-pop': reached ? 1 : 0.3,
            opacity: reached ? 1 : 0,
            duration: reached ? 0.6 : 0.25,
            ease: reached ? 'back.out(1.8)' : 'power2.in',
            overwrite: true,
          });
        });
      }
    }, scene);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about" ref={scope}>
      <div className="about__scene" ref={sceneRef} aria-hidden="true">
        {/* Each thread begins exactly at its own top corner of the section — (0,0)
            and (VB_W,0) — because the draw runs from a path's start point, so the
            start *is* where the line appears from. */}
        <svg className="about__threads" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none">
          <path data-thread="left" d="M0 0 C 170 130, 60 320, 210 470 S 120 760, 300 880" />
          <path
            data-thread="right"
            d={`M${VB_W} 0 C 1270 130, 1380 340, 1230 500 S 1330 740, 1140 900`}
          />
        </svg>

        {MILESTONES.map((m) => (
          <img
            key={m.src}
            className="about__float"
            src={m.src}
            alt=""
            width={m.w}
            height={m.h}
            loading="lazy"
            data-thread={m.thread}
            data-at={m.at}
            style={{ rotate: `${m.tilt}deg` }}
          />
        ))}
      </div>

      <div className="container about__inner">
        <p className="eyebrow reveal">{about.eyebrow}</p>
        <AnimatedHeading text={about.title} className="section-title about__title" />

        <div className="about__body">
          {about.paragraphs.map((text, i) => (
            <p key={i} className="about__paragraph reveal">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
