import { useEffect, useState } from 'react';
import './LaunchCountdown.css';

const LAUNCH_DATE = new Date('2026-09-14T00:00:00');

function getTimeParts(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/**
 * Countdown to launch (14 September 2026) — a full-width strip at the very
 * top of the page, in the slot the old sub-nav used to occupy. Static, like
 * the site's own AnnouncementBar (no entrance animation, doesn't scroll with
 * the page). The ticking digits are `aria-hidden` — a live region
 * re-announcing every second would spam screen readers — the visible caption
 * sentence carries the same information once, for everyone.
 */
export default function LaunchCountdown() {
  const [parts, setParts] = useState(() => getTimeParts(LAUNCH_DATE));

  useEffect(() => {
    const id = setInterval(() => setParts(getTimeParts(LAUNCH_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', value: parts.days },
    { label: 'Hrs', value: parts.hours },
    { label: 'Min', value: parts.minutes },
    { label: 'Sec', value: parts.seconds },
  ];

  return (
    <div className="wl-countdown-bar">
      <div className="container wl-countdown-bar__inner">
        <p className="wl-countdown__caption">
          <span className="wl-countdown__dot" aria-hidden="true" />
          Launching 14 September 2026
        </p>
        <div className="wl-countdown__row" aria-hidden="true">
          {units.map((unit) => (
            <div className="wl-countdown__unit" key={unit.label}>
              <span className="wl-countdown__value wl-num">{String(unit.value).padStart(2, '0')}</span>
              <span className="wl-countdown__label">{unit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
