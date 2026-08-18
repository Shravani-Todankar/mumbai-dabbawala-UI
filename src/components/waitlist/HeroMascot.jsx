import './HeroMascot.css';

/**
 * The hero's visual — a friendly dabbawala mascot illustration, supplied by
 * the client to replace the earlier abstract SVG route diagram. Purely
 * decorative, `alt=""`.
 */
export default function HeroMascot() {
  return (
    <img
      className="wl-mascot"
      src="/assets/images/dabbawala-mascot.png"
      alt=""
      width="500"
      height="500"
      loading="eager"
    />
  );
}
