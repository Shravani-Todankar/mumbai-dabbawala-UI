/* Per-tile visuals for the Framework bento. Graduate Hires, Certification &
   Licensing and Training use the illustrations supplied for this section;
   Start Up Initiation still falls back to a hand-drawn looping SVG since no
   image was provided for it (see Framework.css for the loop keyframes). */

function GraduateVisual() {
  return (
    <img
      className="framework__visual-img"
      src="/assets/images/framework-graduate-hires.png"
      alt=""
      width="64"
      height="64"
    />
  );
}

function CertificateVisual() {
  return (
    <img
      className="framework__visual-img"
      src="/assets/images/framework-certification-licensing.png"
      alt=""
      width="64"
      height="64"
    />
  );
}

function RocketVisual() {
  return (
    <svg className="framework__visual-svg framework__visual-svg--rocket" viewBox="0 0 64 64" aria-hidden="true">
      <g className="framework__visual-rocket-launch">
        <path d="M32 6 C40 14 44 26 44 36 L20 36 C20 26 24 14 32 6 Z" fill="currentColor" />
        <circle cx="32" cy="24" r="4" fill="var(--color-surface-elevated)" />
        <polygon points="20,36 12,48 20,44" fill="currentColor" />
        <polygon points="44,36 52,48 44,44" fill="currentColor" />
        <polygon points="27,36 32,52 37,36" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  );
}

function TrainingVisual() {
  return (
    <img
      className="framework__visual-img"
      src="/assets/images/framework-training.png"
      alt=""
      width="64"
      height="64"
    />
  );
}

const VISUALS = [GraduateVisual, CertificateVisual, RocketVisual, TrainingVisual];

export default function FrameworkVisual({ index }) {
  const Visual = VISUALS[index % VISUALS.length];
  return (
    <div className="framework__visual">
      <Visual />
    </div>
  );
}
