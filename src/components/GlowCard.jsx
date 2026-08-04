import { useRef, useState } from 'react';
import './GlowCard.css';

/**
 * Pointer-tracked glow card, ported from the supplied `GlowCard.tsx` to this
 * project's conventions — JSX instead of TypeScript, plain CSS custom
 * properties instead of Tailwind — and reworked to track the pointer per card
 * instead of per viewport.
 *
 * The source computed one viewport-space position (`--x`/`--y`, written from a
 * document-level `pointermove`) and painted it through
 * `background-attachment: fixed`, so the "spotlight" was really one shared light
 * sweeping the whole page; every card just showed the slice of it that fell
 * inside its own box. Two problems with that here:
 *
 * 1. It glowed whenever the cursor was anywhere near a card's screen position,
 *    including well outside the section — not the "only while hovering this
 *    card" behaviour asked for.
 * 2. `background-attachment: fixed` with a calc()'d pixel position — exactly
 *    what the source's `at calc(var(--x,0)*1px) calc(var(--y,0)*1px)` is —
 *    failed to paint at all in testing. Percentage positions painted fine;
 *    pixel positions under `fixed` attachment did not. Rather than depend on
 *    that, the effect now uses `background-attachment: scroll` (the default)
 *    with coordinates local to the card, which sidesteps it entirely.
 *
 * Position is now the pointer's offset from the card's own top-left corner,
 * updated only while the pointer is inside it, and painted as an ordinary
 * scrolling background — no shared listener, no global custom properties.
 */

// Hue base and sweep per preset, copied from the source.
const GLOW_COLORS = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

// The source's Tailwind size classes, as explicit boxes.
const SIZES = {
  sm: { width: '12rem', height: '16rem' },
  md: { width: '16rem', height: '20rem' },
  lg: { width: '20rem', height: '24rem' },
};

export default function GlowCard({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  // When true the size preset is ignored and width/height or the class name
  // decide the box.
  customSize = false,
}) {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, xp: 0.5 });

  const handleMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      // Normalised across the card's own width: this is what walks the hue as
      // the pointer crosses the card, the local equivalent of the source's
      // viewport-wide `--xp`.
      xp: (event.clientX - rect.left) / rect.width,
    });
  };

  const { base, spread } = GLOW_COLORS[glowColor] ?? GLOW_COLORS.blue;
  const preset = customSize ? null : SIZES[size];

  const style = {
    '--glow-base': base,
    '--glow-spread': spread,
    '--glow-x': `${pos.x}px`,
    '--glow-y': `${pos.y}px`,
    '--glow-xp': pos.xp,
    ...(preset ?? {}),
    // An explicit width or height always wins over the preset, as in the source.
    ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
  };

  return (
    <div
      ref={ref}
      className={`glow-card${lit ? ' is-lit' : ''} ${className}`.trim()}
      style={style}
      /* pointerenter/leave rather than over/out: these do not fire again as the
         pointer crosses the card's own children. */
      onPointerEnter={(event) => {
        handleMove(event);
        setLit(true);
      }}
      onPointerMove={handleMove}
      onPointerLeave={() => setLit(false)}
    >
      {/* The source's nested `[data-glow]` element: a blurred outer bloom.
          Decorative and never interactive. */}
      <span className="glow-card__bloom" aria-hidden="true" />
      {children}
    </div>
  );
}
