import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reducedMotion } from '../hooks/useScrollFx';
import './VideoScroll.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;
// One per quarter of the sequence, tracking what the footage actually shows:
// the dal on the stove, the dabba being packed, the ride past the local train,
// and the handover at the desk.
const CAPTIONS = [
  'Cooked at home each morning',
  'Packed into the dabba',
  'Carried across the city',
  'Delivered hot, on time, every day',
];

const framePath = (index, dir) =>
  `/assets/frames/${dir}/${String(index).padStart(3, '0')}.webp`;

const lerp = (a, b, t) => a + (b - a) * t;

// The pinned scroll is split into two phases: the frame grows from an inset,
// rounded card to full-bleed over the first EXPAND_END of the scroll, then the
// image sequence plays over the rest.
const EXPAND_END = 0.28;

/**
 * Scroll-scrubbed image sequence. 120 WebP frames are preloaded and painted to
 * a canvas, so seeking is exact — no video decoder seek latency.
 */
export default function VideoScroll() {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const drawnRef = useRef(-1);
  const [loaded, setLoaded] = useState(0);

  // Preload every frame. Decoded up front so scrubbing never waits on network.
  useEffect(() => {
    const dir = window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop';
    let cancelled = false;
    let done = 0;

    const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = framePath(i, dir);
      img.onload = img.onerror = () => {
        if (cancelled) return;
        done += 1;
        setLoaded(done);
      };
      return img;
    });

    framesRef.current = images;
    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = img.onerror = null;
      });
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!root || !frame || !canvas || loaded === 0) return;

    const ctx2d = canvas.getContext('2d', { alpha: false });

    const paint = (index) => {
      const img = framesRef.current[index];
      if (!img?.naturalWidth || drawnRef.current === index) return;
      drawnRef.current = index;

      // Cover fit, matching object-fit: cover.
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx2d.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const current = Math.max(0, drawnRef.current);
      drawnRef.current = -1;
      paint(current);
    };

    resize();
    // The stage can measure 0 before first layout, which would leave the canvas
    // at its default 300x150. Observing it means we re-fit as soon as it is real.
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const overlay = root.querySelector('.video-scroll__overlay');

    if (reducedMotion()) {
      // Skip straight to the resting state: full-bleed frame, overlay visible.
      frame.style.setProperty('--v-inset-x', '0%');
      frame.style.setProperty('--v-inset-y', '0%');
      frame.style.setProperty('--v-radius', '0px');
      overlay.style.opacity = 1;
      paint(0);
      return () => observer.disconnect();
    }

    const captions = gsap.utils.toArray('.video-scroll__caption', root);

    // Driven straight from scroll progress rather than a scrubbed tween: both
    // the frame's expansion and the playback frame index are discrete lookups,
    // so there is nothing to interpolate.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        // Longer than a playback-only pin would need, so the expand phase gets
        // its own room instead of eating into scrub time for the 120 frames.
        end: '+=350%',
        pin: '.video-scroll__stage',
        anticipatePin: 1,
        // This pin inserts ~3150px of spacer, shifting every section below it
        // down by that much. Its trigger is created late — only once the first
        // frame image has loaded — so by default it refreshes *after* the
        // triggers further down the page, and they all measure their start
        // positions as if the spacer did not exist. Measured: every trigger
        // below this one sat exactly 3150px too high, i.e. all reveals and
        // parallax below the video fired before the reader ever reached them.
        // A higher refreshPriority forces this pin to establish its spacing
        // first, so the rest measure against the real layout.
        refreshPriority: 1,
        onRefresh: (self) => render(self.progress),
        onUpdate: (self) => render(self.progress),
      });
    }, root);

    function render(progress) {
      // Phase 1 (0 → EXPAND_END): the frame grows from an inset card to
      // full-bleed; playback stays on frame 0. Phase 2: the reverse — the frame
      // is already full-bleed, and playT sweeps 0→1 over the rest of the pin.
      const expandT = Math.min(1, progress / EXPAND_END);
      const playT = Math.max(0, Math.min(1, (progress - EXPAND_END) / (1 - EXPAND_END)));

      frame.style.setProperty('--v-inset-x', `${lerp(6, 0, expandT)}%`);
      frame.style.setProperty('--v-inset-y', `${lerp(10, 0, expandT)}%`);
      frame.style.setProperty('--v-radius', `${lerp(32, 0, expandT)}px`);
      overlay.style.opacity = expandT;

      paint(Math.round(playT * (FRAME_COUNT - 1)));

      // Each caption owns an equal slice of the *playback* phase, fading in
      // over the first third of it and back out over the last third.
      const slice = 1 / captions.length;
      captions.forEach((caption, i) => {
        const local = (playT - i * slice) / slice;
        let opacity = 0;
        if (local >= 0 && local <= 1) {
          if (local < 0.3) opacity = local / 0.3;
          else if (local > 0.7) opacity = (1 - local) / 0.3;
          else opacity = 1;
        }
        gsap.set(caption, {
          opacity: Math.min(1, Math.max(0, opacity)),
          y: (1 - opacity) * 24,
        });
      });
    }

    ScrollTrigger.refresh();

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [loaded > 0]);

  return (
    <section className="video-scroll" ref={rootRef} aria-labelledby="video-scroll-title">
      <div className="video-scroll__stage">
        {/* Grows from an inset, rounded card to full-bleed over the pin's first
            phase — see EXPAND_END. Canvas and overlay both live inside it so
            they're clipped identically and never mismatch. */}
        <div className="video-scroll__frame" ref={frameRef}>
          <canvas
            className="video-scroll__canvas"
            ref={canvasRef}
            role="img"
            aria-label="A home-cooked meal being prepared and packed into a tiffin, carried across Mumbai by Dabbawalas on bicycles, and handed over at an office desk"
          />

          <div className="video-scroll__overlay">
            <div className="container">
              <p className="video-scroll__eyebrow">The daily run</p>
              <h2 className="video-scroll__title" id="video-scroll-title">
                Every dabba, every day
              </h2>

              <div className="video-scroll__captions">
                {CAPTIONS.map((caption) => (
                  <p className="video-scroll__caption" key={caption}>
                    {caption}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
