import { useMemo, useState } from 'react';
import { menuCalendar, menuCalendarPhotos } from '../../data/content';
import { useSectionFx } from '../../hooks/useScrollFx';
import AnimatedHeading from '../AnimatedHeading';
import './MenuBoard.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// 2 days back through 11 days ahead — a real rolling calendar (today's
// actual date), not a static Monday-first week, so "Today"/"Tomorrow" mean
// something. The 7-day thali rotation just repeats to fill it.
const PAST_DAYS = 2;
const FUTURE_DAYS = 11;

function buildDates() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: PAST_DAYS + FUTURE_DAYS + 1 }, (_, i) => {
    const offset = i - PAST_DAYS;
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    return { date, offset, weekday: (date.getDay() + 6) % 7 };
  });
}

/**
 * A dated calendar grid, not a plain 7-row list — each card is a real date
 * (today ± a rolling window), reusing the selected thali/diet's 7-day
 * rotation to fill it. Today gets an accent border + badge, tomorrow a
 * label, and dates already past are muted rather than styled identically to
 * what's still ahead.
 */
export default function MenuBoard() {
  const scope = useSectionFx();
  const [typeIndex, setTypeIndex] = useState(0);
  const [diet, setDiet] = useState('veg');
  const dates = useMemo(buildDates, []);

  const thali = menuCalendar[typeIndex];
  const hasNonveg = Boolean(thali.nonveg);
  const activeDiet = hasNonveg ? diet : 'veg';
  const dishes = activeDiet === 'veg' ? thali.veg : thali.nonveg;

  const selectType = (index) => {
    setTypeIndex(index);
    // Switching into a veg-only thali while "Non-veg" was selected would
    // otherwise leave the toggle pointed at a diet this thali doesn't have.
    if (!menuCalendar[index].nonveg) setDiet('veg');
  };

  return (
    <section className="section menu-board" ref={scope}>
      <div className="container">
        <p className="eyebrow reveal">Browse by thali</p>
        <AnimatedHeading text="Four regions, one calendar each" className="section-title" />

        <div className="menu-board__bar reveal">
          <div className="menu-board__types" role="group" aria-label="Thali region">
            {menuCalendar.map((item, i) => (
              <button
                type="button"
                key={item.type}
                className={`menu-board__type${typeIndex === i ? ' is-active' : ''}`}
                aria-pressed={typeIndex === i}
                onClick={() => selectType(i)}
              >
                {item.type}
              </button>
            ))}
          </div>

          <div className="menu-board__diet" role="group" aria-label="Veg or non-veg">
            <button
              type="button"
              className={`menu-board__diet-btn${activeDiet === 'veg' ? ' is-active' : ''}`}
              aria-pressed={activeDiet === 'veg'}
              onClick={() => setDiet('veg')}
            >
              <span className="menu-board__veg-mark" aria-hidden="true">
                <span />
              </span>
              Veg
            </button>
            <button
              type="button"
              className={`menu-board__diet-btn${activeDiet === 'nonveg' ? ' is-active' : ''}`}
              aria-pressed={activeDiet === 'nonveg'}
              disabled={!hasNonveg}
              title={hasNonveg ? undefined : `${thali.type} thali is kept vegetarian-only here`}
              onClick={() => hasNonveg && setDiet('nonveg')}
            >
              <span className="menu-board__nonveg-mark" aria-hidden="true">
                <span />
              </span>
              Non-veg
            </button>
          </div>
        </div>

        <ol className="menu-board__grid" key={`${thali.type}-${activeDiet}`} data-stagger>
          {dates.map(({ date, offset, weekday }, i) => {
            const dish = dishes[weekday];
            const photo = menuCalendarPhotos[i % menuCalendarPhotos.length];
            const isToday = offset === 0;
            const isTomorrow = offset === 1;
            const isPast = offset < 0;

            return (
              <li
                className={`menu-board__card${isToday ? ' is-today' : ''}${isPast ? ' is-past' : ''}`}
                key={date.toISOString()}
              >
                <div className="menu-board__card-head">
                  <span className="menu-board__card-date">
                    {date.getDate()} {MONTHS[date.getMonth()]}
                  </span>
                  <span
                    className={activeDiet === 'veg' ? 'menu-board__veg-mark' : 'menu-board__nonveg-mark'}
                    aria-hidden="true"
                  >
                    <span />
                  </span>
                </div>

                {isToday && <span className="menu-board__badge menu-board__badge--today">Today</span>}
                {isTomorrow && <span className="menu-board__badge menu-board__badge--tomorrow">Tomorrow</span>}

                <p className="menu-board__card-weekday">{WEEKDAY_LABELS[weekday]}</p>

                <div className="menu-board__card-image-frame">
                  <img src={photo} alt="" width="220" height="160" loading="lazy" />
                </div>

                <h3 className="menu-board__card-title">{dish.title}</h3>
                <p className="menu-board__card-note">{dish.note}</p>
              </li>
            );
          })}
        </ol>

        {!hasNonveg && (
          <p className="menu-board__note">
            {thali.type} thali is kept vegetarian-only in this menu — a real Gujarati thali tradition,
            not a limitation of the other three regions.
          </p>
        )}
      </div>
    </section>
  );
}
