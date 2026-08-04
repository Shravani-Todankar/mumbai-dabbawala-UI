import './Marquee.css';

const ITEMS = [
  'Since 1890',
  '5,000 Dabbawalas',
  '200,000 meals a day',
  'Six Sigma 99.999999%',
  'ISO 9001:2000',
  'Feeding Mumbai',
];

export default function Marquee() {
  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul className="marquee__group" key={copy} aria-hidden={copy === 1}>
            {ITEMS.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <span className="marquee__dot">&bull;</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
