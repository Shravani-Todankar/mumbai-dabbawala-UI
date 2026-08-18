import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { reducedMotion } from '../hooks/useScrollFx';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Line mask / roller — the single heading reveal used across the page. */
export default function AnimatedHeading({ as: Tag = 'h2', text, className = '', id }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;

    let split;
    let ctx;
    let cancelled = false;
    let lastWidth = 0;

    const createSplit = () => {
      lastWidth = el.getBoundingClientRect().width;

      ctx = gsap.context(() => {
        split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          aria: 'auto',
        });

        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      }, el);
    };

    // SplitText measures line breaks, so it has to wait for the real font.
    document.fonts.ready.then(() => {
      if (cancelled || !ref.current) return;
      createSplit();
      ScrollTrigger.refresh();
    });

    // Frozen line breaks from a mid-layout measurement (e.g. a heading that
    // mounts before its own container has settled to full width) otherwise
    // stick forever — SplitText only runs once, on `[text]`. Re-splitting on
    // any real width change is the general fix, not just a one-off patch for
    // whichever heading hits it first.
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!split || cancelled) return;
      const width = entry.contentRect.width;
      if (Math.abs(width - lastWidth) < 1) return;
      ctx.revert();
      split.revert();
      createSplit();
    });
    resizeObserver.observe(el);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      ctx?.revert();
      split?.revert();
    };
  }, [text]);

  return (
    <Tag ref={ref} id={id} className={className} aria-label={text}>
      {text}
    </Tag>
  );
}
