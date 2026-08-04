import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoScroll from './components/VideoScroll';
import GlowSection from './components/GlowSection';
import About from './components/About';
import Process from './components/Process';
import Services from './components/Services';
import Stats from './components/Stats';
import Framework from './components/Framework';
import Marquee from './components/Marquee';
import Recognition from './components/Recognition';
import Gallery from './components/Gallery';
import AppPromo from './components/AppPromo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ScrollButton from './components/ScrollButton';
import StackSections from './components/StackSections';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <VideoScroll />
        <GlowSection />
        <About />
        {/* These three read as a deck: each sticks under the one before it and
            recedes as the next slides over. */}
        <StackSections>
          <Process />
          <Services />
          <Stats />
        </StackSections>
        <Framework />
        <Marquee />
        <Recognition />
        <Gallery />
        <AppPromo />
        <Contact />
      </main>
      <Footer />
      <ScrollButton />
    </>
  );
}
