import { useState } from 'react';
import { faq } from '../data/content';
import { useSectionFx } from '../hooks/useScrollFx';
import AnimatedHeading from './AnimatedHeading';
import './FAQ.css';

/**
 * Single-open accordion — one question expanded at a time, native
 * `<button aria-expanded>` per row rather than a details/summary element, so
 * the expand/collapse height can be animated instead of the browser's
 * instant native toggle.
 */
export default function FAQ() {
  const scope = useSectionFx();
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq" id="faq" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">Questions</p>
        <AnimatedHeading text="Before you ask" className="section-title" />

        <ul className="faq__list" data-stagger>
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li className="faq__item" key={item.question}>
                <button
                  className="faq__question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.question}
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div className="faq__answer" id={`faq-answer-${i}`} hidden={!isOpen}>
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
