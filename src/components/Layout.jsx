import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import ScrollButton from './ScrollButton';
import { useSmoothScroll, getLenis } from '../hooks/useSmoothScroll';

/**
 * Page chrome shared by every route: announcement bar, header, footer and the
 * Lenis/GSAP smooth-scroll wiring. `useSmoothScroll` lives here (once, at the
 * router root) rather than per-page, so navigating between routes doesn't
 * tear down and rebuild the scroll instance — every page gets the same
 * smooth-scroll behaviour the homepage already had.
 */
export default function Layout() {
  useSmoothScroll();

  const { pathname } = useLocation();

  // Each page's own sections register their ScrollTriggers via useSectionFx,
  // but those measure positions against whatever page was mounted at the
  // time — swapping routes changes the DOM under them without a page reload,
  // so a fresh page needs a reset scroll position and a trigger recalculation.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollButton />
    </>
  );
}
