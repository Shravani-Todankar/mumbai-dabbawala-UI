import { announcement } from '../data/content';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  return (
    <div className="announce">
      <p className="announce__text">
        {announcement.text}{' '}
        <a className="announce__link" href={announcement.href}>
          {announcement.linkLabel}
        </a>
      </p>
    </div>
  );
}
