import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { site } from '../data/content';
import { reducedMotion } from '../hooks/useScrollFx';
import PressStrip from './PressStrip';
import './Hero.css';

// three.js is ~130 kB gzipped — far too much to block first paint for a purely
// decorative layer, so it loads in its own chunk after the hero is up.
const PixelSnow = lazy(() => import('./PixelSnow'));

gsap.registerPlugin(SplitText);

// The three beats of the relay, sized as the page's largest type.
const BEATS = ['Pack it.', 'Run it.', 'Deliver it.'];

// Full-bleed strip under the headline. Decorative here — the same photographs
// carry their real descriptions in the gallery, so repeating them adds noise.
const STRIP = [
  '/assets/images/float1.webp',
  '/assets/images/float2.webp',
  '/assets/images/float4.webp',
  '/assets/images/float3.webp',
  '/assets/images/float5.webp',
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;

    let split;
    let ctx;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled || !root.current) return;

      ctx = gsap.context(() => {
        split = SplitText.create('.hero__beat', {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          aria: 'auto',
        });

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(split.lines, { yPercent: 110, duration: 1, stagger: 0.12, ease: 'power4.out' })
          .from('.hero__eyebrow', { opacity: 0, y: 16, duration: 0.6 }, '-=1')
          .from('.hero__frame', { opacity: 0, y: 48, duration: 0.9 }, '-=0.6')
          .from('.hero__sticker', { opacity: 0, scale: 0.5, rotate: 30, duration: 0.7, ease: 'back.out(2)' }, '-=0.35')
          .from('.hero__lead', { opacity: 0, y: 24, duration: 0.7 }, '-=0.6')
          .from('.hero__actions > *', { opacity: 0, y: 20, duration: 0.6 }, '-=0.45')
          .from('.press-strip', { opacity: 0, y: 16, duration: 0.6 }, '-=0.35');
      }, root);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      split?.revert();
    };
  }, []);

  return (
    <section className="hero" id="home" ref={root}>
      {/* Ambient drift behind the copy. Tuned for a light surface: the shader
          multiplies colour by depth intensity, so fading heads toward black
          rather than toward the page. A high depthFade and short farPlane keep
          every flake at near-full terracotta instead of dirty grey, and the low
          density stops the field from competing with the text. */}
      {!reducedMotion() && (
        <div className="hero__snow" aria-hidden="true">
          <Suspense fallback={null}>
            <PixelSnow
              color="#a94c21"
              density={0.05}
              brightness={1}
              depthFade={40}
              farPlane={9}
              speed={0.9}
              direction={100}
              variant="round"
              pixelResolution={500}
              flakeSize={0.01}
              minFlakeSize={2}
            />
          </Suspense>
        </div>
      )}

      <div className="container hero__head">
        <p className="eyebrow hero__eyebrow">{site.name} &middot; Since 1890</p>

        {/* One heading, three beats. Each is its own block so the SplitText
            masks roll them in one after the other. */}
        <h1 className="hero__title">
          {BEATS.map((beat) => (
            <span className="hero__beat" key={beat}>
              {beat}
            </span>
          ))}
        </h1>
      </div>

      <div className="hero__frame">
        <div className="hero__strip" aria-hidden="true">
          {STRIP.map((src) => (
            <img className="hero__tile" src={src} alt="" key={src} />
          ))}
        </div>

        {/* Badge motif, set in type rather than artwork — the Six Sigma rating
            is the Forbes Global finding already cited in Recognition. */}
        <span className="hero__sticker">
          <span className="hero__sticker-top">Six Sigma</span>
          <span className="hero__sticker-big">99.999999</span>
          <span className="hero__sticker-bottom">Forbes Global</span>
        </span>
      </div>

      <div className="container hero__foot">
        <p className="hero__lead">{site.heroLead}</p>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#about">
            Learn more about us
          </a>
        </div>

        <PressStrip />
      </div>
    </section>
  );
}
