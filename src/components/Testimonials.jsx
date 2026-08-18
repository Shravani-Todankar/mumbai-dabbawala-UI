import { testimonials } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import './Testimonials.css';

// Structure requested from 21st.dev's shadcnspace/marquee-01: an infinite
// auto-scrolling row instead of the previous arrow-driven carousel. Hand-built
// in plain CSS (keyframe + duplicated list, same technique as AboutStory's
// ticker) rather than pulling the shadcn/Tailwind source — this project has
// no Tailwind setup, and the `npx @21st-dev/cli add` command would have
// scaffolded a `components.json` + Tailwind into a codebase that otherwise
// uses hand-written CSS with design tokens throughout. No customer photos —
// no real testimonials were supplied, so a photo would be a fabricated face
// next to a placeholder quote.
// Split across two rows scrolling opposite directions rather than one row
// twice as long — the second row's `--reverse` modifier just runs the same
// keyframe with `animation-direction: reverse`, no separate keyframe needed.
const mid = Math.ceil(testimonials.length / 2);
const rows = [testimonials.slice(0, mid), testimonials.slice(mid)];

const initialsOf = (name) =>
  name
    .replace('Prof. ', '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

function MarqueeRow({ items, reverse }) {
  const loop = [...items, ...items];
  return (
    <div className={`testimonials__marquee${reverse ? ' testimonials__marquee--reverse' : ''}`}>
      <ul className="testimonials__track">
        {loop.map((item, i) => (
          <li className="testimonials__card" key={item.name + i}>
            <span className="testimonials__mark" aria-hidden="true">
              &ldquo;
            </span>
            <p className="testimonials__quote">{item.quote}</p>
            <div className="testimonials__person">
              <span className="testimonials__avatar" aria-hidden="true">
                {initialsOf(item.name)}
              </span>
              <div>
                <p className="testimonials__name">{item.name}</p>
                <p className="testimonials__role">{item.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Testimonials() {
  const scope = useSectionFx();

  return (
    <section className="section testimonials" id="testimonials" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">What people say</p>
        <AnimatedHeading text="Trusted by the people we serve" className="section-title" />
      </div>

      <div className="testimonials__rows reveal">
        <MarqueeRow items={rows[0]} />
        <MarqueeRow items={rows[1]} reverse />
      </div>
    </section>
  );
}
