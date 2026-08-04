import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Section-level scroll effects. Applies to descendants by attribute:
 *   .reveal            one-shot fade + rise
 *   [data-stagger]     children rise in sequence
 *   [data-pop]         children pop in (scale + fade) in sequence, bouncier than data-stagger
 *   [data-parallax]    scrubbed vertical drift inside its container
 */
export function useSectionFx() {
  const scopeRef = useRef(null);

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const reveals = scope.querySelectorAll('.reveal');
    const staggers = scope.querySelectorAll('[data-stagger]');
    const pops = scope.querySelectorAll('[data-pop]');
    const parallax = scope.querySelectorAll('[data-parallax]');

    if (reducedMotion()) {
      gsap.set([...reveals, ...staggers, ...pops], { opacity: 1, y: 0, scale: 1, clearProps: 'transform' });
      return;
    }

    const ctx = gsap.context(() => {
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      staggers.forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          }
        );
      });

      pops.forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 30, scale: 0.5 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          }
        );
      });

      parallax.forEach((el) => {
        const distance = Number(el.dataset.parallax) || 10;
        gsap.fromTo(
          el,
          { yPercent: -distance },
          {
            yPercent: distance,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return scopeRef;
}

export function useCountUp(ref, target, duration = 2) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion()) {
      el.textContent = target.toLocaleString('en-US');
      return;
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => {
          el.textContent = Math.floor(counter.value).toLocaleString('en-US');
        },
      });
    }, el);

    return () => ctx.revert();
  }, [ref, target, duration]);
}
