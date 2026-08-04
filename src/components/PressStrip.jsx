import { press } from '../data/content';
import './PressStrip.css';

/**
 * Credibility row under the hero CTA. Wordmarks are set as type: every name
 * here is an organisation cited in Recognition, and we have no licence to
 * reproduce anyone's actual logo.
 */
export default function PressStrip() {
  return (
    <div className="press-strip">
      <p className="press-strip__label">As featured in</p>
      <ul className="press-strip__list">
        {press.map((name) => (
          <li className="press-strip__item" key={name}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
