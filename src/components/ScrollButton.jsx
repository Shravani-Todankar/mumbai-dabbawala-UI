import { useEffect, useState } from 'react';
import './ScrollButton.css';

/**
 * Single floating control that runs the page top-to-bottom and back:
 * near the top it sends you down, once you have scrolled it returns you up.
 */
export default function ScrollButton() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    // Floor the threshold: innerHeight can still be 0 on the first measurement,
    // which would otherwise flip the button to "back to top" while at the top.
    const update = () =>
      setAtTop(window.scrollY < Math.max(200, window.innerHeight * 0.6));

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const onClick = () => {
    const target = atTop ? document.documentElement.scrollHeight : 0;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-button ${atTop ? '' : 'scroll-button--up'}`}
      type="button"
      onClick={onClick}
      aria-label={atTop ? 'Scroll to bottom of page' : 'Scroll back to top'}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path
          d="M12 4v16m0 0l-6-6m6 6l6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
