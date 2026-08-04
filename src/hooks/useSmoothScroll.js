import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let activeLenis = null;

/** The running Lenis instance, so components can pause it (e.g. modal opens). */
export const getLenis = () => activeLenis;

export function useSmoothScroll() {
  useEffect(() => {
    const onAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -80 });
      else target.scrollIntoView({ behavior: 'smooth' });
    };

    let lenis = null;
    let tick = null;

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);
      activeLenis = lenis;

      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Child effects register their triggers before this parent effect runs, so
    // their start/end positions are measured before Lenis exists. Images also
    // land late and shift everything below them.
    ScrollTrigger.refresh();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    document.addEventListener('click', onAnchorClick);

    return () => {
      window.removeEventListener('load', onLoad);
      document.removeEventListener('click', onAnchorClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      if (activeLenis === lenis) activeLenis = null;
    };
  }, []);
}
