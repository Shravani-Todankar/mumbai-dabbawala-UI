import { useState } from 'react';
import { menuFaq } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import '../FAQ.css';

/**
 * Same single-open accordion as Home's FAQ (reuses its CSS classes directly
 * rather than duplicating the styles) — different content, ordering/
 * customisation questions specific to this page, not the booking/coding
 * basics Home's FAQ already covers.
 */
export default function MenuFaq() {
  const scope = useSectionFx();
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq" id="menu-faq" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">Ordering questions</p>
        <AnimatedHeading text="Before you book a thali" className="section-title" />

        <ul className="faq__list" data-stagger>
          {menuFaq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li className="faq__item" key={item.question}>
                <button
                  className="faq__question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`menu-faq-answer-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.question}
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div className="faq__answer" id={`menu-faq-answer-${i}`} hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
