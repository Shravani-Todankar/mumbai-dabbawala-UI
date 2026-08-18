import LaunchCountdown from '../components/waitlist/LaunchCountdown';
import WaitlistHero from '../components/waitlist/WaitlistHero';
import WhySection from '../components/waitlist/WhySection';
import FinalCta from '../components/waitlist/FinalCta';
import './Waitlist.css';

/**
 * Waitlist landing page for the fictional "Mumbai Dabbawala 2.0" concept —
 * see BUILD_LOG.md for scope notes. Renders inside the site's existing
 * Layout (shared skip-link, ScrollProgress, AnnouncementBar, Header, Footer,
 * and the single Lenis/GSAP smooth-scroll instance mounted there), so this
 * page does not call useSmoothScroll() itself.
 */
export default function Waitlist() {
  return (
    <div className="wl-page">
      <LaunchCountdown />
      <WaitlistHero />
      <WhySection />
      <FinalCta />
    </div>
  );
}
