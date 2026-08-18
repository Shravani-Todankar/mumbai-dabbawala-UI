import Hero from '../components/Hero';
import VideoScroll from '../components/VideoScroll';
import GlowSection from '../components/GlowSection';
import About from '../components/About';
import Process from '../components/Process';
import Services from '../components/Services';
import Stats from '../components/Stats';
import Framework from '../components/Framework';
import Marquee from '../components/Marquee';
import Recognition from '../components/Recognition';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import AppPromo from '../components/AppPromo';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import StackSections from '../components/StackSections';

export default function Home() {
  return (
    <>
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
      <Testimonials />
      <Gallery />
      <AppPromo />
      <FAQ />
      <Contact />
    </>
  );
}
